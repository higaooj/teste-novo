import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import heroImg from "@/assets/hero.jpg";
import finaleImg from "@/assets/finale.jpg";
import story1 from "@/assets/story1.jpg";
import story2 from "@/assets/story2.jpg";
import story3 from "@/assets/story3.jpg";
import story4 from "@/assets/story4.jpg";
import g1 from "@/assets/gallery1.jpg";
import g2 from "@/assets/gallery2.jpg";
import g3 from "@/assets/gallery3.jpg";
import g4 from "@/assets/gallery4.jpg";
import g5 from "@/assets/gallery5.jpg";
import g6 from "@/assets/gallery6.jpg";

export const Route = createFileRoute("/")({
  component: LovePage,
});

/* ----------------------- DATA (edit freely) ----------------------- */
const RELATIONSHIP_START = new Date("2018-06-15T19:30:00");

const STORY = [
  { year: "2018", title: "Como nos conhecemos", text: "Um olhar bastou para o tempo parar. Eu não sabia naquele instante, mas a minha vida tinha acabado de mudar para sempre.", img: story3 },
  { year: "2018", title: "Primeiro encontro", text: "Risos nervosos, conversas que não acabavam e a certeza silenciosa de que ali começava algo eterno.", img: story2 },
  { year: "2019", title: "Primeira viagem", text: "Mar, vento e nós dois. Descobri que o lugar mais bonito do mundo é qualquer um, desde que seja ao seu lado.", img: story1 },
  { year: "2021", title: "Momentos especiais", text: "Cada dia comum com você virou extraordinário. Cada manhã, uma sorte. Cada noite, um agradecimento.", img: g3 },
  { year: "2022", title: "Casamento", text: "Disse 'sim' com a alma. E todo dia desde então é uma renovação dessa promessa.", img: story4 },
  { year: "Hoje", title: "Sonhos para o futuro", text: "Quero envelhecer ouvindo sua risada. Construir uma vida inteira de pequenos milagres com você.", img: g5 },
];

const GALLERY = [
  { src: g1, caption: "Onde o sol se pôs por nós", h: "tall" },
  { src: g2, caption: "Para sempre", h: "short" },
  { src: g3, caption: "Nossa dança favorita", h: "tall" },
  { src: g4, caption: "Até na chuva", h: "short" },
  { src: g5, caption: "O amanhecer mais bonito", h: "tall" },
  { src: g6, caption: "Flores e promessas", h: "short" },
];

const REASONS = [
  "Pelo seu sorriso que ilumina meus dias mais cinzas",
  "Pela forma como você diz meu nome",
  "Por me fazer rir até nos momentos mais difíceis",
  "Pela paz que eu sinto nos seus braços",
  "Pela mulher incrível que você é",
  "Pela sua força que me inspira todos os dias",
  "Pelo cheiro do seu cabelo de manhã",
  "Por aceitar o meu pior e amar o meu melhor",
  "Pelas pequenas coisas que só você sabe fazer",
  "Por ser o meu lar em qualquer lugar do mundo",
  "Pelo carinho silencioso nos dias pesados",
  "Por cada 'eu te amo' que ainda dá frio na barriga",
];

const STAR_MESSAGES = [
  "Você é o motivo do meu sorriso bobo.",
  "Te amo mais do que ontem, menos do que amanhã.",
  "Você é minha pessoa.",
  "Obrigado por existir.",
  "Eu te escolheria de novo. Sempre.",
  "Meu universo cabe nos seus olhos.",
  "Você é meu lugar favorito.",
  "Sou seu. Para sempre.",
];

const FUTURE = [
  { icon: "🏡", title: "Nossa casa dos sonhos", text: "Uma janela grande, uma cozinha cheia de risadas e um quintal onde o tempo vai passar devagar." },
  { icon: "✈️", title: "Viagens infinitas", text: "Cada continente, cada amanhecer, cada novo carimbo no passaporte — sempre de mãos dadas." },
  { icon: "👶", title: "Nossa família", text: "Pequenos pés correndo pela sala, herdando os seus olhos e o nosso amor." },
  { icon: "💫", title: "Projetos juntos", text: "Construir, criar, sonhar. Nada parece impossível quando você está do meu lado." },
];

/* ----------------------- UTILITIES ----------------------- */

function useCountdown(start: Date) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = now.getTime() - start.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.4375);
  const years = Math.floor(days / 365.25);
  return { years, months, days, hours };
}

/* ----------------------- PARTICLES ----------------------- */

function SparkleBackground() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 2,
      })),
    []
  );
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)", opacity: 0.4 }} />
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-champagne animate-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: "0 0 8px var(--champagne)",
          }}
        />
      ))}
    </div>
  );
}

