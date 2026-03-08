import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, Store, Briefcase } from "lucide-react";

const audiences = [
  {
    icon: Building2,
    title: "Small & Medium Businesses",
    description: "Perfect for growing companies that need organized management systems",
    examples: ["Startups", "Growing companies", "Local businesses"]
  },
  {
    icon: Users,
    title: "Service Providers & Freelancers",
    description: "Ideal for professionals who need to track services and client relationships",
    examples: ["Consultants", "Freelancers", "Service providers"]
  },
  {
    icon: Store,
    title: "Retailers, Traders & Distributors",
    description: "Essential for businesses managing inventory and sales operations",
    examples: ["Retail stores", "Wholesalers", "Distributors", "Industrial & Manufacturing Units"]
  },
  {
    icon: Briefcase,
    title: "Agencies, Consultants & Professionals",
    description: "Built for knowledge workers who need comprehensive business insights",
    examples: ["Marketing agencies", "Professional services", "Consultants"]
  }
];

const TargetAudienceSection = () => {
  return (
    <section id="for-who" className="pt-10 pb-20 bg-feature-gradient scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Who is Bill Bridge For?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Designed for any type of business that wants to grow smarter and more efficiently
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {audiences.map((audience, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-soft hover:shadow-primary transition-all duration-300 group hover:-translate-y-1"
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-accent p-3 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <audience.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">
                      {audience.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {audience.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {audience.examples.map((example, exampleIndex) => (
                        <span 
                          key={exampleIndex}
                          className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-background border border-border/50 p-8 rounded-lg shadow-soft">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Works for Any Type of Business
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Whether you're just starting out or scaling up, Bill Bridge adapts to your business needs. 
              Access your dashboard anytime, anywhere - on desktop, tablet, or mobile.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;