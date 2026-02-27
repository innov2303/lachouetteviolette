import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroBg from "@assets/hero-chouette-violette.png";
import { useSectionContent } from "@/hooks/use-content";
import type { HeroContent } from "@shared/schema";

export default function Hero() {
  const { data } = useSectionContent<HeroContent>("hero");

  const subtitle = data?.subtitle || "Maison d'Assistantes Maternelles";
  const title = data?.title || "La chouette violette";
  const buttonText = data?.buttonText || "Decouvrir la MAM";

  return (
    <section data-testid="section-hero" className="relative h-[calc(100vh-53px)] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-[center_40%] bg-no-repeat"
          style={{ backgroundImage: `url('${heroBg}')` }}
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-sm md:text-base tracking-[0.3em] uppercase font-light text-white/90 mb-4"
        >
          {subtitle}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-balance text-[#c9a0dc]"
        >
          {title}
        </motion.h1>
      </div>

      <motion.a
        href="#gallery"
        data-testid="button-discover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer"
      >
        <span className="text-sm tracking-[0.2em] uppercase font-light">
          {buttonText}
        </span>
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </motion.a>
    </section>
  );
}
