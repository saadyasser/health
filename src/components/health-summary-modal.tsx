"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Printer } from "lucide-react";
import QRCode from "react-qr-code";
import { User } from "@/payload-types";

interface HealthSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: User;
}

export default function HealthSummaryModal({
  isOpen,
  onClose,
  userData,
}: HealthSummaryModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto print:shadow-none print:border-none bg-white">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-blue-700">
            Health Assessment Summary
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-600">Date: {userData.date}</p>
            <p className="text-gray-600">Time: {userData.time}</p>
            {userData.username && (
              <p className="text-gray-600 mt-2">Name: {userData.username}</p>
            )}
            <p className="text-gray-600">Age: {userData.age}</p>
            <p className="text-gray-600">Gender: {userData.gender}</p>
          </div>

          <div className="text-center">
            <div className="flex flex-col items-center bg-blue-100 p-2 rounded-lg">
              <QRCode
                size={120}
                value={"5nc3nb4j-3000.euw.devtunnels.ms/health-summary"}
              />
              <p className="text-xs text-gray-600 mt-1">
                Scan to view on mobile
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Vital Signs
            </h3>
            <p className="mb-2">Heart Rate: {userData.heartRate} bpm</p>
            <p className="mb-2">Blood Pressure: {userData.bloodPressure}</p>
            <p className="mb-2">Temperature: {userData.temperature}°C</p>
            <p className="mb-2">
              Oxygen Saturation: {userData?.oxygonSaturation}%
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Reported Symptoms
            </h3>
            <ul className="list-disc pl-5">
              <li className="mb-1">{userData.reportedsymptoms}</li>
              {/* {additionalSymptoms.map((symptom, index) => (
                <li key={index} className="mb-1">
                  {symptom}
                </li>
              ))} */}

              <li className="mb-1">General discomfort</li>
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-blue-600 mb-3">
            Suggested Care
          </h3>
          {/* <div
            className={`p-4 rounded-lg "bg-green-50 border border-green-200`}
          >
            <p className="font-semibold text-lg">{recommendation.level}</p>
            <p>{recommendation.message}</p>
          </div>
          */}
        </div>

        {/* <div className="mt-6">
          <h3 className="text-xl font-semibold text-blue-600 mb-3">
            Possible Causes
          </h3>
          <div className="space-y-2">
            {possibleCauses.map((cause, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{cause.condition}</span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    cause.likelihood === "common"
                      ? "bg-red-100 text-red-800"
                      : cause.likelihood === "rare"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {cause.likelihood}
                </span>
              </div>
            ))}
          </div>
        </div> */}

        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            Important Notice
          </h3>
          <p className="text-gray-700">
            This is an automated health assessment summary. It is not a medical
            diagnosis. Please consult with a healthcare provider for proper
            medical evaluation and treatment.
          </p>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={() => window.print()}
            // disabled={isPrinting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Printer className="mr-2 h-4 w-4" /> Print Summary
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
