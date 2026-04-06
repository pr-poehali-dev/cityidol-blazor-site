import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/4a0b8780-34eb-4391-867b-ead32523fd90/files/c5dd9cc8-8fb2-45da-9bf6-115cc5423b93.jpg";
const TRAINER_IMG = "https://cdn.poehali.dev/projects/4a0b8780-34eb-4391-867b-ead32523fd90/files/4c0f7acf-74c9-422b-8837-83eb675a2e7c.jpg";
const GROUP_IMG = "https://cdn.poehali.dev/projects/4a0b8780-34eb-4391-867b-ead32523fd90/files/d1e94870-fee6-4836-9ebd-cc8b9a06608f.jpg";
const TRAINER_MALE_IMG = "https://cdn.poehali.dev/projects/4a0b8780-34eb-4391-867b-ead32523fd90/files/85a017ed-f352-4d59-8aec-5c1f88ea6a9a.jpg";

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const COURSE_TYPES = ["Все", "K-pop Cover", "Girl Style", "Boy Style", "Поинтхил", "Детский K-pop"];

const SCHEDULE_DATA: Record<string, { time: string; course: string; trainer: string; spots: number; color: string }[]> = {
  "Пн": [
    { time: "10:00", course: "K-pop Cover", trainer: "Мина Ли", spots: 5, color: "bg-pink-100 text-pink-800" },
    { time: "12:00", course: "Поинтхил", trainer: "Ольга С.", spots: 8, color: "bg-green-100 text-green-800" },
    { time: "18:00", course: "Girl Style", trainer: "Дана К.", spots: 3, color: "bg-purple-100 text-purple-800" },
    { time: "20:00", course: "Boy Style", trainer: "Артём В.", spots: 6, color: "bg-orange-100 text-orange-800" },
  ],
  "Вт": [
    { time: "10:00", course: "Детский K-pop", trainer: "Светлана П.", spots: 4, color: "bg-yellow-100 text-yellow-800" },
    { time: "14:00", course: "K-pop Cover", trainer: "Мина Ли", spots: 7, color: "bg-pink-100 text-pink-800" },
    { time: "19:00", course: "Boy Style", trainer: "Артём В.", spots: 2, color: "bg-orange-100 text-orange-800" },
  ],
  "Ср": [
    { time: "10:00", course: "Поинтхил", trainer: "Ольга С.", spots: 9, color: "bg-green-100 text-green-800" },
    { time: "13:00", course: "Girl Style", trainer: "Дана К.", spots: 5, color: "bg-purple-100 text-purple-800" },
    { time: "17:00", course: "Детский K-pop", trainer: "Светлана П.", spots: 6, color: "bg-yellow-100 text-yellow-800" },
    { time: "19:30", course: "K-pop Cover", trainer: "Мина Ли", spots: 4, color: "bg-pink-100 text-pink-800" },
  ],
  "Чт": [
    { time: "11:00", course: "Boy Style", trainer: "Артём В.", spots: 8, color: "bg-orange-100 text-orange-800" },
    { time: "18:00", course: "Поинтхил", trainer: "Ольга С.", spots: 7, color: "bg-green-100 text-green-800" },
    { time: "20:00", course: "Girl Style", trainer: "Дана К.", spots: 3, color: "bg-purple-100 text-purple-800" },
  ],
  "Пт": [
    { time: "10:00", course: "K-pop Cover", trainer: "Мина Ли", spots: 6, color: "bg-pink-100 text-pink-800" },
    { time: "12:00", course: "Детский K-pop", trainer: "Светлана П.", spots: 5, color: "bg-yellow-100 text-yellow-800" },
    { time: "18:00", course: "Boy Style", trainer: "Артём В.", spots: 4, color: "bg-orange-100 text-orange-800" },
    { time: "20:00", course: "Поинтхил", trainer: "Ольга С.", spots: 9, color: "bg-green-100 text-green-800" },
  ],
  "Сб": [
    { time: "10:00", course: "K-pop Cover", trainer: "Мина Ли", spots: 8, color: "bg-pink-100 text-pink-800" },
    { time: "12:00", course: "Girl Style", trainer: "Дана К.", spots: 6, color: "bg-purple-100 text-purple-800" },
    { time: "14:00", course: "Boy Style", trainer: "Артём В.", spots: 5, color: "bg-orange-100 text-orange-800" },
    { time: "16:00", course: "Детский K-pop", trainer: "Светлана П.", spots: 7, color: "bg-yellow-100 text-yellow-800" },
  ],
  "Вс": [
    { time: "11:00", course: "Поинтхил", trainer: "Ольга С.", spots: 10, color: "bg-green-100 text-green-800" },
    { time: "13:00", course: "Girl Style", trainer: "Дана К.", spots: 4, color: "bg-purple-100 text-purple-800" },
  ],
};

