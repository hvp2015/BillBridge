import { Button } from "@/components/ui/button";
import Link from "next/link";

const Footer = ({ openBookDemo }: { openBookDemo: () => void }) => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <img 
              src="/images/logo.png" 
              alt="Bill Bridge Logo" 
              className="h-8 w-8"
            />
            <span className="text-2xl font-bold">Bill Bridge</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg text-background/80 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using Bill Bridge to track better, manage smarter, and grow faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg shadow-primary"
              onClick={openBookDemo}
            >
              Book a Demo
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-background/30 text-background bg-background/10 hover:bg-background/20 hover:text-primary-foreground px-8 py-6 text-lg"
              onClick={() => window.location.href = '/login'}
            >
              Launch Preview
            </Button>
          </div>
        </div>
        <div className="border-t border-background/20" />
        <nav className="flex justify-center gap-8 py-6">
          <Link href="/about" className="hover:text-primary transition-colors text-base md:text-sm">About Us</Link>
          <Link href="/contact" className="hover:text-primary transition-colors text-base md:text-sm">Contact</Link>
          <Link href="/privacy-policy" className="hover:text-primary transition-colors text-base md:text-sm">Privacy Policy</Link>
        </nav>
        <div className="border-t border-background/20" />
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground py-6">
          <div>&copy; {new Date().getFullYear()} Bill Bridge. All rights reserved.</div>
          <div className="mt-2 md:mt-0">
            Designed, Developed, and maintained by{" "}
            <a 
              href="https://noobacker.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Noobacker
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;