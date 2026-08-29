"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Settings, X } from "lucide-react";

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("rehab_nigeria_cookie_consent");

    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      "rehab_nigeria_cookie_consent",
      JSON.stringify({
        essential: true,
        analytics: true,
        marketing: true,
        date: new Date().toISOString(),
      })
    );

    setIsVisible(false);
  };

  const handleDeclineOptional = () => {
    localStorage.setItem(
      "rehab_nigeria_cookie_consent",
      JSON.stringify({
        essential: true,
        analytics: false,
        marketing: false,
        date: new Date().toISOString(),
      })
    );

    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(
      "rehab_nigeria_cookie_consent",
      JSON.stringify({
        essential: true,
        analytics: analyticsEnabled,
        marketing: marketingEnabled,
        date: new Date().toISOString(),
      })
    );

    setShowSettings(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* =========================
          COOKIE CONSENT BANNER
      ========================== */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-[var(--background-secondary)] border-t border-[var(--border)] shadow-2xl backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

          {/* Cookie Information */}
          <div className="flex items-start gap-3 max-w-3xl">

            {/* Rehab Nigeria Logo */}
            <div className="w-9 h-9 bg-[var(--background-tertiary)] rounded-sm flex items-center justify-center shrink-0 mt-0.5 overflow-hidden">
              <Image
                src="/rehab-nigeria-logo.png"
                alt="Rehab Nigeria"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>

            {/* Cookie Text */}
            <div className="space-y-1 font-sans text-xs text-[var(--foreground-muted)]">
              <span className="font-mono text-xs font-bold text-[var(--foreground)] tracking-wider uppercase block">
                Cookie & Privacy Consent
              </span>

              <p className="leading-relaxed">
                We value your privacy. Rehab Nigeria uses cookies and similar
                technologies to improve website functionality, understand
                website usage and provide a better experience.
              </p>
            </div>
          </div>

          {/* Cookie Actions */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto font-mono text-xs shrink-0">

            {/* Settings */}
            <button
              onClick={() => setShowSettings(true)}
              className="flex-1 md:flex-initial px-3.5 py-2.5 bg-[var(--background-tertiary)] hover:bg-[var(--border)] text-[var(--foreground)] border border-[var(--border)] rounded-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <Settings className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>SETTINGS</span>
            </button>

            {/* Decline Optional */}
            <button
              onClick={handleDeclineOptional}
              className="flex-1 md:flex-initial px-3.5 py-2.5 bg-transparent hover:bg-[var(--background-tertiary)] text-[var(--foreground-muted)] border border-[var(--border)] rounded-sm transition-colors"
            >
              DECLINE OPTIONAL
            </button>

            {/* Accept All */}
            <button
              onClick={handleAcceptAll}
              className="flex-1 md:flex-initial px-4 py-2.5 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-bold rounded-sm transition-colors"
            >
              ACCEPT ALL
            </button>
          </div>
        </div>
      </div>

      {/* =========================
          COOKIE SETTINGS MODAL
      ========================== */}
      {showSettings && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="max-w-lg w-full bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm p-6 shadow-2xl space-y-6">

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">

              <div className="flex items-center gap-3">

                {/* Rehab Nigeria Logo */}
                <div className="w-9 h-9 bg-[var(--background-tertiary)] rounded-sm flex items-center justify-center overflow-hidden">
                  <Image
                    src="/rehab-nigeria-logo.png"
                    alt="Rehab Nigeria"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>

                <h3 className="font-cinzel text-lg font-bold text-[var(--foreground)]">
                  Cookie Preferences
                </h3>
              </div>

              {/* Close */}
              <button
                onClick={() => setShowSettings(false)}
                aria-label="Close cookie preferences"
                className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs text-[var(--foreground-muted)] font-sans leading-relaxed">
              Manage your cookie settings below. Essential cookies are
              required for basic site navigation and privacy protection.
            </p>

            {/* Cookie Options */}
            <div className="space-y-4 font-sans text-xs">

              {/* =========================
                  ESSENTIAL COOKIES
              ========================== */}
              <div className="p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm flex items-center justify-between gap-4">

                <div>
                  <span className="font-mono text-xs font-bold text-[var(--foreground)] block">
                    Essential Cookies
                  </span>

                  <span className="text-[var(--foreground-muted)] text-[11px]">
                    Necessary for core platform security and page routing.
                  </span>
                </div>

                <span className="px-2 py-1 bg-[var(--green-dark)]/30 text-[var(--green-light)] font-mono text-[10px] rounded-sm font-bold whitespace-nowrap">
                  ALWAYS ACTIVE
                </span>
              </div>

              {/* =========================
                  ANALYTICS COOKIES
              ========================== */}
              <div className="p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm flex items-center justify-between gap-4">

                <div>
                  <span className="font-mono text-xs font-bold text-[var(--foreground)] block">
                    Analytics Cookies
                  </span>

                  <span className="text-[var(--foreground-muted)] text-[11px]">
                    Helps us analyze visitor interactions to improve
                    accessibility.
                  </span>
                </div>

                {/* Analytics Toggle */}
                <button
                  type="button"
                  onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                  aria-label="Toggle analytics cookies"
                  aria-pressed={analyticsEnabled}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                    analyticsEnabled
                      ? "bg-[var(--gold)] justify-end"
                      : "bg-[var(--border)] justify-start"
                  }`}
                >
                  <div className="w-4 h-4 bg-[#080907] rounded-full shadow-sm" />
                </button>
              </div>

              {/* =========================
                  MARKETING COOKIES
              ========================== */}
              <div className="p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm flex items-center justify-between gap-4">

                <div>
                  <span className="font-mono text-xs font-bold text-[var(--foreground)] block">
                    Marketing Cookies
                  </span>

                  <span className="text-[var(--foreground-muted)] text-[11px]">
                    Used for tracking community campaign engagement across
                    social platforms.
                  </span>
                </div>

                {/* Marketing Toggle */}
                <button
                  type="button"
                  onClick={() => setMarketingEnabled(!marketingEnabled)}
                  aria-label="Toggle marketing cookies"
                  aria-pressed={marketingEnabled}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                    marketingEnabled
                      ? "bg-[var(--gold)] justify-end"
                      : "bg-[var(--border)] justify-start"
                  }`}
                >
                  <div className="w-4 h-4 bg-[#080907] rounded-full shadow-sm" />
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border)] font-mono text-xs">

              {/* Cancel */}
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
              >
                CANCEL
              </button>

              {/* Save Preferences */}
              <button
                onClick={handleSavePreferences}
                className="px-5 py-2 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-bold rounded-sm transition-colors"
              >
                SAVE PREFERENCES
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};