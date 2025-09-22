"use client";

import { useEffect } from "react";

// In-Article Ad Component
export function InArticleAd() {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className="my-8 flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-1241486495309147"
        data-ad-slot="1716775182"
      />
    </div>
  );
}

// Display Ad Component
export function DisplayAd({ className = "" }: { className?: string }) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className={`my-6 flex justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1241486495309147"
        data-ad-slot="6319748062"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

// DMCA Notice Component
export function DMCANotice() {
  return (
    <div className="bg-gray-900/80 border border-orange-500/30 rounded-lg p-4 mb-8">
      <div className="flex items-center space-x-2">
        <div className="text-orange-500 font-bold">©</div>
        <div className="text-white text-sm">
          <strong>Copyright Notice:</strong> This content is the exclusive property of TopAd Digital. 
          All rights reserved. Unauthorized reproduction, distribution, or use of this material 
          is strictly prohibited and may result in legal action under DMCA regulations.
        </div>
      </div>
    </div>
  );
}