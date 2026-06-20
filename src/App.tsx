import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  ArrowRight, 
  Calendar, 
  Instagram, 
  X, 
  Plus, 
  Minus, 
  Check, 
  ChevronDown, 
  Menu as BurgerMenu,
  Sparkles,
  UtensilsCrossed,
  MessageCircle,
  HelpCircle,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS, CATEGORIES, IMAGES, TESTIMONIALS, FAQS } from './data';
import { MenuItem, ReservationData } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'menu'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Track currently active navigation section on home screen
  const [activeNav, setActiveNav] = useState<'beranda' | 'menu-favorit' | 'lokasi' | 'kontak'>('beranda');

  // Notification banner state
  const [notification, setNotification] = useState<string | null>(null);

  // Form states
  const [reservationForm, setReservationForm] = useState<ReservationData>({
    name: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '16:00',
    guests: 2,
    notes: ''
  });

  // Track active section automatically during scrolling
  useEffect(() => {
    if (activeTab !== 'home') return;

    const sections = ['hero', 'menu-favorit-kami', 'lokasi', 'kontak'];
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // check elements near view center
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'hero') setActiveNav('beranda');
          else if (id === 'menu-favorit-kami') setActiveNav('menu-favorit');
          else if (id === 'lokasi') setActiveNav('lokasi');
          else if (id === 'kontak') setActiveNav('kontak');
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [activeTab]);

  // Combined Navigation Click & Smooth Scroll
  const handleNavClick = (target: 'beranda' | 'menu-favorit' | 'lokasi' | 'kontak') => {
    setActiveTab('home');
    setActiveNav(target);
    setMobileMenuOpen(false);

    if (target === 'beranda') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setTimeout(() => {
        const el = document.getElementById(target === 'menu-favorit' ? 'menu-favorit-kami' : target);
        if (el) {
          // Centered scroll or start scroll with a safe header offset
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 120);
    }
  };

  // Direct order item via WhatsApp
  const orderProductDirectly = (item: MenuItem) => {
    const message = `Halo MC Train View Yogyakarta, saya tertarik dan ingin memesan menu ini secara instan:

• Nama Menu: ${item.name}
• Harga: Rp ${item.price.toLocaleString()}

Mohon siapkan pesanan saya untuk dinikmati saat kunjungan. Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/6281350150020?text=${encodedMessage}`;
    window.open(waUrl, '_blank');
    
    setNotification(`Mengalihkan ke WhatsApp untuk memesan ${item.name}...`);
  };

  // Clear notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Handle building Reservation and redirect to WhatsApp
  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, date, time, guests, notes } = reservationForm;
    
    if (!name || !phone) {
      alert("Mohon lengkapi Nama Anda dan Nomor WhatsApp.");
      return;
    }

    const message = `Halo MC Train View, saya ingin memesan meja (reservasi). Berikut adalah rincian reservasi saya:

• Nama: ${name}
• WhatsApp: ${phone}
• Tanggal: ${date}
• Jam Kunjungan: ${time} WIB
• Jumlah Tamu: ${guests} orang
• Catatan Khas: ${notes || 'Tidak ada'}

Mohon konfirmasi ketersediaan tempat. Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/6281350150020?text=${encodedMessage}`;
    window.open(waUrl, '_blank');
    
    setIsReservationOpen(false);
    setNotification("Mengalihkan ke WhatsApp untuk melengkapi reservasi Anda...");
  };

  // Toggle FAQ accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Filter products by selected category
  const filteredMenuItems = selectedCategory === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter((item) => item.categories.includes(selectedCategory));

  return (
    <div className="bg-background text-on-surface font-sans min-h-screen relative selection:bg-primary/20 selection:text-primary">
      
      {/* Dynamic Slide Notification Banner */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-primary-container text-on-primary-container px-6 py-3 rounded-full shadow-xl border border-outline-variant text-sm font-medium flex items-center gap-3 backdrop-blur-md"
            id="notification-toast"
          >
            <Sparkles className="w-4 h-4 text-[#baee99] animate-pulse" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-outline-variant/10">
        <nav className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto w-full transition-all duration-300">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-3 cursor-pointer group"
            id="brand-logo"
          >
            <img 
              alt="MC Train View Logo" 
              className="h-10 w-auto rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform duration-300" 
              src={IMAGES.logo}
            />
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-headline font-extrabold text-primary tracking-tight leading-none">
                MC Train View
              </span>
              <span className="text-[10px] font-sans font-medium text-secondary -mt-0.5 tracking-wider uppercase">
                YOGYAKARTA
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8" id="desktop-nav">
            <button 
              onClick={() => handleNavClick('beranda')}
              className={`text-sm font-medium pb-1 transition-colors border-b-2 duration-200 cursor-pointer ${activeTab === 'home' && activeNav === 'beranda' ? 'text-primary font-bold border-primary' : 'text-on-surface-variant border-transparent hover:text-primary hover:border-primary/40'}`}
            >
              Beranda
            </button>
            <button 
              onClick={() => handleNavClick('menu-favorit')}
              className={`text-sm font-medium pb-1 transition-colors border-b-2 duration-200 cursor-pointer ${activeTab === 'home' && activeNav === 'menu-favorit' ? 'text-primary font-bold border-primary' : 'text-on-surface-variant border-transparent hover:text-primary hover:border-primary/40'}`}
            >
              Menu kami
            </button>
            <button 
              onClick={() => handleNavClick('lokasi')}
              className={`text-sm font-medium pb-1 transition-colors border-b-2 duration-200 cursor-pointer ${activeTab === 'home' && activeNav === 'lokasi' ? 'text-primary font-bold border-primary' : 'text-on-surface-variant border-transparent hover:text-primary hover:border-primary/40'}`}
            >
              Lokasi
            </button>
          </div>

          {/* Interactive Actions (Cart Badge removed & Booking Trigger) */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* CTA Reservasi Button */}
            <button 
              onClick={() => setIsReservationOpen(true)}
              className="hidden sm:inline-block bg-primary text-on-primary px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-primary-container hover:shadow-lg hover:shadow-primary/10 active:scale-95 transition-all duration-200 cursor-pointer"
              id="cta-nav-reservasi"
            >
              Reservasi Meja
            </button>

            {/* Mobile Burger Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              <BurgerMenu className="w-6 h-6" />
            </button>

          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-outline-variant/20 absolute w-full top-18 left-0 z-30 shadow-lg"
            id="mobile-nav"
          >
            <div className="p-margin-mobile flex flex-col gap-4">
              <button 
                onClick={() => handleNavClick('beranda')}
                className={`text-left text-sm font-semibold p-2 rounded-lg ${activeTab === 'home' && activeNav === 'beranda' ? 'bg-primary-container/10 text-primary' : 'text-on-surface-variant'}`}
              >
                Beranda
              </button>
              <button 
                onClick={() => handleNavClick('menu-favorit')}
                className={`text-left text-sm font-semibold p-2 rounded-lg ${activeTab === 'home' && activeNav === 'menu-favorit' ? 'bg-primary-container/10 text-primary' : 'text-on-surface-variant'}`}
              >
                Menu kami
              </button>
              <button 
                onClick={() => handleNavClick('lokasi')}
                className={`text-left text-sm font-semibold p-2 rounded-lg ${activeTab === 'home' && activeNav === 'lokasi' ? 'bg-primary-container/10 text-primary' : 'text-on-surface-variant'}`}
              >
                Lokasi
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); setIsReservationOpen(true); }}
                className="w-full text-center bg-primary text-on-primary py-3 rounded-xl text-sm font-semibold mt-2"
              >
                Reservasi Meja
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Tab Views */}
      <main className="pb-20">
        
        {/* VIEW 1: HOME TAB */}
        {activeTab === 'home' && (
          <div>
            
            {/* Cinematic Hero Section */}
            <section id="hero" className="relative min-h-[85vh] flex items-center overflow-hidden py-16">
              <div className="absolute inset-0 z-0">
                <div 
                  className="w-full h-full bg-cover bg-center brightness-90 animate-fade-in" 
                  style={{ backgroundImage: `url(${IMAGES.hero})` }}
                />
                {/* Elegant overlay matching Cream background palette */}
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
              </div>
              
              <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
                <div className="max-w-2xl">
                  {/* Decorative modern label tag */}
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full mb-6 border border-primary/20">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Unik di Yogyakarta</span>
                  </div>
                  
                  <h1 className="text-3xl md:text-5xl lg:text-5xl font-headline font-extrabold text-primary mb-6 leading-tight select-none">
                    MC Train View - Sensasi Ngopi &amp; Bakery di Pinggir Rel Kereta
                  </h1>
                  
                  <p className="text-base md:text-lg text-on-surface-variant mb-10 leading-relaxed max-w-xl">
                    Nikmati Affogato spesial dan kehangatan croissant mentega premium sambil melihat kereta api melintas anggun tepat di depan mata Anda. Pengalaman kuliner magis di jantung tradisi Yogyakarta.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => setIsReservationOpen(true)}
                      className="bg-primary text-on-primary px-8 py-4 rounded-xl font-semibold text-sm shadow-xl shadow-primary/15 hover:bg-primary-container active:scale-95 hover:scale-[1.02] cursor-pointer transition-all duration-200 flex items-center justify-center gap-2"
                      id="hero-reservasi-btn"
                    >
                      <Calendar className="w-4 h-4" />
                      Reservasi via WhatsApp
                    </button>
                    <button 
                      onClick={() => setActiveTab('menu')}
                      className="border border-primary text-primary px-8 py-4 rounded-xl font-semibold text-sm hover:bg-primary-container/10 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                      id="hero-menu-btn"
                    >
                      Lihat Menu Utama
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Trackline Section Divider */}
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10">
              <div className="trackline opacity-40" />
            </div>

            {/* Story/About Section: Harmoni Rasa & Laju Kereta */}
            <section className="py-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full" id="tentang">
              <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                
                {/* Visual Left: Bakery Interior */}
                <div className="relative">
                  <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-2xl relative border-4 border-surface-container-high/40">
                    <img 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
                      alt="MC Train View Bakery Interior" 
                      src={IMAGES.about}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-6 left-6 text-white max-w-xs">
                      <p className="text-xs uppercase tracking-widest font-bold text-secondary-container">Fresh Everyday</p>
                      <p className="text-lg font-headline font-bold">Tekstur roti autentik berpadu mentega Prancis murni</p>
                    </div>
                  </div>
                </div>

                {/* Narrative Right */}
                <div>
                  <span className="text-secondary font-bold text-xs tracking-widest uppercase inline-block mb-3 bg-surface-container px-3 py-1 rounded-full border border-outline-variant/30">
                    Tentang Kami
                  </span>
                  <h2 className="text-2xl md:text-3xl font-headline font-extrabold text-primary mt-2 mb-6 leading-tight">
                    Harmoni Rasa &amp; Laju Kereta
                  </h2>
                  <p className="text-sm md:text-base text-on-surface-variant mb-5 leading-relaxed">
                    Terletak di Jl. Nogomudo No.302, Ambarukmo, MC Train View bukan sekadar tempat mengudap biasa. Kami mengkurasi harmoni rasa di mana aroma seduhan kopi Arabika berpadu dengan kehangatan roti artisan panggang segar, diselimuti ritme tenang perlintasan kereta Jogja.
                  </p>
                  <p className="text-sm md:text-base text-on-surface-variant mb-8 leading-relaxed">
                    Setiap sudut kafe kami dirancang hangat untuk kenyamanan—menjadikan titik terbaik bagi Anda yang ingin bekerja (WFH), bercengkerama intim bersama kekasih dan keluarga, atau sekadar menikmati ketenangan senja Yogyakarta.
                  </p>
                  
                  {/* Highlight Location Card */}
                  <div className="flex items-center gap-4 p-4 bg-surface-container rounded-xl border border-outline-variant/30">
                    <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-primary text-sm select-none">Lokasi Strategis</p>
                      <p className="text-xs text-on-surface-variant leading-relaxed">Jl. Nogomudo No.302, Ambarukmo, Caturtunggal, Yogyakarta</p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Featured Favorites Section */}
            <section id="menu-favorit-kami" className="py-20 bg-surface-container-lowest border-y border-outline-variant/10">
              <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                
                <div className="max-w-md mx-auto text-center mb-16">
                  <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-background px-3 py-1.5 rounded-full border border-outline-variant/30">Paling Digemari</span>
                  <h2 className="text-2xl md:text-3xl font-headline font-extrabold text-primary mt-4 mb-3">Menu Favorit Kami</h2>
                  <p className="text-sm text-on-surface-variant">Intip hidangan utama legendaris dan kreasi pastry yang membuat pelanggan kami jatuh cinta.</p>
                </div>

                {/* Show top 3 products directly as visual cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {MENU_ITEMS.slice(0, 3).map((item) => (
                    <motion.div 
                      key={item.id}
                      whileHover={{ y: -8 }}
                      className="bg-surface rounded-2xl overflow-hidden border border-outline-variant/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                    >
                      <div className="h-60 relative overflow-hidden bg-surface-container">
                        <img 
                          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700" 
                          alt={item.name} 
                          src={item.image}
                        />
                        {item.tag && (
                          <span className="absolute top-4 right-4 bg-tertiary-container text-on-tertiary-container font-semibold text-[10px] px-3.5 py-1.5 rounded-full shadow-md z-10">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2 gap-2">
                          <h3 className="font-headline text-lg font-bold text-primary group-hover:text-secondary truncate">
                            {item.name}
                          </h3>
                          <span className="text-secondary font-bold text-sm shrink-0 whitespace-nowrap">
                            Rp {item.price.toLocaleString()}
                          </span>
                        </div>
                        
                        <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3 mb-6">
                          {item.desc}
                        </p>
                        
                        <div className="trackline opacity-10 mb-5" />
                        
                        <button 
                          onClick={() => orderProductDirectly(item)}
                          className="w-full py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-semibold flex items-center justify-center gap-2 select-none active:scale-95 h-10 transition-all duration-200 cursor-pointer"
                          id={`add-${item.id}`}
                        >
                          <MessageCircle className="w-4 h-4 text-on-primary" />
                          Pesan Sekarang
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Button to view all menu */}
                <div className="text-center mt-12">
                  <button 
                    onClick={() => { setActiveTab('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-6 py-3 rounded-xl text-xs font-bold hover:bg-primary hover:text-white cursor-pointer transition-all duration-200"
                    id="explore-full-menu"
                  >
                    Eksplor Menu Lengkap kami
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </section>

            {/* Testimonials Review Slider */}
            <section className="py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
              <div className="text-center max-w-sm mx-auto mb-16">
                <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-surface-container px-3 py-1 rounded-full border border-outline-variant/30">Rasa & Suara</span>
                <h2 className="text-2xl font-headline font-extrabold text-primary mt-3">Kata Pengunjung Kami</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {TESTIMONIALS.map((t) => (
                  <div key={t.id} className="p-8 rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative">
                    <span className="text-5xl font-serif text-outline/25 absolute top-4 left-4 font-extrabold select-none pointer-events-none">“</span>
                    <div className="relative z-10">
                      <div className="flex gap-1 mb-4">
                        {[...Array(t.rating)].map((_, i) => (
                          <Sparkles key={i} className="w-4 h-4 text-[#3ba6843] text-primary fill-primary" />
                        ))}
                      </div>
                      <p className="text-sm text-on-surface-variant italic leading-relaxed mb-6">
                        "{t.quote}"
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-sm leading-none mb-1">{t.name}</h4>
                      <p className="text-xs text-on-surface-variant">{t.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Dynamic Interactive Reservation Booking Widget */}
            <section className="py-12 px-margin-mobile md:px-margin-desktop overflow-hidden">
              <div className="max-w-container-max mx-auto bg-primary rounded-[2rem] p-8 md:p-16 relative overflow-hidden text-on-primary">
                
                {/* Ambient blob visuals */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-container rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
                </div>
                
                <div className="relative z-10 grid md:grid-cols-12 gap-10 items-center">
                  
                  <div className="md:col-span-7 text-center md:text-left">
                    <h2 className="text-2xl md:text-4xl lg:text-4xl font-headline font-bold mb-4">
                      Siapkan Tempat Terbaik Anda
                    </h2>
                    <p className="text-sm md:text-base mb-8 opacity-90 leading-relaxed max-w-xl">
                      Pastikan Anda mengamankan meja makan terbaik dengan sudut pandang rel kereta tak terhalang. Kami menerima pemesanan tempat bagi rombongan, keluarga, kencan sore, maupun sendiri.
                    </p>
                    
                    <button 
                      onClick={() => setIsReservationOpen(true)}
                      className="inline-flex items-center gap-2.5 bg-background text-primary px-8 py-4 rounded-full font-bold text-sm tracking-wide shadow-xl active:scale-95 hover:scale-[1.03] duration-150 transition-all cursor-pointer"
                      id="section-booking-trigger"
                    >
                      <Calendar className="w-5 h-5 text-primary" />
                      Reservasi Meja Instan
                    </button>
                  </div>

                  <div className="md:col-span-5 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col gap-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#afe2b3] select-none">Mengapa Memesan?</p>
                    
                    <div className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#afe2b3]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#afe2b3]" />
                      </div>
                      <p className="text-xs leading-relaxed">Garansi duduk di spot premium luar ruangan (outdoor) pinggir rel.</p>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#afe2b3]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#afe2b3]" />
                      </div>
                      <p className="text-xs leading-relaxed">Bisa melakukan pesanan hidangan instan terlebih dahulu via WhatsApp.</p>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#afe2b3]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#afe2b3]" />
                      </div>
                      <p className="text-xs leading-relaxed">Fleksibel mengubah jadwal ketersediaan melalui obrolan ramah kami.</p>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Interactive FAQs Accordion */}
            <section className="py-16 px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto w-full">
              <div className="text-center mb-12">
                <h3 className="text-xl md:text-2xl font-headline font-bold text-primary">Ada Pertanyaan?</h3>
                <p className="text-xs text-on-surface-variant mt-1.5">Informasi praktis seputar kunjungan kuliner Anda di kafe kami</p>
              </div>

              <div className="space-y-4">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="bg-surface-container rounded-xl border border-outline-variant/20 overflow-hidden">
                    <button 
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex justify-between items-center p-5 text-left font-semibold text-sm md:text-base text-primary hover:text-secondary group transition-colors duration-150 cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-200 text-on-surface-variant ${openFaqIndex === idx ? 'rotate-180 text-primary' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFaqIndex === idx && (
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden bg-surface-container-low"
                        >
                          <p className="p-5 pt-0 text-xs md:text-sm text-on-surface-variant leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>

            {/* Visit Details & Location Maps Integration */}
            <section className="py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full" id="lokasi">
              <div className="grid md:grid-cols-12 gap-8 p-3 items-stretch">
                
                {/* Details side */}
                <div id="kontak" className="md:col-span-5 flex flex-col justify-center pr-0 md:pr-4">
                  <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-surface-container px-3 py-1 rounded-full border border-outline-variant/30 inline-block w-max mb-3">
                    Kunjungi kami
                  </span>
                  <h2 className="text-2xl md:text-3xl font-headline font-extrabold text-primary mb-6 leading-tight">
                    Temukan Jalan Pulang Menuju Aroma Kopi & Roti
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-primary text-sm select-none">Alamat Kafe</p>
                        <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                          Jl. Nogomudo No.302, Ambarukmo, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-primary text-sm select-none">Jam Operasional</p>
                        <p className="text-xs text-on-surface-variant mt-1 leading-none font-medium">
                          Setiap Hari: 08:00 - 22:00 WIB
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-primary text-sm select-none">WhatsApp Kami</p>
                        <a 
                          href="https://wa.me/6281350150020" 
                          target="_blank" 
                          className="text-xs font-semibold text-secondary hover:underline flex items-center gap-1 mt-1"
                        >
                          +62 813-5015-0020
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map panel */}
                <div className="md:col-span-7 h-[420px] rounded-3xl overflow-hidden shadow-inner border border-outline-variant/60 relative">
                  <div className="absolute inset-0 bg-surface-container-high flex flex-col items-center justify-center text-on-surface-variant p-6 text-center">
                    {/* Visual map representation */}
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <Compass className="w-8 h-8 animate-spin-slow" />
                    </div>
                    <h3 className="font-headline text-xl font-bold mb-2">Google Maps</h3>
                    <p className="text-xs text-on-surface-variant max-w-md leading-relaxed mb-6">
                      Rute cepat menuju MC Train View Jogja. Klik tombol di bawah ini untuk membuka peta digital langsung di perangkat Anda.
                    </p>
                    <a 
                      className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-semibold text-xs hover:bg-primary-container shadow-md hover:shadow-lg transition-all active:scale-95" 
                      href="https://maps.google.com/?q=MC+Train+View+Jogja" 
                      target="_blank"
                      rel="noreferrer"
                    >
                      Hubungkan Ke Google Maps
                    </a>
                  </div>
                </div>

              </div>
            </section>

          </div>
        )}

        {/* VIEW 2: MENU TAB */}
        {activeTab === 'menu' && (
          <div>
            
            {/* Header / Intro */}
            <header className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-12 pb-8 text-center">
              <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-surface-container px-3.5 py-1.5 rounded-full border border-outline-variant/30 inline-block mb-3">
                Citra Rasa Autentik
              </span>
              <h1 className="text-3xl md:text-5xl font-headline font-extrabold text-primary mb-4 leading-none">
                Menu Kami
              </h1>
              <p className="max-w-2xl mx-auto text-sm md:text-base text-on-surface-variant leading-relaxed">
                Paduan harmonis antara aroma pilihan espresso murni, teh menyegarkan, serta kelembutan aneka roti panggang autentik, disajikan hangat di tepi rel kereta ikonik Sleman. Nikmati setiap gigitan sembari menunggu momen kereta melintas.
              </p>
              <div className="trackline w-24 mx-auto mt-10 opacity-35" />
            </header>

            {/* Category Navigation Pills (Pills to filter) */}
            <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-12">
              <div className="flex flex-nowrap overflow-x-auto pb-4 gap-3 no-scrollbar justify-start md:justify-center">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`category-pill whitespace-nowrap px-6 py-2.5 rounded-full font-semibold text-xs tracking-wide transition-all cursor-pointer ${selectedCategory === cat.id ? 'bg-primary text-on-primary shadow-md scale-102 font-bold' : 'bg-surface-container-high text-on-surface-variant hover:bg-primary-fixed hover:text-primary-semibold'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </section>

            {/* Menu Items Grid */}
            <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-16">
              {filteredMenuItems.length === 0 ? (
                <div className="text-center py-20 bg-surface-container rounded-2xl border border-outline-variant/20 max-w-sm mx-auto">
                  <p className="text-sm font-semibold text-on-surface-variant">Belum ada menu pada kategori ini.</p>
                  <button 
                    onClick={() => setSelectedCategory('all')}
                    className="text-xs text-primary font-bold underline mt-2 cursor-pointer"
                  >
                    Kembali ke Semua Menu
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredMenuItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-surface-lowest rounded-xl overflow-hidden border border-outline-variant/35 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full group"
                    >
                      {/* Photo Container */}
                      <div className="h-56 relative bg-cover bg-center overflow-hidden bg-surface-container shrink-0">
                        <img 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                          alt={item.name} 
                          src={item.image}
                        />
                        {item.tag && (
                          <span className="absolute top-4 right-4 bg-[#384c00] text-white px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase shadow-xs">
                            {item.tag}
                          </span>
                        )}
                      </div>

                      {/* Info Body */}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-3 gap-2">
                          <h3 className="text-lg font-headline font-bold text-primary tracking-tight">
                            {item.name}
                          </h3>
                          <span className="text-secondary font-bold text-sm shrink-0 whitespace-nowrap">
                            Rp {item.price.toLocaleString()}
                          </span>
                        </div>
                        
                        <p className="text-xs text-on-surface-variant leading-relaxed flex-grow line-clamp-3 mb-6">
                          {item.desc}
                        </p>

                        <button 
                          onClick={() => orderProductDirectly(item)}
                          className="mt-auto flex items-center justify-center gap-2 w-full py-3 bg-primary text-on-primary rounded-xl font-semibold text-xs hover:bg-primary-container active:scale-95 transition-all duration-150 cursor-pointer select-none"
                        >
                          <MessageCircle className="w-4 h-4 text-on-primary" />
                          Pesan via WhatsApp
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Custom order trigger message block */}
            <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-8">
              <div className="bg-surface-container rounded-2xl p-8 md:p-12 relative overflow-hidden border border-outline-variant/30">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                  <div className="max-w-xl text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-headline font-bold text-primary mb-3">Mau Pesan Dari Rumah?</h3>
                    <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                      Lagi mager tapi rindu dengan signature dish MC Train View? Cukup tekan tombol pesan langsung pada menu di atas untuk terhubung instan, atau hubungi kontak customer service WhatsApp kami di bawah ini.
                    </p>
                  </div>
                  <a 
                    className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3.5 rounded-full font-bold text-xs hover:opacity-95 shadow-md active:scale-95 cursor-pointer shrink-0 transition-transform font-sans" 
                    href="https://wa.me/6281350150020"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Pesan lewat WhatsApp langsung
                  </a>
                </div>
                {/* Embedded visuals (faint background track lines) */}
                <div className="trackline absolute bottom-2 left-0 w-full opacity-5 pointer-events-none" />
              </div>
            </section>

          </div>
        )}

      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-surface-container border-t border-outline-variant/30">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto w-full border-b border-outline-variant/10">
          
          {/* Brand Card Column */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-6">
              <img 
                alt="MC Train View Logo" 
                className="h-8 w-auto rounded-full object-cover" 
                src={IMAGES.logo}
              />
              <span className="text-xl font-headline font-extrabold text-primary tracking-tight">MC Train View</span>
            </div>
            <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed mb-6">
              Menghadirkan kehangatan bakery segar murni dan seduhan kopi spesial dengan pemandangan lalu lalang rel kereta api Jogja yang memikat hati.
            </p>
            {/* Social icons */}
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/mctrainviewjogja" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
                aria-label="Link to Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/6281350150020" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
                aria-label="Link to WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Column Grid */}
          <div className="grid grid-cols-2 gap-10 lg:gap-16">
            <div>
              <h4 className="text-primary font-bold text-sm tracking-wide mb-6">Navigasi</h4>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-xs text-on-surface-variant hover:text-secondary transition-colors cursor-pointer text-left"
                  >
                    Beranda
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setActiveTab('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-xs text-on-surface-variant hover:text-secondary transition-colors cursor-pointer text-left"
                  >
                    Menu Utama
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavClick('lokasi')}
                    className="text-xs text-on-surface-variant hover:text-secondary transition-colors cursor-pointer text-left"
                  >
                    Lokasi Kafe
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavClick('kontak')}
                    className="text-xs text-on-surface-variant hover:text-secondary transition-colors cursor-pointer text-left"
                  >
                    Hubungi kami
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-primary font-bold text-sm tracking-wide mb-6">Social Media</h4>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="https://instagram.com/mctrainviewjogja" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs text-on-surface-variant hover:text-secondary transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a 
                    href="https://wa.me/6281350150020" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs text-on-surface-variant hover:text-secondary transition-colors"
                  >
                    WhatsApp Service
                  </a>
                </li>
                <li>
                  <button 
                    onClick={() => setIsReservationOpen(true)}
                    className="text-xs text-on-surface-variant hover:text-secondary hover:underline transition-colors cursor-pointer text-left"
                  >
                    Kemitraan & Group
                  </button>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Trade marks and copyright */}
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant/70 border-t border-outline-variant/10">
          <p>© 2026 MC Train View. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer">Kebijakan Privasi</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Ketentuan Layanan</span>
          </div>
          <p className="opacity-85 text-[10px] md:text-xs">Dibuat dengan bangga di Yogyakarta.</p>
        </div>
      </footer>

      {/* MODAL WINDOW: RESERVATION BOOKING SYSTEM */}
      <AnimatePresence>
        {isReservationOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden" id="reservation-modal">
            
            {/* Frame backdrop dark layer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReservationOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-lg w-full bg-surface rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/40 z-10 flex flex-col max-h-[90vh]"
            >
              
              {/* Header block */}
              <div className="p-6 bg-primary-container text-on-primary-container flex justify-between items-center bg-primary">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#afe2b3]" />
                  <h3 className="font-headline text-lg font-bold text-white leading-none">Reservasi Meja premium</h3>
                </div>
                <button 
                  onClick={() => setIsReservationOpen(false)}
                  className="p-1 px-2 rounded-full hover:bg-white/10 text-white cursor-pointer"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Form container scrollable */}
              <form onSubmit={handleReservationSubmit} className="p-6 space-y-4 overflow-y-auto flex-grow text-xs text-primary font-medium">
                
                <p className="text-xs text-on-surface-variant leading-relaxed mb-1">
                  Amankan spot terbaik Anda secara gratis. Isi data pemesanan di bawah ini dan kami akan memandu Anda menuju obrolan konfirmasi WhatsApp.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1.5 select-none">
                      Nama Lengkap Pemesan
                    </label>
                    <input 
                      required
                      type="text" 
                      placeholder="Contoh: Raihan"
                      value={reservationForm.name}
                      onChange={(e) => setReservationForm({ ...reservationForm, name: e.target.value })}
                      className="w-full text-xs p-3 rounded-lg bg-surface-container border border-outline focus:border-primary focus:ring-1 focus:ring-outline outline-hidden font-medium text-primary shadow-xs"
                    />
                  </div>

                  {/* WhatsApp contact number */}
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1.5 select-none">
                      Nomor WhatsApp Kontaktif
                    </label>
                    <input 
                      required
                      type="tel" 
                      placeholder="Contoh: 081350150020"
                      value={reservationForm.phone}
                      onChange={(e) => setReservationForm({ ...reservationForm, phone: e.target.value })}
                      className="w-full text-xs p-3 rounded-lg bg-surface-container border border-outline focus:border-primary focus:ring-1 focus:ring-outline outline-hidden font-medium text-primary shadow-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Date selection field */}
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1.5 select-none">
                      Pilih Tanggal
                    </label>
                    <input 
                      required
                      type="date" 
                      value={reservationForm.date}
                      onChange={(e) => setReservationForm({ ...reservationForm, date: e.target.value })}
                      className="w-full text-xs p-3 rounded-lg bg-surface-container border border-outline focus:border-primary focus:ring-1 focus:ring-outline outline-hidden font-medium text-primary shadow-xs"
                    />
                  </div>

                  {/* Time list choice */}
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1.5 select-none">
                      Pilih Jam Kunjungan
                    </label>
                    <select
                      value={reservationForm.time}
                      onChange={(e) => setReservationForm({ ...reservationForm, time: e.target.value })}
                      className="w-full text-xs p-3 rounded-lg bg-surface-container border border-outline focus:border-primary focus:ring-1 focus:ring-outline outline-hidden font-medium text-primary shadow-xs"
                    >
                      <option value="08:00">08:00 WIB (Pagi)</option>
                      <option value="10:00">10:00 WIB</option>
                      <option value="12:00">12:00 WIB (Siang)</option>
                      <option value="14:00">14:00 WIB</option>
                      <option value="16:00">16:00 WIB (Golden Hour)</option>
                      <option value="18:00">18:00 WIB (Sore)</option>
                      <option value="20:00">20:00 WIB</option>
                    </select>
                  </div>

                  {/* Guests field */}
                  <div>
                    <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1.5 select-none">
                      Jumlah Rombongan
                    </label>
                    <select
                      value={reservationForm.guests}
                      onChange={(e) => setReservationForm({ ...reservationForm, guests: parseInt(e.target.value) })}
                      className="w-full text-xs p-3 rounded-lg bg-surface-container border border-outline focus:border-primary focus:ring-1 focus:ring-outline outline-hidden font-medium text-primary shadow-xs"
                    >
                      <option value="1">1 Orang</option>
                      <option value="2">2 Orang (Pasangan)</option>
                      <option value="4">4 Orang (Keluarga)</option>
                      <option value="6">6 Orang</option>
                      <option value="10">Lebih dari 10 Orang (Grup)</option>
                    </select>
                  </div>
                </div>

                {/* Additional custom notes */}
                <div>
                  <label className="block text-[10px] font-bold text-primary uppercase tracking-wider mb-1.5 select-none">
                    Catatan Khas / Permintaan Meja Khusus (Opsional)
                  </label>
                  <textarea 
                    rows={2}
                    placeholder="Contoh: Minta spot meja outdoor paling dekat rel atau dekat stopkontak jika ada."
                    value={reservationForm.notes}
                    onChange={(e) => setReservationForm({ ...reservationForm, notes: e.target.value })}
                    className="w-full text-xs p-3 rounded-lg bg-surface-container border border-outline focus:border-primary focus:ring-1 focus:ring-outline outline-hidden font-medium text-primary shadow-xs resize-none"
                  />
                </div>

                {/* Confirm call to WhatsApp */}
                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full py-3 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-150 active:scale-95 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer cursor-pointer"
                  >
                    Kirim Formulir Reservasi Ke WA
                    <ArrowRight className="w-4 h-4 text-on-primary" />
                  </button>
                  <p className="text-[10px] text-center text-on-surface-variant font-medium mt-3">
                    Reservasi Anda 100% aman dan tidak dipungut biaya admin apapun.
                  </p>
                </div>

              </form>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
