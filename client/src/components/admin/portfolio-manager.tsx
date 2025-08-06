import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { PortfolioItem } from "@shared/schema";

export default function PortfolioManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    technologies: [] as string[],
    link: "",
    order: 0
  });
  const [techInput, setTechInput] = useState("");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: portfolioItems, isLoading } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/portfolio", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      setIsDialogOpen(false);
      resetForm();
      toast({ title: "Успешно", description: "Проект добавлен в портфолио" });
    },
    onError: () => {
      toast({ title: "Ошибка", description: "Не удалось добавить проект", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiRequest("PUT", `/api/portfolio/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      setIsDialogOpen(false);
      resetForm();
      toast({ title: "Успешно", description: "Проект обновлен" });
    },
    onError: () => {
      toast({ title: "Ошибка", description: "Не удалось обновить проект", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/portfolio/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio"] });
      toast({ title: "Успешно", description: "Проект удален из портфолио" });
    },
    onError: () => {
      toast({ title: "Ошибка", description: "Не удалось удалить проект", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({ title: "", description: "", image: "", technologies: [], link: "", order: 0 });
    setTechInput("");
    setEditingItem(null);
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image,
      technologies: item.technologies,
      link: item.link || "",
      order: item.order
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Вы уверены, что хотите удалить этот проект из портфолио?")) {
      deleteMutation.mutate(id);
    }
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()]
      });
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech)
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="animate-pulse">Загрузка портфолио...</div>
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Управление портфолио</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    resetForm();
                    setIsDialogOpen(true);
                  }}
                  className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <i className="fas fa-plus mr-2"></i>Добавить проект
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingItem ? "Редактировать проект" : "Добавить проект"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Название проекта</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="image">URL изображения</Label>
                    <Input
                      id="image"
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>
                  <div>
                    <Label>Технологии</Label>
                    <div className="flex space-x-2 mb-2">
                      <Input
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        placeholder="Добавить технологию"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                      />
                      <Button type="button" onClick={addTechnology} size="sm">
                        Добавить
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-sm rounded-full"
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={() => removeTechnology(tech)}
                            className="ml-1 text-xs hover:text-red-500"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="link">Ссылка на проект (опционально)</Label>
                    <Input
                      id="link"
                      type="url"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="order">Порядок отображения</Label>
                    <Input
                      id="order"
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      type="submit"
                      disabled={createMutation.isPending || updateMutation.isPending}
                      className="flex-1"
                    >
                      {editingItem ? "Обновить" : "Добавить"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsDialogOpen(false);
                        resetForm();
                      }}
                    >
                      Отмена
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems?.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleEdit(item)}
                      className="p-1 w-8 h-8 bg-white/90 hover:bg-white"
                    >
                      <i className="fas fa-edit text-xs"></i>
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      className="p-1 w-8 h-8 bg-white/90 hover:bg-white text-red-500 hover:text-red-600"
                      disabled={deleteMutation.isPending}
                    >
                      <i className="fas fa-trash text-xs"></i>
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {item.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={tech}
                        className={`px-2 py-1 text-xs rounded-full ${
                          index === 0 ? "bg-primary/10 text-primary" :
                          index === 1 ? "bg-secondary/10 text-secondary" :
                          "bg-accent/10 text-accent"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {item.technologies.length > 3 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-600">
                        +{item.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 text-sm"
                    >
                      <i className="fas fa-external-link-alt mr-1"></i>
                      Посмотреть проект
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {(!portfolioItems || portfolioItems.length === 0) && (
            <div className="text-center py-12">
              <i className="fas fa-folder-open text-4xl text-slate-300 mb-4"></i>
              <p className="text-slate-500">Портфолио пусто. Добавьте первый проект.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
