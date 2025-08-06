import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { SiteContent } from "@shared/schema";

interface ContentEditorProps {
  section: string;
}

export default function ContentEditor({ section }: ContentEditorProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: content, isLoading } = useQuery<SiteContent>({
    queryKey: ["/api/content", section],
  });

  const [formData, setFormData] = useState<any>({});

  // Update form data when content loads
  useState(() => {
    if (content?.content) {
      setFormData(content.content);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("PUT", `/api/content/${section}`, { content: data });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content"] });
      toast({
        title: "Успешно",
        description: "Контент обновлен",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить контент",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const getSectionTitle = () => {
    switch (section) {
      case "hero":
        return "Главная секция";
      case "about":
        return "О себе";
      case "contact":
        return "Контакты";
      default:
        return "Редактирование контента";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="animate-pulse">Загрузка...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Редактирование: {getSectionTitle()}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {section === "hero" && (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="block text-sm font-medium text-slate-700 mb-2">
                      Заголовок
                    </Label>
                    <Input
                      value={formData.title || ""}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label className="block text-sm font-medium text-slate-700 mb-2">
                      Подзаголовок
                    </Label>
                    <Textarea
                      rows={3}
                      value={formData.subtitle || ""}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label className="block text-sm font-medium text-slate-700 mb-2">
                      Количество проектов
                    </Label>
                    <Input
                      value={formData.stats?.projects || ""}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        stats: { ...formData.stats, projects: e.target.value }
                      })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-slate-700 mb-2">
                      Количество клиентов
                    </Label>
                    <Input
                      value={formData.stats?.clients || ""}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        stats: { ...formData.stats, clients: e.target.value }
                      })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-slate-700 mb-2">
                      Лет опыта
                    </Label>
                    <Input
                      value={formData.stats?.experience || ""}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        stats: { ...formData.stats, experience: e.target.value }
                      })}
                      className="w-full"
                    />
                  </div>
                </div>
              </>
            )}

            {section === "about" && (
              <div className="grid gap-6">
                <div>
                  <Label className="block text-sm font-medium text-slate-700 mb-2">
                    Заголовок
                  </Label>
                  <Input
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-slate-700 mb-2">
                    Описание
                  </Label>
                  <Textarea
                    rows={4}
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {section === "contact" && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="block text-sm font-medium text-slate-700 mb-2">
                    Заголовок
                  </Label>
                  <Input
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-slate-700 mb-2">
                    Подзаголовок
                  </Label>
                  <Textarea
                    rows={3}
                    value={formData.subtitle || ""}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </Label>
                  <Input
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-slate-700 mb-2">
                    Telegram
                  </Label>
                  <Input
                    value={formData.telegram || ""}
                    onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-slate-700 mb-2">
                    Телефон
                  </Label>
                  <Input
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            <div className="flex space-x-4 pt-6">
              <Button
                type="submit"
                disabled={updateMutation.isPending}
                className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                {updateMutation.isPending ? "Сохранение..." : "Сохранить изменения"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="px-6 py-3"
                onClick={() => setFormData(content?.content || {})}
              >
                Отменить
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