const TRAINERS = [
  {
    name: "Мина Ли",
    role: "K-pop Cover / Girl Style",
    exp: "8 лет опыта · Сеул",
    img: TRAINER_IMG,
    color: "bg-pink-50",
  },
  {
    name: "Дана Краснова",
    role: "Girl Style / Поинтхил",
    exp: "6 лет опыта",
    img: GROUP_IMG,
    color: "bg-purple-50",
  },
  {
    name: "Артём Волков",
    role: "Boy Style / K-pop Cover",
    exp: "7 лет опыта",
    img: TRAINER_MALE_IMG,
    color: "bg-orange-50",
  },
];

const SERVICES = [
  { icon: "Sparkles", title: "K-pop Cover", desc: "Разучиваем хореографию популярных K-pop групп: BTS, BLACKPINK, aespa и других", color: "bg-pink-50 border-pink-200" },
  { icon: "Star", title: "Girl Style", desc: "Женственная K-pop хореография: плавные движения, женский шарм и стиль айдолов", color: "bg-purple-50 border-purple-200" },
  { icon: "Zap", title: "Boy Style", desc: "Мощная мужская хореография K-pop: чёткость, энергия и харизма", color: "bg-orange-50 border-orange-200" },
  { icon: "Leaf", title: "Поинтхил", desc: "Танец на каблуках в K-pop стиле — сексуальность, баланс и уверенность", color: "bg-green-50 border-green-200" },
  { icon: "Heart", title: "Детский K-pop", desc: "K-pop хореография для детей от 5 лет: весело, динамично и на любимую музыку", color: "bg-yellow-50 border-yellow-200" },
  { icon: "Users", title: "Cover-интенсивы", desc: "Трёхдневные интенсивы: выучим полный чистовой кавер на выступление", color: "bg-blue-50 border-blue-200" },
];

const PRICES = [
  {
    name: "Пробный",
    price: "500 ₽",
    period: "разово",
    features: ["1 занятие на выбор", "Любое направление", "Консультация тренера"],
    highlight: false,
    color: "border-stone-200",
    amount: 500,
  },
  {
    name: "Базовый",
    price: "3 900 ₽",
    period: "в месяц",
    features: ["8 занятий в месяц", "1 направление", "Приоритетная запись"],
    highlight: true,
    color: "border-pink-300",
    amount: 3900,
  },
  {
    name: "Безлимит",
    price: "6 900 ₽",
    period: "в месяц",
    features: ["Все занятия без лимита", "Все направления", "Персональный трекинг прогресса"],
    highlight: false,
    color: "border-purple-200",
    amount: 6900,
  },
];

const REVIEWS = [
  { name: "Алина Петрова", text: "Занимаюсь K-pop Cover уже полгода. Выучила хореографию BLACKPINK — подруги в шоке! Тренеры невероятно терпеливые.", rating: 5, course: "K-pop Cover" },
  { name: "Мария Соколова", text: "Привела дочку на детский K-pop в 6 лет. Она без ума от занятий — учит движения BTS и New Jeans!", rating: 5, course: "Детский K-pop" },
  { name: "Екатерина Ли", text: "Girl Style — это магия. Чувствую себя настоящим айдолом. Дана — лучший тренер, объясняет каждую деталь.", rating: 5, course: "Girl Style" },
  { name: "Анастасия Фёдорова", text: "Поинтхил полностью изменил мою осанку и уверенность. Хожу три раза в неделю и не могу остановиться.", rating: 5, course: "Поинтхил" },
];

const FAQS = [
  { q: "Нужен ли опыт танцев?", a: "Нет. Мы принимаем всех с нуля. В группах есть начинающий и продвинутый уровни." },
  { q: "С какого возраста можно записаться?", a: "Детские группы — с 5 лет. Взрослые — без ограничений по возрасту, K-pop любят все!" },
  { q: "Какую музыку разучиваем?", a: "BTS, BLACKPINK, aespa, NewJeans, IVE, Stray Kids, TWICE и другие топовые артисты. Репертуар обновляется каждый сезон." },
  { q: "Можно ли посетить пробное занятие?", a: "Да! Пробное занятие стоит 500 ₽. Оплатить можно онлайн через СБП или на месте." },
  { q: "Проводятся ли концерты и выступления?", a: "Да, дважды в год устраиваем отчётные показы. Участие добровольное, но все наши ученики в итоге выходят на сцену!" },
];

