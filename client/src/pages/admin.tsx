import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/admin-layout";
import { apiRequest } from "@/lib/queryClient";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/admin/auth", { password });
      const result = await response.json();
      
      if (result.success) {
        setIsAuthenticated(true);
        localStorage.setItem("admin-token", result.token);
        toast({
          title: "Успешно",
          description: "Вы вошли в админ-панель",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Неверный пароль",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check for existing token on mount
  useState(() => {
    const token = localStorage.getItem("admin-token");
    if (token === "admin-authenticated") {
      setIsAuthenticated(true);
    }
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto">
                    <i className="fas fa-lock text-white"></i>
                  </div>
                  <h1 className="text-2xl font-bold">Админ-панель</h1>
                  <p className="text-slate-600">Введите пароль для входа</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Пароль</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Введите пароль"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Проверка..." : "Войти"}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return <AdminLayout onLogout={() => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin-token");
  }} />;
}
