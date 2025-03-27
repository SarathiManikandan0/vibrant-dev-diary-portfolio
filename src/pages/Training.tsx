
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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const trainingTopics = [
  "Web Development Basics",
  "Python Programming",
  "Full Stack MERN Development",
  "Data Science & ML Fundamentals",
  "IoT & Hardware Programming",
  "Mobile App Development",
  "Other (please specify)"
];

const availabilityOptions = [
  { id: "weekday_morning", label: "Weekdays (Morning)" },
  { id: "weekday_afternoon", label: "Weekdays (Afternoon)" },
  { id: "weekday_evening", label: "Weekdays (Evening)" },
  { id: "weekend_morning", label: "Weekends (Morning)" },
  { id: "weekend_afternoon", label: "Weekends (Afternoon)" },
  { id: "weekend_evening", label: "Weekends (Evening)" }
];

const Training = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [otherTopic, setOtherTopic] = useState("");
  const [availability, setAvailability] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const finalTopic = topic === "Other (please specify)" ? otherTopic : topic;
      
      if (!finalTopic) {
        throw new Error("Please select or specify a training topic");
      }
      
      if (availability.length === 0) {
        throw new Error("Please select at least one availability option");
      }
      
      const trainingData = {
        client_id: user?.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        topic: finalTopic,
        availability: JSON.stringify(availability),
        status: "pending"
      };
      
      const { error } = await supabase
        .from("training_requests")
        .insert(trainingData);
      
      if (error) throw error;
      
      toast({
        title: "Request Submitted",
        description: "Your training request has been submitted successfully. We'll contact you soon!",
      });
      
      navigate(user ? "/dashboard" : "/");
    } catch (error: any) {
      toast({
        title: "Error Submitting Request",
        description: error.message || "An error occurred while submitting your request.",
        variant: "destructive"
      });
      console.error("Error submitting training request:", error);
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
          <h1 className="text-3xl font-bold mb-2">Request Beginner Training</h1>
          <p className="text-muted-foreground mb-8">
            Get personalized training from Sarathi Manikandan to kickstart your journey in programming and technology. Fill out the form below to request a session.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                placeholder="John Doe" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                name="email" 
                type="email"
                value={formData.email} 
                onChange={handleChange}
                placeholder="you@example.com" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange}
                placeholder="Your contact number" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="topic">Training Topic</Label>
              <Select 
                onValueChange={setTopic}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  {trainingTopics.map(topic => (
                    <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {topic === "Other (please specify)" && (
                <div className="mt-2">
                  <Input 
                    placeholder="Please specify your topic of interest"
                    value={otherTopic}
                    onChange={(e) => setOtherTopic(e.target.value)}
                    required
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <Label>Availability</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availabilityOptions.map(option => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={option.id} 
                      checked={availability.includes(option.id)}
                      onCheckedChange={(checked) => {
                        setAvailability(prev => 
                          checked 
                            ? [...prev, option.id] 
                            : prev.filter(id => id !== option.id)
                        );
                      }}
                    />
                    <label 
                      htmlFor={option.id}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Request Training"}
            </Button>
          </form>
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default Training;
