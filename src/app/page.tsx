"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const countersAnimated = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setStickyVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Counter animation
  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>(".stat-num[data-target]");
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const target = parseFloat(el.dataset.target || "0");
          const isDecimal = target % 1 !== 0;
          let suffix = "";
          let displayTarget = target;
          if (target >= 100) { suffix = "K+"; }
          else if (target >= 10 && !isDecimal) { suffix = "%"; }
          else if (target < 10 && !isDecimal) { suffix = "M+"; }

          let start: number | null = null;
          const step = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / 2000, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = isDecimal
              ? (eased * displayTarget).toFixed(1)
              : Math.floor(eased * displayTarget).toString();
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = displayTarget + suffix;
          };
          requestAnimationFrame(step);
          cio.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => cio.observe(el));
    return () => cio.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        :root {
          --bg: #050507;
          --bg2: #08080d;
          --surface: rgba(255,255,255,0.03);
          --surface2: rgba(255,255,255,0.06);
          --border: rgba(255,255,255,0.07);
          --border2: rgba(255,255,255,0.12);
          --text: #f0f0f5;
          --muted: rgba(240,240,245,0.45);
          --accent: #7c6aff;
          --accent2: #ff6aab;
          --accent3: #6affcb;
          --font-display: 'Syne', sans-serif;
          --font-body: 'DM Sans', sans-serif;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body);
          font-size: 16px;
          line-height: 1.6;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

        body::before {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 9999; opacity: .5;
        }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 999;
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 5%;
          backdrop-filter: blur(24px) saturate(180%);
          border-bottom: 1px solid var(--border);
          transition: background .3s;
        }
        .nav-logo {
          font-family: var(--font-display); font-weight: 800;
          font-size: 1.15rem; letter-spacing: .1em;
          background: linear-gradient(90deg, var(--accent), var(--accent2));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          text-decoration: none;
        }
        .nav-links { display: flex; gap: 2.5rem; list-style: none; }
        .nav-links a {
          color: var(--muted); text-decoration: none; font-size: .85rem;
          font-weight: 500; letter-spacing: .02em; transition: color .2s;
        }
        .nav-links a:hover { color: var(--text); }
        .nav-cta {
          background: var(--accent); color: #fff;
          font-family: var(--font-display); font-weight: 700;
          font-size: .8rem; letter-spacing: .08em;
          padding: 10px 22px; border-radius: 100px; border: none;
          cursor: pointer; text-decoration: none; transition: all .2s;
          box-shadow: 0 0 24px rgba(124,106,255,.4);
        }
        .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 0 36px rgba(124,106,255,.6); }

        /* HERO */
        .hero {
          min-height: 100vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          position: relative; overflow: hidden;
          padding: 120px 5% 80px; text-align: center;
        }
        .hero-bg {
          position: absolute; inset: 0; z-index: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,106,255,.18) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 90% 70%, rgba(255,106,171,.12) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 10% 80%, rgba(106,255,203,.08) 0%, transparent 60%),
            var(--bg);
        }
        .hero-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse 70% 70% at center, black, transparent);
          z-index: 0;
        }
        .orb {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none; z-index: 0;
        }
        .orb-1 { width: 600px; height: 600px; background: rgba(124,106,255,.12); top: -200px; left: -200px; animation: float1 14s ease-in-out infinite; }
        .orb-2 { width: 400px; height: 400px; background: rgba(255,106,171,.1); bottom: -100px; right: -100px; animation: float2 12s ease-in-out infinite; }
        .orb-3 { width: 300px; height: 300px; background: rgba(106,255,203,.08); top: 50%; left: 60%; animation: float3 10s ease-in-out infinite; }
        @keyframes float1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(40px,-40px); } }
        @keyframes float2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-30px,30px); } }
        @keyframes float3 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px,-20px); } }

        .hero-badge {
          position: relative; z-index: 1;
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--surface2); border: 1px solid var(--border2);
          border-radius: 100px; padding: 6px 16px;
          font-size: .75rem; font-weight: 500; color: var(--muted);
          letter-spacing: .05em; margin-bottom: 28px;
          backdrop-filter: blur(12px);
          animation: fadeDown .8s ease both;
        }
        .badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent3); box-shadow: 0 0 8px var(--accent3);
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .4; } }

        .hero-h1 {
          position: relative; z-index: 1;
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(2.8rem, 7vw, 6.5rem);
          line-height: 1.04; letter-spacing: -.02em;
          margin-bottom: 24px;
          animation: fadeUp .9s .1s ease both;
        }
        .hero-h1 .line2 {
          background: linear-gradient(90deg, var(--accent) 0%, var(--accent2) 50%, var(--accent3) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-size: 200% 100%;
          animation: gradShift 4s ease-in-out infinite alternate;
        }
        @keyframes gradShift { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }

        .hero-sub {
          position: relative; z-index: 1;
          font-size: clamp(.95rem, 1.8vw, 1.2rem); color: var(--muted);
          max-width: 580px; margin: 0 auto 44px; font-weight: 300;
          animation: fadeUp .9s .2s ease both;
        }
        .hero-actions {
          position: relative; z-index: 1;
          display: flex; gap: 14px; align-items: center; flex-wrap: wrap; justify-content: center;
          animation: fadeUp .9s .3s ease both;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--accent) 0%, #9b6aff 100%);
          color: #fff; font-family: var(--font-display);
          font-weight: 700; font-size: .9rem; letter-spacing: .06em;
          padding: 16px 36px; border-radius: 100px; border: none;
          cursor: pointer; text-decoration: none;
          box-shadow: 0 0 40px rgba(124,106,255,.5), 0 4px 24px rgba(0,0,0,.4);
          transition: all .25s; position: relative; overflow: hidden; display: inline-block;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 60px rgba(124,106,255,.7), 0 8px 32px rgba(0,0,0,.5); }
        .btn-secondary {
          background: var(--surface2); border: 1px solid var(--border2);
          color: var(--text); font-family: var(--font-display);
          font-weight: 600; font-size: .9rem; letter-spacing: .04em;
          padding: 16px 32px; border-radius: 100px; cursor: pointer; text-decoration: none;
          backdrop-filter: blur(12px); transition: all .25s;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .btn-secondary:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-1px); }

        .hero-stats {
          position: relative; z-index: 1;
          display: flex; gap: 40px; margin-top: 70px; flex-wrap: wrap; justify-content: center;
          animation: fadeUp .9s .5s ease both;
        }
        .stat-item { text-align: center; }
        .stat-num {
          font-family: var(--font-display); font-weight: 800;
          font-size: 2rem; letter-spacing: -.02em;
          background: linear-gradient(135deg, #fff 50%, var(--muted));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .stat-label { font-size: .75rem; color: var(--muted); letter-spacing: .08em; font-weight: 500; margin-top: 2px; }
        .stat-divider { width: 1px; background: var(--border); align-self: stretch; }

        /* PHONE */
        .hero-phone-wrap {
          position: relative; z-index: 1; margin-top: 70px;
          animation: fadeUp .9s .4s ease both;
        }
        .phone-outer {
          width: 280px; margin: 0 auto;
          background: linear-gradient(145deg, #1a1a2e, #0f0f1a);
          border-radius: 44px; border: 1.5px solid rgba(255,255,255,.1);
          box-shadow: 0 60px 120px rgba(0,0,0,.8), 0 0 0 1px rgba(255,255,255,.05), inset 0 1px 0 rgba(255,255,255,.08), 0 0 80px rgba(124,106,255,.15);
          padding: 14px; position: relative;
          animation: phonefloat 6s ease-in-out infinite;
        }
        @keyframes phonefloat { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        .phone-notch {
          width: 90px; height: 28px; background: #0a0a12;
          border-radius: 0 0 20px 20px; margin: 0 auto 10px;
          border: 1px solid rgba(255,255,255,.06); border-top: none;
        }
        .phone-screen { background: #0d0d1a; border-radius: 32px; overflow: hidden; min-height: 500px; }
        .tg-header {
          display: flex; align-items: center; gap: 10px; padding: 14px 16px;
          background: rgba(255,255,255,.03); border-bottom: 1px solid rgba(255,255,255,.05);
        }
        .tg-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          display: flex; align-items: center; justify-content: center;
          font-size: .7rem; font-weight: 700; color: #fff; flex-shrink: 0;
        }
        .tg-name { font-size: .8rem; font-weight: 600; color: var(--text); }
        .tg-status { font-size: .65rem; color: var(--accent3); }
        .tg-msgs { padding: 12px 10px; display: flex; flex-direction: column; gap: 10px; }
        .msg-bot {
          background: rgba(124,106,255,.15); border: 1px solid rgba(124,106,255,.2);
          border-radius: 4px 16px 16px 16px; padding: 10px 12px;
          font-size: .72rem; color: var(--text); line-height: 1.5; max-width: 85%;
        }
        .msg-user {
          background: rgba(255,255,255,.06); border-radius: 16px 4px 16px 16px;
          padding: 10px 12px; font-size: .72rem; color: var(--muted);
          max-width: 75%; align-self: flex-end;
        }
        .msg-audio {
          background: rgba(124,106,255,.2); border: 1px solid rgba(124,106,255,.3);
          border-radius: 4px 16px 16px 16px; padding: 10px 14px;
          display: flex; align-items: center; gap: 8px; max-width: 85%;
        }
        .audio-play {
          width: 28px; height: 28px; border-radius: 50%; background: var(--accent);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; box-shadow: 0 0 12px rgba(124,106,255,.5);
          font-size: .5rem; padding-left: 2px;
        }
        .audio-wave { display: flex; gap: 2px; align-items: center; }
        .audio-bar { width: 3px; border-radius: 2px; background: var(--accent); animation: audiowave 1s ease-in-out infinite; }
        .audio-bar:nth-child(1) { height: 8px; animation-delay: 0s; }
        .audio-bar:nth-child(2) { height: 14px; animation-delay: .1s; }
        .audio-bar:nth-child(3) { height: 10px; animation-delay: .2s; }
        .audio-bar:nth-child(4) { height: 18px; animation-delay: .15s; }
        .audio-bar:nth-child(5) { height: 12px; animation-delay: .3s; }
        .audio-bar:nth-child(6) { height: 16px; animation-delay: .05s; }
        .audio-bar:nth-child(7) { height: 9px; animation-delay: .25s; }
        @keyframes audiowave { 0%,100% { opacity: .4; transform: scaleY(1); } 50% { opacity: 1; transform: scaleY(1.4); } }
        .audio-label { font-size: .65rem; color: var(--muted); margin-left: 4px; }
        .streak-bar {
          margin: 8px 10px 0; background: rgba(106,255,203,.08);
          border: 1px solid rgba(106,255,203,.2); border-radius: 12px; padding: 10px 14px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .streak-left { display: flex; align-items: center; gap: 6px; font-size: .7rem; color: var(--accent3); font-weight: 600; }
        .streak-days { display: flex; gap: 4px; }
        .sday {
          width: 18px; height: 18px; border-radius: 4px; background: var(--accent3);
          opacity: .9; font-size: .55rem; font-weight: 700; color: #0a0a0a;
          display: flex; align-items: center; justify-content: center;
        }
        .sday.empty { background: rgba(255,255,255,.06); opacity: 1; color: var(--muted); }

        .float-chip {
          position: absolute; z-index: 2;
          background: rgba(10,10,20,0.85); border: 1px solid var(--border2);
          border-radius: 14px; padding: 10px 16px; backdrop-filter: blur(20px);
          font-size: .72rem; box-shadow: 0 8px 32px rgba(0,0,0,.5); white-space: nowrap;
        }
        .chip-left { left: -90px; top: 120px; animation: chipfloat1 7s ease-in-out infinite; }
        .chip-right { right: -80px; bottom: 180px; animation: chipfloat2 8s ease-in-out infinite; }
        @keyframes chipfloat1 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes chipfloat2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
        .chip-accent { color: var(--accent3); font-weight: 700; }
        .chip-label { color: var(--muted); margin-top: 2px; }

        /* SECTIONS */
        .section-inner { max-width: 1200px; margin: 0 auto; padding: 100px 5%; }
        .section-label { font-size: .72rem; font-weight: 600; letter-spacing: .15em; color: var(--accent); margin-bottom: 16px; text-transform: uppercase; }
        .section-h2 {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(2rem, 4vw, 3.5rem); line-height: 1.1;
          letter-spacing: -.02em; margin-bottom: 20px;
        }
        .section-sub { font-size: 1.05rem; color: var(--muted); font-weight: 300; max-width: 500px; }

        /* SOCIAL */
        .social-inner {
          max-width: 1200px; margin: 0 auto; padding: 60px 5%;
          display: flex; align-items: center; gap: 60px; flex-wrap: wrap;
        }
        .big-num {
          font-family: var(--font-display); font-size: 4rem; font-weight: 800; letter-spacing: -.03em;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; flex-shrink: 0;
        }
        .social-divider { width: 1px; height: 80px; background: var(--border); flex-shrink: 0; }
        .social-text h3 { font-family: var(--font-display); font-size: 1.4rem; font-weight: 700; margin-bottom: 8px; }
        .social-text p { color: var(--muted); font-size: .9rem; max-width: 340px; }
        .avatars { display: flex; }
        .av {
          width: 36px; height: 36px; border-radius: 50%; border: 2px solid var(--bg);
          background: linear-gradient(135deg, #3a3aff, #ff3aab);
          margin-left: -10px; font-size: .7rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center; color: #fff; flex-shrink: 0;
        }
        .av:first-child { margin-left: 0; }
        .av:nth-child(2) { background: linear-gradient(135deg, #ff6a00, #ee0979); }
        .av:nth-child(3) { background: linear-gradient(135deg, #11998e, #38ef7d); }
        .av:nth-child(4) { background: linear-gradient(135deg, #f7971e, #ffd200); }
        .av:nth-child(5) { background: linear-gradient(135deg, #7b4fff, #e040fb); }
        .av-more { background: var(--surface2) !important; color: var(--muted); font-size: .6rem; }
        .av-label { margin-left: 12px; font-size: .8rem; color: var(--muted); align-self: center; }
        .live-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(106,255,203,.08); border: 1px solid rgba(106,255,203,.25);
          border-radius: 100px; padding: 6px 14px;
          font-size: .75rem; font-weight: 600; color: var(--accent3); margin-left: auto;
        }
        .live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent3); animation: pulse 1.5s infinite; }

        /* HOW */
        .steps-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 60px; }
        .step-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 24px; padding: 36px 30px; position: relative; overflow: hidden;
          transition: all .3s; cursor: default;
        }
        .step-card::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(124,106,255,.08) 0%, transparent 70%);
          opacity: 0; transition: opacity .3s;
        }
        .step-card:hover { border-color: var(--border2); transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,.4); }
        .step-card:hover::before { opacity: 1; }
        .step-num { font-family: var(--font-display); font-size: 4rem; font-weight: 800; opacity: .06; position: absolute; top: 20px; right: 24px; line-height: 1; }
        .step-icon { width: 52px; height: 52px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; margin-bottom: 24px; }
        .step-icon-1 { background: rgba(124,106,255,.15); box-shadow: 0 0 24px rgba(124,106,255,.2); }
        .step-icon-2 { background: rgba(255,106,171,.15); box-shadow: 0 0 24px rgba(255,106,171,.2); }
        .step-icon-3 { background: rgba(106,255,203,.15); box-shadow: 0 0 24px rgba(106,255,203,.2); }
        .step-h { font-family: var(--font-display); font-weight: 700; font-size: 1.2rem; margin-bottom: 12px; }
        .step-p { color: var(--muted); font-size: .88rem; line-height: 1.7; }

        /* FEATURES */
        .features-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-top: 60px; }
        .feat-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 20px; padding: 28px 24px; transition: all .3s; cursor: default; position: relative; overflow: hidden;
        }
        .feat-card::after {
          content: ''; position: absolute; width: 100px; height: 100px; border-radius: 50%;
          filter: blur(40px); top: -20px; right: -20px; opacity: 0; transition: opacity .4s;
        }
        .feat-card:hover { border-color: var(--border2); transform: translateY(-3px); }
        .feat-card:hover::after { opacity: 1; }
        .feat-card.c-purple::after { background: rgba(124,106,255,.3); }
        .feat-card.c-pink::after { background: rgba(255,106,171,.3); }
        .feat-card.c-teal::after { background: rgba(106,255,203,.3); }
        .feat-card.c-orange::after { background: rgba(255,160,80,.3); }
        .feat-icon { font-size: 1.6rem; margin-bottom: 16px; display: block; }
        .feat-h { font-family: var(--font-display); font-weight: 700; font-size: 1rem; margin-bottom: 8px; }
        .feat-p { color: var(--muted); font-size: .8rem; line-height: 1.6; }
        .feat-card.large {
          grid-column: span 2;
          background: linear-gradient(135deg, rgba(124,106,255,.08), rgba(255,106,171,.05));
          border-color: rgba(124,106,255,.2);
        }

        /* DEMO */
        .demo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 60px; align-items: start; }
        .demo-phone {
          background: linear-gradient(145deg, #12121f, #0d0d18);
          border: 1px solid var(--border2); border-radius: 28px; padding: 20px;
          box-shadow: 0 40px 80px rgba(0,0,0,.6), 0 0 60px rgba(124,106,255,.08);
        }
        .demo-chat { display: flex; flex-direction: column; gap: 12px; padding: 8px 0; }
        .streak-title { font-size: .75rem; font-weight: 600; color: var(--muted); letter-spacing: .08em; text-transform: uppercase; margin-bottom: 12px; }
        .streak-dots { display: flex; gap: 6px; flex-wrap: wrap; }
        .sd {
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: .65rem; font-weight: 700; transition: transform .2s; cursor: default;
        }
        .sd:hover { transform: scale(1.15); }
        .sd.done { background: linear-gradient(135deg, var(--accent3), #00d4aa); color: #0a0a0a; }
        .sd.today { background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; box-shadow: 0 0 14px rgba(124,106,255,.5); }
        .sd.miss { background: rgba(255,255,255,.04); color: rgba(255,255,255,.2); border: 1px solid var(--border); }
        .demo-right { display: flex; flex-direction: column; gap: 20px; }
        .demo-widget { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 24px; transition: border-color .3s; }
        .demo-widget:hover { border-color: var(--border2); }
        .widget-header { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .widget-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
        .widget-title { font-family: var(--font-display); font-weight: 700; font-size: .95rem; }
        .widget-sub { font-size: .75rem; color: var(--muted); margin-top: 1px; }
        .audio-player {
          background: rgba(124,106,255,.08); border: 1px solid rgba(124,106,255,.2);
          border-radius: 14px; padding: 16px; display: flex; align-items: center; gap: 12px;
        }
        .ap-play {
          width: 40px; height: 40px; border-radius: 50%; background: var(--accent);
          cursor: pointer; flex-shrink: 0; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 20px rgba(124,106,255,.5); transition: all .2s;
          font-size: .7rem; padding-left: 2px; border: none; color: #fff;
        }
        .ap-play:hover { transform: scale(1.08); box-shadow: 0 0 30px rgba(124,106,255,.7); }
        .ap-time { font-size: .75rem; color: var(--muted); white-space: nowrap; }
        .video-preview {
          background: #080810; border-radius: 14px; height: 120px;
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden; cursor: pointer;
        }
        .video-preview::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(124,106,255,.2), rgba(255,106,171,.15));
        }
        .video-play-btn {
          width: 48px; height: 48px; border-radius: 50%;
          background: rgba(255,255,255,.15); backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,.2);
          display: flex; align-items: center; justify-content: center;
          font-size: .8rem; padding-left: 3px; transition: all .2s; z-index: 1;
          cursor: pointer;
        }
        .video-preview:hover .video-play-btn { transform: scale(1.1); background: rgba(255,255,255,.25); }
        .video-label { position: absolute; bottom: 10px; left: 14px; font-size: .7rem; color: rgba(255,255,255,.7); font-weight: 500; z-index: 1; }

        /* PRICING */
        .pricing-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 60px; align-items: start; }
        .price-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 28px; padding: 36px 30px; transition: all .3s; cursor: default; position: relative; overflow: hidden;
        }
        .price-card::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at 50% -20%, rgba(124,106,255,.06) 0%, transparent 60%);
          opacity: 0; transition: opacity .3s;
        }
        .price-card:hover { transform: translateY(-4px); }
        .price-card:hover::before { opacity: 1; }
        .price-card.featured {
          background: linear-gradient(145deg, rgba(124,106,255,.12), rgba(255,106,171,.06));
          border: 1.5px solid rgba(124,106,255,.4);
          box-shadow: 0 0 60px rgba(124,106,255,.15), 0 30px 60px rgba(0,0,0,.4);
          transform: scale(1.04);
        }
        .price-card.featured:hover { transform: scale(1.04) translateY(-4px); }
        .best-badge {
          position: absolute; top: 20px; right: 20px;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          color: #fff; font-size: .65rem; font-weight: 700;
          letter-spacing: .08em; padding: 4px 12px; border-radius: 100px; text-transform: uppercase;
        }
        .price-tier { font-size: .72rem; font-weight: 600; letter-spacing: .12em; color: var(--muted); text-transform: uppercase; margin-bottom: 12px; }
        .price-amount { font-family: var(--font-display); font-size: 3rem; font-weight: 800; letter-spacing: -.03em; line-height: 1; margin-bottom: 4px; }
        .price-period { font-size: .8rem; color: var(--muted); margin-bottom: 24px; }
        .price-divider { width: 100%; height: 1px; background: var(--border); margin-bottom: 24px; }
        .price-features { display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
        .pf { display: flex; align-items: center; gap: 10px; font-size: .85rem; color: var(--muted); }
        .pf-check {
          width: 18px; height: 18px; border-radius: 50%; flex-shrink: 0;
          background: rgba(106,255,203,.15); border: 1px solid rgba(106,255,203,.3);
          display: flex; align-items: center; justify-content: center;
          font-size: .5rem; color: var(--accent3);
        }
        .pf.active { color: var(--text); }
        .price-btn {
          width: 100%; padding: 14px; border-radius: 14px;
          font-family: var(--font-display); font-weight: 700;
          font-size: .85rem; letter-spacing: .06em;
          cursor: pointer; border: none; transition: all .25s; text-align: center;
        }
        .price-btn.outlined { background: transparent; border: 1px solid var(--border2); color: var(--text); }
        .price-btn.outlined:hover { border-color: var(--accent); color: var(--accent); }
        .price-btn.filled {
          background: linear-gradient(135deg, var(--accent), #9b6aff); color: #fff;
          box-shadow: 0 0 30px rgba(124,106,255,.4);
        }
        .price-btn.filled:hover { box-shadow: 0 0 50px rgba(124,106,255,.6); transform: translateY(-1px); }

        /* TESTIMONIALS */
        .testi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 60px; }
        .testi-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 24px; padding: 28px 24px; transition: all .3s; cursor: default;
        }
        .testi-card:hover { border-color: var(--border2); transform: translateY(-3px); box-shadow: 0 20px 40px rgba(0,0,0,.3); }
        .stars { display: flex; gap: 3px; margin-bottom: 16px; }
        .star { color: #ffd60a; font-size: .85rem; }
        .testi-quote { font-size: .92rem; line-height: 1.7; color: rgba(240,240,245,.85); margin-bottom: 20px; font-weight: 300; }
        .testi-author { display: flex; align-items: center; gap: 12px; }
        .ta-av { width: 38px; height: 38px; border-radius: 50%; font-size: .8rem; font-weight: 700; color: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .ta-name { font-size: .85rem; font-weight: 600; }
        .ta-role { font-size: .72rem; color: var(--muted); margin-top: 2px; }
        .testi-highlight {
          display: inline-block; background: rgba(124,106,255,.12);
          border: 1px solid rgba(124,106,255,.2); border-radius: 6px;
          padding: 2px 8px; font-size: .72rem; color: var(--accent); font-weight: 600; margin-top: 12px;
        }

        /* FINAL CTA */
        .cta-inner { max-width: 800px; margin: 0 auto; padding: 120px 5%; position: relative; text-align: center; }
        .cta-glow {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 60% at center, rgba(124,106,255,.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-h {
          font-family: var(--font-display); font-weight: 800;
          font-size: clamp(2.5rem, 5vw, 5rem); line-height: 1.05; letter-spacing: -.03em;
          margin-bottom: 24px; position: relative; z-index: 1;
        }
        .cta-sub { font-size: 1.1rem; color: var(--muted); font-weight: 300; max-width: 480px; margin: 0 auto 48px; position: relative; z-index: 1; }
        .cta-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; position: relative; z-index: 1; margin-bottom: 32px; }
        .cta-small { font-size: .78rem; color: var(--muted); position: relative; z-index: 1; }

        /* FOOTER */
        footer { background: var(--bg); border-top: 1px solid var(--border); padding: 40px 5%; }
        .footer-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
        .footer-logo {
          font-family: var(--font-display); font-weight: 800; font-size: 1rem; letter-spacing: .1em;
          background: linear-gradient(90deg, var(--accent), var(--accent2));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .footer-links { display: flex; gap: 24px; flex-wrap: wrap; }
        .footer-links a { font-size: .8rem; color: var(--muted); text-decoration: none; transition: color .2s; }
        .footer-links a:hover { color: var(--text); }
        .footer-copy { font-size: .75rem; color: rgba(240,240,245,.25); }

        /* STICKY BAR */
        .sticky-bar {
          position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
          z-index: 998; background: rgba(8,8,14,0.85); border: 1px solid var(--border2);
          backdrop-filter: blur(24px); border-radius: 100px; padding: 8px 8px 8px 20px;
          display: flex; align-items: center; gap: 14px;
          box-shadow: 0 20px 60px rgba(0,0,0,.6), 0 0 40px rgba(124,106,255,.1);
          opacity: 0; pointer-events: none; transition: opacity .4s; white-space: nowrap;
        }
        .sticky-bar.show { opacity: 1; pointer-events: all; }
        .sticky-bar-text { font-size: .82rem; color: var(--muted); }
        .sticky-bar-text strong { color: var(--text); }

        /* ANIMATIONS */
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
        .reveal { opacity: 0; transform: translateY(30px); transition: opacity .7s ease, transform .7s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: .1s; }
        .reveal-delay-2 { transition-delay: .2s; }
        .reveal-delay-3 { transition-delay: .3s; }

        /* DARK BG SECTIONS */
        .bg2 { background: var(--bg2); }
        .bg1 { background: var(--bg); }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .steps-grid { grid-template-columns: 1fr; }
          .features-grid { grid-template-columns: repeat(2,1fr); }
          .feat-card.large { grid-column: span 2; }
          .pricing-grid { grid-template-columns: 1fr; }
          .price-card.featured { transform: scale(1); }
          .testi-grid { grid-template-columns: 1fr; }
          .demo-grid { grid-template-columns: 1fr; }
          .nav-links { display: none; }
          .chip-left, .chip-right { display: none; }
          .social-divider { display: none; }
        }
        @media (max-width: 600px) {
          .features-grid { grid-template-columns: 1fr; }
          .feat-card.large { grid-column: span 1; }
          .hero-stats { gap: 20px; }
          .stat-divider { display: none; }
        }

        /* metrics widgets */
        .metric-box {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 12px; padding: 14px; text-align: center;
        }
        .metric-val { font-family: var(--font-display); font-weight: 800; font-size: 1.5rem; }
        .metric-lbl { font-size: .65rem; color: var(--muted); margin-top: 2px; }
      `}</style>

      {/* NAV */}
      <nav className="nav" style={{ background: scrolled ? "rgba(5,5,7,0.95)" : "rgba(5,5,7,0.7)" }}>
        <a href="#" className="nav-logo">MOTIVE AI</a>
        <ul className="nav-links">
          <li><a href="#how">How it works</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#demo">Demo</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>
        <a href="#pricing" className="nav-cta">GET STARTED</a>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="hero-badge">
          <span className="badge-dot" />
          120,000+ lives transformed · AI-Powered Daily Discipline
        </div>

        <h1 className="hero-h1">
          Discipline beats motivation.<br />
          <span className="line2">But we give you both.</span>
        </h1>

        <p className="hero-sub">
          Your personal AI mentor that pushes you every single day through voice, video and psychological conditioning. No excuses. Just results.
        </p>

        <div className="hero-actions">
          <a href="#pricing" className="btn-primary">⚡ Start Becoming Dangerous</a>
          <a href="#demo" className="btn-secondary">
            <span style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".5rem", paddingLeft: 1 }}>▶</span>
            Watch Demo
          </a>
        </div>

        <div className="hero-stats">
          {[
            { target: "120", label: "USERS WORLDWIDE" },
            { target: "94", label: "STREAK COMPLETION %" },
            { target: "4.9", label: "AVERAGE RATING" },
            { target: "2", label: "MILLION MESSAGES SENT" },
          ].map((s, i) => (
            <>
              {i > 0 && <div key={`div-${i}`} className="stat-divider" />}
              <div key={s.label} className="stat-item">
                <div className="stat-num" data-target={s.target}>0</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </>
          ))}
        </div>

        {/* Phone */}
        <div className="hero-phone-wrap">
          <div className="phone-outer">
            <div className="phone-notch" />
            <div className="phone-screen">
              <div className="tg-header">
                <div className="tg-avatar">M</div>
                <div>
                  <div className="tg-name">MOTIVE AI</div>
                  <div className="tg-status">● online · typing...</div>
                </div>
              </div>
              <div className="tg-msgs">
                <div className="msg-bot">Good morning, warrior. Today is day 47. You haven&apos;t come this far to come this far. 🔥</div>
                <div className="msg-audio">
                  <div className="audio-play">▶</div>
                  <div className="audio-wave">
                    {[0,1,2,3,4,5,6].map(i => <div key={i} className="audio-bar" />)}
                  </div>
                  <div className="audio-label">1:24</div>
                </div>
                <div className="msg-user">Ready 💪</div>
                <div className="msg-bot">Your mission today: 5AM wake-up, cold shower, 45 min focused work before checking your phone. The compound effect is real.</div>
              </div>
              <div className="streak-bar">
                <div className="streak-left">🔥 47-day streak</div>
                <div className="streak-days">
                  {["M","T","W","T","F","S"].map((d,i) => <div key={i} className="sday">{d}</div>)}
                  <div className="sday empty">S</div>
                </div>
              </div>
            </div>
            <div className="float-chip chip-left">
              <div className="chip-accent">🔥 +3 streak</div>
              <div className="chip-label">Goal crushed today</div>
            </div>
            <div className="float-chip chip-right">
              <div className="chip-accent">📈 94% completion</div>
              <div className="chip-label">Top 6% globally</div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg2">
        <div className="social-inner">
          <div className="big-num">120K+</div>
          <div className="social-divider" />
          <div className="social-text">
            <h3>Trusted by high-performers worldwide</h3>
            <p>Athletes, founders, students and professionals using MOTIVE AI daily to build unbreakable discipline.</p>
            <div style={{ display: "flex", alignItems: "center", gap: 0, marginTop: 20 }}>
              <div className="avatars">
                {["JK","AL","MR","TW"].map(n => <div key={n} className="av">{n}</div>)}
                <div className="av av-more">+K</div>
              </div>
              <div className="av-label">Joined this week</div>
            </div>
          </div>
          <div className="live-badge" style={{ marginLeft: "auto" }}>
            <span className="live-dot" /> 3,847 active now
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg2" id="how">
        <div className="section-inner">
          <div className="section-label reveal">Process</div>
          <h2 className="section-h2 reveal reveal-delay-1">Three steps to<br />unstoppable discipline.</h2>
          <p className="section-sub reveal reveal-delay-2">No complicated setup. No fluff. Just you and your AI mentor, starting from day one.</p>
          <div className="steps-grid">
            {[
              { num: "01", icon: "🤖", cls: "step-icon-1", h: "Join Telegram Bot", p: "One tap. No app download required. Connect in 30 seconds and your AI mentor profile is built instantly from your goals and psychology." },
              { num: "02", icon: "🎯", cls: "step-icon-2", h: "Receive Personalized Motivation", p: "Every morning: an AI voice message, a cinematic video and a custom mindset system — all calibrated to your emotional state and weekly performance data." },
              { num: "03", icon: "⚡", cls: "step-icon-3", h: "Build Unstoppable Discipline", p: "Track streaks, earn unlocks, crush habits. Watch as the compound effect turns small daily wins into a completely transformed version of yourself." },
            ].map((s, i) => (
              <div key={s.num} className={`step-card reveal reveal-delay-${i + 1}`}>
                <div className="step-num">{s.num}</div>
                <div className={`step-icon ${s.cls}`}>{s.icon}</div>
                <h3 className="step-h">{s.h}</h3>
                <p className="step-p">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg1" id="features">
        <div className="section-inner">
          <div className="section-label reveal">Capabilities</div>
          <h2 className="section-h2 reveal reveal-delay-1">Everything you need.<br />Nothing you don&apos;t.</h2>
          <div className="features-grid">
            <div className="feat-card large c-purple reveal">
              <span className="feat-icon">🎙️</span>
              <h4 className="feat-h">AI Voice Motivation</h4>
              <p className="feat-p">Hyper-realistic AI voices — choose from 12 mentor personas. From David Goggins intensity to stoic philosopher calm. Every message sounds like a real human who believes in you.</p>
            </div>
            {[
              { icon: "🎬", h: "Cinematic Daily Videos", p: "AI-generated motivational videos with cinematic visuals, dynamic music and synchronized narration.", c: "c-pink" },
              { icon: "🧠", h: "Personalized Mindset System", p: "Adapts to your psychology in real time. Builds a long-term mental conditioning program unique to your patterns.", c: "c-teal" },
              { icon: "⏰", h: "Smart Reminders", p: "Context-aware notifications that know when you need a push vs. when to let you focus. Zero annoying pings.", c: "c-orange" },
              { icon: "📊", h: "Habit Analytics", p: "Deep data on your discipline patterns. Weekly reports. Trend analysis. Insight into your weak points before they become setbacks.", c: "c-purple" },
              { icon: "🔥", h: "Streak System", p: "Gamified discipline. Streaks, milestones, and tier upgrades that make consistency addictive — not exhausting.", c: "c-teal" },
              { icon: "🧬", h: "Emotional AI Adaptation", p: "On hard days, the AI shifts tone automatically. It senses your energy. It adjusts. It never gives up on you.", c: "c-pink" },
              { icon: "🛡️", h: "Dopamine-Safe Productivity", p: "No cheap dopamine hits. MOTIVE AI is engineered to build long-term drive, not quick fixes that fade by noon.", c: "c-orange" },
            ].map((f, i) => (
              <div key={f.h} className={`feat-card ${f.c} reveal reveal-delay-${(i % 3) + 1}`}>
                <span className="feat-icon">{f.icon}</span>
                <h4 className="feat-h">{f.h}</h4>
                <p className="feat-p">{f.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section className="bg2" id="demo">
        <div className="section-inner">
          <div className="section-label reveal">See it live</div>
          <h2 className="section-h2 reveal reveal-delay-1">Your daily experience,<br />previewed.</h2>
          <div className="demo-grid">
            <div className="demo-phone reveal">
              <div className="tg-header">
                <div className="tg-avatar">M</div>
                <div>
                  <div className="tg-name">MOTIVE AI</div>
                  <div className="tg-status">● Mentor active</div>
                </div>
              </div>
              <div className="demo-chat" style={{ padding: "16px 8px 8px" }}>
                <div className="msg-bot">⚡ Day 12 check-in. Your consistency score this week: <strong style={{ color: "var(--accent3)" }}>87%</strong> — top 10% of all users.</div>
                <div className="msg-audio">
                  <div className="audio-play">▶</div>
                  <div className="audio-wave">{[0,1,2,3,4,5,6].map(i => <div key={i} className="audio-bar" />)}</div>
                  <div className="audio-label">2:07 · Morning coach</div>
                </div>
                <div className="msg-user">Listened. Let&apos;s go 🔥</div>
                <div className="msg-bot">Today&apos;s focus: deep work block 09:00–11:00. No phone. Your one non-negotiable: <em style={{ color: "var(--accent2)" }}>finish what you started yesterday.</em></div>
              </div>
              <div style={{ padding: "0 8px 12px" }}>
                <div className="streak-title">🔥 12-day discipline streak</div>
                <div className="streak-dots">
                  {Array(12).fill(0).map((_,i) => <div key={i} className="sd done">✓</div>)}
                  <div className="sd today">13</div>
                  {[14,15,16].map(n => <div key={n} className="sd miss">{n}</div>)}
                </div>
              </div>
            </div>

            <div className="demo-right reveal reveal-delay-1">
              <div className="demo-widget">
                <div className="widget-header">
                  <div className="widget-icon" style={{ background: "rgba(124,106,255,.15)" }}>🎙️</div>
                  <div>
                    <div className="widget-title">Morning Voice Message</div>
                    <div className="widget-sub">Marcus Aurelius persona · 2:07</div>
                  </div>
                </div>
                <div className="audio-player">
                  <button className="ap-play">▶</button>
                  <div style={{ flex: 1, height: 36, background: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 36'%3E%3Crect x='0' y='13' width='3' height='10' rx='2' fill='%237c6aff' opacity='.4'/%3E%3Crect x='6' y='8' width='3' height='20' rx='2' fill='%237c6aff' opacity='.6'/%3E%3Crect x='12' y='5' width='3' height='26' rx='2' fill='%237c6aff' opacity='.8'/%3E%3Crect x='18' y='10' width='3' height='16' rx='2' fill='%237c6aff' opacity='.7'/%3E%3Crect x='24' y='7' width='3' height='22' rx='2' fill='%237c6aff'/%3E%3Crect x='30' y='12' width='3' height='12' rx='2' fill='%237c6aff' opacity='.5'/%3E%3Crect x='36' y='4' width='3' height='28' rx='2' fill='%237c6aff' opacity='.9'/%3E%3Crect x='42' y='9' width='3' height='18' rx='2' fill='%237c6aff' opacity='.6'/%3E%3Crect x='48' y='6' width='3' height='24' rx='2' fill='%237c6aff' opacity='.8'/%3E%3Crect x='54' y='11' width='3' height='14' rx='2' fill='%237c6aff' opacity='.5'/%3E%3Crect x='60' y='3' width='3' height='30' rx='2' fill='%237c6aff'/%3E%3Crect x='66' y='8' width='3' height='20' rx='2' fill='%237c6aff' opacity='.7'/%3E%3Crect x='72' y='5' width='3' height='26' rx='2' fill='%237c6aff' opacity='.4'/%3E%3Crect x='78' y='10' width='3' height='16' rx='2' fill='%237c6aff' opacity='.3'/%3E%3Crect x='84' y='7' width='3' height='22' rx='2' fill='%237c6aff' opacity='.2'/%3E%3C/svg%3E\") no-repeat center/contain" }} />
                  <div className="ap-time">0:42 / 2:07</div>
                </div>
              </div>
              <div className="demo-widget">
                <div className="widget-header">
                  <div className="widget-icon" style={{ background: "rgba(255,106,171,.15)" }}>🎬</div>
                  <div>
                    <div className="widget-title">Cinematic Daily Video</div>
                    <div className="widget-sub">AI-generated · 60 seconds</div>
                  </div>
                </div>
                <div className="video-preview">
                  <div className="video-play-btn">▶</div>
                  <div className="video-label">Day 12 · &quot;The Compound Effect&quot;</div>
                </div>
              </div>
              <div className="demo-widget">
                <div className="widget-header">
                  <div className="widget-icon" style={{ background: "rgba(106,255,203,.15)" }}>📊</div>
                  <div>
                    <div className="widget-title">This Week&apos;s Discipline Score</div>
                    <div className="widget-sub">Updated daily</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  <div className="metric-box" style={{ background: "rgba(124,106,255,.08)", border: "1px solid rgba(124,106,255,.15)" }}>
                    <div className="metric-val" style={{ color: "var(--accent)" }}>87%</div>
                    <div className="metric-lbl">CONSISTENCY</div>
                  </div>
                  <div className="metric-box" style={{ background: "rgba(106,255,203,.08)", border: "1px solid rgba(106,255,203,.15)" }}>
                    <div className="metric-val" style={{ color: "var(--accent3)" }}>12</div>
                    <div className="metric-lbl">DAY STREAK</div>
                  </div>
                  <div className="metric-box" style={{ background: "rgba(255,106,171,.08)", border: "1px solid rgba(255,106,171,.15)" }}>
                    <div className="metric-val" style={{ color: "var(--accent2)", fontSize: "1rem" }}>Top 10%</div>
                    <div className="metric-lbl">GLOBALLY</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg1" id="pricing">
        <div className="section-inner">
          <div className="section-label reveal">Pricing</div>
          <h2 className="section-h2 reveal reveal-delay-1">Invest in your transformation.</h2>
          <p className="section-sub reveal reveal-delay-2">Less than a coffee a day. Cancel anytime. Results guaranteed within 30 days or full refund.</p>
          <div className="pricing-grid">
            {/* Starter */}
            <div className="price-card reveal">
              <div className="price-tier">Starter</div>
              <div className="price-amount">$9</div>
              <div className="price-period">per month</div>
              <div className="price-divider" />
              <div className="price-features">
                {["Daily text motivation","Basic streak tracker","3 AI voice messages/week","Telegram bot access"].map(f => (
                  <div key={f} className="pf active"><div className="pf-check">✓</div>{f}</div>
                ))}
                {["Cinematic videos","Personalized mindset system"].map(f => (
                  <div key={f} className="pf"><div className="pf-check" style={{ opacity: .3 }}>✗</div><span style={{ opacity: .4 }}>{f}</span></div>
                ))}
              </div>
              <button className="price-btn outlined">Get Starter TG BOT MOTIVATION CROWN</button>
            </div>
            {/* Pro */}
            <div className="price-card featured reveal reveal-delay-1">
              <div className="best-badge">BEST VALUE</div>
              <div className="price-tier" style={{ color: "var(--accent)" }}>Pro</div>
              <div className="price-amount" style={{ background: "linear-gradient(135deg,var(--accent),var(--accent2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>$19</div>
              <div className="price-period">per month</div>
              <div className="price-divider" style={{ background: "rgba(124,106,255,.3)" }} />
              <div className="price-features">
                {["Everything in Starter","Daily AI voice messages","Cinematic daily videos","Personalized mindset system","Full habit analytics","Smart adaptive reminders"].map(f => (
                  <div key={f} className="pf active"><div className="pf-check">✓</div>{f}</div>
                ))}
              </div>
              <button className="price-btn filled">⚡ Start Pro — $19/mo</button>
            </div>
            {/* Elite */}
            <div className="price-card reveal reveal-delay-2">
              <div className="price-tier">Elite</div>
              <div className="price-amount">$49</div>
              <div className="price-period">per month</div>
              <div className="price-divider" />
              <div className="price-features">
                {["Everything in Pro","1-on-1 AI coach calls","Custom mentor persona","Weekly progress reports","Priority AI adaptation","Elite community access"].map(f => (
                  <div key={f} className="pf active"><div className="pf-check">✓</div>{f}</div>
                ))}
              </div>
              <button className="price-btn outlined">Go Elite</button>
            </div>
          </div>
          <div className="reveal" style={{ textAlign: "center", marginTop: 32, fontSize: ".8rem", color: "var(--muted)" }}>
            🔒 Secure checkout · 30-day money back · Cancel anytime · No hidden fees
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg2" id="testimonials">
        <div className="section-inner">
          <div className="section-label reveal">Testimonials</div>
          <h2 className="section-h2 reveal reveal-delay-1">Real people.<br />Real transformation.</h2>
          <div className="testi-grid">
            {[
              { av: "JK", avBg: "linear-gradient(135deg,#7b4fff,#e040fb)", name: "Jordan K.", role: "Software Engineer, San Francisco", quote: "I've tried every productivity app. Nothing hit different like MOTIVE AI. The voice messages feel like someone who actually knows my story. Day 89 and I haven't missed once. My life genuinely changed.", hl: "🔥 89-day streak" },
              { av: "AL", avBg: "linear-gradient(135deg,#ff6a00,#ee0979)", name: "Alexis L.", role: "Founder, bootstrapped SaaS", quote: "It feels like having David Goggins in my pocket. Except smarter and it actually knows my weak points. I stopped procrastinating on my startup for the first time in 3 years. Week 6 of shipping every single day.", hl: "🚀 Launched product at day 42" },
              { av: "MR", avBg: "linear-gradient(135deg,#11998e,#38ef7d)", name: "Marco R.", role: "Operations Director, Milan", quote: "The cinematic videos broke something open in me. I cried on day 3. Then I got angry. Then I got focused. Lost 18kg, got promoted, and my morning routine is now the non-negotiable foundation of my entire life.", hl: "💪 -18kg · promoted · 120 days" },
              { av: "TW", avBg: "linear-gradient(135deg,#f7971e,#ffd200)", name: "Tia W.", role: "Medical resident, Chicago", quote: "I was skeptical. An AI bot motivating me? But the personalization is insane. It knew I needed to hear something different on the day I wanted to quit. Not generic. Not template. Felt personal. Still here. Day 203.", hl: "⚡ Day 203 · top 1% streak" },
              { av: "SP", avBg: "linear-gradient(135deg,#3a3aff,#00d4ff)", name: "Sofía P.", role: "UX Designer, Barcelona", quote: "My therapist asked what changed. I told her it's the AI that messages me every morning at 6:45. She wanted the link. The habit analytics showed me patterns in my behavior I'd never seen before. Game-changing.", hl: "📊 87% habit completion" },
              { av: "DH", avBg: "linear-gradient(135deg,#6affcb,#00b4d8)", name: "Daniel H.", role: "Athlete & entrepreneur, Dubai", quote: "Worth every cent. The Elite plan with custom mentor persona was my breakthrough. I chose a stoic philosopher voice and every morning I wake up thinking differently. MOTIVE AI didn't just change my habits — it changed my identity.", hl: "🏆 Elite member · 310 days" },
            ].map((t, i) => (
              <div key={t.name} className={`testi-card reveal reveal-delay-${i % 3}`}>
                <div className="stars">{"★★★★★".split("").map((s,j) => <span key={j} className="star">{s}</span>)}</div>
                <p className="testi-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="testi-author">
                  <div className="ta-av" style={{ background: t.avBg }}>{t.av}</div>
                  <div>
                    <div className="ta-name">{t.name}</div>
                    <div className="ta-role">{t.role}</div>
                  </div>
                </div>
                <div className="testi-highlight">{t.hl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg1" id="cta">
        <div className="cta-inner">
          <div className="cta-glow" />
          <div className="reveal" style={{ fontSize: "3rem", marginBottom: 16 }}>⚡</div>
          <h2 className="cta-h reveal reveal-delay-1">
            Your future self<br />
            <span style={{ background: "linear-gradient(90deg,var(--accent),var(--accent2),var(--accent3))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>is watching.</span>
          </h2>
          <p className="cta-sub reveal reveal-delay-2">
            Every day you wait is a day your competition doesn&apos;t. The person you want to become is built one morning at a time.
          </p>
          <div className="cta-actions reveal reveal-delay-2">
            <a href="#pricing" className="btn-primary" style={{ fontSize: "1rem", padding: "18px 44px" }}>Start Your Transformation</a>
            <a href="#demo" className="btn-secondary">See how it works</a>
          </div>
          <p className="cta-small reveal reveal-delay-3">
            Join <span style={{ color: "var(--accent3)" }}>120,000+</span> people already transforming ·{" "}
            <span style={{ color: "var(--accent3)" }}>30-day money back guarantee</span>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-logo">MOTIVE AI</div>
          <div className="footer-links">
            {["Privacy","Terms","Contact","Blog","Affiliate"].map(l => <a key={l} href="#">{l}</a>)}
          </div>
          <div className="footer-copy">© 2026 MOTIVE AI. All rights reserved.</div>
        </div>
      </footer>

      {/* STICKY BAR */}
      <div className={`sticky-bar ${stickyVisible ? "show" : ""}`}>
        <span className="sticky-bar-text"><strong>Limited time:</strong> First month 50% off</span>
        <a href="#pricing" className="btn-primary" style={{ fontSize: ".78rem", padding: "10px 20px" }}>Start Now — $9.50</a>
      </div>
    </>
  );
}
