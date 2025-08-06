import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ContentEditor from "./content-editor";
import ServicesManager from "./services-manager";
import PortfolioManager from "./portfolio-manager";
import PricingManager from "./pricing-manager";

interface AdminLayoutProps {
  onLogout: () => void;
}

export default function AdminLayout({ onLogout }: AdminLayoutProps) {
  const [activeSection, setActiveSection] = useState("hero");

  const sections = [
    { id: "hero", name: "Главная секция", icon: "home" },
    { id: "about", name: "О себе", icon: "user" },
    { id: "services", name: "Услуги", icon: "briefcase" },
    { id: "pricing", name: "Цены", icon: "dollar-sign" },
    { id: "portfolio", name: "Портфолио", icon: "folder" },
    { id: "contact", name: "Контакты", icon: "envelope" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "services":
        return <ServicesManager />;
      case "portfolio":
        return <PortfolioManager />;
      case "pricing":
        return <PricingManager />;
      default:
        return <ContentEditor section={activeSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <motion.div
        className="w-64 bg-slate-800 p-6"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <i className="fas fa-cog text-white text-sm"></i>
          </div>
          <span className="text-white font-semibold">Админ-панель</span>
        </div>

        <nav className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeSection === section.id
                  ? "bg-primary text-white"
                  : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              <i className={`fas fa-${section.icon} mr-3`}></i>
              {section.name}
            </button>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-slate-700">
          <Button
            variant="ghost"
            onClick={onLogout}
            className="w-full text-slate-300 hover:text-white hover:bg-slate-700 justify-start"
          >
            <i className="fas fa-sign-out-alt mr-3"></i>
            Выйти
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex-1 bg-slate-100 p-8 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </motion.div>
    </div>
  );
}
