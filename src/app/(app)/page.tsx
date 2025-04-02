"use client"

import { useState } from "react"
import WelcomeScreen from "@/components/welcome-screen"
import PersonalInfoScreen from "@/components/personal-info-screen"
import UserInfoScreen from "@/components/user-info-screen"
import FaceScanScreen from "@/components/face-scan-screen"
import ComplaintScreen from "@/components/complaint-screen"
import ChatbotScreen from "@/components/chatbot-screen"
import KioskLayout from "@/components/kiosk-layout"

export type UserData = {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    consent: boolean
  } | null
  age: string
  gender: string
  vitals: {
    heartRate: number
    bloodPressure: string
    temperature: number
    oxygenSaturation: number
  } | null
  complaint: string
}

export default function Home() {
  const [step, setStep] = useState(0)
  const [userData, setUserData] = useState<UserData>({
    personalInfo: null,
    age: "",
    gender: "",
    vitals: null,
    complaint: "",
  })

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const updateUserData = (data: Partial<UserData>) => {
    setUserData({ ...userData, ...data })
  }

  // Mock function to simulate vital sign capture
  const captureVitals = () => {
    return new Promise<UserData["vitals"]>((resolve) => {
      // The vitals are now captured directly in the FaceScanScreen component
      // and passed to the userData state when continuing
      resolve({
        heartRate: Math.floor(Math.random() * (100 - 60) + 60),
        bloodPressure: `${Math.floor(Math.random() * (140 - 110) + 110)}/${Math.floor(Math.random() * (90 - 70) + 70)}`,
        temperature: Number.parseFloat((Math.random() * (37.5 - 36.5) + 36.5).toFixed(1)),
        oxygenSaturation: Math.floor(Math.random() * (100 - 95) + 95),
      })
    })
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return <WelcomeScreen onNext={nextStep} />
      case 1:
        return (
          <PersonalInfoScreen userData={userData} updateUserData={updateUserData} onNext={nextStep} onPrev={prevStep} />
        )
      case 2:
        return (
          <UserInfoScreen userData={userData} updateUserData={updateUserData} onNext={nextStep} onPrev={prevStep} />
        )
      case 3:
        return (
          <FaceScanScreen
            onScanComplete={async () => {
              const vitals = await captureVitals()
              updateUserData({ vitals })
              nextStep()
            }}
            onPrev={prevStep}
          />
        )
      case 4:
        return (
          <ComplaintScreen userData={userData} updateUserData={updateUserData} onNext={nextStep} onPrev={prevStep} />
        )
      case 5:
        return <ChatbotScreen userData={userData} onReset={() => setStep(0)} />
      default:
        return <WelcomeScreen onNext={nextStep} />
    }
  }

  return (
    <KioskLayout currentStep={step} totalSteps={6}>
      {renderStep()}
    </KioskLayout>
  )
}

