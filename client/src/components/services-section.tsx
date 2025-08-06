import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { Service } from "@shared/schema";

export default function ServicesSection() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const getIconColorClass = (index: number) => {
    const colors = [
      "from-primary to-primary/80",
      "from-secondary to-secondary/80",
      "from-accent to-accent/80",
      "from-green-500 to-green-600",
      "from-purple-500 to-purple-600",
      "from-red-500 to-red-600"
    ];
    return colors[index % colors.length];
  };

  const getPriceColorClass = (index: number) => {
    const colors = ["text-primary", "text-secondary", "text-accent", "text-green-600", "text-purple-600", "text-red-600"];
    return colors[index % colors.length];
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Загрузка услуг...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Услуги
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
            Что я <span className="gradient-text">предлагаю</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Полный спектр услуг для создания современных веб-решений — от идеи до запуска
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="space-y-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${getIconColorClass(index)} rounded-xl flex items-center justify-center`}>
                  <i className={`fas fa-${service.icon} text-white text-xl`}></i>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{service.description}</p>
                </div>
                <div className="pt-4">
                  <span className={`${getPriceColorClass(index)} font-semibold text-sm`}>
                    {service.price}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
