
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

  // Fallback data for services
  const defaultServices = [
    {
      id: "1",
      title: "Веб-разработка",
      description: "Создание современных веб-сайтов и веб-приложений с использованием React, Next.js и других технологий",
      price: "от 50 000 ₽",
      features: ["Адаптивный дизайн", "SEO оптимизация", "Быстрая загрузка", "Современные технологии"],
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "2", 
      title: "Телеграм-боты",
      description: "Разработка telegram-ботов для автоматизации бизнес-процессов и улучшения клиентского сервиса",
      price: "от 20 000 ₽",
      features: ["Интеграция с API", "Автоматизация процессов", "База данных", "Админ панель"],
      order: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "3",
      title: "UI/UX Дизайн", 
      description: "Создание привлекательного и функционального дизайна для ваших проектов",
      price: "от 30 000 ₽",
      features: ["Пользовательский интерфейс", "Прототипирование", "Адаптивность", "Современный дизайн"],
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
    body: JSON.stringify(defaultServices),
  };
};
