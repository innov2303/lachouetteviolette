import { useState, useEffect } from "react";
import { Menu, X, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "La Structure", href: "#gallery" },
    { name: "Notre Équipe", href: "#team" },
    { name: "Projet Pédagogique", href: "#project" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <Baby size={24} />
          </div>
          <span className={`font-display font-bold text-xl md:text-2xl transition-colors ${
            isScrolled ? "text-primary" : "text-white"
          }`}>
            La chouette violette
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`font-semibold transition-colors hover:text-secondary ${
                isScrolled ? "text-foreground" : "text-white/90"
              }`}
            >
              {link.name}
            </a>
          ))}
          <Button
            asChild
            className="rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:-translate-y-0.5 transition-all font-bold px-6"
          >
            <a href="#contact">Nous contacter</a>
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-primary p-2 bg-white/80 rounded-full backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-border animate-in slide-in-from-top-4">
          <nav className="flex flex-col py-4 px-6 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-semibold text-lg text-foreground py-2 border-b border-muted hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button
              asChild
              className="mt-2 rounded-full w-full bg-secondary text-secondary-foreground text-lg h-12"
              onClick={() => setMobileMenuOpen(false)}
            >
              <a href="#contact">Nous contacter</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
