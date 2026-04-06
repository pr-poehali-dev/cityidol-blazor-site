import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/4a0b8780-34eb-4391-867b-ead32523fd90/files/c5dd9cc8-8fb2-45da-9bf6-115cc5423b93.jpg";
const TRAINER_IMG = "https://cdn.poehali.dev/projects/4a0b8780-34eb-4391-867b-ead32523fd90/files/4c0f7acf-74c9-422b-8837-83eb675a2e7c.jpg";
const GROUP_IMG = "https://cdn.poehali.dev/projects/4a0b8780-34eb-4391-867b-ead32523fd90/files/d1e94870-fee6-4836-9ebd-cc8b9a06608f.jpg";
const TRAINER_MALE_IMG = "https://cdn.poehali.dev/projects/4a0b8780-34eb-4391-867b-ead32523fd90/files/85a017ed-f352-4d59-8aec-5c1f88ea6a9a.jpg";

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const COURSE_TYPES = ["Все", "K-pop Cover", "Girl Style", "Boy Style", "Поинтхил", "Детский K-pop"];

const TRAINERS_LIST = ["Любой тренер", "Мина Ли", "Дана Краснова", "Артём Волков", "Светлана П.", "Ольга С."];

const SCHEDULE_DATA: Record<string, { time: string; course: string; trainer: string; spots: number; color: string }[]> = {
  "Пн": [
    { time: "10:00", course: "K-pop Cover", trainer: "Мина Ли", spots: 5, color: "bg-pink-100 text-pink-800" },
    { time: "12:00", course: "Поинтхил", trainer: "Ольга С.", spots: 8, color: "bg-green-100 text-green-800" },
    { time: "18:00", course: "Girl Style", trainer: "Дана Краснова", spots: 3, color: "bg-purple-100 text-purple-800" },
    { time: "20:00", course: "Boy Style", trainer: "Артём Волков", spots: 6, color: "bg-orange-100 text-orange-800" },
  ],
  "Вт": [
    { time: "10:00", course: "Детский K-pop", trainer: "Светлана П.", spots: 4, color: "bg-yellow-100 text-yellow-800" },
    { time: "14:00", course: "K-pop Cover", trainer: "Мина Ли", spots: 7, color: "bg-pink-100 text-pink-800" },
    { time: "19:00", course: "Boy Style", trainer: "Артём Волков", spots: 2, color: "bg-orange-100 text-orange-800" },
  ],
  "Ср": [
    { time: "10:00", course: "Поинтхил", trainer: "Ольга С.", spots: 9, color: "bg-green-100 text-green-800" },
    { time: "13:00", course: "Girl Style", trainer: "Дана Краснова", spots: 5, color: "bg-purple-100 text-purple-800" },
    { time: "17:00", course: "Детский K-pop", trainer: "Светлана П.", spots: 6, color: "bg-yellow-100 text-yellow-800" },
    { time: "19:30", course: "K-pop Cover", trainer: "Мина Ли", spots: 4, color: "bg-pink-100 text-pink-800" },
  ],
  "Чт": [
    { time: "11:00", course: "Boy Style", trainer: "Артём Волков", spots: 8, color: "bg-orange-100 text-orange-800" },
    { time: "18:00", course: "Поинтхил", trainer: "Ольга С.", spots: 7, color: "bg-green-100 text-green-800" },
    { time: "20:00", course: "Girl Style", trainer: "Дана Краснова", spots: 3, color: "bg-purple-100 text-purple-800" },
  ],
  "Пт": [
    { time: "10:00", course: "K-pop Cover", trainer: "Мина Ли", spots: 6, color: "bg-pink-100 text-pink-800" },
    { time: "12:00", course: "Детский K-pop", trainer: "Светлана П.", spots: 5, color: "bg-yellow-100 text-yellow-800" },
    { time: "18:00", course: "Boy Style", trainer: "Артём Волков", spots: 4, color: "bg-orange-100 text-orange-800" },
    { time: "20:00", course: "Поинтхил", trainer: "Ольга С.", spots: 9, color: "bg-green-100 text-green-800" },
  ],
  "Сб": [
    { time: "10:00", course: "K-pop Cover", trainer: "Мина Ли", spots: 8, color: "bg-pink-100 text-pink-800" },
    { time: "12:00", course: "Girl Style", trainer: "Дана Краснова", spots: 6, color: "bg-purple-100 text-purple-800" },
    { time: "14:00", course: "Boy Style", trainer: "Артём Волков", spots: 5, color: "bg-orange-100 text-orange-800" },
    { time: "16:00", course: "Детский K-pop", trainer: "Светлана П.", spots: 7, color: "bg-yellow-100 text-yellow-800" },
  ],
  "Вс": [
    { time: "11:00", course: "Поинтхил", trainer: "Ольга С.", spots: 10, color: "bg-green-100 text-green-800" },
    { time: "13:00", course: "Girl Style", trainer: "Дана Краснова", spots: 4, color: "bg-purple-100 text-purple-800" },
  ],
};

