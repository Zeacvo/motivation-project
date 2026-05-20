"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const monthly = {
  price: "990₽",
  period: "в месяц",
  badge: "Ежемесячно",
  cta: "Оформить на 1 месяц",
};

const yearly = {
  price: "7 990₽",
  period: "в год",
  badge: "Выгоднее",
  cta: "Оформить на 1 год",
};

const steps = [
  {
    title: "Подключаешь бота",
    text: "Оплата занимает минуту, после чего бот сразу становится доступен в Telegram.",
  },
  {
    title: "Получаешь ежедневный заряд",
    text: "Каждое утро приходят мотивация, короткий совет и мягкий фокус на день.",
  },
  {
    title: "Держишь ритм",
    text: "Напоминания помогают не сбиваться, а привычки закрепляются проще.",
  },
];

const benefits = [
  "Ежедневные мотивации без лишнего шума",
  "Короткие советы для фокуса и дисциплины",
  "Мягкие напоминания, чтобы не выпадать из режима",
  "Красивый Telegram-опыт, удобный на телефоне",
];

const testimonials = [
  {
    name: "Андрей",
    text: "Очень чистая подача. Коротко, красиво и реально помогает держать темп.",
  },
  {
    name: "Марина",
    text: "Смотрится дорого, а мотивация приходит вовремя — без перегруза.",
  },
  {
    name: "Илья",
    text: "За счёт ежедневных сообщений стало легче не срываться с режима.",
  },
];

