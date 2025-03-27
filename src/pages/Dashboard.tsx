
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, Mail, MessagesSquare } from "lucide-react";
import { format } from "date-fns";

interface Project {
  id: string;
  title: string;
  type: string;
  status: string;
  created_at: string;
  deadline: string;
}

interface Meeting {
  id: string;
  title: string;
  meeting_time: string;
  duration: number;
  meeting_link?: string;
}

interface Message {
  id: string;
  project_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState({
    projects: true,
    meetings: true,
    messages: true
  });

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    // Fetch projects
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("client_id", user.id)
          .order("created_at", { ascending: false });
          
        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(prev => ({ ...prev, projects: false }));
      }
    };

    // Fetch meetings
    const fetchMeetings = async () => {
      try {
        const { data, error } = await supabase
          .from("meetings")
          .select("*")
          .eq("client_id", user.id)
          .gte("meeting_time", new Date().toISOString())
          .order("meeting_time", { ascending: true });
          
        if (error) throw error;
        setMeetings(data || []);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      } finally {
        setLoading(prev => ({ ...prev, meetings: false }));
      }
    };

    // Fetch messages
    const fetchMessages = async () => {
      try {
        const { data: projectData, error: projectError } = await supabase
          .from("projects")
          .select("id")
          .eq("client_id", user.id);
          
        if (projectError) throw projectError;
        
        if (projectData && projectData.length > 0) {
          const projectIds = projectData.map(project => project.id);
          
          const { data, error } = await supabase
            .from("messages")
            .select("*")
            .in("project_id", projectIds)
            .order("created_at", { ascending: false })
            .limit(10);
            
          if (error) throw error;
          setMessages(data || []);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(prev => ({ ...prev, messages: false }));
      }
    };

    fetchProjects();
    fetchMeetings();
    fetchMessages();
  }, [user, navigate]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500";
      case "in_progress":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <Tabs defaultValue="projects" className="mb-12">
          <TabsList className="mb-6">
            <TabsTrigger value="projects">My Projects</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription>Manage your projects and track their status</CardDescription>
                </div>
                <Button onClick={() => navigate("/book-project")}>Book New Project</Button>
              </CardHeader>
              <CardContent>
                {loading.projects ? (
                  <div className="text-center py-8">Loading projects...</div>
                ) : projects.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="mb-4">You haven't booked any projects yet.</p>
                    <Button onClick={() => navigate("/book-project")}>Book Your First Project</Button>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects.map(project => (
                        <TableRow key={project.id}>
                          <TableCell className="font-medium">{project.title}</TableCell>
                          <TableCell>{project.type === "software" ? "Software" : "Hardware"}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(project.status)}>
                              {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace("_", " ")}
                            </Badge>
                          </TableCell>
                          <TableCell>{format(new Date(project.created_at), "MMM d, yyyy")}</TableCell>
                          <TableCell>{format(new Date(project.deadline), "MMM d, yyyy")}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="meetings">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Meetings</CardTitle>
                <CardDescription>Your upcoming meetings with our team</CardDescription>
              </CardHeader>
              <CardContent>
                {loading.meetings ? (
                  <div className="text-center py-8">Loading meetings...</div>
                ) : meetings.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="mb-4">You don't have any upcoming meetings.</p>
                    <Button disabled>Request Meeting</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {meetings.map(meeting => (
                      <Card key={meeting.id}>
                        <CardContent className="flex items-start p-4">
                          <div className="bg-primary/10 p-2 rounded mr-4">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{meeting.title}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>
                                {format(new Date(meeting.meeting_time), "MMM d, yyyy 'at' h:mm a")} 
                                ({meeting.duration} min)
                              </span>
                            </div>
                          </div>
                          {meeting.meeting_link && (
                            <Button size="sm" variant="outline">
                              Join
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Communication about your projects</CardDescription>
              </CardHeader>
              <CardContent>
                {loading.messages ? (
                  <div className="text-center py-8">Loading messages...</div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-8">
                    <p>You don't have any messages yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map(message => (
                      <Card key={message.id} className={message.is_read ? "" : "border-primary"}>
                        <CardContent className="flex items-start p-4">
                          <div className="bg-primary/10 p-2 rounded mr-4">
                            <MessagesSquare className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-muted-foreground">
                                {format(new Date(message.created_at), "MMM d, yyyy 'at' h:mm a")}
                              </p>
                              {!message.is_read && (
                                <Badge variant="outline" className="border-primary text-primary">
                                  New
                                </Badge>
                              )}
                            </div>
                            <p className="mt-2">{message.content}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
