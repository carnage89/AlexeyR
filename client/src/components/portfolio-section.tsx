import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { PortfolioItem } from "@shared/schema";

export default function PortfolioSection() {
  const { data: portfolioItems, isLoading } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Загрузка портфолио...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Кейсы
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
            Мои <span className="gradient-text">кейсы</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Некоторые из проектов, которые я создал для своих клиентов
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems?.map((item, index) => (
            <motion.div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="relative overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-white/80">
                    {item.technologies.join(" • ")}
                  </p>
                </div>
              </div>
              
              <div className="p-6 space-y-3">
                <h3 className="font-bold text-xl text-slate-900">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-2">
                    {item.technologies.slice(0, 2).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-2 py-1 text-xs rounded-full ${
                          techIndex === 0 ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {item.link && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80 transition-colors p-0"
                      onClick={() => window.open(item.link || "#", "_blank")}
                    >
                      <i className="fas fa-external-link-alt"></i>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button 
            className="px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors duration-200"
            onClick={() => {
              const element = document.getElementById("about");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Посмотреть все работы
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
