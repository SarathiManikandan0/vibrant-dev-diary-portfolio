
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const BookProject = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    type: "",
    budget_range: "",
  });

  if (!user) {
    return (
      <>
        <Header />
        <main className="container mx-auto py-16 px-4 min-h-screen">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Book a Project</h1>
            <p className="mb-8">Please sign in to book a project.</p>
            <Button onClick={() => navigate("/auth")}>Sign In</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!user) throw new Error("You must be logged in to book a project");
      if (!selectedDate) throw new Error("Please select a deadline");

      // First insert the project
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .insert({
          client_id: user.id,
          title: formData.title,
          description: formData.description,
          requirements: formData.requirements,
          type: formData.type,
          budget_range: formData.budget_range,
          deadline: selectedDate.toISOString(),
          status: "pending",
          file_urls: []
        })
        .select();

      if (projectError) throw projectError;
      
      // If we have a file to upload
      if (selectedFile && projectData && projectData[0]) {
        const projectId = projectData[0].id;
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${projectId}/${Date.now()}.${fileExt}`;
        const filePath = `projects/${fileName}`;
        
        // Create a storage bucket if it doesn't exist (would typically be created through SQL migration)
        // Upload file to storage
        const { error: uploadError } = await supabase.storage
          .from("project_files")
          .upload(filePath, selectedFile);

        if (uploadError) throw uploadError;
        
        // Get the public URL
        const { data: urlData } = supabase.storage
          .from("project_files")
          .getPublicUrl(filePath);
        
        // Update the project with the file URL
        if (urlData) {
          const { error: updateError } = await supabase
            .from("projects")
            .update({ 
              file_urls: [urlData.publicUrl]
            })
            .eq("id", projectId);
          
          if (updateError) throw updateError;
        }
      }

      toast({
        title: "Project Booked",
        description: "Your project has been submitted successfully. We'll contact you soon!",
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error Booking Project",
        description: error.message || "An error occurred while booking your project.",
        variant: "destructive"
      });
      console.error("Error booking project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto py-16 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-2">Book a Project</h1>
          <p className="text-muted-foreground mb-8">
            Fill out the form below to request a project. We'll review your requirements and get back to you soon.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input 
                id="title" 
                name="title" 
                value={formData.title} 
                onChange={handleChange}
                placeholder="E.g., E-commerce Website, IoT Smart Device" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Project Type</Label>
              <Select 
                onValueChange={(value) => handleSelectChange("type", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="software">Software Development</SelectItem>
                  <SelectItem value="hardware">Hardware/IoT Project</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description}
                onChange={handleChange}
                placeholder="Briefly describe your project" 
                required 
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="requirements">Detailed Requirements</Label>
              <Textarea 
                id="requirements" 
                name="requirements" 
                value={formData.requirements}
                onChange={handleChange}
                placeholder="List any specific features, technologies, or requirements you have" 
                rows={5}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget_range">Budget Range</Label>
              <Select 
                onValueChange={(value) => handleSelectChange("budget_range", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="₹5,000 - ₹15,000">₹5,000 - ₹15,000</SelectItem>
                  <SelectItem value="₹15,000 - ₹30,000">₹15,000 - ₹30,000</SelectItem>
                  <SelectItem value="₹30,000 - ₹50,000">₹30,000 - ₹50,000</SelectItem>
                  <SelectItem value="₹50,000+">₹50,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Project Deadline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="file">Attachment (Optional)</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="file" 
                  type="file" 
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("file")?.click()}
                  className="w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {selectedFile ? selectedFile.name : "Upload project brief or references"}
                </Button>
              </div>
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  Selected file: {selectedFile.name}
                </p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Project Request"}
            </Button>
          </form>
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default BookProject;
