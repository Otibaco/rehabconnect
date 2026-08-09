import React from 'react';

interface OnboardingStepProps {
  children: React.ReactNode;
}

export const OnboardingStep: React.FC<OnboardingStepProps> = ({ children }) => {
  return <div className="space-y-6 font-sans text-xs">{children}</div>;
};
