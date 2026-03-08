"use client";
import React from "react";
import LandingHeader from "@/components/LandingHeader";

const Contact = () => (
  <div className="min-h-screen flex flex-col bg-background text-foreground">
    <LandingHeader openBookDemo={() => {}} />
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact</h1>
        <p className="text-lg mb-6">We’d love to hear from you! Reach out to us anytime.</p>
        <div className="text-xl font-semibold mb-2">Phone:</div>
        <a href="tel:+919637342372" className="text-primary text-2xl font-bold underline">+91 96373 42372</a>
        <div className="mt-8 text-sm text-muted-foreground">We’re here to help you with any questions or support you need.</div>
      </div>
    </div>
    <footer className="w-full text-sm text-muted-foreground py-6 bg-background border-t border-border/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
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
  </div>
);

export default Contact;
