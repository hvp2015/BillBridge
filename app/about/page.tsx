"use client";
import React from "react";
import LandingHeader from "@/components/LandingHeader";

const AboutUs = () => (
  <div className="min-h-screen flex flex-col bg-background text-foreground">
    <LandingHeader openBookDemo={() => {}} />
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg mb-6">
          Welcome to <span className="font-semibold text-primary">Bill Bridge</span>! We’re a passionate team dedicated to making business management simple, smart, and stress-free for everyone. Our journey started with a simple idea: <span className="italic">help businesses of all sizes track, manage, and grow with confidence</span>.
        </p>
        <p className="mb-4">
          We believe in building real relationships with our users. Every feature, every update, and every support call is handled with care—because your success is our success. Whether you’re a small shop or a growing company, we’re here to help you bridge the gap to better business.
        </p>
        <p className="mb-4">
          Thank you for trusting us to be a part of your journey. If you ever want to chat, share feedback, or just say hello, we’re always here for you!
        </p>
        
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

export default AboutUs;
