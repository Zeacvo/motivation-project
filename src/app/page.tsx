export default function Page() {
  return (
    <main style={styles.main}>
      
      {/* BACKGROUND */}
      <div style={styles.bgGlow} />
      <div style={styles.grid} />

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.badge}>24/7 AI MOTIVATION SYSTEM</div>

        <h1 style={styles.title}>
          MOTIVATION CROWN
        </h1>

        <p style={styles.subtitle}>
          Персональный Telegram-бот, который превращает прокрастинацию в действие.
          <br />
          Мотивация, фокус и дисциплина — в один клик.
        </p>

        <a
          href="https://t.me/motivationcrown_bot"
          target="_blank"
          style={styles.ctaPrimary}
        >
          Запустить бесплатно
        </a>

        <p style={styles.microText}>
          Без подписок • Без ограничений • Доступ 24/7
        </p>
      </section>

      {/* TRUST */}
      <section style={styles.trust}>
        <div>мгновенные ответы</div>
        <div>AI-логика</div>
        <div>ежедневная мотивация</div>
        <div>работает 24/7</div>
      </section>

      {/* VALUE */}
      <section style={styles.section}>
        <h2 style={styles.h2}>Почему он работает</h2>

        <div style={styles.grid3}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Фокус</h3>
            <p style={styles.cardText}>
              Убирает шум и возвращает тебя к действиям.
            </p>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Дисциплина</h3>
            <p style={styles.cardText}>
              Ежедневные триггеры формируют стабильные привычки.
            </p>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Импульс</h3>
            <p style={styles.cardText}>
              Сообщения в нужный момент возвращают тебя в действие.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={styles.section}>
        <h2 style={styles.h2}>Как это работает</h2>

        <div style={styles.steps}>
          {[
            ["01", "Открываешь бота в Telegram"],
            ["02", "Получаешь систему мотивации"],
            ["03", "Начинаешь действовать каждый день"]
          ].map(([num, text]) => (
            <div key={num} style={styles.step}>
              <div style={styles.stepNum}>{num}</div>
              <div style={styles.stepText}>{text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section style={styles.section}>
        <div style={styles.quote}>
          “Ты не становишься другим человеком за день —  
          ты просто перестаёшь откладывать.”
        </div>
      </section>

      {/* CTA */}
      <section style={styles.final}>
        <h2 style={styles.finalTitle}>Начни сегодня</h2>

        <p style={styles.subtitle}>
          Один клик — и у тебя система, которая держит фокус каждый день.
        </p>

        <a
          href="https://t.me/motivationcrown_bot"
          target="_blank"
          style={styles.ctaPrimary}
        >
          Перейти в Telegram
        </a>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        © 2026 Motivation Crown ·{" "}
        <a
          href="https://t.me/motivationcrown_bot"
          style={{ color: "#9efcff", textDecoration: "none" }}
        >
          Telegram
        </a>
      </footer>
    </main>
  );
}

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  main: {
    background: "#05070a",
    color: "white",
    fontFamily: "Inter, system-ui, sans-serif",
    overflowX: "hidden",
    position: "relative"
  },

  bgGlow: {
    position: "fixed",
    top: "-200px",
    left: "50%",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, rgba(0,240,255,0.18), transparent 60%)",
    transform: "translateX(-50%)",
    filter: "blur(60px)",
    animation: "glow 6s ease-in-out infinite"
  },

  grid: {
    position: "fixed",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
    backgroundSize: "70px 70px",
    opacity: 0.2,
    pointerEvents: "none"
  },

  hero: {
    padding: "140px 20px 80px",
    textAlign: "center",
    maxWidth: 900,
    margin: "0 auto"
  },

  badge: {
    display: "inline-block",
    padding: "8px 14px",
    border: "1px solid rgba(0,240,255,0.3)",
    borderRadius: 999,
    fontSize: 12,
    letterSpacing: 2,
    color: "#9efcff",
    marginBottom: 20
  },

  title: {
    fontSize: 64,
    letterSpacing: -2,
    marginBottom: 20,
    background: "linear-gradient(90deg, #fff, #9efcff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },

  subtitle: {
    fontSize: 18,
    opacity: 0.7,
    lineHeight: 1.6,
    marginBottom: 30
  },

  ctaPrimary: {
    display: "inline-block",
    padding: "16px 28px",
    borderRadius: 14,
    background: "rgba(0,240,255,0.12)",
    border: "1px solid rgba(0,240,255,0.4)",
    color: "#9efcff",
    textDecoration: "none",
    fontWeight: 500,
    boxShadow: "0 0 30px rgba(0,240,255,0.15)"
  },

  microText: {
    marginTop: 14,
    fontSize: 12,
    opacity: 0.4
  },

  trust: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
    flexWrap: "wrap",
    fontSize: 12,
    opacity: 0.5,
    padding: "30px 20px"
  },

  section: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: "80px 20px"
  },

  h2: {
    fontSize: 28,
    marginBottom: 30
  },

  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 20
  },

  card: {
    padding: 20,
    borderRadius: 16,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)"
  },

  cardTitle: {
    color: "#9efcff",
    marginBottom: 10
  },

  cardText: {
    opacity: 0.7,
    lineHeight: 1.6
  },

  steps: {
    display: "grid",
    gap: 12
  },

  step: {
    display: "flex",
    gap: 20,
    padding: 16,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.02)"
  },

  stepNum: {
    color: "#9efcff",
    fontWeight: 600
  },

  stepText: {
    opacity: 0.8
  },

  quote: {
    fontSize: 22,
    lineHeight: 1.6,
    opacity: 0.8,
    borderLeft: "2px solid rgba(0,240,255,0.5)",
    paddingLeft: 20
  },

  final: {
    textAlign: "center",
    padding: "120px 20px"
  },

  finalTitle: {
    fontSize: 36,
    marginBottom: 20
  },

  footer: {
    textAlign: "center",
    padding: 40,
    fontSize: 12,
    opacity: 0.4
  }
};
