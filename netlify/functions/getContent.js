
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

  const section = event.queryStringParameters?.section || 'hero';
  
  const defaultContent = {
    hero: {
      id: "hero",
      section: "hero",
      content: {
        title: "Алексей Розепин",
        subtitle: "Веб-разработчик и дизайнер",
        description: "Создаю современные веб-сайты и приложения, которые работают быстро и выглядят отлично",
        stats: {
          projects: "10",
          clients: "7", 
          experience: "3"
        }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    about: {
      id: "about",
      section: "about",
      content: {
        title: "Обо мне",
        description: "Привет! Я — веб-разработчик и дизайнер с опытом создания цифровых продуктов. Специализируюсь на React, Next.js и современных технологиях. Также занимаюсь разработкой телеграм-ботов для автоматизации бизнес-процессов. Помогаю стартапам и устоявшимся компаниям создавать эффективные веб-решения."
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    contact: {
      id: "contact",
      section: "contact", 
      content: {
        title: "Давайте обсудим ваш проект",
        subtitle: "Готов воплотить ваши идеи в жизнь. Свяжитесь со мной удобным способом",
        email: "boberbobrovic27@gmail.com",
        telegram: "@diaboliccum"
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  };

  const content = defaultContent[section];

  if (!content) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Content section not found' }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  };
};
