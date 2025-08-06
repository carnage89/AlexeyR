import { motion } from "framer-motion";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Портфолио</h3>
            <p className="text-slate-400">
              Создаю качественные веб-решения для вашего бизнеса
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Навигация</h4>
            <div className="space-y-2 text-slate-400">
              {[
                { name: "О себе", id: "about" },
                { name: "Услуги", id: "services" },
                { name: "Портфолио", id: "portfolio" },
                { name: "Контакты", id: "contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block hover:text-white transition-colors text-left"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Услуги</h4>
            <div className="space-y-2 text-slate-400">
              <div>Веб-разработка</div>
              <div>UI/UX Дизайн</div>
              <div>Мобильные приложения</div>
              <div>Консультации</div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Контакты</h4>
            <div className="space-y-2 text-slate-400">
              <div>boberbobrovic27@gmail.com</div>
              <div>@diaboliccum</div>
              <div>carnage89</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>&copy; 2025 Алексей Розепин. Все права защищены.</p>
        </motion.div>
      </div>
    </footer>
  );
}