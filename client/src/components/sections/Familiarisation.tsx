import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useSectionContent } from "@/hooks/use-content";
import type { ProjectContent } from "@shared/schema";

export default function Familiarisation() {
  const { data } = useSectionContent<ProjectContent>("project");
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

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
    <section id="familiarisation" data-testid="section-familiarisation" aria-label="Période de familiarisation - Maison d'Assistantes Maternelles" className="min-h-[calc(100vh-53px)] flex items-center py-20 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-[#c9a0dc] font-semibold mb-4">
              Familiarisation
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              {approachTitle}
            </h2>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-12 h-0.5 bg-[#c9a0dc]/30" />
              <Heart className="w-5 h-5 text-[#c9a0dc]" />
              <span className="w-12 h-0.5 bg-[#c9a0dc]/30" />
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto text-lg">
              {approachText}
            </p>
          </motion.div>
        </div>

        {steps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto px-4"
            data-testid="familiarisation-stepper"
          >
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
                        : "bg-background text-muted-foreground hover:bg-background/80"
                  }`}
                >
                  {step.day}
                </button>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-xl bg-card border border-card-border shadow-sm min-h-[160px]">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-[#c9a0dc]/10" />
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="p-8 md:p-10"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#c9a0dc] text-white text-lg font-bold shadow-md">
                      {currentStep + 1}
                    </span>
                    <span className="text-xs text-[#c9a0dc] font-semibold uppercase tracking-wider">
                      {steps[currentStep]?.day}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-16">
                    {steps[currentStep]?.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between mt-6">
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
              <div className="flex gap-1.5">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goToStep(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === currentStep ? "bg-[#c9a0dc] scale-125" : "bg-[#c9a0dc]/25"
                    }`}
                  />
                ))}
              </div>
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
          </motion.div>
        )}
      </div>
    </section>
  );
}
