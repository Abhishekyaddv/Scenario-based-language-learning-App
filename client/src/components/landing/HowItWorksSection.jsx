import React from "react";
import { motion } from "framer-motion";
import { Sparkles, BrainCircuit, Mic, Presentation } from "lucide-react";

const steps = [
  {
    icon: <Sparkles className="w-8 h-8 text-[#eb5e28]" />,
    title: "1. Choose a Real-world Scenario",
    description: "Start by selecting a context you actually need. Whether it's ordering a flat white in a busy Paris café, negotiating a lease in Tokyo, or chatting at a networking event in Madrid. No more memorizing random dictionary words.",
    highlight: "Context-First Selection"
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-[#eb5e28]" />,
    title: "2. AI Persona & Context Analysis",
    description: "Behind the scenes, our AI engine instantly analyzes the cultural and linguistic demands of your chosen setting. It adopts a hyper-realistic persona, adjusting its vocabulary, formality, and even emotional reactions to match the localized culture perfectly.",
    highlight: "Dynamic Roleplay Engine"
  },
  {
    icon: <Mic className="w-8 h-8 text-[#eb5e28]" />,
    title: "3. Live Audio/Text Interaction",
    description: "Step into the conversation. Speak naturally using your microphone or type your responses. The AI reacts fluidly in real-time, subtly guiding you while prioritizing natural conversational momentum over robotic, strict grammar halting.",
    highlight: "Zero-latency Immersion"
  },
  {
    icon: <Presentation className="w-8 h-8 text-[#eb5e28]" />,
    title: "4. Post-Scenario Deep Evaluation",
    description: "Once the scenario ends, the learning truly begins. The system breaks down exactly what you said, providing actionable feedback mapped to your exact mistakes. It generates custom vocabulary lists based precisely on what you struggled to express.",
    highlight: "Targeted Analytics"
  }
];

export default function HowItWorksSection() {
  return (
    <section id="howitworks" className="py-24 md:py-32 px-6 relative" style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-start">
        
        {/* Sticky Left Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6" style={{ fontSize: 13, color: "var(--primary)", fontWeight: 700 }}>
            Under the hood
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, marginBottom: 20, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            How <span className="gradient-text">Contexto</span> Works
          </h2>
          <p style={{ fontSize: 18, color: "var(--muted)", fontWeight: 400, lineHeight: 1.6, maxWidth: 450 }}>
            We've inverted the traditional language learning model. Instead of drilling flashcards so you can eventually have a conversation, we throw you into the conversation and build the flashcards for you based on your live performance.
          </p>
        </div>

        {/* Scrollable Right Column */}
        <div className="lg:col-span-7 flex flex-col gap-8 md:gap-12 relative">
          {/* Subtle connecting line behind steps for large screens */}
          <div className="hidden md:block absolute left-[31px] top-[40px] bottom-[40px] w-px bg-gray-200" />

          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative flex gap-6 md:gap-8 group"
            >
              <div 
                className="relative z-10 w-16 h-16 rounded-2xl shrink-0 flex items-center justify-center bg-white shadow-sm transition-transform duration-500 group-hover:scale-110"
                style={{ border: "1px solid var(--border)" }}
              >
                {step.icon}
              </div>
              
              <div className="pt-2">
                <div className="inline-block rounded-full px-3 py-1 mb-3" style={{ fontSize: 12, color: "var(--primary)", fontWeight: 700, background: "rgba(235,94,40,0.08)" }}>
                  {step.highlight}
                </div>
                <h3 className="font-display" style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: "var(--text)" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.7, fontWeight: 400 }}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
