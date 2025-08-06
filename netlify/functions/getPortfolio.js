
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
      title: "Интернет-магазин электроники",
      description: "Полнофункциональный интернет-магазин с корзиной, оплатой и админ-панелью",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      link: "https://example.com",
      githubLink: "https://github.com/example",
      featured: true,
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "2",
      title: "Телеграм-бот для ресторана",
      description: "Бот для приема заказов с интеграцией платежей и уведомлениями",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
      technologies: ["Python", "Telegram API", "SQLite", "Webhooks"],
      link: "https://t.me/restaurant_bot",
      githubLink: "https://github.com/example",
      featured: true,
      order: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "3",
      title: "Корпоративный сайт",
      description: "Современный корпоративный сайт с админ-панелью для управления контентом",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "CMS"],
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
