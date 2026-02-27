import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SiFacebook, SiInstagram } from "react-icons/si";
import logoImg from "@assets/logo-chouette.png";

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
        className="sticky top-0 z-50 bg-white border-b border-border py-3"
      >
        <div className="container mx-auto px-6 flex items-center justify-center relative">
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 2).map((link) => (
              <a
                key={link.name}
                href={link.href}
                data-testid={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 text-sm font-medium tracking-wide uppercase text-foreground hover:text-foreground/60 transition-colors"
              >
                {link.name}
              </a>
            ))}

            <a
              href="#"
              data-testid="nav-logo"
              className="mx-8 flex items-center group"
            >
              <img src={logoImg} alt="La chouette violette" className="h-10 w-auto" />
            </a>

            {navLinks.slice(2).map((link) => (
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
            <a href="#" className="flex items-center">
              <img src={logoImg} alt="La chouette violette" className="h-8 w-auto" />
            </a>
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

      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 hidden md:flex">
        <a
          href="#"
          data-testid="link-facebook"
          className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        >
          <SiFacebook size={18} />
        </a>
        <a
          href="#"
          data-testid="link-instagram"
          className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        >
          <SiInstagram size={18} />
        </a>
      </div>
    </>
  );
}
