"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, User, Bot } from "lucide-react";
import type { UserData } from "@/app/(app)/page";
import HealthSummaryModal from "./health-summary-modal";
import { User as Puser } from "@/payload-types";

interface ChatbotScreenProps {
  userData: UserData;
  onReset: () => void;
}

interface Users {
  docs: Puser[];
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

export default function ChatbotScreen({
  userData,
  onReset,
}: ChatbotScreenProps) {
  const [isStoreMessages, setIsStoreMessages] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hello${userData.personalInfo?.fullName ? ` ${userData.personalInfo.fullName}` : ""}! I see you're experiencing ${userData.complaint}. Can you tell me more about your symptoms?`,
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
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

  console.log("API Data:", apiData);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        `Based on your ${userData.complaint} and the information you've shared, this could be related to several conditions.`,
        "How long have you been experiencing these symptoms?",
        "Have you tried any medications for this issue?",
        "I recommend you speak with a healthcare provider for a proper diagnosis.",
        `Your vital signs look ${
          userData.vitals?.heartRate && userData.vitals.heartRate > 90
            ? "slightly elevated"
            : "normal"
        }. This is important information for your doctor.`,
      ];

      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleShowSummary = async () => {
    const userId = localStorage.getItem("userId");
    try {
      setIsStoreMessages(true);
      const req = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messages.map((message) => ({ message: message.text })),
        }),
      });
      console.log(req);
    } catch (err) {
      console.log(err);
    } finally {
      setIsStoreMessages(false);
    }
    setShowSummary(true);
  };

  return (
    <div className="flex flex-col h-[600px]">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-blue-700">Health Assistant</h2>
        <p className="text-xl text-gray-600">
          Chat with our health assistant about your concerns.
        </p>
      </div>

      <Card className="flex-1 overflow-hidden flex flex-col p-0 mb-6 border-2">
        <div className="bg-blue-600 text-white p-4">
          <h3 className="text-xl font-semibold">Health Chat</h3>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.sender === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <div
                  className={`p-2 rounded-full ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User size={24} />
                  ) : (
                    <Bot size={24} />
                  )}
                </div>
                <div
                  className={`p-4 rounded-2xl text-lg ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 p-4 rounded-2xl rounded-tl-none">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              className="text-lg py-6"
            />
            <Button
              onClick={handleSend}
              disabled={input.trim() === ""}
              className="px-6 bg-blue-600 hover:bg-blue-700"
            >
              <Send size={24} />
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button
          onClick={onReset}
          className="text-xl py-6 px-10 bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          Start Over
        </Button>
        <Button
          onClick={handleShowSummary}
          className="text-xl py-6 px-10 bg-green-600 hover:bg-green-700"
        >
          {isStoreMessages ? "Processing" : "Complete & Print Summary"}
        </Button>
      </div>

      {!isError && !isLoading && apiData && (
        <HealthSummaryModal
          isOpen={showSummary}
          onClose={() => setShowSummary(false)}
          userData={apiData.docs[0]}
        />
      )}
    </div>
  );
}