const TRAINERS = [
  { name: "Мина Ли", role: "K-pop Cover / Girl Style", exp: "8 лет опыта · Сеул", img: TRAINER_IMG, color: "bg-pink-50" },
  { name: "Дана Краснова", role: "Girl Style / Поинтхил", exp: "6 лет опыта", img: GROUP_IMG, color: "bg-purple-50" },
  { name: "Артём Волков", role: "Boy Style / K-pop Cover", exp: "7 лет опыта", img: TRAINER_MALE_IMG, color: "bg-orange-50" },
];

const SERVICES = [
  { icon: "Sparkles", title: "K-pop Cover", desc: "Разучиваем хореографию BTS, BLACKPINK, aespa и других топовых групп", color: "bg-pink-50 border-pink-200" },
  { icon: "Star", title: "Girl Style", desc: "Женственная K-pop хореография: плавность, шарм и стиль айдолов", color: "bg-purple-50 border-purple-200" },
  { icon: "Zap", title: "Boy Style", desc: "Мощная мужская хореография: чёткость, энергия и харизма", color: "bg-orange-50 border-orange-200" },
  { icon: "Leaf", title: "Поинтхил", desc: "Танец на каблуках в K-pop стиле — баланс, уверенность и стиль", color: "bg-green-50 border-green-200" },
  { icon: "Heart", title: "Детский K-pop", desc: "K-pop хореография для детей от 5 лет: весело и динамично", color: "bg-yellow-50 border-yellow-200" },
  { icon: "Users", title: "Cover-интенсивы", desc: "Трёхдневные интенсивы: полный чистовой кавер на выступление", color: "bg-blue-50 border-blue-200" },
];

const PRICES = [
  { name: "Пробный", price: "500 ₽", period: "разово", features: ["1 занятие на выбор", "Любое направление", "Консультация тренера"], highlight: false, color: "border-stone-200", amount: 500 },
  { name: "Базовый", price: "3 900 ₽", period: "в месяц", features: ["8 занятий в месяц", "1 направление", "Приоритетная запись"], highlight: true, color: "border-pink-300", amount: 3900 },
  { name: "Безлимит", price: "6 900 ₽", period: "в месяц", features: ["Все занятия без лимита", "Все направления", "Персональный трекинг"], highlight: false, color: "border-purple-200", amount: 6900 },
];

const REVIEWS = [
  { name: "Алина Петрова", text: "Занимаюсь K-pop Cover уже полгода. Выучила хореографию BLACKPINK — подруги в шоке! Тренеры невероятно терпеливые.", rating: 5, course: "K-pop Cover" },
  { name: "Мария Соколова", text: "Привела дочку на детский K-pop в 6 лет. Она без ума от занятий — учит движения BTS и NewJeans!", rating: 5, course: "Детский K-pop" },
  { name: "Екатерина Ли", text: "Girl Style — это магия. Чувствую себя настоящим айдолом. Дана объясняет каждую деталь.", rating: 5, course: "Girl Style" },
  { name: "Анастасия Фёдорова", text: "Поинтхил изменил мою осанку и уверенность. Хожу три раза в неделю и не могу остановиться.", rating: 5, course: "Поинтхил" },
];

