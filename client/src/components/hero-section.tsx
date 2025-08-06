import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { SiteContent } from "@shared/schema";

export default function HeroSection() {
  const { data: heroContent } = useQuery<SiteContent>({
    queryKey: ["/api/content/hero"],
  });

  const content = heroContent?.content as any;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <motion.div
            className="lg:col-span-7 lg:col-start-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-8">
              <div className="space-4">
                <div className="mb-4">
                <span className="text-primary font-semibold text-lg">Привет! Меня зовут</span>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Алексей Розепин</h3>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight mb-4">
                  {content?.title ? (
                    content.title.split(" ").map((word: string, index: number) => {
                      if (word.toLowerCase() === "digital" || word.toLowerCase() === "решения") {
                        return (
                          <span key={index} className="gradient-text">
                            {word}{" "}
                          </span>
                        );
                      }
                      return word + " ";
                    })
                  ) : (
                    <>
                      <span className="text-white text-2xl md:text-3xl lg:text-4xl block mb-2">
                        Алексей Розепин
                      </span>
                      Создаю <span className="gradient-text">digital</span> решения будущего
                    </>
                  )}
                </h1>

                <motion.p
                  className="text-xl text-slate-600 leading-relaxed max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {content?.subtitle || "Помогаю бизнесу расти через качественные веб-решения, современный дизайн и эффективную разработку"}
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button
                  size="lg"
                  className="px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  onClick={() => scrollToSection("contact")}
                >
                  Обсудить проект
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-primary hover:text-primary transition-all duration-200"
                  onClick={() => scrollToSection("portfolio")}
                >
                  Посмотреть работы
                </Button>
              </motion.div>

              <motion.div
                className="flex items-center space-x-8 pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">
                    {content?.stats?.projects || "10"}
                  </div>
                  <div className="text-sm text-slate-600">Проектов</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">
                    {content?.stats?.clients || "7"}
                  </div>
                  <div className="text-sm text-slate-600">Клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">
                    {content?.stats?.experience || "3"}
                  </div>
                  <div className="text-sm text-slate-600">Года опыта</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-4 lg:col-start-9"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <motion.img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600"
                alt="Modern workspace with laptop and design tools"
                className="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 w-full"
                whileHover={{ scale: 1.05 }}
              />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-accent to-orange-500 rounded-full opacity-20"></div>
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-secondary to-purple-600 rounded-full opacity-30"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}