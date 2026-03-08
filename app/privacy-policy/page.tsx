"use client";
import React from "react";
import LandingHeader from "@/components/LandingHeader";
import Link from "next/link";

const PrivacyPolicy = () => (
  <div className="min-h-screen flex flex-col bg-background text-foreground">
    <LandingHeader openBookDemo={() => {}} />
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Privacy Policy</h1>
        <p className="mb-4">Your privacy and trust are our top priorities at Bill Bridge. We are committed to protecting your data and being transparent about how we use it.</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><span className="font-semibold">Confidentiality:</span> All your business and personal data is kept strictly confidential. We never sell or share your information with third parties.</li>
          <li><span className="font-semibold">No Data Leaks:</span> We use industry-standard security measures to ensure your data is safe, encrypted, and always backed up.</li>
          <li><span className="font-semibold">Compliance:</span> We comply with global privacy laws, including GDPR and other worldwide standards, to protect your rights and your information.</li>
          <li><span className="font-semibold">Transparency:</span> You can always request to view, update, or delete your data. We’re here to answer any questions you have about your privacy.</li>
          <li><span className="font-semibold">No Unnecessary Data Collection:</span> We only collect the information needed to provide you with the best experience—nothing more.</li>
        </ul>
        <p className="mb-4">By using Bill Bridge, you agree to this policy. If you have any questions or concerns, please <Link href="/contact" className="text-primary underline">contact us</Link> anytime.</p>
        
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

export default PrivacyPolicy;
