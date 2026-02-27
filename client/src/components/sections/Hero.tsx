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

      <div className="container relative z-10 mx-auto px-6 text-center text-white flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <p className="text-sm md:text-base tracking-[0.3em] uppercase font-light mb-6 text-white/90">
            Maison d'Assistantes Maternelles
          </p>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] text-balance text-[#c9a0dc]">
            La chouette violette
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
