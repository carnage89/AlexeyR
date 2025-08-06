import {
  type User,
  type InsertUser,
  type SiteContent,
  type InsertSiteContent,
  type Service,
  type InsertService,
  type PortfolioItem,
  type InsertPortfolioItem,
  type PricingPlan,
  type InsertPricingPlan,
  type ContactSubmission,
  type InsertContactSubmission
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Site Content
  getSiteContent(section: string): Promise<SiteContent | undefined>;
  getAllSiteContent(): Promise<SiteContent[]>;
  updateSiteContent(section: string, content: any): Promise<SiteContent>;

  // Services
  getAllServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, service: Partial<InsertService>): Promise<Service>;
  deleteService(id: string): Promise<void>;

  // Portfolio
  getAllPortfolioItems(): Promise<PortfolioItem[]>;
  createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;
  updatePortfolioItem(id: string, item: Partial<InsertPortfolioItem>): Promise<PortfolioItem>;
  deletePortfolioItem(id: string): Promise<void>;

  // Pricing
  getAllPricingPlans(): Promise<PricingPlan[]>;
  createPricingPlan(plan: InsertPricingPlan): Promise<PricingPlan>;
  updatePricingPlan(id: string, plan: Partial<InsertPricingPlan>): Promise<PricingPlan>;
  deletePricingPlan(id: string): Promise<void>;

  // Contact Submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private siteContent: Map<string, SiteContent>;
  private services: Map<string, Service>;
  private portfolioItems: Map<string, PortfolioItem>;
  private pricingPlans: Map<string, PricingPlan>;
  private contactSubmissions: Map<string, ContactSubmission>;

  constructor() {
    this.users = new Map();
    this.siteContent = new Map();
    this.services = new Map();
    this.portfolioItems = new Map();
    this.pricingPlans = new Map();
    this.contactSubmissions = new Map();

    // Initialize with default content
    this.initializeDefaultContent();
  }

  private initializeDefaultServices() {
    const defaultServices = [
      {
        title: "Веб-разработка",
        description: "Создание современных и отзывчивых веб-сайтов с использованием последних технологий",
        icon: "code",
        price: "от 25 000 ₽",
        order: 1
      },
      {
        title: "UI/UX Дизайн",
        description: "Проектирование интуитивных пользовательских интерфейсов и улучшение пользовательского опыта",
        icon: "palette",
        price: "от 15 000 ₽",
        order: 2
      },
      {
        title: "Мобильные приложения",
        description: "Разработка кроссплатформенных мобильных приложений с нативной производительностью",
        icon: "mobile-alt",
        price: "от 50 000 ₽",
        order: 3
      },
      {
        title: "Консультации",
        description: "Экспертные консультации по архитектуре, технологиям и лучшим практикам разработки",
        icon: "lightbulb",
        price: "от 3 000 ₽/час",
        order: 4
      },
      {
        title: "Поддержка и оптимизация",
        description: "Техническая поддержка, обновления и оптимизация существующих проектов",
        icon: "tools",
        price: "от 5 000 ₽",
        order: 5
      },
      {
        title: "Телеграм-боты",
        description: "Разработка и интеграция телеграм-ботов для автоматизации бизнес-процессов",
        icon: "robot",
        price: "от 20 000 ₽",
        order: 6
      }
    ];

    defaultServices.forEach((service) => {
      const id = randomUUID();
      this.services.set(id, {
        id,
        ...service,
        createdAt: new Date()
      });
    });
  }

  private initializeDefaultPortfolio() {
    const defaultPortfolio = [
      {
        title: "Интернет-магазин",
        description: "Полнофункциональная платформа электронной коммерции с админ-панелью и системой платежей",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
        link: "https://example-shop.com",
        order: 1
      },
      {
        title: "Корпоративный сайт",
        description: "Современный корпоративный веб-сайт с CMS и мультиязычной поддержкой",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
        technologies: ["Next.js", "TypeScript", "Sanity CMS"],
        link: "https://example-corp.com",
        order: 2
      },
      {
        title: "Мобильное приложение",
        description: "Кроссплатформенное мобильное приложение для управления задачами и проектами",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        technologies: ["React Native", "Firebase", "Redux"],
        link: null,
        order: 3
      }
    ];

    defaultPortfolio.forEach((item) => {
      const id = randomUUID();
      this.portfolioItems.set(id, {
        id,
        ...item,
        createdAt: new Date()
      });
    });
  }

  private initializeDefaultContent() {
    // Default site content
    const defaultContent = {
      hero: {
        title: "Создаю digital решения будущего",
        subtitle: "Помогаю бизнесу расти через качественные веб-решения, современный дизайн и эффективную разработку",
        stats: { projects: "50+", clients: "30+", experience: "5+" }
      },
      about: {
        title: "Превращаю идеи в реальность",
        description: "Привет! Я — веб-разработчик и дизайнер с 5-летним опытом создания цифровых продуктов. Специализируюсь на React, Next.js и современных технологиях.",
        image: null // Removed image from about section
      },
      contact: {
        title: "Давайте обсудим ваш проект",
        subtitle: "Готов воплотить ваши идеи в жизнь. Свяжитесь со мной удобным способом",
        email: "boberbobrovic27@gmail.com",
        telegram: "@diaboliccum"
      }
    };

    Object.entries(defaultContent).forEach(([section, content]) => {
      const id = randomUUID();
      this.siteContent.set(section, {
        id,
        section,
        content,
        updatedAt: new Date()
      });
    });

    // Default services
    const defaultServices = [
      {
        title: "Лендинги и сайты",
        description: "Создание современных лендингов и сложных сайтов с вашим уникальным дизайном. От простых одностраничников до многофункциональных веб-платформ",
        icon: "code",
        price: "от 30 000 ₽",
        order: 1
      },
      {
        title: "Телеграм-боты",
        description: "Разработка и интеграция умных телеграм-ботов для автоматизации бизнес-процессов, обработки заказов и взаимодействия с клиентами",
        icon: "robot",
        price: "от 25 000 ₽",
        order: 2
      },
      {
        title: "Интеграция с Airtable",
        description: "Настройка и подключение Airtable к вашим проектам для эффективного управления данными и автоматизации рабочих процессов",
        icon: "database",
        price: "от 15 000 ₽",
        order: 3
      },
      {
        title: "Генерация контента",
        description: "Создание качественных текстов для постов, статей, описаний товаров и любого другого контента с помощью ИИ-технологий",
        icon: "edit",
        price: "от 5 000 ₽",
        order: 4
      }
    ];

    defaultServices.forEach((service, index) => {
      const id = randomUUID();
      this.services.set(id, {
        id,
        ...service,
        createdAt: new Date()
      });
    });

    // Default pricing plans
    const defaultPricing = [
      {
        name: "Старт",
        price: "30 000",
        description: "Идеально для небольших проектов",
        features: ["Лендинг до 5 экранов", "Адаптивная верстка", "Базовая анимация", "1 месяц поддержки"],
        popular: "false",
        order: 1
      },
      {
        name: "Профессионал",
        price: "75 000",
        description: "Для серьезных проектов",
        features: ["Веб-приложение до 10 страниц", "CMS / Admin панель", "Интеграция с API", "3 месяца поддержки", "SEO оптимизация"],
        popular: "true",
        order: 2
      },
      {
        name: "Бизнес",
        price: "150 000",
        description: "Комплексное решение для бизнеса",
        features: ["Полноценное веб-приложение", "Мобильная версия", "Интеграция с системами", "6 месяцев поддержки", "Консультации по развитию"],
        popular: "false",
        order: 3
      }
    ];

    defaultPricing.forEach((plan) => {
      const id = randomUUID();
      this.pricingPlans.set(id, {
        id,
        ...plan,
        createdAt: new Date()
      });
    });

    // Default portfolio items
    const defaultPortfolio = [
      {
        title: "Интернет-магазин",
        description: "Полнофункциональная платформа электронной коммерции с админ-панелью и системой платежей",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["React", "Node.js", "PostgreSQL"],
        link: "#",
        order: 1
      },
      {
        title: "Мобильное приложение",
        description: "Финтех приложение для управления финансами с интуитивным интерфейсом",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["React Native", "Firebase"],
        link: "#",
        order: 2
      },
      {
        title: "Корпоративный сайт",
        description: "Современный корпоративный веб-сайт с CMS и многоязычной поддержкой",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        technologies: ["Next.js", "CMS"],
        link: "#",
        order: 3
      }
    ];

    defaultPortfolio.forEach((item) => {
      const id = randomUUID();
      this.portfolioItems.set(id, {
        id,
        ...item,
        createdAt: new Date()
      });
    });
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Site Content
  async getSiteContent(section: string): Promise<SiteContent | undefined> {
    return this.siteContent.get(section);
  }

  async getAllSiteContent(): Promise<SiteContent[]> {
    return Array.from(this.siteContent.values());
  }

  async updateSiteContent(section: string, content: any): Promise<SiteContent> {
    const existing = this.siteContent.get(section);
    const updated: SiteContent = {
      id: existing?.id || randomUUID(),
      section,
      content,
      updatedAt: new Date()
    };
    this.siteContent.set(section, updated);
    return updated;
  }

  // Services
  async getAllServices(): Promise<Service[]> {
    // If no services exist, reinitialize with default data
    if (this.services.size === 0) {
      this.initializeDefaultServices();
    }
    return Array.from(this.services.values()).sort((a, b) => a.order - b.order);
  }

  async createService(service: InsertService): Promise<Service> {
    const id = randomUUID();
    const newService: Service = {
      ...service,
      id,
      createdAt: new Date(),
      order: service.order || 0
    };
    this.services.set(id, newService);
    return newService;
  }

  async updateService(id: string, service: Partial<InsertService>): Promise<Service> {
    const existing = this.services.get(id);
    if (!existing) throw new Error("Service not found");

    const updated: Service = { ...existing, ...service };
    this.services.set(id, updated);
    return updated;
  }

  async deleteService(id: string): Promise<void> {
    this.services.delete(id);
  }

  // Portfolio
  async getAllPortfolioItems(): Promise<PortfolioItem[]> {
    // If no portfolio items exist, reinitialize with default data
    if (this.portfolioItems.size === 0) {
      this.initializeDefaultPortfolio();
    }
    return Array.from(this.portfolioItems.values()).sort((a, b) => a.order - b.order);
  }

  async createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem> {
    const id = randomUUID();
    const newItem: PortfolioItem = {
      ...item,
      id,
      createdAt: new Date(),
      link: item.link || null,
      order: item.order || 0
    };
    this.portfolioItems.set(id, newItem);
    return newItem;
  }

  async updatePortfolioItem(id: string, item: Partial<InsertPortfolioItem>): Promise<PortfolioItem> {
    const existing = this.portfolioItems.get(id);
    if (!existing) throw new Error("Portfolio item not found");

    const updated: PortfolioItem = { ...existing, ...item };
    this.portfolioItems.set(id, updated);
    return updated;
  }

  async deletePortfolioItem(id: string): Promise<void> {
    this.portfolioItems.delete(id);
  }

  // Pricing
  async getAllPricingPlans(): Promise<PricingPlan[]> {
    return Array.from(this.pricingPlans.values()).sort((a, b) => a.order - b.order);
  }

  async createPricingPlan(plan: InsertPricingPlan): Promise<PricingPlan> {
    const id = randomUUID();
    const newPlan: PricingPlan = {
      ...plan,
      id,
      createdAt: new Date(),
      order: plan.order || 0,
      popular: plan.popular || "false"
    };
    this.pricingPlans.set(id, newPlan);
    return newPlan;
  }

  async updatePricingPlan(id: string, plan: Partial<InsertPricingPlan>): Promise<PricingPlan> {
    const existing = this.pricingPlans.get(id);
    if (!existing) throw new Error("Pricing plan not found");

    const updated: PricingPlan = { ...existing, ...plan };
    this.pricingPlans.set(id, updated);
    return updated;
  }

  async deletePricingPlan(id: string): Promise<void> {
    this.pricingPlans.delete(id);
  }

  // Contact Submissions
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const newSubmission: ContactSubmission = {
      ...submission,
      id,
      createdAt: new Date(),
      status: submission.status || "pending"
    };
    this.contactSubmissions.set(id, newSubmission);
    return newSubmission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}

export const storage = new MemStorage();