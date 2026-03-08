"use client";
import LandingHeader from "@/components/LandingHeader";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import BenefitsSection from "@/components/BenefitsSection";
import TargetAudienceSection from "@/components/TargetAudienceSection";
import Footer from "@/components/Footer";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import emailjs from "emailjs-com";

const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const Index = () => {
  const [bookDemoOpen, setBookDemoOpen] = useState(false);
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const openBookDemo = () => setBookDemoOpen(true);
  const closeBookDemo = () => setBookDemoOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current!,
        PUBLIC_KEY
      );
      alert("Thank you! Your demo request has been sent.");
      (e.target as HTMLFormElement).reset();
      closeBookDemo();
    } catch (err) {
      alert("Sorry, there was an error sending your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <LandingHeader openBookDemo={openBookDemo} />
      <HeroSection openBookDemo={openBookDemo} />
      <FeaturesSection />
      <BenefitsSection />
      <TargetAudienceSection />
      <Footer openBookDemo={openBookDemo} />
      <Dialog open={bookDemoOpen} onOpenChange={setBookDemoOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book a Demo</DialogTitle>
            <DialogDescription>
              Fill out the form below and our team will contact you to schedule a demo.
            </DialogDescription>
          </DialogHeader>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input name="name" type="text" className="w-full border rounded px-3 py-2" placeholder="Your Name" required />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email <span className='text-xs text-muted-foreground'>(optional)</span></label>
              <input name="email" type="email" className="w-full border rounded px-3 py-2" placeholder="you@email.com" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Phone Number</label>
              <input name="phone" type="tel" className="w-full border rounded px-3 py-2" placeholder="Your Phone Number" required />
            </div>
            <div>
              <label className="block mb-1 font-medium">Company / Shop Name</label>
              <input name="company" type="text" className="w-full border rounded px-3 py-2" placeholder="Your Company or Shop Name" required />
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full" disabled={loading}>{loading ? "Sending..." : "Submit"}</Button>
              <DialogClose asChild>
                <Button type="button" variant="outline" className="w-full mt-2" onClick={closeBookDemo}>Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
