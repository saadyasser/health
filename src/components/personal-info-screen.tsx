"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import type { UserData } from "@/app/page"
import { AlertCircle } from "lucide-react"

interface PersonalInfoScreenProps {
  userData: UserData
  updateUserData: (data: Partial<UserData>) => void
  onNext: () => void
  onPrev: () => void
}

export default function PersonalInfoScreen({ userData, updateUserData, onNext, onPrev }: PersonalInfoScreenProps) {
  const [fullName, setFullName] = useState(userData.personalInfo?.fullName || "")
  const [email, setEmail] = useState(userData.personalInfo?.email || "")
  const [phone, setPhone] = useState(userData.personalInfo?.phone || "")
  const [consent, setConsent] = useState(userData.personalInfo?.consent || false)

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    consent: "",
  })

  const validateEmail = (email: string) => {
    if (!email) return true // Empty is valid since it's optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    if (!phone) return true // Empty is valid since it's optional
    const phoneRegex = /^\+?[0-9]{10,15}$/
    return phoneRegex.test(phone)
  }

  const handleNext = () => {
    // Reset errors
    setErrors({
      fullName: "",
      email: "",
      phone: "",
      consent: "",
    })

    // Validate if any field is filled
    const hasInfo = fullName || email || phone

    // If information is provided, validate it
    if (hasInfo) {
      let isValid = true
      const newErrors = {
        fullName: "",
        email: "",
        phone: "",
        consent: "",
      }

      // Validate email if provided
      if (email && !validateEmail(email)) {
        newErrors.email = "Please enter a valid email address"
        isValid = false
      }

      // Validate phone if provided
      if (phone && !validatePhone(phone)) {
        newErrors.phone = "Please enter a valid phone number"
        isValid = false
      }

      // Check consent if any information is provided
      if (hasInfo && !consent) {
        newErrors.consent = "You must consent to share your information"
        isValid = false
      }

      if (!isValid) {
        setErrors(newErrors)
        return
      }
    }

    // Save data and proceed
    updateUserData({
      personalInfo: {
        fullName,
        email,
        phone,
        consent,
      },
    })
    onNext()
  }

  const handleSkip = () => {
    // Clear any previously entered personal info
    updateUserData({
      personalInfo: null,
    })
    onNext()
  }

  return (
    <div className="flex flex-col space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">Personal Information</h2>
        <p className="text-xl text-gray-600">
          Would you like to share your contact information? This is optional and will help us provide you with your
          health check results.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-xl">
            Full Name
          </Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="text-xl py-6"
          />
          {errors.fullName && (
            <p className="text-red-500 flex items-center gap-1">
              <AlertCircle size={16} /> {errors.fullName}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-xl">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="text-xl py-6"
          />
          {errors.email && (
            <p className="text-red-500 flex items-center gap-1">
              <AlertCircle size={16} /> {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-xl">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="text-xl py-6"
          />
          {errors.phone && (
            <p className="text-red-500 flex items-center gap-1">
              <AlertCircle size={16} /> {errors.phone}
            </p>
          )}
        </div>

        <div className="flex items-start space-x-3 pt-4">
          <Checkbox
            id="consent"
            checked={consent}
            onCheckedChange={(checked) => setConsent(checked === true)}
            className="w-6 h-6 mt-1"
          />
          <Label htmlFor="consent" className="text-lg font-normal">
            I consent to share my personal information and receive my health check results
          </Label>
        </div>
        {errors.consent && (
          <p className="text-red-500 flex items-center gap-1">
            <AlertCircle size={16} /> {errors.consent}
          </p>
        )}
      </div>

      <div className="flex justify-between pt-6">
        <Button onClick={onPrev} className="text-xl py-6 px-10 bg-gray-200 text-gray-800 hover:bg-gray-300">
          Back
        </Button>
        <div className="space-x-4">
          <Button onClick={handleSkip} variant="outline" className="text-xl py-6 px-10">
            Skip
          </Button>
          <Button onClick={handleNext} className="text-xl py-6 px-10 bg-blue-600 hover:bg-blue-700">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

