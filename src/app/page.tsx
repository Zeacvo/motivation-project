export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 text-gray-900">

      {/* NAV */}
      <header className="flex justify-between items-center px-8 py-6 max-w-6xl mx-auto">
        <h1 className="text-xl font-bold">AI Project</h1>

        <nav className="flex gap-6 text-sm">
          <a href="#about" className="hover:underline">О проекте</a>
          <a href="#features" className="hover:underline">Функции</a>
          <a href="#contact" className="hover:underline">Контакт</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="text-center px-6 py-28 max-w-4xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-6 leading-tight">
          Мы создаём AI-проекты через vibe coding
        </h2>

        <p className="text-lg text-gray-600 mb-8">
          Учимся делать реальные продукты: сайты, ботов и автоматизации,
          используя современные AI-инструменты.
        </p>

        <button className="bg-black text-white px-8 py-3 rounded-xl text-lg hover:bg-gray-800 transition">
          Присоединиться
        </button>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-5xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold mb-6">О проекте</h3>

        <p className="text-gray-700 text-lg leading-8">
          Это учебно-практический проект, где мы учимся создавать
          современные AI-продукты с нуля. Наша цель — быстро переходить
          от идеи к работающему продукту.
        </p>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            Что мы изучаем
          </h3>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="p-6 rounded-2xl border shadow-sm hover:shadow-md transition">
              <h4 className="text-xl font-semibold mb-3">Next.js</h4>
              <p className="text-gray-600">
                Создание современных веб-приложений и SaaS.
              </p>
            </div>

            <div className="p-6 rounded-2xl border shadow-sm hover:shadow-md transition">
              <h4 className="text-xl font-semibold mb-3">AI Automation</h4>
              <p className="text-gray-600">
                Боты, автоматизации и интеграции через API.
              </p>
            </div>

            <div className="p-6 rounded-2xl border shadow-sm hover:shadow-md transition">
              <h4 className="text-xl font-semibold mb-3">Vibe Coding</h4>
              <p className="text-gray-600">
                Быстрая разработка с помощью AI-инструментов.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="text-center py-24 px-6">
        <h3 className="text-3xl font-bold mb-4">
          Готовы следить за прогрессом?
        </h3>

        <p className="text-gray-600 mb-6">
          Мы будем публиковать результаты и новые проекты.
        </p>

        <button className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition">
          Подписаться
        </button>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} AI Project. Все права не особо защищены 🙂
      </footer>

    </main>
  );
}