import { Baby, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 md:py-16 rounded-t-[3rem]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-lg">
                <Baby size={28} />
              </div>
              <span className="font-display font-bold text-2xl">
                La chouette violette
              </span>
            </div>
            <p className="text-primary-foreground/80 mt-2">
              Une Maison d'Assistantes Maternelles chaleureuse et bienveillante pour l'épanouissement de vos enfants.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-display font-semibold text-xl border-b border-primary-foreground/20 pb-2 inline-block w-fit">
              Coordonnées
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 opacity-80" />
                <span>123 Rue des Petits Pas<br />75000 Paris, France</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0 opacity-80" />
                <span>01 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0 opacity-80" />
                <span>contact@lachouetteviolette.fr</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-display font-semibold text-xl border-b border-primary-foreground/20 pb-2 inline-block w-fit">
              Horaires
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex justify-between">
                <span>Lundi - Vendredi</span>
                <span className="font-semibold">08:00 - 18:30</span>
              </li>
              <li className="flex justify-between text-primary-foreground/60">
                <span>Samedi - Dimanche</span>
                <span>Fermé</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} La chouette violette - Maison d'Assistantes Maternelles. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
