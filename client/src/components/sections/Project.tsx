import { motion } from "framer-motion";
import { Sprout, BookOpen, Music, Users } from "lucide-react";

const pillars = [
  {
    icon: Sprout,
    title: "Motricité libre",
    description: "Laisser l'enfant découvrir son corps et ses capacités à son propre rythme, dans un environnement sécurisé."
  },
  {
    icon: Users,
    title: "Socialisation",
    description: "Apprendre à vivre ensemble, partager et interagir avec les autres enfants en petit comité."
  },
  {
    icon: BookOpen,
    title: "Éveil autonome",
    description: "Des jouets et des activités à disposition pour encourager l'autonomie et les choix personnels."
  },
  {
    icon: Music,
    title: "Créativité",
    description: "Comptines, peinture, manipulation... La créativité au cœur de notre accompagnement quotidien."
  }
];

export default function Project() {
  return (
    <section id="project" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-6"
          >
            <span className="text-secondary font-bold tracking-wider uppercase text-sm">
              Nos Valeurs
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary leading-tight">
              Un projet pédagogique bienveillant
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              À La chouette violette, nous mettons l'accent sur le respect du rythme de chaque enfant. 
              Notre MAM est un pont idéal entre la garde à domicile et la crèche, offrant un 
              cadre familial tout en favorisant la socialisation.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nous nous inspirons des pédagogies actives (Montessori, Pikler-Lóczy) pour aménager 
              notre espace et proposer nos activités, afin que l'enfant soit pleinement acteur 
              de son développement.
            </p>
          </motion.div>

          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-lg shadow-black/5 border border-border/50 hover:bg-muted/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <pillar.icon size={24} />
                </div>
                <h3 className="font-display font-semibold text-xl mb-2 text-foreground">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