// Номер телефона для СБП (замените на реальный)
const SBP_PHONE = "+79991234567";
const SBP_BANK = "Сбербанк";

export default function Index() {
  const [activeDay, setActiveDay] = useState("Пн");
  const [activeCourse, setActiveCourse] = useState("Все");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sbpModal, setSbpModal] = useState<{ name: string; amount: number } | null>(null);
  const [sbpStep, setSbpStep] = useState<"info" | "confirm">("info");

  const filteredSchedule = (SCHEDULE_DATA[activeDay] || []).filter(
    (item) => activeCourse === "Все" || item.course === activeCourse
  );

  const navLinks = [
    { label: "О студии", href: "#about" },
    { label: "Услуги", href: "#services" },
    { label: "Тренеры", href: "#trainers" },
    { label: "Расписание", href: "#schedule" },
    { label: "Цены", href: "#prices" },
    { label: "Отзывы", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
    { label: "Контакты", href: "#contacts" },
  ];

  const openSbp = (plan: { name: string; amount: number }) => {
    setSbpModal(plan);
    setSbpStep("info");
  };

  const closeSbp = () => {
    setSbpModal(null);
    setSbpStep("info");
  };

  return (
    <div className="min-h-screen bg-background font-golos">
      {/* SBP MODAL */}
      {sbpModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={closeSbp} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 animate-fade-in-up">
            <button onClick={closeSbp} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <Icon name="X" size={20} />
            </button>

            {sbpStep === "info" ? (
              <>
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mb-5">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-cormorant text-2xl font-medium text-foreground mb-1">Оплата через СБП</h3>
                <p className="text-muted-foreground text-sm mb-6">Быстрый перевод по номеру телефона без комиссии</p>

                <div className="bg-muted/50 rounded-2xl p-4 space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Тариф</span>
                    <span className="font-medium text-foreground">{sbpModal.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Сумма</span>
                    <span className="font-semibold text-foreground text-lg font-cormorant">{sbpModal.amount.toLocaleString()} ₽</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between text-sm">
                    <span className="text-muted-foreground">Номер телефона</span>
                    <span className="font-medium text-foreground">{SBP_PHONE}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Банк получателя</span>
                    <span className="font-medium text-foreground">{SBP_BANK}</span>
                  </div>
                </div>

                <ol className="text-sm text-muted-foreground space-y-2 mb-6">
                  <li className="flex gap-2"><span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-xs flex-shrink-0">1</span>Откройте приложение вашего банка</li>
                  <li className="flex gap-2"><span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-xs flex-shrink-0">2</span>Выберите «Перевод по номеру телефона» (СБП)</li>
                  <li className="flex gap-2"><span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-xs flex-shrink-0">3</span>Введите номер и сумму {sbpModal.amount.toLocaleString()} ₽</li>
                  <li className="flex gap-2"><span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-xs flex-shrink-0">4</span>В комментарии укажите «CITYIDOL + {sbpModal.name}»</li>
                </ol>

                <button
                  onClick={() => setSbpStep("confirm")}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-2xl font-medium hover:opacity-90 transition-opacity"
                >
                  Я оплатил(а)
                </button>
              </>
            ) : (
              <>
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Icon name="Check" size={28} className="text-green-600" />
                  </div>
                  <h3 className="font-cormorant text-2xl font-medium text-foreground mb-2">Спасибо за оплату!</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Мы проверим платёж и свяжемся с вами в течение 30 минут для подтверждения записи.
                  </p>
                  <p className="text-xs text-muted-foreground bg-muted/50 rounded-xl p-3">
                    Если возникнут вопросы — напишите нам в WhatsApp или позвоните по номеру {SBP_PHONE}
                  </p>
                  <button
                    onClick={closeSbp}
                    className="mt-6 w-full bg-primary text-primary-foreground py-3 rounded-2xl font-medium hover:opacity-90 transition-opacity"
                  >
                    Готово
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-cormorant text-2xl font-semibold tracking-wide text-foreground">
            CITYIDOL
          </a>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="nav-link text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <a href="#schedule" className="hidden md:inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
            Записаться
          </a>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-border px-6 py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground py-1">
                {l.label}
              </a>
            ))}
            <a href="#schedule" className="mt-2 text-center bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-medium">
              Записаться
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Студия" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/65 to-transparent" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-xl animate-fade-in-up">
            <span className="inline-block bg-pink-100 text-pink-700 text-xs font-medium px-3 py-1 rounded-full mb-6">
              Студия корейских танцев · каверданс
            </span>
            <h1 className="font-cormorant text-6xl md:text-8xl font-light leading-none text-foreground mb-6">
              Стань своим
              <br />
              <em className="text-primary">K-pop айдолом</em>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 font-light">
              CITYIDOL — студия корейских танцев и кавердэнса. Учим хореографию BTS, BLACKPINK, aespa и других топовых K-pop групп с нуля.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#schedule" className="bg-primary text-primary-foreground px-7 py-3 rounded-full font-medium hover:opacity-90 transition-opacity">
                Записаться на занятие
              </a>
              <a href="#about" className="border border-border text-foreground px-7 py-3 rounded-full font-medium hover:bg-muted transition-colors">
                О студии
              </a>
            </div>
            <div className="mt-12 flex gap-8">
              {[["500+", "учеников"], ["5", "направлений"], ["3", "зала"]].map(([n, l]) => (
                <div key={l}>
                  <div className="font-cormorant text-3xl font-semibold text-foreground">{n}</div>
                  <div className="text-xs text-muted-foreground mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-1/4 w-72 h-72 bg-pink-100/40 blob animate-float hidden md:block" />
        <div className="absolute right-32 bottom-1/4 w-48 h-48 bg-purple-100/30 blob animate-float delay-300 hidden md:block" />
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs text-muted-foreground tracking-widest uppercase">О нас</span>
              <h2 className="font-cormorant text-5xl md:text-6xl font-light mt-3 mb-6 leading-tight">
                Студия, где<br /><em className="text-primary">рождаются</em> айдолы
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                CITYIDOL — первая в городе студия корейских танцев с профессиональными тренерами, прошедшими обучение в Сеуле. Мы специализируемся на K-pop кавердэнсе: разучиваем точную хореографию, работаем над стилем и энергетикой.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Каждый сезон обновляем репертуар, проводим отчётные концерты и cover-интенсивы. У нас танцуют дети, студенты и взрослые — возраст не важен, важна любовь к K-pop.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: "MapPin", label: "В центре города" },
                  { icon: "Clock", label: "7 дней в неделю" },
                  { icon: "Heart", label: "K-pop атмосфера" },
                ].map((item) => (
                  <div key={item.label} className="text-center p-4 bg-white rounded-2xl">
                    <Icon name={item.icon} size={20} className="text-primary mx-auto mb-2" />
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src={GROUP_IMG} alt="Занятие" className="w-full h-96 object-cover rounded-3xl" />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <Icon name="Award" size={18} className="text-pink-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-foreground">Лучшая K-pop студия 2024</div>
                    <div className="text-xs text-muted-foreground">по версии City Awards</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Направления</span>
            <h2 className="font-cormorant text-5xl font-light mt-3">Наши курсы</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <div key={s.title} className={`card-hover border rounded-3xl p-7 ${s.color}`}>
                <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                  <Icon name={s.icon} size={20} className="text-foreground" />
                </div>
                <h3 className="font-cormorant text-2xl font-medium text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINERS */}
      <section id="trainers" className="py-24 px-6" style={{ background: "hsl(270, 30%, 97%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Команда</span>
            <h2 className="font-cormorant text-5xl font-light mt-3">Наши тренеры</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {TRAINERS.map((t) => (
              <div key={t.name} className={`card-hover rounded-3xl overflow-hidden ${t.color} border border-border`}>
                <img src={t.img} alt={t.name} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="font-cormorant text-2xl font-medium text-foreground">{t.name}</h3>
                  <p className="text-primary text-sm mt-1">{t.role}</p>
                  <span className="inline-block mt-3 bg-white/70 text-muted-foreground text-xs px-3 py-1 rounded-full">
                    {t.exp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Расписание</span>
            <h2 className="font-cormorant text-5xl font-light mt-3">Выбери день и курс</h2>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeDay === day
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-secondary"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {COURSE_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setActiveCourse(type)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  activeCourse === type
                    ? "border-primary text-primary bg-pink-50"
                    : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {filteredSchedule.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Icon name="Calendar" size={36} className="mx-auto mb-3 opacity-30" />
              <p>В этот день занятий нет</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredSchedule.map((item, i) => (
                <div key={i} className={`schedule-cell rounded-2xl p-5 border-2 border-current/10 ${item.color}`}>
                  <div className="font-cormorant text-3xl font-medium">{item.time}</div>
                  <div className="font-medium text-sm mt-2">{item.course}</div>
                  <div className="text-xs mt-1 opacity-70">{item.trainer}</div>
                  <div className="flex items-center gap-1 mt-3 text-xs opacity-70">
                    <Icon name="Users" size={12} />
                    <span>Мест: {item.spots}</span>
                  </div>
                  <button className="mt-4 w-full bg-white/70 hover:bg-white text-current text-xs py-2 rounded-xl font-medium transition-colors">
                    Записаться
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-24 px-6 bg-cream">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Тарифы</span>
            <h2 className="font-cormorant text-5xl font-light mt-3">Цены</h2>
          </div>
          <div className="flex items-center justify-center gap-2 mb-10">
            <span className="text-2xl">⚡</span>
            <span className="text-sm text-muted-foreground">Оплата через <strong className="text-foreground">СБП</strong> — мгновенно, без комиссии</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {PRICES.map((p) => (
              <div
                key={p.name}
                className={`card-hover rounded-3xl border-2 p-8 bg-white ${p.color} ${p.highlight ? "relative shadow-lg" : ""}`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-4 py-1 rounded-full">
                    Популярный
                  </span>
                )}
                <h3 className="font-cormorant text-2xl font-medium text-foreground">{p.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="font-cormorant text-4xl font-semibold text-foreground">{p.price}</span>
                  <span className="text-muted-foreground text-sm ml-1">/ {p.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Check" size={14} className="text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openSbp({ name: p.name, amount: p.amount })}
                  className={`w-full py-3 rounded-2xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    p.highlight
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  <span>⚡</span> Оплатить через СБП
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Отзывы</span>
            <h2 className="font-cormorant text-5xl font-light mt-3">Что говорят ученики</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={i} className="card-hover bg-muted/40 rounded-3xl p-6 border border-border">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <span key={j} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">"{r.text}"</p>
                <div className="border-t border-border pt-4">
                  <div className="font-medium text-sm text-foreground">{r.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{r.course}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6" style={{ background: "hsl(270, 30%, 97%)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Вопросы</span>
            <h2 className="font-cormorant text-5xl font-light mt-3">FAQ</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-border overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-medium text-foreground">{faq.q}</span>
                  <Icon
                    name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                    size={18}
                    className="text-muted-foreground flex-shrink-0 ml-4"
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Где мы</span>
            <h2 className="font-cormorant text-5xl font-light mt-3">Контакты</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              {[
                { icon: "MapPin", title: "Адрес", value: "г. Казань, Деревня Универсиады, 22" },
                { icon: "Phone", title: "Телефон", value: "+7 (999) 123-45-67" },
                { icon: "Mail", title: "Email", value: "hello@cityidol.ru" },
                { icon: "Clock", title: "Режим работы", value: "Пн–Пт: 8:00–22:00\nСб–Вс: 9:00–20:00" },
              ].map((c) => (
                <div key={c.title} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon} size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">{c.title}</div>
                    <div className="text-sm text-foreground whitespace-pre-line">{c.value}</div>
                  </div>
                </div>
              ))}
              <div className="pt-4 flex flex-wrap gap-3">
                <a
                  href="#schedule"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Icon name="Calendar" size={16} />
                  Записаться онлайн
                </a>
                <button
                  onClick={() => openSbp({ name: "Пробное занятие", amount: 500 })}
                  className="inline-flex items-center gap-2 border border-border text-foreground px-7 py-3 rounded-full text-sm font-medium hover:bg-muted transition-colors"
                >
                  <span>⚡</span> Оплатить СБП
                </button>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden border border-border shadow-sm" style={{ height: "360px" }}>
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=49.129315%2C55.808695&z=16&pt=49.129315,55.808695,pm2rdm&text=%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%8C%2C%20%D0%94%D0%B5%D1%80%D0%B5%D0%B2%D0%BD%D1%8F%20%D0%A3%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%B0%D0%B4%D1%8B%2C%2022"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Карта CITYIDOL"
                allowFullScreen
                style={{ border: 0 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-white py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="font-cormorant text-2xl font-semibold tracking-wide">CITYIDOL</div>
            <div className="text-white/50 text-xs mt-1">Студия корейских танцев · каверданс</div>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-white/60">
            {navLinks.slice(0, 4).map((l) => (
              <a key={l.href} href={l.href} className="hover:text-white transition-colors">{l.label}</a>
            ))}
          </div>
          <div className="text-white/40 text-xs">© 2024 CITYIDOL</div>
        </div>
      </footer>
    </div>
  );
}