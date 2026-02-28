import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import owlSeparator from "@assets/owl_orange.png";
import {
  Sprout, BookOpen, Music, Users, Heart, Star, Palette, Baby,
  HandHeart, Brain, Eye, Footprints, Smile, Sun, TreePine,
  Puzzle, Gamepad2, Apple, Flower2, Bird, Shield, Clock, Lightbulb,
  MessageCircle, Globe, Leaf, Sparkles, GraduationCap, Home,
  Quote, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useSectionContent } from "@/hooks/use-content";
import type { ProjectContent } from "@shared/schema";

const iconMap: Record<string, typeof Sprout> = {
  Sprout, BookOpen, Music, Users, Heart, Star, Palette, Baby,
  HandHeart, Brain, Eye, Footprints, Smile, Sun, TreePine,
  Puzzle, Gamepad2, Apple, Flower2, Bird, Shield, Clock, Lightbulb,
  MessageCircle, Globe, Leaf, Sparkles, GraduationCap, Home,
};

export default function Project() {
  const { data } = useSectionContent<ProjectContent>("project");
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const sectionLabel = data?.sectionLabel || "Notre pedagogie";
  const title = data?.title || "Un projet pedagogique bienveillant";
  const description = data?.description || "";
  const pillars = data?.pillars || [];
  const approachTitle = data?.approachTitle || "La periode de familiarisation";
  const approachText = data?.approachText || "";
  const steps = data?.familiarisationSteps || [];

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((s) => s + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  };

  const goToStep = (index: number) => {
    setDirection(index > currentStep ? 1 : -1);
    setCurrentStep(index);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section id="project" data-testid="section-project" className="min-h-[calc(100vh-53px)] flex items-center py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-[#c9a0dc] font-semibold mb-4">
              {sectionLabel}
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              {title}
            </h2>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-12 h-0.5 bg-[#c9a0dc]/30" />
              <img src={owlSeparator} alt="" className="w-6 h-6 object-contain" />
              <span className="w-12 h-0.5 bg-[#c9a0dc]/30" />
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto text-lg">
              {description}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {pillars.map((pillar, index) => {
            const IconComp = iconMap[pillar.icon] || Sprout;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                data-testid={`pillar-card-${index}`}
                className="group relative bg-card border border-card-border rounded-xl p-6 text-center hover:shadow-lg hover:border-[#c9a0dc]/30 transition-all duration-300"
              >
                <div className="w-12 h-12 mb-4 mx-auto rounded-xl bg-[#c9a0dc]/10 flex items-center justify-center text-[#c9a0dc] group-hover:bg-[#c9a0dc] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  <IconComp size={22} />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 mx-auto px-4"
        >
          <div className="relative bg-gradient-to-br from-[#c9a0dc]/8 to-[#c9a0dc]/3 border border-[#c9a0dc]/15 rounded-xl p-8">
            <Quote className="absolute top-4 right-4 h-8 w-8 text-[#c9a0dc]/15" />
            <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-1 h-6 bg-[#c9a0dc] rounded-full" />
              {approachTitle}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {approachText}
            </p>

            {steps.length > 0 && (
              <div data-testid="familiarisation-stepper">
                <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
                  {steps.map((step, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goToStep(i)}
                      data-testid={`button-step-${i}`}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        i === currentStep
                          ? "bg-[#c9a0dc] text-white shadow-md scale-105"
                          : i < currentStep
                            ? "bg-[#c9a0dc]/20 text-[#c9a0dc] hover:bg-[#c9a0dc]/30"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {step.day}
                    </button>
                  ))}
                </div>

                <div className="relative overflow-hidden rounded-lg bg-white/50 dark:bg-white/5 border border-[#c9a0dc]/10 min-h-[140px]">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentStep}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="p-6 md:p-8"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#c9a0dc] text-white text-sm font-bold">
                          {currentStep + 1}
                        </span>
                        <h4 className="font-display text-lg font-bold text-foreground">
                          {steps[currentStep]?.title}
                        </h4>
                      </div>
                      <p className="text-muted-foreground leading-relaxed pl-[52px]">
                        {steps[currentStep]?.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={currentStep === 0}
                    data-testid="button-step-prev"
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentStep === 0
                        ? "text-muted-foreground/40 cursor-not-allowed"
                        : "text-[#c9a0dc] hover:bg-[#c9a0dc]/10"
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Precedent
                  </button>
                  <span className="text-xs text-muted-foreground">
                    {currentStep + 1} / {steps.length}
                  </span>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={currentStep === steps.length - 1}
                    data-testid="button-step-next"
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentStep === steps.length - 1
                        ? "text-muted-foreground/40 cursor-not-allowed"
                        : "text-[#c9a0dc] hover:bg-[#c9a0dc]/10"
                    }`}
                  >
                    Suivant
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
