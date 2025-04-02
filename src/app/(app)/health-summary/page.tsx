"use client";

import { useEffect, useState } from "react";

import HealthSummaryModal from "@/components/health-summary-modal";
import { User } from "@/payload-types";

export type UserData = {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    consent: boolean;
  } | null;
  age: string;
  gender: string;
  vitals: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
    oxygenSaturation: number;
  } | null;
  complaint: string;
};

interface Users {
  docs: User[];
}

export default function Home() {
  const [apiData, setApiData] = useState<null | Users>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: Users = await response.json();
        setApiData(data);
        setIsError(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {!isError && !isLoading && apiData && (
        <HealthSummaryModal
          isOpen={true}
          onClose={() => {}}
          userData={apiData.docs[0]} // Assuming you want to show the first user's da
        />
      )}
    </div>
  );
}
