export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      <h1 className="text-6xl font-extrabold text-center mb-6">
        🚀 Наш сайт обновился
      </h1>

      <p className="text-xl text-gray-300 text-center max-w-2xl mb-10">
        Если ты это видишь — значит Git + Vercel работают правильно,
        и каждое изменение кода обновляет сайт автоматически.
      </p>

      <div className="flex gap-4">
        <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
          Кнопка 1
        </button>

        <button className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition">
          Кнопка 2
        </button>
      </div>

      <p className="mt-12 text-gray-500 text-sm">
        Попробуй изменить текст в GitHub и увидишь обновление
      </p>

    </main>
  );
}
