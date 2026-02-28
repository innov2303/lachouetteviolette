import { motion } from "framer-motion";
import owlSeparator from "@assets/owl_orange.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { useSectionContent } from "@/hooks/use-content";
import type { GalleryContent } from "@shared/schema";
import owlBlue from "@assets/owl_blue.png";
import owlOrange from "@assets/owl_orange.png";
import owlPink from "@assets/owl_pink.png";

const defaultImages = [
  { src: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1200&auto=format&fit=crop", alt: "Espace de jeux lumineux" },
  { src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop", alt: "Activites sensorielles" },
  { src: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop", alt: "Jeux d'eveil en bois" },
  { src: "https://images.unsplash.com/photo-1566004100631-35d015d6a491?q=80&w=1200&auto=format&fit=crop", alt: "Espace creativite et dessin" },
];

export default function Gallery() {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  const { data } = useSectionContent<GalleryContent>("gallery");

  const sectionLabel = data?.sectionLabel || "Decouvrez nos espaces";
  const title = data?.title || "Bienvenue a la MAM";
  const titleHighlight = data?.titleHighlight || "La chouette violette";
  const description = data?.description || "";
  const description2 = data?.description2 || "";
  const images = data?.images || defaultImages;

  return (
    <section id="gallery" data-testid="section-gallery" className="min-h-[calc(100vh-53px)] flex items-center py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center px-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-[#c9a0dc] font-semibold mb-6 text-center">
              {sectionLabel}
            </p>

            <div className="flex items-end justify-center gap-2 mb-6">
              <motion.img src={owlBlue} alt="Chouette bleue" className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-md" data-testid="img-owl-blue" initial={{ opacity: 0, y: 10, rotate: -5 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, type: "spring" }} />
              <motion.img src={owlOrange} alt="Chouette orange" className="w-18 h-18 md:w-24 md:h-24 object-contain drop-shadow-md" data-testid="img-owl-orange" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, type: "spring" }} />
              <motion.img src={owlPink} alt="Chouette rose" className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-md" data-testid="img-owl-pink" initial={{ opacity: 0, y: 10, rotate: 5 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true }} transition={{ delay: 0.7, type: "spring" }} />
            </div>

            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight text-center">
              {title}<br />
              <span className="text-[#c9a0dc]">{titleHighlight}</span>
            </h2>

            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-12 h-0.5 bg-[#c9a0dc]/30" />
              <img src={owlSeparator} alt="" className="w-6 h-6 object-contain" />
              <span className="w-12 h-0.5 bg-[#c9a0dc]/30" />
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg mb-4 text-center">
              {description}
            </p>
            <p className="text-muted-foreground leading-relaxed text-center">
              {description2}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-[#c9a0dc]/15 to-transparent rounded-2xl" />
              <Carousel
                plugins={[plugin.current]}
                opts={{ align: "start", loop: true }}
                className="w-full relative"
              >
                <CarouselContent>
                  {images.map((img, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                        <img
                          src={img.src}
                          alt={img.alt}
                          data-testid={`gallery-image-${index}`}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center gap-3 mt-6">
                  <CarouselPrevious className="static transform-none rounded-xl border-[#c9a0dc]/30 text-[#c9a0dc] hover:bg-[#c9a0dc]/10 hover:text-[#c9a0dc] hover:border-[#c9a0dc]/50 transition-all" />
                  <CarouselNext className="static transform-none rounded-xl border-[#c9a0dc]/30 text-[#c9a0dc] hover:bg-[#c9a0dc]/10 hover:text-[#c9a0dc] hover:border-[#c9a0dc]/50 transition-all" />
                </div>
              </Carousel>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
