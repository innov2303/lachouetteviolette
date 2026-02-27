import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section data-testid="section-hero" className="relative h-screen min-h-[650px] flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
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

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-10 leading-[1.1] text-balance">
            La chouette violette
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Button
              asChild
              data-testid="button-hero-cta"
              className="bg-primary text-primary-foreground px-10 py-3 text-sm tracking-[0.2em] uppercase font-medium rounded-none"
            >
              <a href="#contact">Nos places disponibles</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
