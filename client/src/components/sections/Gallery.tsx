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
    src: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1200&auto=format&fit=crop",
    alt: "Espace de jeux lumineux",
  },
  {
    src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop",
    alt: "Activites sensorielles",
  },
  {
    src: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop",
    alt: "Jeux d'eveil en bois",
  },
  {
    src: "https://images.unsplash.com/photo-1566004100631-35d015d6a491?q=80&w=1200&auto=format&fit=crop",
    alt: "Espace creativite et dessin",
  },
];

export default function Gallery() {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <section id="gallery" data-testid="section-gallery" className="min-h-[calc(100vh-53px)] flex items-center py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-[#c9a0dc] font-semibold mb-4">
              Decouvrez nos espaces
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Bienvenue a la MAM<br />
              <span className="text-[#c9a0dc]">La chouette violette</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Notre Maison d'Assistantes Maternelles offre un cadre chaleureux et securise,
              specialement amenage pour l'eveil et l'epanouissement de vos tout-petits.
              Chaque espace est pense pour stimuler leur curiosite tout en respectant leur rythme.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Situee dans un environnement calme, notre structure dispose de plusieurs
              pieces dediees aux activites, au repos et aux repas, dans une ambiance
              familiale et bienveillante.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Carousel
              plugins={[plugin.current]}
              opts={{ align: "start", loop: true }}
              className="w-full"
            >
              <CarouselContent>
                {images.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-[4/3] overflow-hidden rounded-md">
                      <img
                        src={img.src}
                        alt={img.alt}
                        data-testid={`gallery-image-${index}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex gap-2 mt-4">
                <CarouselPrevious className="static transform-none rounded-none border-foreground/20 text-foreground" />
                <CarouselNext className="static transform-none rounded-none border-foreground/20 text-foreground" />
              </div>
            </Carousel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
