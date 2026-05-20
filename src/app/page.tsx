export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
          AI Product Builder
        </p>

        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Создавай AI-продукты <br />
          быстрее, чем идеи успевают устареть
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Мы учимся строить реальные продукты: сайты, ботов и автоматизации
          с помощью AI и vibe coding.
        </p>

        <div className="flex gap-4 justify-center">
          <button className="bg-black text-white px-8 py-3 rounded-xl text-lg hover:bg-gray-800 transition">
            Начать сейчас
          </button>

          <button className="border px-8 py-3 rounded-xl text-lg hover:bg-gray-100 transition">
            Узнать больше
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-12">
            Что мы делаем
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-6 rounded-2xl border">
              <h3 className="text-xl font-semibold mb-3">⚡ Быстрые MVP</h3>
              <p className="text-gray-600">
                Создаём рабочие продукты за дни, а не месяцы.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border">
              <h3 className="text-xl font-semibold mb-3">🤖 AI интеграции</h3>
              <p className="text-gray-600">
                Используем GPT, автоматизации и API.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border">
              <h3 className="text-xl font-semibold mb-3">🚀 Реальные продукты</h3>
              <p className="text-gray-600">
                Не обучение ради обучения, а запуск и результат.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-6 py-24">

        <h2 className="text-3xl font-bold text-center mb-12">
          Как это работает
        </h2>

        <div className="space-y-6 text-center text-gray-700">

          <p>1. Берём идею</p>
          <p>2. Быстро собираем MVP через AI</p>
          <p>3. Тестируем на реальных людях</p>
          <p>4. Улучшаем или масштабируем</p>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-20 text-center px-6">

        <h2 className="text-4xl font-bold mb-4">
          Готов начать свой первый AI-проект?
        </h2>

        <p className="text-gray-300 mb-8">
          Присоединяйся и создавай вместе с нами.
        </p>

        <button className="bg-white text-black px-8 py-3 rounded-xl text-lg hover:bg-gray-200 transition">
          Войти в проект
        </button>

      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} AI Startup Lab. Built with vibe coding.
      </footer>

    </main>
  );
}
