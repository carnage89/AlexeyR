import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { SiteContent } from "@shared/schema";
import { Download } from "lucide-react";

const skills = [
  {
    name: "Frontend Development",
    description: "React, Next.js, TypeScript",
    icon: "code",
    color: "primary"
  },
  {
    name: "UI/UX Design",
    description: "Figma, Adobe XD, Принципы UX",
    icon: "palette",
    color: "secondary"
  },
  {
    name: "Backend Development",
    description: "Node.js, Firebase, PostgreSQL",
    icon: "server",
    color: "accent"
  },
  {
    name: "Mobile Development",
    description: "React Native, Progressive Web Apps",
    icon: "mobile-alt",
    color: "green-600"
  }
];

const services = [
  {
    name: "Frontend Development",
    description: "React, Next.js, TypeScript",
    icon: "code",
    color: "primary"
  },
  {
    name: "UI/UX Design",
    description: "Figma, Adobe XD, Принципы UX",
    icon: "palette",
    color: "secondary"
  },
  {
    name: "Backend Development",
    description: "Node.js, Firebase, PostgreSQL",
    icon: "server",
    color: "accent"
  },
  {
    name: "Mobile Development",
    description: "React Native, Progressive Web Apps",
    icon: "mobile-alt",
    color: "green-600"
  },
  {
    name: "Landing Page Development",
    description: "Creating responsive and engaging landing pages.",
    icon: "monitor",
    color: "blue-500"
  },
  {
    name: "Custom Website Development",
    description: "Building complex websites with your unique design.",
    icon: "globe",
    color: "purple-500"
  },
  {
    name: "Telegram Bot Integration",
    description: "Developing and integrating Telegram bots for your site.",
    icon: "message-square",
    color: "teal-500"
  },
  {
    name: "Content Generation",
    description: "Generating any text for your posts and content.",
    icon: "pencil-alt",
    color: "orange-500"
  }
];

export default function AboutSection() {
  const { data: aboutContent } = useQuery<SiteContent>({
    queryKey: ["/api/content/about"],
  });

  const content = aboutContent?.content as any;

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Обо мне
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                {content?.title ? (
                  content.title.split(" ").map((word: string, index: number) => {
                    if (word.toLowerCase() === "реальность") {
                      return (
                        <span key={index} className="gradient-text">
                          {word}
                        </span>
                      );
                    }
                    return word + " ";
                  })
                ) : (
                  <>
                    Алексей Розепин — превращаю идеи в{" "}
                    <span className="gradient-text">реальность</span>
                  </>
                )}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {content?.description || "Привет! Я — веб-разработчик и дизайнер с опытом создания цифровых продуктов. Специализируюсь на React, Next.js и современных технологиях. Также занимаюсь разработкой телеграм-ботов для автоматизации бизнес-процессов. Помогаю стартапам и устоявшимся компаниям создавать эффективные веб-решения."}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${
                      skill.color === "primary" ? "bg-primary/10" :
                      skill.color === "secondary" ? "bg-secondary/10" :
                      skill.color === "accent" ? "bg-accent/10" :
                      "bg-green-100"
                    } rounded-lg flex items-center justify-center`}>
                      <i className={`fas fa-${skill.icon} ${
                        skill.color === "primary" ? "text-primary" :
                        skill.color === "secondary" ? "text-secondary" :
                        skill.color === "accent" ? "text-accent" :
                        "text-green-600"
                      } text-sm`}></i>
                    </div>
                    <span className="font-semibold text-slate-900">{skill.name}</span>
                  </div>
                  <p className="text-slate-600 text-sm ml-11">{skill.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Button
                size="lg"
                className="group"
                asChild
              >
                <a href="/resume_aleksey_rozepin.pdf" download="Резюме_Алексей_Розепин.pdf">
                  <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                  Мои кейсы
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}