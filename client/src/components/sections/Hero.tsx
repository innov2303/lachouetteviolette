import { motion } from "framer-motion";
import heroBg from "@assets/hero-chouette-violette.png";

export default function Hero() {
  return (
    <section data-testid="section-hero" className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-[center_30%] bg-no-repeat"
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
          Maison d'Assistantes Maternelles
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-balance text-[#c9a0dc]"
        >
          La chouette violette
        </motion.h1>
      </div>
    </section>
  );
}