const FAQS = [
  { q: "Нужен ли опыт танцев?", a: "Нет. Принимаем всех с нуля. В группах есть начинающий и продвинутый уровни." },
  { q: "С какого возраста можно записаться?", a: "Детские группы — с 5 лет. Взрослые — без ограничений по возрасту, K-pop любят все!" },
  { q: "Какую музыку разучиваем?", a: "BTS, BLACKPINK, aespa, NewJeans, IVE, Stray Kids, TWICE и другие. Репертуар обновляется каждый сезон." },
  { q: "Можно ли посетить пробное занятие?", a: "Да! Пробное занятие стоит 500 ₽. Оплатить можно онлайн через СБП или на месте." },
  { q: "Проводятся ли концерты?", a: "Да, дважды в год устраиваем отчётные показы. Все ученики в итоге выходят на сцену!" },
];

const SBP_PHONE = "+79991234567";
const SBP_BANK = "Сбербанк";

type BookingForm = {
  name: string;
  phone: string;
  course: string;
  trainer: string;
  day: string;
  comment: string;
};

export default function Index() {
  const [activeDay, setActiveDay] = useState("Пн");
  const [activeCourse, setActiveCourse] = useState("Все");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sbpModal, setSbpModal] = useState<{ name: string; amount: number } | null>(null);
  const [sbpStep, setSbpStep] = useState<"info" | "confirm">("info");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);
  const [booking, setBooking] = useState<BookingForm>({
    name: "", phone: "", course: "", trainer: "", day: "", comment: "",
  });

  const filteredSchedule = (SCHEDULE_DATA[activeDay] || []).filter(
    (item) => activeCourse === "Все" || item.course === activeCourse
  );

  const openBooking = (prefill?: Partial<BookingForm>) => {
    setBooking(b => ({ ...b, ...prefill }));
    setBookingDone(false);
    setBookingOpen(true);
  };

  const submitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingDone(true);
  };

  const navLinks = [
    { label: "О студии", href: "#about" },
    { label: "Курсы", href: "#services" },
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
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* BOOKING MODAL */}
      {bookingOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setBookingOpen(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-fade-in-up max-h-[90vh] overflow-y-auto">
            <button onClick={() => setBookingOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <Icon name="X" size={20} />
            </button>

            {!bookingDone ? (
              <>
                <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center mb-4">
                  <Icon name="CalendarCheck" size={22} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">Запись на занятие</h3>
                <p className="text-sm text-muted-foreground mb-6">Заполните форму — мы свяжемся с вами в течение 30 минут</p>

                <form onSubmit={submitBooking} className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Ваше имя *</label>
                    <input
                      required
                      type="text"
                      placeholder="Как вас зовут?"
                      value={booking.name}
                      onChange={e => setBooking(b => ({ ...b, name: e.target.value }))}
                      className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Телефон *</label>
                    <input
                      required
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={booking.phone}
                      onChange={e => setBooking(b => ({ ...b, phone: e.target.value }))}
                      className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Направление</label>
                    <select
                      value={booking.course}
                      onChange={e => setBooking(b => ({ ...b, course: e.target.value }))}
                      className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white"
                    >
                      <option value="">Выберите направление</option>
                      {COURSE_TYPES.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Тренер</label>
                    <select
                      value={booking.trainer}
                      onChange={e => setBooking(b => ({ ...b, trainer: e.target.value }))}
                      className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white"
                    >
                      {TRAINERS_LIST.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Удобный день</label>
                    <div className="flex flex-wrap gap-2">
                      {DAYS.map(d => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setBooking(b => ({ ...b, day: d }))}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            booking.day === d
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border text-muted-foreground hover:border-primary/50"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1 block">Комментарий</label>
                    <textarea
                      rows={2}
                      placeholder="Уровень подготовки, вопросы..."
                      value={booking.comment}
                      onChange={e => setBooking(b => ({ ...b, comment: e.target.value }))}
                      className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-2xl font-semibold text-sm hover:opacity-90 transition-opacity mt-2">
                    Записаться
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Check" size={28} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Заявка принята!</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {booking.name ? `${booking.name}, мы` : "Мы"} свяжемся с вами в ближайшее время для подтверждения записи.
                </p>
                <button onClick={() => setBookingOpen(false)} className="w-full bg-primary text-primary-foreground py-3 rounded-2xl font-semibold text-sm hover:opacity-90 transition-opacity">
                  Отлично!
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SBP MODAL */}
      {sbpModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeSbp} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 animate-fade-in-up">
            <button onClick={closeSbp} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <Icon name="X" size={20} />
            </button>
            {sbpStep === "info" ? (
              <>
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mb-5">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">Оплата через СБП</h3>
                <p className="text-muted-foreground text-sm mb-6">Быстрый перевод без комиссии</p>
                <div className="bg-muted/50 rounded-2xl p-4 space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Тариф</span>
                    <span className="font-medium text-foreground">{sbpModal.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Сумма</span>
                    <span className="font-bold text-foreground text-lg">{sbpModal.amount.toLocaleString()} ₽</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between text-sm">
                    <span className="text-muted-foreground">Номер</span>
                    <span className="font-medium text-foreground">{SBP_PHONE}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Банк</span>
                    <span className="font-medium text-foreground">{SBP_BANK}</span>
                  </div>
                </div>
                <ol className="text-sm text-muted-foreground space-y-2 mb-6">
                  {["Откройте приложение банка", "Перевод по номеру телефона (СБП)", `Введите номер и сумму ${sbpModal.amount.toLocaleString()} ₽`, `Комментарий: «CITYIDOL ${sbpModal.name}»`].map((step, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="w-5 h-5 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-xs flex-shrink-0 font-bold">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
                <button onClick={() => setSbpStep("confirm")} className="w-full bg-primary text-primary-foreground py-3 rounded-2xl font-semibold text-sm hover:opacity-90 transition-opacity">
                  Я оплатил(а)
                </button>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Check" size={28} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Спасибо!</h3>
                <p className="text-muted-foreground text-sm mb-6">Проверим платёж и свяжемся для подтверждения в течение 30 минут.</p>
                <button onClick={closeSbp} className="w-full bg-primary text-primary-foreground py-3 rounded-2xl font-semibold text-sm hover:opacity-90 transition-opacity">
                  Готово
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="text-xl font-bold tracking-tight text-foreground">
            CITY<span className="text-primary">IDOL</span>
          </a>
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="nav-link text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
                {l.label}
              </a>
            ))}
          </div>
          <button
            onClick={() => openBooking({})}
            className="hidden md:inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Записаться
          </button>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-border px-6 py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-sm text-muted-foreground hover:text-foreground py-1 font-medium">
                {l.label}
              </a>
            ))}
            <button onClick={() => { setMenuOpen(false); openBooking({}); }} className="mt-2 text-center bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold">
              Записаться
            </button>
          </div>
        )}
      </nav>

      {/* HERO — тёмный фон для читабельности */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Студия CITYIDOL" className="w-full h-full object-cover" />
          {/* Тёмный градиент — текст полностью читается */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-2xl">
            <span className="inline-block bg-primary/90 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              Казань · Студия K-pop кавердэнса
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white mb-6 tracking-tight">
              Стань своим
              <br />
              <span className="text-pink-300">K-pop айдолом</span>
            </h1>
            <p className="text-white/85 text-lg leading-relaxed mb-8 font-light max-w-lg">
              Учим хореографию BTS, BLACKPINK, aespa и других. Деревня Универсиады, 22 — приходи с нуля, уходи звездой.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => openBooking({})}
                className="bg-primary text-white px-8 py-3.5 rounded-full font-bold hover:opacity-90 transition-opacity text-sm"
              >
                Записаться на занятие
              </button>
              <a href="#schedule" className="border-2 border-white/60 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-colors text-sm">
                Расписание
              </a>
            </div>

            {/* Статы */}
            <div className="mt-12 flex gap-8">
              {[["500+", "учеников"], ["5", "направлений"], ["3", "зала"]].map(([n, l]) => (
                <div key={l}>
                  <div className="text-3xl font-extrabold text-white">{n}</div>
                  <div className="text-xs text-white/60 mt-1 font-medium">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Скролл-индикатор */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-float">
          <span className="text-white/40 text-xs font-medium">листай вниз</span>
          <Icon name="ChevronDown" size={20} className="text-white/40" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs text-muted-foreground tracking-widest uppercase font-semibold">О нас</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6 leading-tight text-foreground">
                Студия, где<br /><span className="text-primary">рождаются</span> айдолы
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                CITYIDOL — студия K-pop кавердэнса в Деревне Универсиады, Казань. Тренеры с опытом обучения в Сеуле. Разучиваем точную хореографию, работаем над стилем и энергетикой.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Каждый сезон обновляем репертуар, проводим отчётные концерты и cover-интенсивы. У нас танцуют дети, студенты и взрослые — возраст не важен, важна любовь к K-pop.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: "MapPin", label: "Дер. Универсиады" },
                  { icon: "Clock", label: "7 дней в неделю" },
                  { icon: "Heart", label: "K-pop атмосфера" },
                ].map((item) => (
                  <div key={item.label} className="text-center p-4 bg-white rounded-2xl">
                    <Icon name={item.icon} size={20} className="text-primary mx-auto mb-2" />
                    <span className="text-xs text-muted-foreground font-medium">{item.label}</span>
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
                    <div className="font-bold text-sm text-foreground">Лучшая K-pop студия 2024</div>
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
            <span className="text-xs text-muted-foreground tracking-widest uppercase font-semibold">Направления</span>
            <h2 className="text-4xl font-bold mt-3 text-foreground">Наши курсы</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <div key={s.title} className={`card-hover border rounded-3xl p-7 ${s.color}`}>
                <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                  <Icon name={s.icon} size={20} className="text-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                <button
                  onClick={() => openBooking({ course: s.title })}
                  className="mt-4 text-xs font-semibold text-primary hover:underline"
                >
                  Записаться →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINERS */}
      <section id="trainers" className="py-24 px-6" style={{ background: "hsl(270, 30%, 97%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs text-muted-foreground tracking-widest uppercase font-semibold">Команда</span>
            <h2 className="text-4xl font-bold mt-3 text-foreground">Наши тренеры</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {TRAINERS.map((t) => (
              <div key={t.name} className={`card-hover rounded-3xl overflow-hidden ${t.color} border border-border`}>
                <img src={t.img} alt={t.name} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground">{t.name}</h3>
                  <p className="text-primary text-sm mt-1 font-medium">{t.role}</p>
                  <span className="inline-block mt-2 bg-white/70 text-muted-foreground text-xs px-3 py-1 rounded-full font-medium">
                    {t.exp}
                  </span>
                  <button
                    onClick={() => openBooking({ trainer: t.name })}
                    className="mt-4 w-full border border-primary text-primary text-xs py-2 rounded-xl font-semibold hover:bg-primary hover:text-white transition-all"
                  >
                    Записаться к {t.name.split(" ")[0]}
                  </button>
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
            <span className="text-xs text-muted-foreground tracking-widest uppercase font-semibold">Расписание</span>
            <h2 className="text-4xl font-bold mt-3 text-foreground">Выбери день и курс</h2>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
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
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
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
                  <div className="text-3xl font-extrabold">{item.time}</div>
                  <div className="font-bold text-sm mt-2">{item.course}</div>
                  <div className="text-xs mt-1 opacity-70 font-medium">{item.trainer}</div>
                  <div className="flex items-center gap-1 mt-3 text-xs opacity-70 font-medium">
                    <Icon name="Users" size={12} />
                    <span>Мест: {item.spots}</span>
                  </div>
                  <button
                    onClick={() => openBooking({ course: item.course, trainer: item.trainer, day: activeDay })}
                    className="mt-4 w-full bg-white/80 hover:bg-white text-current text-xs py-2 rounded-xl font-bold transition-colors"
                  >
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
            <span className="text-xs text-muted-foreground tracking-widest uppercase font-semibold">Тарифы</span>
            <h2 className="text-4xl font-bold mt-3 text-foreground">Цены</h2>
          </div>
          <div className="flex items-center justify-center gap-2 mb-10">
            <span className="text-xl">⚡</span>
            <span className="text-sm text-muted-foreground">Оплата через <strong className="text-foreground">СБП</strong> — мгновенно, без комиссии</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {PRICES.map((p) => (
              <div key={p.name} className={`card-hover rounded-3xl border-2 p-8 bg-white ${p.color} ${p.highlight ? "relative shadow-lg" : ""}`}>
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-4 py-1 rounded-full font-bold">
                    Популярный
                  </span>
                )}
                <h3 className="text-xl font-bold text-foreground">{p.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-extrabold text-foreground">{p.price}</span>
                  <span className="text-muted-foreground text-sm ml-1 font-medium">/ {p.period}</span>
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
                  className={`w-full py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    p.highlight
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  ⚡ Оплатить через СБП
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
            <span className="text-xs text-muted-foreground tracking-widest uppercase font-semibold">Отзывы</span>
            <h2 className="text-4xl font-bold mt-3 text-foreground">Что говорят ученики</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={i} className="card-hover bg-muted/40 rounded-3xl p-6 border border-border">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <span key={j} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">«{r.text}»</p>
                <div className="border-t border-border pt-4">
                  <div className="font-bold text-sm text-foreground">{r.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 font-medium">{r.course}</div>
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
            <span className="text-xs text-muted-foreground tracking-widest uppercase font-semibold">Вопросы</span>
            <h2 className="text-4xl font-bold mt-3 text-foreground">FAQ</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-border overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-foreground">{faq.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={18} className="text-muted-foreground flex-shrink-0 ml-4" />
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
            <span className="text-xs text-muted-foreground tracking-widest uppercase font-semibold">Где мы</span>
            <h2 className="text-4xl font-bold mt-3 text-foreground">Контакты</h2>
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
                    <div className="text-xs text-muted-foreground mb-0.5 font-semibold uppercase tracking-wide">{c.title}</div>
                    <div className="text-sm text-foreground whitespace-pre-line font-medium">{c.value}</div>
                  </div>
                </div>
              ))}
              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => openBooking({})}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
                >
                  <Icon name="Calendar" size={16} />
                  Записаться онлайн
                </button>
                <button
                  onClick={() => openSbp({ name: "Пробное занятие", amount: 500 })}
                  className="inline-flex items-center gap-2 border border-border text-foreground px-7 py-3 rounded-full text-sm font-bold hover:bg-muted transition-colors"
                >
                  ⚡ Оплатить СБП
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
            <div className="text-2xl font-extrabold tracking-tight">CITY<span className="text-pink-300">IDOL</span></div>
            <div className="text-white/50 text-xs mt-1">Студия корейских танцев · Казань</div>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-white/60">
            {navLinks.slice(0, 4).map((l) => (
              <a key={l.href} href={l.href} className="hover:text-white transition-colors font-medium">{l.label}</a>
            ))}
          </div>
          <div className="text-white/40 text-xs">© 2024 CITYIDOL</div>
        </div>
      </footer>
    </div>
  );
}