const faqs = [
  {
    q: "Как работает подписка?",
    a: "Ты выбираешь тариф, оплачиваешь и получаешь доступ к Telegram-боту с ежедневными сообщениями.",
  },
  {
    q: "Что приходит каждый день?",
    a: "Короткая мотивация, один полезный совет и напоминание, чтобы держать курс.",
  },
  {
    q: "Можно ли отменить?",
    a: "Да, после окончания периода подписку можно не продлевать.",
  },
  {
    q: "Это только для телефона?",
    a: "Да, продукт сделан как удобный Telegram-опыт, лучше всего он ощущается на мобильном.",
  },
];

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [plan, setPlan] = useState<"month" | "year">("month");

  const activePlan = useMemo(() => (plan === "month" ? monthly : yearly), [plan]);

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-zinc-950 selection:bg-zinc-950 selection:text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_rgba(240,244,255,0.75)_35%,_rgba(248,249,252,1)_72%)]" />
      <div className="fixed inset-0 -z-10 opacity-60 [background-image:linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:64px_64px]" />

      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-zinc-950 shadow-lg shadow-black/10" />
            <div>
              <p className="text-sm font-semibold tracking-[0.28em] text-zinc-950">
                MOTIVA
              </p>
              <p className="text-xs text-zinc-500">Daily motivation in Telegram</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-zinc-600 md:flex">
            <a href="#how" className="transition hover:text-zinc-950">Как это работает</a>
            <a href="#features" className="transition hover:text-zinc-950">Преимущества</a>
            <a href="#pricing" className="transition hover:text-zinc-950">Тарифы</a>
            <a href="#faq" className="transition hover:text-zinc-950">FAQ</a>
          </nav>

          <a
            href="#pricing"
            className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-black/10 transition hover:scale-[1.02]"
          >
            Подписаться
          </a>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
        <Reveal>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm text-zinc-600 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Ежедневная мотивация в Telegram
            </div>

            <h1 className="mt-6 max-w-2xl text-5xl font-semibold tracking-tight text-zinc-950 md:text-7xl">
              Красивый способ держать себя в ритме.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600 md:text-xl">
              Подписка на Telegram-бота, который каждый день присылает
              мотивации, короткие полезные советы и мягкие напоминания. Всё,
              чтобы ты не выпадал из курса.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#pricing"
                className="rounded-full bg-zinc-950 px-7 py-3.5 text-center font-medium text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5"
              >
                Начать сейчас
              </a>
              <a
                href="#how"
                className="rounded-full border border-black/10 bg-white/80 px-7 py-3.5 text-center font-medium text-zinc-950 shadow-sm backdrop-blur transition hover:bg-white"
              >
                Как это работает
              </a>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 text-sm text-zinc-600">
              {[
                ["1 мин", "до подключения"],
                ["365", "дней поддержки"],
                ["24/7", "в Telegram"],
              ].map(([a, b]) => (
                <div key={a} className="rounded-3xl border border-black/8 bg-white/80 p-4 shadow-sm backdrop-blur">
                  <p className="text-2xl font-semibold text-zinc-950">{a}</p>
                  <p className="mt-1">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -left-10 top-8 h-40 w-40 rounded-full bg-zinc-300/40 blur-3xl" />
            <div className="absolute -right-10 bottom-8 h-40 w-40 rounded-full bg-sky-300/40 blur-3xl" />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-[2.5rem] border border-black/8 bg-white/75 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
            >
              <div className="rounded-[2rem] border border-black/8 bg-white p-5">
                <div className="flex items-center justify-between border-b border-black/8 pb-4">
                  <div>
                    <p className="text-sm font-medium text-zinc-950">Telegram Preview</p>
                    <p className="text-xs text-zinc-500">Premium motivation bot</p>
                  </div>
                  <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.55)]" />
                </div>

                <div className="mt-5 space-y-4">
                  <div className="max-w-[86%] rounded-[1.5rem] rounded-tl-md bg-zinc-100 px-4 py-3 text-sm text-zinc-800">
                    Доброе утро. Сегодня не нужен идеальный день — нужен честный шаг.
                  </div>
                  <div className="ml-auto max-w-[86%] rounded-[1.5rem] rounded-tr-md bg-zinc-950 px-4 py-3 text-sm font-medium text-white">
                    Сделай главное до обеда.
                  </div>
                  <div className="max-w-[86%] rounded-[1.5rem] rounded-tl-md bg-zinc-100 px-4 py-3 text-sm text-zinc-800">
                    Короткий совет: убери одно лишнее действие и станет легче.
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {["Мотивация", "Совет", "Напоминание"].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-black/8 bg-white p-3 text-center text-xs text-zinc-500 shadow-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </section>

      <section id="how" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-400">
              Как это работает
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
              Три простых шага
            </h2>
            <p className="mt-4 text-base text-zinc-600 md:text-lg">
              Минимум действий, максимум ощущения собранного дня.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="rounded-[2rem] border border-black/8 bg-white/80 p-7 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg">
                <p className="text-sm text-zinc-400">0{i + 1}</p>
                <h3 className="mt-4 text-xl font-semibold text-zinc-950">{s.title}</h3>
                <p className="mt-3 leading-7 text-zinc-600">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-400">
              Что внутри подписки
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
              Тихий, полезный и дорогой по ощущению продукт
            </h2>
            <p className="mt-4 text-base text-zinc-600 md:text-lg">
              Бот не отвлекает. Он просто вовремя подталкивает тебя в правильную сторону.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((item, i) => (
            <Reveal key={item} delay={i * 0.06}>
              <div className="rounded-[2rem] border border-black/8 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg">
                <div className="h-12 w-12 rounded-2xl bg-zinc-950" />
                <p className="mt-5 text-lg font-semibold text-zinc-950">{item}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="rounded-[2.5rem] border border-black/8 bg-white/80 p-8 shadow-sm backdrop-blur">
              <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">
                Почему это работает
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
                Потому что всё строится на ритме, а не на шуме.
              </h2>
              <p className="mt-5 max-w-xl leading-8 text-zinc-600">
                Ежедневная мотивация работает лучше, когда она короткая, точная и
                приходит вовремя. Здесь всё построено вокруг простого цикла:
                сообщение — фокус — действие — результат.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Фокус", "Одна мысль в день лучше десятка перегруженных советов."],
              ["Дисциплина", "Мягкие напоминания удерживают в режиме."],
              ["Привычка", "Регулярность быстро превращается в автоматизм."],
              ["Энергия", "Короткий заряд меняет качество первой половины дня."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.05}>
                <div className="rounded-[2rem] border border-black/8 bg-white/80 p-5 shadow-sm backdrop-blur">
                  <h3 className="text-lg font-semibold text-zinc-950">{t}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-400">
              Подписка
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
              Выбери удобный тариф
            </h2>
            <p className="mt-4 text-base text-zinc-600 md:text-lg">
              Переключайся между месяцем и годом — всё честно и прозрачно.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-black/8 bg-white/80 p-1 text-sm text-zinc-500 shadow-sm backdrop-blur">
            <button
              onClick={() => setPlan("month")}
              className={`rounded-full px-5 py-2.5 transition ${
                plan === "month" ? "bg-zinc-950 text-white shadow-sm" : ""
              }`}
            >
              1 месяц
            </button>
            <button
              onClick={() => setPlan("year")}
              className={`rounded-full px-5 py-2.5 transition ${
                plan === "year" ? "bg-zinc-950 text-white shadow-sm" : ""
              }`}
            >
              1 год
            </button>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-8 max-w-2xl rounded-[2.5rem] border border-black/8 bg-white/90 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="inline-flex rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-600">
                  {activePlan.badge}
                </div>
                <h3 className="mt-4 text-3xl font-semibold text-zinc-950">
                  {plan === "month" ? "Подписка на месяц" : "Подписка на год"}
                </h3>
                <p className="mt-3 max-w-xl text-zinc-600">
                  Доступ к Telegram-боту с ежедневными мотивациями, советами и
                  напоминаниями.
                </p>
              </div>

              <div className="text-right">
                <p className="text-5xl font-semibold tracking-tight text-zinc-950">
                  {activePlan.price}
                </p>
                <p className="mt-2 text-sm text-zinc-500">{activePlan.period}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-zinc-700 sm:grid-cols-2">
              <div>Ежедневные сообщения</div>
              <div>Мягкие напоминания</div>
              <div>Короткие советы</div>
              <div>Подключение в Telegram</div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#"
                className="rounded-full bg-zinc-950 px-7 py-3.5 text-center font-medium text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5"
              >
                {activePlan.cta}
              </a>
              <a
                href="#faq"
                className="rounded-full border border-black/10 bg-white px-7 py-3.5 text-center font-medium text-zinc-950 shadow-sm transition hover:bg-zinc-50"
              >
                Задать вопрос
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-400">
              Отзывы
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
              Люди остаются на ритме
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <div className="rounded-[2rem] border border-black/8 bg-white/80 p-6 shadow-sm backdrop-blur">
                <p className="text-zinc-700">“{t.text}”</p>
                <p className="mt-5 text-sm font-medium text-zinc-400">{t.name}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-400">
              FAQ
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 md:text-5xl">
              Ответы без лишних слов
            </h2>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 max-w-4xl space-y-4">
          {faqs.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.04}>
              <details className="group rounded-[2rem] border border-black/8 bg-white/80 p-6 shadow-sm backdrop-blur">
                <summary className="cursor-pointer list-none text-lg font-medium text-zinc-950 outline-none">
                  <span className="flex items-center justify-between gap-6">
                    {item.q}
                    <span className="text-zinc-400 transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-4 leading-7 text-zinc-600">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <footer className="border-t border-black/8 bg-white/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-zinc-500 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© 2026 MOTIVA. Ежедневная мотивация в Telegram.</p>
          <div className="flex gap-6">
            <a href="#how">Как это работает</a>
            <a href="#pricing">Тариф</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
