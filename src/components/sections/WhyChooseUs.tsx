import { Shield, Zap, Users, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Verified Employers",
    description: "All employers are verified and trusted. Your data and applications are secure with us."
  },
  {
    icon: Zap,
    title: "Quick Apply",
    description: "Apply to multiple jobs with one click. Save time with our streamlined application process."
  },
  {
    icon: Users,
    title: "All Visa Types",
    description: "Support for H1B, CPT, OPT, Green Card, and all US work authorization categories."
  },
  {
    icon: Award,
    title: "Top Companies",
    description: "Connect with leading tech companies and startups actively hiring international talent."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary-light/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Why Choose OPEN TO WORK?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The most trusted platform for international job seekers in the USA
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card border-border/50"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                <feature.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