function PetalsRain() {
  const petals = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: Math.random() * 6 + 8,
        size: Math.random() * 12 + 10,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 text-rose"
          style={{
            left: `${p.left}%`,
            fontSize: p.size,
            animation: `petalFall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          🌸
        </div>
      ))}
    </div>
  );
}

function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: Math.random() * 4 + 6,
        size: Math.random() * 16 + 14,
      })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute bottom-0"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            color: "var(--rose)",
            filter: "drop-shadow(0 0 8px var(--rose))",
            animation: `heartFloat ${h.duration}s ease-in ${h.delay}s infinite`,
          }}
        >
          ❤
        </div>
      ))}
    </div>
  );
}

/* ----------------------- SECTIONS ----------------------- */

function Hero() {
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("https://cdn.pixabay.com/audio/2022/10/18/audio_31750e1cb4.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }
    if (musicOn) {
      audioRef.current.pause();
      setMusicOn(false);
    } else {
      audioRef.current.play().catch(() => {});
      setMusicOn(true);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 animate-hero-zoom">
        <img src={heroImg} alt="Nosso amor" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />

      <button
        onClick={toggleMusic}
        aria-label="Tocar música romântica"
        className="glass absolute top-6 right-6 z-20 flex items-center gap-2 rounded-full px-4 py-2 text-sm text-pearl transition hover:scale-105"
      >
        <span className="text-base">{musicOn ? "🎵" : "🎶"}</span>
        <span className="hidden sm:inline">{musicOn ? "Pausar música" : "Tocar música"}</span>
      </button>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="mb-4 font-script text-2xl text-champagne sm:text-3xl"
        >
          Para você, meu amor
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.4 }}
          className="max-w-4xl text-5xl leading-[1.05] text-pearl sm:text-7xl md:text-8xl"
        >
          Você é a melhor parte<br />
          <span className="italic text-gradient-rose">da minha vida</span> ❤
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1.2 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-pearl/80 sm:text-xl"
        >
          Cada momento ao seu lado transformou minha história em algo extraordinário.
        </motion.p>

        <motion.a
          href="#historia"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 1 }}
          className="group relative mt-12 inline-flex items-center gap-3 overflow-hidden rounded-full border border-champagne/40 bg-rose/20 px-8 py-4 text-base text-pearl backdrop-blur-md transition hover:bg-rose/40 hover:shadow-[var(--shadow-glow)]"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          <span className="absolute inset-0 shimmer" />
          <span className="relative">Reviver Nossa História</span>
          <span className="relative">→</span>
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-pearl/60"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs tracking-[0.3em] uppercase">Role para baixo</span>
            <div className="h-12 w-px bg-gradient-to-b from-pearl/60 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StoryTimeline() {
  return (
    <section id="historia" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-20 text-center"
        >
          <p className="font-script text-2xl text-rose">A nossa jornada</p>
          <h2 className="mt-3 text-5xl text-pearl sm:text-6xl">Nossa <span className="italic text-gradient-rose">história</span></h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-champagne/40 to-transparent" />

          {STORY.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className={`relative mb-20 flex flex-col gap-8 md:gap-16 md:flex-row md:items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-rose shadow-[0_0_20px_var(--rose)]" />

              <div className="md:w-1/2 pl-12 md:pl-0">
                <div className="glass overflow-hidden rounded-3xl">
                  <img src={item.img} alt={item.title} loading="lazy" className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-96" />
                </div>
              </div>

              <div className="md:w-1/2 pl-12 md:pl-0">
                <p className="font-script text-3xl text-champagne">{item.year}</p>
                <h3 className="mt-2 text-3xl text-pearl sm:text-4xl">{item.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-pearl/75">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 text-center"
        >
          <p className="font-script text-2xl text-rose">Eternos instantes</p>
          <h2 className="mt-3 text-5xl text-pearl sm:text-6xl">Nossas Memórias<br /><span className="italic text-gradient-rose">Mais Bonitas</span></h2>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {GALLERY.map((item, i) => (
            <motion.button
              key={i}
              onClick={() => setLightbox(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group relative block w-full break-inside-avoid overflow-hidden rounded-3xl"
              style={{ perspective: 1000 }}
            >
              <div className="relative overflow-hidden rounded-3xl glass transition-transform duration-700 group-hover:scale-[1.03] group-hover:rotate-[0.5deg]" style={{ boxShadow: "var(--shadow-soft)" }}>
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-1000 group-hover:scale-110 ${item.h === "tall" ? "h-96 sm:h-[500px]" : "h-72 sm:h-80"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <p className="absolute bottom-5 left-5 right-5 font-script text-2xl text-pearl opacity-0 transition group-hover:opacity-100">
                  {item.caption}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-xl p-6"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 glass rounded-full w-12 h-12 text-pearl text-2xl"
              aria-label="Fechar"
            >
              ✕
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh]"
            >
              <img src={GALLERY[lightbox].src} alt="" className="max-h-[85vh] w-auto rounded-2xl object-contain" />
              <p className="mt-4 text-center font-script text-3xl text-champagne">{GALLERY[lightbox].caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function LoveCounter() {
  const { years, months, days, hours } = useCountdown(RELATIONSHIP_START);
  const items = [
    { label: "Anos", value: years },
    { label: "Meses", value: months },
    { label: "Dias", value: days },
    { label: "Horas", value: hours.toLocaleString() },
  ];
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="font-script text-2xl text-rose">Tempo de amor</p>
          <h2 className="mt-3 text-5xl text-pearl sm:text-6xl">Cada segundo<br /><span className="italic text-gradient-rose">valeu a pena</span></h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8"
              style={{ boxShadow: "var(--shadow-gold)" }}
            >
              <div className="absolute inset-0 shimmer opacity-30" />
              <div className="relative">
                <div className="font-display text-5xl sm:text-7xl text-gradient-rose font-light">{it.value}</div>
                <div className="mt-2 text-sm tracking-[0.3em] uppercase text-pearl/70">{it.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 font-script text-2xl text-champagne sm:text-3xl">
          ...e ainda é só o começo.
        </p>
      </div>
    </section>
  );
}

function LoveLetter() {
  const fullText = `Meu amor,

Se eu pudesse encontrar palavras tão bonitas quanto você é, eu escreveria um livro inteiro só para te dizer obrigado. Obrigado por cada manhã, por cada abraço apertado, por cada vez que você acreditou em mim quando nem eu conseguia.

Você é minha calma no caos, minha festa nos dias comuns, minha certeza no mundo todo. Eu nunca soube direito o que era ter um lar — até descobrir que ele tinha o seu nome.

Te amo hoje, te amarei amanhã, te amarei sempre.

— Seu, para a vida toda.`;

  const ref = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) setStarted(true);
    }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(id);
    }, 25);
    return () => clearInterval(id);
  }, [started, fullText]);

  return (
    <section ref={ref} className="relative py-32 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="font-script text-2xl text-rose">Do meu coração</p>
          <h2 className="mt-3 mb-12 text-5xl text-pearl sm:text-6xl">Uma <span className="italic text-gradient-rose">mensagem</span> para você</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative mx-auto rounded-3xl p-8 sm:p-14 text-left"
          style={{
            background: "linear-gradient(180deg, oklch(0.95 0.025 80 / 0.95), oklch(0.92 0.04 60 / 0.95))",
            boxShadow: "var(--shadow-soft), inset 0 0 80px oklch(0.85 0.06 50 / 0.3)",
            color: "oklch(0.25 0.04 25)",
          }}
        >
          <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: "radial-gradient(circle at 20% 10%, oklch(0.85 0.06 50 / 0.2), transparent 50%)" }} />
          <pre
            className="relative font-script text-xl leading-relaxed whitespace-pre-wrap sm:text-2xl"
            style={{ fontFamily: "var(--font-script)" }}
          >
            {typed}
            <span className="inline-block w-[2px] h-6 bg-current align-middle ml-1 animate-pulse" />
          </pre>
        </motion.div>
      </div>
    </section>
  );
}

function Reasons() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const toggle = (i: number) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 text-center"
        >
          <p className="font-script text-2xl text-rose">Toque para revelar</p>
          <h2 className="mt-3 text-5xl text-pearl sm:text-6xl">Motivos pelos quais<br /><span className="italic text-gradient-rose">eu te amo</span></h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {REASONS.map((r, i) => {
            const isFlipped = flipped.has(i);
            return (
              <motion.button
                key={i}
                onClick={() => toggle(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="group relative h-44 sm:h-52"
                style={{ perspective: 1000 }}
              >
                <div
                  className="relative w-full h-full transition-transform duration-700"
                  style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)" }}
                >
                  <div
                    className="absolute inset-0 glass rounded-2xl flex flex-col items-center justify-center p-4"
                    style={{ backfaceVisibility: "hidden", boxShadow: "var(--shadow-gold)" }}
                  >
                    <div className="text-4xl">❤</div>
                    <div className="mt-3 font-script text-xl text-champagne">Motivo {i + 1}</div>
                    <div className="mt-1 text-xs uppercase tracking-widest text-pearl/50">Tocar</div>
                  </div>
                  <div
                    className="absolute inset-0 rounded-2xl flex items-center justify-center p-4 text-center"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      background: "linear-gradient(135deg, oklch(0.82 0.11 18 / 0.85), oklch(0.65 0.13 30 / 0.85))",
                      boxShadow: "var(--shadow-glow)",
                    }}
                  >
                    <p className="font-display italic text-base sm:text-lg text-pearl leading-snug">{r}</p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SpecialVideo() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-12 text-center"
        >
          <p className="font-script text-2xl text-rose">Nossa cena favorita</p>
          <h2 className="mt-3 text-5xl text-pearl sm:text-6xl">Um <span className="italic text-gradient-rose">vídeo</span> para a eternidade</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative aspect-video overflow-hidden rounded-3xl glass"
          style={{ boxShadow: "var(--shadow-glow), var(--shadow-soft)" }}
        >
          <div className="absolute inset-0 p-3">
            <div className="h-full w-full overflow-hidden rounded-2xl">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/450p7goxZqg?rel=0"
                title="Nosso vídeo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>
        <p className="mt-6 text-center text-sm text-pearl/60 italic">
          (Substitua pelo link do nosso vídeo especial)
        </p>
      </div>
    </section>
  );
}

function StarrySky() {
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1.5,
        delay: Math.random() * 4,
      })),
    []
  );
  const [msg, setMsg] = useState<string | null>(null);

  const handleStar = () => {
    const m = STAR_MESSAGES[Math.floor(Math.random() * STAR_MESSAGES.length)];
    setMsg(m);
    setTimeout(() => setMsg(null), 3500);
  };

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, oklch(0.12 0.04 280), oklch(0.18 0.05 320), oklch(0.16 0.04 20))" }} />

      {stars.map((s) => (
        <button
          key={s.id}
          onClick={handleStar}
          className="absolute rounded-full bg-pearl animate-twinkle cursor-pointer hover:scale-[3] transition-transform"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            boxShadow: "0 0 10px var(--pearl), 0 0 20px var(--champagne)",
          }}
          aria-label="Estrela"
        />
      ))}

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6 pointer-events-none">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-5xl text-pearl sm:text-6xl"
        >
          Um céu inteiro<br /><span className="italic text-gradient-rose">para nós dois</span>
        </motion.h2>
        <p className="mt-6 text-pearl/70">Toque uma estrela ✨</p>

        <AnimatePresence>
          {msg && (
            <motion.div
              key={msg}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass mt-10 rounded-2xl px-8 py-5 font-script text-2xl text-champagne pointer-events-auto"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              {msg}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function FutureSection() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 text-center"
        >
          <p className="font-script text-2xl text-rose">O que ainda vem</p>
          <h2 className="mt-3 text-5xl text-pearl sm:text-6xl">Nosso <span className="italic text-gradient-rose">futuro</span></h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {FUTURE.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="glass group rounded-3xl p-8 transition hover:scale-[1.02]"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="text-5xl transition group-hover:scale-110">{f.icon}</div>
              <h3 className="mt-4 text-3xl text-pearl">{f.title}</h3>
              <p className="mt-3 text-pearl/75 leading-relaxed">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GrandFinale() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.div style={{ scale }} className="absolute inset-0">
        <img src={finaleImg} alt="Para sempre" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />

      <PetalsRain />
      <FloatingHearts />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="font-script text-2xl text-champagne sm:text-3xl"
        >
          para a eternidade
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.5 }}
          className="mt-6 max-w-4xl text-4xl leading-tight text-pearl sm:text-6xl md:text-7xl"
        >
          Se eu pudesse escolher novamente,<br />
          <span className="italic text-gradient-rose">escolheria você</span><br />
          em todas as vidas. ❤
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 1.5 }}
          className="mt-10 max-w-2xl text-lg text-pearl/80 sm:text-xl"
        >
          Obrigado por fazer parte da minha história e por ser o amor da minha vida.
        </motion.p>
      </div>
    </section>
  );
}

/* ----------------------- PAGE ----------------------- */

function LovePage() {
  return (
    <main className="relative dark">
      <SparkleBackground />
      <Hero />
      <StoryTimeline />
      <Gallery />
      <LoveCounter />
      <LoveLetter />
      <Reasons />
      <SpecialVideo />
      <StarrySky />
      <FutureSection />
      <GrandFinale />

      <footer className="relative py-10 text-center text-pearl/40 text-sm">
        Feito com <span className="text-rose">❤</span> só para você.
      </footer>
    </main>
  );
}
