"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { UserData } from "@/app/page"

interface UserInfoScreenProps {
  userData: UserData
  updateUserData: (data: Partial<UserData>) => void
  onNext: () => void
  onPrev: () => void
}

export default function UserInfoScreen({ userData, updateUserData, onNext, onPrev }: UserInfoScreenProps) {
  const [age, setAge] = useState(userData.age ? Number.parseInt(userData.age) : 30)
  const [selectedGender, setSelectedGender] = useState(userData.gender || "")

  const genders = ["Male", "Female"]

  const handleNext = () => {
    updateUserData({ age: age.toString(), gender: selectedGender })
    onNext()
  }

  return (
    <div className="flex flex-col space-y-10">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">Tell Us About Yourself</h2>
        <p className="text-xl text-gray-600">
          Please select your age and gender to help us personalize your health check.
        </p>
      </div>

      <div className="space-y-12">
        <div>
          <h3 className="text-2xl font-semibold mb-6">Select your age:</h3>
          <div className="px-4">
            <div className="flex justify-center mb-8">
              <span className="text-6xl font-bold text-blue-700">{age}</span>
              <span className="text-2xl text-blue-700 mt-2 ml-2">years</span>
            </div>

            <input
              type="range"
              min="1"
              max="100"
              value={age}
              onChange={(e) => setAge(Number.parseInt(e.target.value))}
              className="w-full h-8 appearance-none cursor-pointer bg-gray-200 rounded-full"
              style={{
                background: `linear-gradient(to right, #2563eb 0%, #2563eb ${age}%, #e5e7eb ${age}%, #e5e7eb 100%)`,
              }}
            />

            <div className="flex justify-between mt-2 text-gray-600">
              <span>1</span>
              <span>25</span>
              <span>50</span>
              <span>75</span>
              <span>100</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-6">Select your gender:</h3>
          <div className="grid grid-cols-2 gap-6">
            {genders.map((gender) => (
              <Card
                key={gender}
                className={`p-8 cursor-pointer transition-all ${
                  selectedGender === gender ? "bg-blue-100 border-blue-500 border-2" : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedGender(gender)}
              >
                <p className="text-2xl text-center font-medium">{gender}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button onClick={onPrev} className="text-xl py-6 px-10 bg-gray-200 text-gray-800 hover:bg-gray-300">
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!selectedGender}
          className="text-xl py-6 px-10 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

