import { Card, CardContent } from "@/components/ui/card";
import { Check, Clock, Target, TrendingUp, Shield, Smartphone } from "lucide-react";

const benefits = [
  {
    icon: Check,
    title: "Easy to Use",
    description: "Intuitive interface that anyone can master quickly"
  },
  {
    icon: Clock,
    title: "Saves Your Time",
    description: "Automate repetitive tasks and focus on growing your business"
  },
  {
    icon: Target,
    title: "Stay Organised",
    description: "Keep all your business data structured and accessible"
  },
  {
    icon: TrendingUp,
    title: "Clear Financial Insights",
    description: "Make data-driven decisions with comprehensive reports"
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Your data is encrypted, securely stored, and always backed up"
  },
  {
    icon: Smartphone,
    title: "Access Anywhere",
    description: "Desktop, tablet, or mobile - manage your business on the go"
  }
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="pt-0 pb-10 bg-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Why Choose Bill Bridge?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stop juggling spreadsheets and start making smarter decisions, faster
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="border border-border/50 hover:border-primary/50 transition-all duration-300 group"
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-accent p-2 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <benefit.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-foreground">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          
          
          <div className="bg-accent/50 p-8 rounded-lg border border-border/50">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              No Need for Multiple Apps or Spreadsheets
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Bill Bridge consolidates all your business management needs into one powerful platform. 
              Say goodbye to switching between different tools and hello to streamlined efficiency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;