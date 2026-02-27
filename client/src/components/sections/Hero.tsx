import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Wash */}
      <div className="absolute inset-0 z-0">
        {/* landing page hero cozy nursery room */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-foreground/60 backdrop-blur-[2px]" />
        
        {/* Subtle gradient overlay to purple */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-background" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center text-white flex flex-col items-center mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="inline-block py-1 px-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold tracking-wide text-sm md:text-base mb-6">
            Maison d’Assistantes Maternelles
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance drop-shadow-lg">
            La chouette violette
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Un cocon de douceur et d'éveil pour accompagner vos tout-petits dans leurs premières découvertes.
          </p>
          
          <motion.a
            href="#gallery"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary text-secondary-foreground shadow-xl hover:shadow-secondary/50 transition-all"
            aria-label="Découvrir"
          >
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </motion.a>
        </motion.div>
      </div>
      
      {/* Wave divider at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px]">
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,115.8,188.75,102.7,236.4,91.82,280.8,75.14,321.39,56.44Z" 
            className="fill-background"
          ></path>
        </svg>
      </div>
    </section>
  );
}
