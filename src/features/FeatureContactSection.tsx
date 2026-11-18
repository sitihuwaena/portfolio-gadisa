"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/useToast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { postReachMe } from "@/store/slice/emailSlice";
import { EmailTypes } from "@/types/EmailTypes";
import { useState } from "react";

export default function FeatureContactSection() {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.email);
  const { toast } = useToast();

  const [formData, setFormData] = useState<EmailTypes>({
    name: "",
    email: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    dispatch(postReachMe(formData)).then((res) => {
      if (res.type == "postReachMe/api/fulfilled") {
        toast({
          title: "Success!",
          description: res.payload.message || "Your message has been sent successfully.",
          variant: "default",
        })
      } else {
        toast({
          title: "Failed!",
          description: res.payload.message || "There was an error sending your message. Please try again later.",
          variant: "destructive",
        })
      }

      setFormData({
        name: "",
        email: "",
        message: ""
      });

      setIsSubmitting(false);
    })

  };

  return (
    <section className="w-full py-4 md:py-16 bg-gray-50 rounded-2xl">
      <div className="container mx-auto px-4 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">

          {/* Left Side - Contact Info */}
          <div>
            <h2 className="font-dm-sans-bold text-3xl md:text-5xl text-secondary mb-2 md:mb-6 leading-tight">
              Got a Project?<br />
              Lets Talk.
            </h2>
            <p className="text-texting md:text-lg mb-4 md:mb-8 leading-relaxed">
              Interested in working together or have a question?
              Feel free to reach out.
            </p>

            {/* Contact Methods */}
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-solid" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <a href="mailto:gadisaa29@gmail.com" className="text-texting hover:text-accent transition-colors">gadisaa29@gmail.com</a>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-solid" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-texting">Indonesia</span>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8">
            <div className="text-center mb-8">
              <h3 className="font-dm-sans-bold text-2xl text-secondary mb-2">
                Let me know here!
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Name Field */}
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="What's your name?"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Project Field */}
              <div>
                <Textarea
                  name="message"
                  placeholder="Tell me your message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full bg-solid rounded text-white font-dm-sans-semi-bold py-4 px-6 hover:bg-solid/90 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Send Me</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}