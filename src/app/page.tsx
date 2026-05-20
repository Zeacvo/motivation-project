export default function Home() {
  return (
    <main className="min-h-screen">

      {/* Hero section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32 bg-gray-100">
        <h1 className="text-6xl font-bold mb-6">
          Наш AI проект
        </h1>

        <p className="text-xl max-w-2xl mb-8">
          Мы изучаем vibe coding, создаём сайт и учимся
          делать реальные проекты с AI.
        </p>

        <button className="bg-black text-white px-6 py-3 rounded-xl text-lg">
          Подписаться
        </button>
      </section>

      {/* About section */}
      <section className="px-6 py-24 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">
          О проекте
        </h2>

        <p className="text-lg leading-8">
          Это наш первый проект на Next.js. Мы изучаем
          современные AI-инструменты и учимся создавать
          сайты, Telegram-ботов и веб-приложения.
        </p>
      </section>

      {/* Features section */}
      <section className="bg-gray-50 px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Что мы изучаем
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-2xl font-semibold mb-4">
                Next.js
              </h3>

              <p>
                Создание современных сайтов и веб-приложений.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-2xl font-semibold mb-4">
                AI Tools
              </h3>

              <p>
                Cursor, ChatGPT, автоматизация и AI workflow.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-2xl font-semibold mb-4">
                Telegram
              </h3>

              <p>
                Боты, рассылки и интеграции с AI.
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}