import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, DollarSign, Users } from "lucide-react";

const HeroSection = ({ openBookDemo }: { openBookDemo: () => void }) => {
  return (
    <section id="hero-section" className="bg-hero-gradient text-primary-foreground py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Track Better. Manage Smarter.{" "}
            <span className="text-white/90">Grow Faster.</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Bill Bridge is an all-in-one business management platform designed to simplify how you track, manage, and grow your operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 mt-[15px]">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-6 shadow-primary"
              onClick={openBookDemo}
            >
              Book a Demo              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <div className="flex flex-col items-center">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-white/30 text-white bg-white/10 hover:bg-white/20"
                onClick={() => window.location.href = '/login'}
              >
                Launch Preview
              </Button>
            
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-4 rounded-full mb-4">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Analytics</h3>
              <p className="text-white/80">Real-time insights and reports</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-4 rounded-full mb-4">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Financial Control</h3>
              <p className="text-white/80">Track profits, losses, and expenses</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-white/20 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Customer Management</h3>
              <p className="text-white/80">All contacts in one place</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;