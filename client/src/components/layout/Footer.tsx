import { SiFacebook, SiInstagram } from "react-icons/si";

export default function Footer() {
  return (
    <footer data-testid="footer" className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-display text-2xl font-bold mb-4 text-[#c9a0dc]">
              La chouette violette
            </h3>
            <p className="text-background/60 text-sm leading-relaxed">
              Une Maison d'Assistantes Maternelles chaleureuse et bienveillante
              pour l'epanouissement de vos enfants.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { name: "Accueil", href: "#" },
                { name: "Notre Maison", href: "#gallery" },
                { name: "L'Equipe", href: "#team" },
                { name: "Notre pedagogie", href: "#project" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-background/60 text-sm transition-colors hover:text-background"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Coordonnees
            </h4>
            <div className="space-y-2 text-background/60 text-sm">
              <p>123 Rue des Petits Pas</p>
              <p>75000 Paris, France</p>
              <p>01 23 45 67 89</p>
              <p>contact@lachouetteviolette.fr</p>
            </div>
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                data-testid="footer-link-facebook"
                className="w-9 h-9 rounded-full border border-background/20 flex items-center justify-center text-background/60 hover:text-background hover:border-background/50 transition-colors"
              >
                <SiFacebook size={14} />
              </a>
              <a
                href="#"
                data-testid="footer-link-instagram"
                className="w-9 h-9 rounded-full border border-background/20 flex items-center justify-center text-background/60 hover:text-background hover:border-background/50 transition-colors"
              >
                <SiInstagram size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-background/10 text-center text-xs text-background/40">
          <p>
            &copy; {new Date().getFullYear()} La chouette violette - Maison d'Assistantes
            Maternelles. Tous droits reserves.
          </p>
        </div>
      </div>
    </footer>
  );
}
