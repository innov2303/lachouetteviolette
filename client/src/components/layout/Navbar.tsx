import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoImg from "@assets/La_chouette_violette_1772195969012.png";

const navLinks = [
  { name: "Accueil", href: "#" },
  { name: "Notre Maison", href: "#gallery" },
  { name: "L'Equipe", href: "#team" },
  { name: "Notre pedagogie", href: "#project" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        data-testid="navbar"
        className="sticky top-0 z-50 bg-white border-b border-border py-2"
      >
        <div className="container mx-auto px-6 flex items-center">
          <a href="#" data-testid="nav-logo" className="flex-shrink-0 mr-8">
            <img src={logoImg} alt="La chouette violette" className="h-12 w-auto" />
          </a>

          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                data-testid={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 text-sm font-medium tracking-wide uppercase text-foreground hover:text-foreground/60 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="lg:hidden flex items-center justify-between w-full">
            <div></div>
            <button
              data-testid="button-mobile-menu"
              className="p-2 rounded-md text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-border">
            <nav className="flex flex-col py-4 px-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  data-testid={`mobile-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="py-3 text-sm font-medium tracking-wide uppercase text-foreground border-b border-border/50 last:border-0"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
