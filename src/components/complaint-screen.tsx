"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { UserData } from "@/app/(app)/page";

interface ComplaintScreenProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ComplaintScreen({
  userData,
  updateUserData,
  onNext,
  onPrev,
}: ComplaintScreenProps) {
  const [selectedComplaint, setSelectedComplaint] = useState(
    userData.complaint
  );

  const commonComplaints = [
    "Headache",
    "Fever",
    "Cough",
    "Sore Throat",
    "Stomach Pain",
    "Back Pain",
    "Dizziness",
    "Fatigue",
    "Nausea",
    "Shortness of Breath",
    "Chest Pain",
    "Other",
  ];

  const handleNext = () => {
    updateUserData({ complaint: selectedComplaint });
    onNext();
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">
          What brings you in today?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Please select your primary health concern:
        </p>
      </div>

      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {commonComplaints.map((complaint) => (
            <Card
              key={complaint}
              className={`p-6 cursor-pointer transition-all ${
                selectedComplaint === complaint
                  ? "bg-blue-100 border-blue-500 border-2"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setSelectedComplaint(complaint)}
            >
              <p className="text-xl text-center">{complaint}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          onClick={onPrev}
          className="text-xl py-6 px-10 bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!selectedComplaint}
          className="text-xl py-6 px-10 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
