
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Star, StarHalf } from "lucide-react";

interface Review {
  id: string;
  reviewer_name: string;
  project_name?: string;
  content: string;
  rating: number;
  created_at: string;
}

export const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from("reviews")
          .select("*")
          .eq("is_approved", true)
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setReviews(data || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    // Auto rotate reviews if there are any
    if (reviews.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [reviews.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // If we don't have real reviews yet, use some samples
  const sampleReviews: Review[] = [
    {
      id: "1",
      reviewer_name: "Ravi Kumar",
      project_name: "E-commerce Platform",
      content: "Sarathi delivered an exceptional e-commerce solution that exceeded my expectations. The attention to detail and responsive design made all the difference for my business.",
      rating: 5,
      created_at: new Date().toISOString()
    },
    {
      id: "2",
      reviewer_name: "Priya Sharma",
      project_name: "ML-based Recommendation System",
      content: "Working with Sarathi was a breeze. The AI recommendation system he built for our platform increased user engagement by 40%. Highly recommend!",
      rating: 5,
      created_at: new Date().toISOString()
    },
    {
      id: "3",
      reviewer_name: "Ajith Menon",
      project_name: "IoT Smart Home Project",
      content: "Sarathi helped me with my final year project on IoT. His expertise in hardware integration and software development made my project stand out. Great mentor!",
      rating: 4,
      created_at: new Date().toISOString()
    }
  ];

  const displayReviews = reviews.length > 0 ? reviews : sampleReviews;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-5 w-5 fill-primary text-primary" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-5 w-5 fill-primary text-primary" />);
    }
    
    return stars;
  };

  return (
    <section id="reviews" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Client Reviews
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Don't just take my word for it. Here's what clients have to say about working with me.
          </motion.p>
        </div>

        {isLoading ? (
          <div className="max-w-3xl mx-auto animate-pulse">
            <Card>
              <CardContent className="p-8">
                <div className="h-6 bg-muted rounded w-1/3 mb-4 mx-auto"></div>
                <div className="flex justify-center mb-6 space-x-1">
                  <div className="w-5 h-5 rounded-full bg-muted"></div>
                  <div className="w-5 h-5 rounded-full bg-muted"></div>
                  <div className="w-5 h-5 rounded-full bg-muted"></div>
                  <div className="w-5 h-5 rounded-full bg-muted"></div>
                  <div className="w-5 h-5 rounded-full bg-muted"></div>
                </div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3 mb-6"></div>
                <div className="h-5 bg-muted rounded w-1/4 mx-auto"></div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-8">
                {displayReviews.length > 0 ? (
                  <motion.div
                    key={displayReviews[currentIndex].id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <h3 className="text-xl font-semibold mb-2">{displayReviews[currentIndex].reviewer_name}</h3>
                    {displayReviews[currentIndex].project_name && (
                      <p className="text-sm text-muted-foreground mb-4">{displayReviews[currentIndex].project_name}</p>
                    )}
                    <div className="flex justify-center mb-6 space-x-1">
                      {renderStars(displayReviews[currentIndex].rating)}
                    </div>
                    <p className="text-base italic mb-6">"{displayReviews[currentIndex].content}"</p>
                  </motion.div>
                ) : (
                  <p className="text-center text-muted-foreground">No reviews available yet.</p>
                )}
                
                {displayReviews.length > 1 && (
                  <div className="flex justify-center space-x-2 mt-4">
                    {displayReviews.map((_, index) => (
                      <button
                        key={index}
                        className={`h-2 w-2 rounded-full transition-colors ${
                          index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                        }`}
                        onClick={() => handleDotClick(index)}
                        aria-label={`Go to review ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
