import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { PricingPlan } from "@shared/schema";

export default function PricingSection() {
  const { data: pricingPlans, isLoading } = useQuery<PricingPlan[]>({
    queryKey: ["/api/pricing"],
  });

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Загрузка тарифов...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Цены
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
            Прозрачные <span className="gradient-text">тарифы</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Выберите подходящий пакет для вашего проекта или закажите индивидуальное решение
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {pricingPlans?.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`rounded-2xl p-8 border transition-all duration-300 ${
                plan.popular === "true"
                  ? "gradient-primary text-white relative transform lg:scale-105 shadow-xl"
                  : "bg-slate-50 border-slate-200 hover:shadow-lg"
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: plan.popular === "true" ? 1.05 : 1.02 }}
            >
              {plan.popular === "true" && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Популярный
                  </span>
                </div>
              )}
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className={`text-xl font-bold ${
                    plan.popular === "true" ? "text-white" : "text-slate-900"
                  }`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline space-x-1">
                    <span className={`text-3xl font-bold ${
                      plan.popular === "true" ? "text-white" : "text-slate-900"
                    }`}>
                      {plan.price}
                    </span>
                    <span className={plan.popular === "true" ? "text-white/80" : "text-slate-600"}>
                      ₽
                    </span>
                  </div>
                  <p className={plan.popular === "true" ? "text-white/80" : "text-slate-600"}>
                    {plan.description}
                  </p>
                </div>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <i className={`fas fa-check text-sm ${
                        plan.popular === "true" ? "text-white" : "text-green-500"
                      }`}></i>
                      <span className={plan.popular === "true" ? "text-white" : "text-slate-700"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  className={`w-full py-3 px-6 font-semibold rounded-xl transition-all duration-200 ${
                    plan.popular === "true"
                      ? "bg-white text-primary hover:bg-white/90"
                      : "border-2 border-slate-300 text-slate-700 hover:border-primary hover:text-primary bg-transparent"
                  }`}
                  variant={plan.popular === "true" ? "default" : "outline"}
                  onClick={scrollToContact}
                >
                  Выбрать план
                </Button>
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
          <p className="text-slate-600 mb-4">Нужно индивидуальное решение?</p>
          <Button
            variant="secondary"
            className="px-8 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors duration-200"
            onClick={scrollToContact}
          >
            Обсудить проект
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
