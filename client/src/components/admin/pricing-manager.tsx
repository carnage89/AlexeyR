import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { PricingPlan } from "@shared/schema";

export default function PricingManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    features: [] as string[],
    popular: "false",
    order: 0
  });
  const [featureInput, setFeatureInput] = useState("");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: pricingPlans, isLoading } = useQuery<PricingPlan[]>({
    queryKey: ["/api/pricing"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/pricing", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pricing"] });
      setIsDialogOpen(false);
      resetForm();
      toast({ title: "Успешно", description: "Тарифный план добавлен" });
    },
    onError: () => {
      toast({ title: "Ошибка", description: "Не удалось добавить тарифный план", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiRequest("PUT", `/api/pricing/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pricing"] });
      setIsDialogOpen(false);
      resetForm();
      toast({ title: "Успешно", description: "Тарифный план обновлен" });
    },
    onError: () => {
      toast({ title: "Ошибка", description: "Не удалось обновить тарифный план", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/pricing/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pricing"] });
      toast({ title: "Успешно", description: "Тарифный план удален" });
    },
    onError: () => {
      toast({ title: "Ошибка", description: "Не удалось удалить тарифный план", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({ name: "", price: "", description: "", features: [], popular: "false", order: 0 });
    setFeatureInput("");
    setEditingPlan(null);
  };

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price,
      description: plan.description,
      features: plan.features,
      popular: plan.popular || "false",
      order: plan.order
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPlan) {
      updateMutation.mutate({ id: editingPlan.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Вы уверены, что хотите удалить этот тарифный план?")) {
      deleteMutation.mutate(id);
    }
  };

  const addFeature = () => {
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()]
      });
      setFeatureInput("");
    }
  };

  const removeFeature = (feature: string) => {
    setFormData({
      ...formData,
      features: formData.features.filter(f => f !== feature)
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="animate-pulse">Загрузка тарифных планов...</div>
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
            <h2 className="text-2xl font-bold text-slate-900">Управление тарифами</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    resetForm();
                    setIsDialogOpen(true);
                  }}
                  className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <i className="fas fa-plus mr-2"></i>Добавить тариф
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingPlan ? "Редактировать тариф" : "Добавить тариф"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Название тарифа</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Цена (только число)</Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="50000"
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
                    <Label>Особенности тарифа</Label>
                    <div className="flex space-x-2 mb-2">
                      <Input
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        placeholder="Добавить особенность"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                      />
                      <Button type="button" onClick={addFeature} size="sm">
                        Добавить
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {formData.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-slate-50 rounded"
                        >
                          <span className="text-sm">{feature}</span>
                          <button
                            type="button"
                            onClick={() => removeFeature(feature)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="popular"
                      checked={formData.popular === "true"}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, popular: checked ? "true" : "false" })
                      }
                    />
                    <Label htmlFor="popular">Популярный тариф</Label>
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
                      {editingPlan ? "Обновить" : "Добавить"}
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

          <div className="grid lg:grid-cols-3 gap-6">
            {pricingPlans?.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl p-6 border transition-all duration-300 relative ${
                  plan.popular === "true"
                    ? "bg-gradient-to-br from-primary to-secondary text-white shadow-xl"
                    : "bg-white border-slate-200 hover:shadow-lg"
                }`}
              >
                {plan.popular === "true" && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Популярный
                    </span>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className={`text-lg font-bold ${
                      plan.popular === "true" ? "text-white" : "text-slate-900"
                    }`}>
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline space-x-1">
                      <span className={`text-2xl font-bold ${
                        plan.popular === "true" ? "text-white" : "text-slate-900"
                      }`}>
                        {plan.price}
                      </span>
                      <span className={plan.popular === "true" ? "text-white/80" : "text-slate-600"}>
                        ₽
                      </span>
                    </div>
                    <p className={`text-sm ${plan.popular === "true" ? "text-white/80" : "text-slate-600"}`}>
                      {plan.description}
                    </p>
                  </div>
                  
                  <ul className="space-y-2 text-sm">
                    {plan.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <i className={`fas fa-check text-xs ${
                          plan.popular === "true" ? "text-white" : "text-green-500"
                        }`}></i>
                        <span className={plan.popular === "true" ? "text-white" : "text-slate-700"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                    {plan.features.length > 3 && (
                      <li className={`text-xs ${plan.popular === "true" ? "text-white/60" : "text-slate-500"}`}>
                        +{plan.features.length - 3} дополнительных особенностей
                      </li>
                    )}
                  </ul>
                  
                  <div className="flex space-x-2 pt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(plan)}
                      className={`flex-1 ${
                        plan.popular === "true" 
                          ? "text-white hover:bg-white/10" 
                          : "text-primary hover:text-primary/80"
                      }`}
                    >
                      <i className="fas fa-edit mr-1"></i>
                      Изменить
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(plan.id)}
                      className={`${
                        plan.popular === "true" 
                          ? "text-white hover:bg-red-500/20" 
                          : "text-red-500 hover:text-red-600"
                      }`}
                      disabled={deleteMutation.isPending}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {(!pricingPlans || pricingPlans.length === 0) && (
            <div className="text-center py-12">
              <i className="fas fa-dollar-sign text-4xl text-slate-300 mb-4"></i>
              <p className="text-slate-500">Тарифные планы не настроены. Добавьте первый тариф.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
