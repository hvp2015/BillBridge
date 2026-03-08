import { Card, CardContent } from "@/components/ui/card";
import { 
  Package, 
  TrendingUp, 
  BarChart3, 
  Receipt, 
  FileText, 
  Users, 
  Calculator, 
  Layout 
} from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Inventory Tracking",
    description: "Keep track of your stock and products with real-time updates"
  },
  {
    icon: TrendingUp,
    title: "Sales & Service Management",
    description: "Record sales, services, and orders efficiently"
  },
  {
    icon: BarChart3,
    title: "Profit & Loss Reports",
    description: "See how much you're earning or losing with detailed analytics"
  },
  {
    icon: Receipt,
    title: "Expense Management",
    description: "Log and organise all your business costs in one place"
  },
  {
    icon: FileText,
    title: "Billing & Invoicing",
    description: "Create and send professional bills with ease"
  },
  {
    icon: Users,
    title: "Customer & Vendor Records",
    description: "Manage all your contacts and relationships"
  },
  {
    icon: Calculator,
    title: "Financial Tools",
    description: "Get smart insights and quick calculations"
  },
  {
    icon: Layout,
    title: "All-in-One Dashboard",
    description: "Everything you need in one clean, intuitive view"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-feature-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Powerful Features for Modern Business
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your business operations efficiently, all in one place
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-soft hover:shadow-primary transition-all duration-300 group hover:-translate-y-1"
            >
              <CardContent className="p-6 text-center">
                <div className="bg-accent p-3 rounded-full w-fit mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 mb-1 border border-primary/20 flex flex-col items-center text-center">
            <h3 className="text-xl font-semibold text-primary mb-3">✨ Tailored for Your Business</h3>
            <p className="text-muted-foreground">
              We go beyond standard features by offering <span className="font-bold text-primary">customized solutions</span> and tailored features—built to match your unique business needs and help you grow smarter.
            </p>
          </div>
      </div>
    </section>
  );
};

export default FeaturesSection;