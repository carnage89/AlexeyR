import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { SiteContent } from "@shared/schema";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const { data: contactContent } = useQuery<SiteContent>({
    queryKey: ["/api/content/contact"],
  });

  const content = contactContent?.content as any;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to Telegram via Netlify function
      const response = await fetch('/.netlify/functions/sendToTelegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Успешно!",
          description: "Ваша заявка отправлена. Я свяжусь с вами в ближайшее время.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(result.error || 'Ошибка отправки');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при отправке заявки. Попробуйте еще раз или напишите напрямую в Telegram.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Контакты
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
            {content?.title ? (
              content.title.split(" ").map((word: string, index: number) => {
                if (word.toLowerCase() === "обсудим") {
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
                Давайте <span className="gradient-text">обсудим</span> ваш проект
              </>
            )}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {content?.subtitle || "Готов воплотить ваши идеи в жизнь. Свяжитесь со мной удобным способом"}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16">
          <motion.div
            className="lg:col-span-5 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <motion.div
                className="flex items-start space-x-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-envelope text-primary"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                  <p className="text-slate-600">{content?.email || "boberbobrovic27@gmail.com"}</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start space-x-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="fab fa-telegram text-secondary"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Telegram</h3>
                  <p className="text-slate-600">{content?.telegram || "@diaboliccum"}</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start space-x-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="fab fa-github text-accent"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">GitHub</h3>
                  <p className="text-slate-600">carnage89</p>
                </div>
              </motion.div>
            </div>



            <motion.div
              className="pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Button
                className="inline-flex items-center px-8 py-4 gradient-primary text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                onClick={() => window.open("https://t.me/diaboliccum", "_blank")}
              >
                <i className="fab fa-telegram mr-3"></i>
                Написать в Telegram
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-6 lg:col-start-7"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-slate-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Оставить заявку</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Ваше имя *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="Введите ваше имя"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      Сообщение *
                    </Label>
                    <Textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Расскажите о вашем проекте..."
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Отправка..." : "Отправить заявку"}
                </Button>

                <p className="text-sm text-slate-500 text-center">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
