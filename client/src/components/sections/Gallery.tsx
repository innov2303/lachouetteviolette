import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const images = [
  {
    // bright and cozy nursery playroom with toys
    src: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1200&auto=format&fit=crop",
    alt: "Espace de jeux lumineux"
  },
  {
    // soft baby cribs and sleeping area
    src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop",
    alt: "Coin sieste douillet"
  },
  {
    // educational wooden toys for toddlers
    src: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop",
    alt: "Jeux d'éveil en bois"
  },
  {
    // colorful drawing and art area for kids
    src: "https://images.unsplash.com/photo-1566004100631-35d015d6a491?q=80&w=1200&auto=format&fit=crop",
    alt: "Espace créativité et dessin"
  }
];

export default function Gallery() {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <section id="gallery" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Notre Structure
          </h2>
          <p className="text-lg text-muted-foreground">
            Un espace pensé et aménagé spécialement pour la sécurité, le confort et l'épanouissement des enfants. Chaque recoin est adapté à leur taille et à leurs besoins.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {images.map((img, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-2/3">
                  <div className="p-2">
                    <div className="overflow-hidden rounded-[2rem] shadow-xl border-[6px] border-white aspect-[4/3] group relative">
                      <img 
                        src={img.src} 
                        alt={img.alt} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <span className="text-white font-display text-xl font-medium drop-shadow-md">
                          {img.alt}
                        </span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex justify-center gap-4 mt-8">
              <CarouselPrevious className="static transform-none bg-white text-primary border-primary/20 hover:bg-primary hover:text-white" />
              <CarouselNext className="static transform-none bg-white text-primary border-primary/20 hover:bg-primary hover:text-white" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
