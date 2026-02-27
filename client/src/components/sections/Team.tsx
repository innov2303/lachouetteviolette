import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const teamMembers = [
  {
    name: "Sophie Laurent",
    role: "Assistante Maternelle",
    bio: "Passionnée par la pédagogie Montessori, Sophie accompagne vos enfants dans leurs apprentissages en douceur.",
    // friendly woman smiling warm lighting
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Claire Dubois",
    role: "Assistante Maternelle",
    bio: "Créative et douce, Claire anime des ateliers artistiques et sensoriels pour éveiller la curiosité des tout-petits.",
    // professional friendly woman outdoors
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&auto=format&fit=crop"
  }
];

export default function Team() {
  return (
    <section id="team" className="py-20 md:py-32 bg-muted relative rounded-[3rem] mx-4 md:mx-8 shadow-inner">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-80 h-80 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex justify-center mb-4 text-secondary">
            <Heart className="w-10 h-10 fill-secondary" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Notre Équipe
          </h2>
          <p className="text-lg text-muted-foreground">
            Deux professionnelles de la petite enfance unies par la même passion et les mêmes valeurs éducatives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-card rounded-[2.5rem] p-6 md:p-8 shadow-xl shadow-primary/5 border border-border/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 border-4 border-muted p-1 bg-white shadow-inner">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="font-display text-2xl font-bold text-primary mb-1">
                  {member.name}
                </h3>
                <span className="inline-block px-3 py-1 bg-accent/30 text-accent-foreground text-sm font-medium rounded-full mb-4">
                  {member.role}
                </span>
                <p className="text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
