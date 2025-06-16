"use client";

import React from 'react';
import { Progress } from "@/components/ui/progress"; // Assuming you have a Shadcn UI Progress component

interface EducationProgressBarProps {
  progress: number; // A number between 0 and 100
  label?: string; // Optional label for the progress bar
}

const EducationProgressBar: React.FC<EducationProgressBarProps> = ({ progress, label }) => {
  return (
    <div className="w-full">
      {label && <p className="text-sm text-muted-foreground mb-1">{label}</p>}
      <Progress value={progress} className="w-full h-2 bg-muted rounded-full" />
      <p className="text-xs text-right text-muted-foreground mt-1">{progress}% Complete</p>
    </div>
  );
};

export default EducationProgressBar; 