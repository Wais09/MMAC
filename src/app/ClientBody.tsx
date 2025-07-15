"use client";

import { useEffect } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatBot from "@/components/ChatBot";
import StickyTrialBanner from "@/components/StickyTrialBanner";
import ErrorBoundary from "@/components/ErrorBoundary";
import Header from "@/components/Header";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased";
  }, []);

  return (
    <ErrorBoundary>
      <div className="antialiased">
        {/* Global Header - Available on all pages */}
        <Header />

        {children}

        {/* Global Floating Buttons - Available on all pages */}
        <WhatsAppButton />
        <ChatBot />

        {/* Global Sticky Trial Banner - Available on all pages */}
        <StickyTrialBanner />
      </div>
    </ErrorBoundary>
  );
}
