
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Fallback data for portfolio
  const defaultPortfolio = [
    {
      id: "1",
      title: "E-commerce платформа",
      description: "Современный интернет-магазин с системой управления товарами, корзиной покупок и интеграцией с платежными системами",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
      technologies: ["React", "Next.js", "Stripe", "PostgreSQL"],
      link: "https://example.com",
      githubLink: "https://github.com/example",
      featured: true,
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "2",
      title: "Telegram-бот для автоматизации",
      description: "Бот для автоматизации бизнес-процессов с интеграцией CRM системы и уведомлениями",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71",
      technologies: ["Node.js", "Telegraf", "MongoDB", "Express"],
      link: "https://t.me/example_bot",
      githubLink: "https://github.com/example",
      featured: true,
      order: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "3",
      title: "Корпоративный сайт",
      description: "Современный корпоративный сайт с адаптивным дизайном и системой управления контентом",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      technologies: ["React", "TypeScript", "Tailwind CSS", "CMS"],
      link: "https://example.com",
      githubLink: "https://github.com/example",
      featured: false,
      order: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(defaultPortfolio),
  };
};
