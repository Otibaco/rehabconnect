"use client"
import React, { useState, useEffect } from 'react';
import { Shield, Settings, Check, X } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('rehab_nigeria_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('rehab_nigeria_cookie_consent', JSON.stringify({
      essential: true,
      analytics: true,
      marketing: true,
      date: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleDeclineOptional = () => {
    localStorage.setItem('rehab_nigeria_cookie_consent', JSON.stringify({
      essential: true,
      analytics: false,
      marketing: false,
      date: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('rehab_nigeria_cookie_consent', JSON.stringify({
      essential: true,
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
      date: new Date().toISOString()
    }));
    setShowSettings(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* BANNER */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-[var(--background-secondary)] border-t border-[var(--border)] shadow-2xl backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          <div className="flex items-start gap-3 max-w-3xl">
            <div className="p-2 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--gold)] shrink-0 mt-0.5">
              <Shield className="w-5 h-5" />
            </div>
            <div className="space-y-1 font-sans text-xs text-[var(--foreground-muted)]">
              <span className="font-mono text-xs font-bold text-[var(--foreground)] tracking-wider uppercase block">
                Cookie & Privacy Consent
              </span>
              <p className="leading-relaxed">
                We value your privacy. Rehab Nigeria uses cookies and similar technologies to improve website functionality, understand website usage and provide a better experience.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto font-mono text-xs shrink-0">
            <button
              onClick={() => setShowSettings(true)}
              className="flex-1 md:flex-initial px-3.5 py-2.5 bg-[var(--background-tertiary)] hover:bg-[var(--border)] text-[var(--foreground)] border border-[var(--border)] rounded-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <Settings className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>SETTINGS</span>
            </button>

            <button
              onClick={handleDeclineOptional}
              className="flex-1 md:flex-initial px-3.5 py-2.5 bg-transparent hover:bg-[var(--background-tertiary)] text-[var(--foreground-muted)] border border-[var(--border)] rounded-sm transition-colors"
            >
              DECLINE OPTIONAL
            </button>

            <button
              onClick={handleAcceptAll}
              className="flex-1 md:flex-initial px-4 py-2.5 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-bold rounded-sm transition-colors"
            >
              ACCEPT ALL
            </button>
          </div>

        </div>
      </div>

      {/* GRANULAR SETTINGS MODAL */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm p-6 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[var(--gold)]" />
                <h3 className="font-cinzel text-lg font-bold text-[var(--foreground)]">
                  Cookie Preferences
                </h3>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[var(--foreground-muted)] font-sans leading-relaxed">
              Manage your cookie settings below. Essential cookies are required for basic site navigation and privacy protection.
            </p>

            <div className="space-y-4 font-sans text-xs">
              
              {/* ESSENTIAL */}
              <div className="p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-[var(--foreground)] block">Essential Cookies</span>
                  <span className="text-[var(--foreground-muted)] text-[11px]">Necessary for core platform security and page routing.</span>
                </div>
                <span className="px-2 py-1 bg-[var(--green-dark)]/30 text-[var(--green-light)] font-mono text-[10px] rounded-sm font-bold">
                  ALWAYS ACTIVE
                </span>
              </div>

              {/* ANALYTICS */}
              <div className="p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-[var(--foreground)] block">Analytics Cookies</span>
                  <span className="text-[var(--foreground-muted)] text-[11px]">Helps us analyze visitor interactions to improve accessibility.</span>
                </div>
                <button
                  onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    analyticsEnabled ? 'bg-[var(--gold)] justify-end' : 'bg-[var(--border)] justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-[#080907] rounded-full"></div>
                </button>
              </div>

              {/* MARKETING */}
              <div className="p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-[var(--foreground)] block">Marketing Cookies</span>
                  <span className="text-[var(--foreground-muted)] text-[11px]">Used for tracking community campaign engagement across social platforms.</span>
                </div>
                <button
                  onClick={() => setMarketingEnabled(!marketingEnabled)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    marketingEnabled ? 'bg-[var(--gold)] justify-end' : 'bg-[var(--border)] justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-[#080907] rounded-full"></div>
                </button>
              </div>

            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border)] font-mono text-xs">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
              >
                CANCEL
              </button>
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
