import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAllContent } from "@/hooks/use-content";
import type { ActivityContent } from "@shared/schema";

const DEFAULT_PAGE_TITLE = "Les activités de la Chouette Violette";

export default function Activities() {
  const { data: allContent } = useAllContent();
  const data = (allContent as Record<string, unknown> | undefined)?.activities as ActivityContent | undefined;
  const activities = data?.activities ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="min-h-[calc(100vh-53px)] py-16 md:py-24">
        <div className="container mx-auto px-6">
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto mb-14 max-w-3xl text-center"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#c9a0dc]">
              Nos activités
            </p>
            <h1 className="mb-5 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
              {data?.pageTitle || DEFAULT_PAGE_TITLE}
            </h1>
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-0.5 w-12 bg-[#c9a0dc]/30" />
              <Sparkles className="h-5 w-5 text-[#c9a0dc]" />
              <span className="h-0.5 w-12 bg-[#c9a0dc]/30" />
            </div>
            {data?.pageDescription && (
              <p className="whitespace-pre-line text-lg leading-relaxed text-muted-foreground">
                {data.pageDescription}
              </p>
            )}
          </motion.header>

          {activities.length > 0 ? (
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {activities.map((activity, index) => (
                <motion.article
                  key={`${activity.title}-${index}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.24) }}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
                >
                  {activity.image ? (
                    <div className="aspect-[4/3] overflow-hidden bg-[#c9a0dc]/10">
                      <img
                        src={activity.image}
                        alt={activity.imageAlt || activity.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center bg-[#c9a0dc]/10 text-[#c9a0dc]">
                      <Sparkles className="h-10 w-10" aria-hidden="true" />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="mb-3 font-display text-2xl font-semibold text-foreground">
                      {activity.title}
                    </h2>
                    <p className="whitespace-pre-line leading-relaxed text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <p className="mx-auto max-w-xl rounded-2xl border border-dashed border-[#c9a0dc]/50 bg-card/60 px-6 py-12 text-center text-muted-foreground">
              Les activités seront bientôt présentées ici.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
