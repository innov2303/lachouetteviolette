import { motion } from "framer-motion";
import { Sprout, BookOpen, Music, Users } from "lucide-react";

const pillars = [
  {
    icon: Sprout,
    title: "Motricite libre",
    description:
      "Laisser l'enfant decouvrir son corps et ses capacites a son propre rythme, dans un environnement securise.",
  },
  {
    icon: Users,
    title: "Socialisation",
    description:
      "Apprendre a vivre ensemble, partager et interagir avec les autres enfants en petit comite.",
  },
  {
    icon: BookOpen,
    title: "Eveil autonome",
    description:
      "Des jouets et des activites a disposition pour encourager l'autonomie et les choix personnels.",
  },
  {
    icon: Music,
    title: "Creativite",
    description:
      "Comptines, peinture, manipulation... La creativite au coeur de notre accompagnement quotidien.",
  },
];

export default function Project() {
  return (
    <section id="project" data-testid="section-project" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-primary font-semibold mb-4">
              Notre pedagogie
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Un projet pedagogique bienveillant
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              A La chouette violette, nous mettons l'accent sur le respect du rythme
              de chaque enfant. Nous nous inspirons des pedagogies actives pour
              accompagner leur developpement en douceur.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              data-testid={`pillar-card-${index}`}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-accent flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <pillar.icon size={28} />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 bg-muted rounded-md p-10 md:p-16 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Notre approche
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Notre MAM est un pont ideal entre la garde a domicile et la creche,
                offrant un cadre familial tout en favorisant la socialisation.
                Nous accueillons les enfants dans un climat de confiance et de respect.
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Nos inspirations
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Nous nous inspirons des pedagogies Montessori et Pikler-Loczy pour
                amenager notre espace et proposer nos activites, afin que l'enfant
                soit pleinement acteur de son developpement.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
