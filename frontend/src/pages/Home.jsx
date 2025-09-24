import TextType from "../components/TextType";
import Prism from "../components/Prism";
import RotatingText from "../components/RotatingText";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useEffect, useRef, useState } from "react";
import { color } from "motion/react";
import { NavLink } from "react-router-dom";

export default function Home() {
  const [isDarkBg, setState] = useState(false);
  return (
    <>
      
      <div className="relative w-full bg-cover bg-center h-screen min-h-screen overflow-hidden bg-black">
        {/* Prism Background */}
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 0,
          }}
          className="bg-black"
        >
          <Prism
            animationType="rotate"
            timeScale={0.5}
            height={3.5}
            baseWidth={5.5}
            scale={3.6}
            hueShift={0}
            colorFrequency={1}
            noise={0.5}
            glow={1}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-white text-center px-4 h-screen">
          <div className="max-w-6xl mx-auto">
            <h1 className="heading-1 mb-6 animate-fade-in-up">
              <TextType
                text={[
                  "learn < help < grow",
                  "Ask freely. Answer boldly.",
                  "By peer, For peer, With peer!",
                ]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                style={{ padding: "15px" }}
              />
            </h1>
            <p className="text-xl mb-8 text-white/80 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Learn. Help. Grow—Together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <NavLink to="/learn">
                <Button variant="primary" size="lg" className="group">
                  Let's Get Started
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </NavLink>
              <NavLink to="/teach">
                <Button variant="secondary" size="lg">
                  Start Teaching
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-6 text-gradient">
              From curiosity to clarity—powered by people.
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Join a community where knowledge flows freely, questions are welcomed, and growth happens together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Learn</h3>
              <p className="text-white/70">Access courses from passionate educators and expand your knowledge in any field.</p>
            </Card>

            <Card className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Teach</h3>
              <p className="text-white/70">Share your expertise and help others grow while building your teaching portfolio.</p>
            </Card>

            <Card className="text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect</h3>
              <p className="text-white/70">Build meaningful connections with peers who share your passion for learning.</p>
            </Card>
          </div>

          <div className="text-center">
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-4xl font-bold">
                <span className="text-white">Be</span>
                <RotatingText
                  texts={["Heard", "Understood", "Supported"]}
                  mainClassName="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl text-2xl font-bold"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </div>
            </div>
            <NavLink to="/teach">
              <Button variant="accent" size="lg">
                Start Your Journey
              </Button>
            </NavLink>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="max-w-4xl mx-auto">
            <h2 className="heading-2 mb-6">Need Help? We're Here!</h2>
            <p className="text-xl text-white/70 mb-8">
              Have questions about our platform or need assistance? Our community is ready to help you succeed.
            </p>
            <NavLink to="/contact">
              <Button variant="primary" size="lg">
                Get in Touch
              </Button>
            </NavLink>
          </Card>
        </div>
      </div>
    </>
  );
}
