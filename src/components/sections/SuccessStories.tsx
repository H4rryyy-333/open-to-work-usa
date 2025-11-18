import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    company: "Google",
    visa: "H1B",
    quote: "OPEN TO WORK helped me land my dream job at Google. The platform made it easy to find H1B sponsoring companies.",
    initials: "SC"
  },
  {
    name: "Raj Patel",
    role: "Data Scientist",
    company: "Microsoft",
    visa: "OPT-EAD",
    quote: "Amazing platform! I found multiple OPT opportunities and got hired within 3 weeks of signing up.",
    initials: "RP"
  },
  {
    name: "Maria Garcia",
    role: "Product Manager",
    company: "Amazon",
    visa: "Green Card",
    quote: "The best job platform for international candidates. Found my position at Amazon through this site!",
    initials: "MG"
  }
];

const SuccessStories = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-primary-light/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals who found their dream jobs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card border-border/50"
            >
              <div className="space-y-4">
                <Quote className="h-10 w-10 text-primary opacity-50" />
                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                
                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  <Avatar className="h-12 w-12 bg-gradient-to-br from-primary to-accent">
                    <AvatarFallback className="bg-transparent text-primary-foreground font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                    <p className="text-xs text-primary font-medium mt-1">{testimonial.visa} Visa</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
