import { UserPlus, Search, FileText, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Sign up in minutes and build your professional profile with resume upload."
  },
  {
    icon: Search,
    title: "Search Jobs",
    description: "Browse thousands of jobs filtered by location, visa type, and skills."
  },
  {
    icon: FileText,
    title: "Apply Instantly",
    description: "Apply to multiple positions with one click using your saved profile."
  },
  {
    icon: CheckCircle,
    title: "Get Hired",
    description: "Connect with employers, track applications, and land your dream job."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in 4 simple steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary to-accent" />
              )}
              
              <div className="relative text-center space-y-4">
                <div className="relative inline-flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center relative z-10">
                    <step.icon className="h-14 w-14 text-primary-foreground" />
                  </div>
                  <div className="absolute top-0 right-0 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
