import { useEffect, useState } from 'react'
import { ArrowUpRight, CalendarDays, Check, ChevronRight, ExternalLink, Globe2, MapPin, Menu, MessageCircle, Phone, ShieldCheck, Sparkles, Wifi, X } from 'lucide-react'

type Language = 'en' | 'bn'
type Copy = { [key: string]: string }

const copy: Record<Language, Copy> = {
  en: {
    navHome: 'Home', navServices: 'Services', navAbout: 'About us', navContact: 'Contact', language: 'বাংলা',
    eyebrow: 'Rex Venture LTD · Reliable. Efficient. Exceptional.', heroTitle: 'Growing ideas into', heroAccent: 'real-world impact.',
    heroText: 'A connected family of services built for the way Bangladesh lives, works and grows — from high-speed internet to safer spaces and smarter businesses.',
    explore: 'Explore our services', talk: 'Talk to our team', scroll: 'Scroll to explore',
    servicesEyebrow: 'Our ventures', servicesTitle: 'One vision. Multiple ways to move forward.', servicesText: 'Practical, dependable solutions with the Rex standard of care.',
    wifiTitle: 'Rex WiFi', wifiText: 'Unlimited speed for everyday life. Reliable connectivity with packages starting from ৳550/month.', wifiTag: 'Connectivity',
    securityTitle: 'Rex Security', securityText: 'Remote monitoring and rapid response to keep your home, shop or office protected day and night.', securityTag: 'Peace of mind',
    computersTitle: 'Computers & Gamez', computersText: 'Build your dream PC, upgrade your setup or get expert help for your next gaming adventure.', computersTag: 'Technology',
    agroTitle: 'Rex Agro', agroText: 'Fresh, thoughtful farming and healthy food products that connect better living with the land.', agroTag: 'Better living',
    learn: 'Learn more', whyEyebrow: 'The Rex difference', whyTitle: 'Built on trust. Designed for the future.', whyText: 'We bring energy, attention to detail and local understanding to every service we offer.',
    reason1: 'People-first service', reason1Text: 'We listen carefully, explain clearly and stay close after the sale.', reason2: 'Practical innovation', reason2Text: 'Better tools and smarter systems that make daily life easier.', reason3: 'Always dependable', reason3Text: 'Consistency matters. We show up when it matters most.',
    placesEyebrow: 'Visit the places', placesTitle: 'Find the Rex service that fits your world.', placesText: 'Explore our connected ventures and choose the right team for your next need.', visit: 'Visit website', contactNumbers: 'Contact numbers', appointment: 'Book an appointment', mapTitle: 'Our service area', mapText: 'Rajshahi, Bangladesh · Open in Google Maps', contactForm: 'Open contact form',
    ctaTitle: 'Have a project, question or idea?', ctaText: 'Let’s find the right Rex service for you. Our team is ready to help.', ctaButton: 'Start a conversation', footer: 'Copyright © Rex Venture LTD · Focused on details.'
  },
  bn: {
    navHome: 'হোম', navServices: 'সেবাসমূহ', navAbout: 'আমাদের সম্পর্কে', navContact: 'যোগাযোগ', language: 'English',
    eyebrow: 'রেক্স ভেঞ্চার লিমিটেড · নির্ভরযোগ্য। দক্ষ। অসাধারণ।', heroTitle: 'ভাবনাকে রূপ দিই', heroAccent: 'বাস্তব প্রভাবে।',
    heroText: 'বাংলাদেশের জীবন, কাজ ও উন্নতির জন্য তৈরি একসাথে চলা কিছু সেবা—দ্রুত ইন্টারনেট থেকে নিরাপদ স্থান এবং স্মার্ট ব্যবসা পর্যন্ত।',
    explore: 'সেবাগুলো দেখুন', talk: 'আমাদের সাথে কথা বলুন', scroll: 'আরও দেখতে স্ক্রল করুন',
    servicesEyebrow: 'আমাদের উদ্যোগ', servicesTitle: 'একটি লক্ষ্য। এগিয়ে যাওয়ার নানা পথ।', servicesText: 'রেক্সের যত্ন ও মানের সাথে ব্যবহারিক, নির্ভরযোগ্য সমাধান।',
    wifiTitle: 'রেক্স ওয়াই-ফাই', wifiText: 'প্রতিদিনের জীবনের জন্য নিরবচ্ছিন্ন গতি। প্যাকেজ শুরু মাত্র ৳৫৫০/মাস থেকে।', wifiTag: 'সংযোগ',
    securityTitle: 'রেক্স সিকিউরিটি', securityText: 'আপনার বাসা, দোকান বা অফিস দিন-রাত নিরাপদ রাখতে রিমোট মনিটরিং ও দ্রুত রেসপন্স।', securityTag: 'নিরাপত্তা',
    computersTitle: 'কম্পিউটার ও গেমজ', computersText: 'আপনার স্বপ্নের পিসি তৈরি, সেটআপ আপগ্রেড অথবা পরবর্তী গেমিংয়ের জন্য বিশেষজ্ঞ সহায়তা।', computersTag: 'প্রযুক্তি',
    agroTitle: 'রেক্স অ্যাগ্রো', agroText: 'জমি ও উন্নত জীবনের সাথে সংযোগ তৈরি করা স্বাস্থ্যকর খাদ্য ও চিন্তাশীল কৃষি উদ্যোগ।', agroTag: 'সুস্থ জীবন',
    learn: 'বিস্তারিত দেখুন', whyEyebrow: 'রেক্সের বিশেষত্ব', whyTitle: 'বিশ্বাসের উপর তৈরি। ভবিষ্যতের জন্য প্রস্তুত।', whyText: 'আমাদের প্রতিটি সেবায় থাকে উদ্যম, খুঁটিনাটিতে মনোযোগ এবং স্থানীয় অভিজ্ঞতা।',
    reason1: 'মানুষকে অগ্রাধিকার', reason1Text: 'মনোযোগ দিয়ে শুনি, সহজভাবে বুঝিয়ে বলি এবং সেবার পরেও পাশে থাকি।', reason2: 'ব্যবহারিক উদ্ভাবন', reason2Text: 'দৈনন্দিন জীবন সহজ করতে উন্নত টুল ও স্মার্ট সিস্টেম।', reason3: 'সবসময় নির্ভরযোগ্য', reason3Text: 'ধারাবাহিকতাই গুরুত্বপূর্ণ। প্রয়োজনের সময় আমরা পাশে থাকি।',
    placesEyebrow: 'সেবার ঠিকানা', placesTitle: 'আপনার প্রয়োজনের জন্য সঠিক রেক্স সেবা খুঁজুন।', placesText: 'আমাদের সংযুক্ত উদ্যোগগুলো দেখুন এবং আপনার পরবর্তী প্রয়োজনের জন্য সঠিক টিম বেছে নিন।', visit: 'ওয়েবসাইট দেখুন', contactNumbers: 'যোগাযোগের নম্বর', appointment: 'অ্যাপয়েন্টমেন্ট নিন', mapTitle: 'আমাদের সেবার এলাকা', mapText: 'রাজশাহী, বাংলাদেশ · গুগল ম্যাপে দেখুন', contactForm: 'যোগাযোগ ফর্ম খুলুন',
    ctaTitle: 'আপনার কোনো প্রজেক্ট, প্রশ্ন বা আইডিয়া আছে?', ctaText: 'আপনার জন্য সঠিক রেক্স সেবা খুঁজে নিতে আমাদের সাথে কথা বলুন।', ctaButton: 'কথা শুরু করুন', footer: 'কপিরাইট © রেক্স ভেঞ্চার লিমিটেড · খুঁটিনাটিতে মনোযোগী।'
  }
}

const ventures = [
  { key: 'wifi', icon: Wifi, image: null, color: 'cyan' },
  { key: 'security', icon: ShieldCheck, image: '/assets/security.png', color: 'green' },
  { key: 'computers', icon: Sparkles, image: '/assets/computers.jpg', color: 'purple' },
  { key: 'agro', icon: Check, image: '/assets/agro.jpg', color: 'orange' }
] as const

const places = [
  { name: 'Rex WiFi', detail: 'High-speed internet and connected living.', slug: 'wifi', color: 'cyan' },
  { name: 'Rex Security', detail: 'Remote monitoring and rapid response protection.', slug: 'security', color: 'green' },
  { name: 'Rex Agro', detail: 'Fresh farming, salads and better food choices.', slug: 'agro', color: 'orange' },
  { name: 'Rex Computers', detail: 'PC builds, upgrades and gaming solutions.', slug: 'computers', color: 'purple' }
] as const

const servicePageCopy: Record<Language, Record<string, { eyebrow: string; title: string; text: string; featuresTitle: string; features: string[]; button: string; image: string }>> = {
  en: {
    wifi: { eyebrow: 'Rex WiFi · Connectivity', title: 'Fast internet for the way you live.', text: 'Reliable, unlimited-speed internet for homes, businesses and everyday life. Packages start from ৳550/month.', featuresTitle: 'Simple, dependable connectivity', features: ['Unlimited speed packages from ৳550/month', 'Reliable support for home and business connections', 'GigaBit-ready infrastructure for modern devices'], button: 'Ask about WiFi packages', image: '/assets/computers.jpg' },
    security: { eyebrow: 'Rex Security · Peace of mind', title: 'Your safety, always within reach.', text: 'Remote CCTV monitoring and rapid response services for homes, shops and offices. Stay protected day and night.', featuresTitle: 'Security that stays alert', features: ['Remote monitoring and live visibility', 'Fast response for unusual activity and emergencies', 'Tailored plans for homes, shops and offices'], button: 'Book a security consultation', image: '/assets/security.png' },
    computers: { eyebrow: 'Rex Computers · Technology', title: 'Build the setup you have been dreaming about.', text: 'From a first PC to a serious gaming rig, we help you choose, build and improve technology that fits your work and play.', featuresTitle: 'The right build for you', features: ['Custom PC builds and upgrade guidance', 'Gaming, office and creative-work solutions', 'Practical support after your purchase'], button: 'Plan my PC build', image: '/assets/computers.jpg' },
    agro: { eyebrow: 'Rex Agro · Better living', title: 'Good food starts with thoughtful growing.', text: 'Fresh farming and healthy food products made with a closer connection to the land, the season and your everyday wellbeing.', featuresTitle: 'Fresh choices, thoughtfully made', features: ['Fresh produce and healthy food ideas', 'Farming focused on quality and care', 'Simple ways to bring better food home'], button: 'Connect with Rex Agro', image: '/assets/agro.jpg' }
  },
  bn: {
    wifi: { eyebrow: 'রেক্স ওয়াই-ফাই · সংযোগ', title: 'আপনার জীবনের জন্য দ্রুত ইন্টারনেট।', text: 'বাড়ি, ব্যবসা ও প্রতিদিনের জীবনের জন্য নির্ভরযোগ্য ইন্টারনেট। প্যাকেজ শুরু ৳৫৫০/মাস থেকে।', featuresTitle: 'সহজ ও নির্ভরযোগ্য সংযোগ', features: ['৳৫৫০/মাস থেকে আনলিমিটেড স্পিড প্যাকেজ', 'বাসা ও ব্যবসার জন্য নির্ভরযোগ্য সাপোর্ট', 'আধুনিক ডিভাইসের জন্য গিগাবিট-রেডি অবকাঠামো'], button: 'ওয়াই-ফাই প্যাকেজ জানুন', image: '/assets/computers.jpg' },
    security: { eyebrow: 'রেক্স সিকিউরিটি · নিশ্চিন্ততা', title: 'আপনার নিরাপত্তা, সবসময় হাতের নাগালে।', text: 'বাসা, দোকান ও অফিসের জন্য রিমোট সিসিটিভি মনিটরিং এবং দ্রুত রেসপন্স সেবা।', featuresTitle: 'সবসময় সতর্ক নিরাপত্তা', features: ['রিমোট মনিটরিং ও লাইভ ভিজিবিলিটি', 'অস্বাভাবিক কার্যকলাপে দ্রুত সাড়া', 'বাসা, দোকান ও অফিসের জন্য উপযোগী পরিকল্পনা'], button: 'সিকিউরিটি পরামর্শ নিন', image: '/assets/security.png' },
    computers: { eyebrow: 'রেক্স কম্পিউটার · প্রযুক্তি', title: 'আপনার স্বপ্নের সেটআপ তৈরি করুন।', text: 'আপনার কাজ ও বিনোদনের জন্য সঠিক প্রযুক্তি বাছাই, তৈরি ও উন্নত করতে আমরা পাশে আছি।', featuresTitle: 'আপনার জন্য সঠিক বিল্ড', features: ['কাস্টম পিসি বিল্ড ও আপগ্রেড পরামর্শ', 'গেমিং, অফিস ও ক্রিয়েটিভ কাজের সমাধান', 'কেনার পরেও ব্যবহারিক সহায়তা'], button: 'পিসি বিল্ড পরিকল্পনা করুন', image: '/assets/computers.jpg' },
    agro: { eyebrow: 'রেক্স অ্যাগ্রো · সুস্থ জীবন', title: 'ভালো খাবারের শুরু যত্নশীল চাষে।', text: 'জমি, মৌসুম ও আপনার প্রতিদিনের সুস্থতার সাথে কাছের সম্পর্ক তৈরি করা তাজা কৃষিপণ্য।', featuresTitle: 'যত্নে তৈরি তাজা পছন্দ', features: ['তাজা কৃষিপণ্য ও স্বাস্থ্যকর খাবার', 'মান ও যত্নকে অগ্রাধিকার দেওয়া কৃষি', 'বাড়িতে ভালো খাবার আনার সহজ উপায়'], button: 'রেক্স অ্যাগ্রোর সাথে যুক্ত হোন', image: '/assets/agro.jpg' }
  }
}

function ServicePage({ lang, slug, onHome }: { lang: Language; slug: string; onHome: () => void }) {
  const t = copy[lang]
  const page = servicePageCopy[lang][slug] ?? servicePageCopy[lang].wifi
  const venture = ventures.find((item) => item.key === slug) ?? ventures[0]
  const Icon = venture.icon
  return <main className={`service-page ${venture.color}`}><section className="service-hero"><div className="service-hero-copy"><button className="back-link" onClick={onHome}>← {t.navHome}</button><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p className="hero-text">{page.text}</p><a className="button primary" href="https://wa.me/8801707086543" target="_blank" rel="noreferrer"><MessageCircle size={18} /> {page.button} <ArrowUpRight size={18} /></a></div><div className="service-visual"><img src={page.image} alt={page.title} /><span><Icon size={28} /></span></div></section><section className="service-details section"><div><p className="eyebrow">{t.navServices}</p><h2>{page.featuresTitle}</h2></div><div className="feature-list">{page.features.map((feature) => <div className="feature-item" key={feature}><span><Check size={17} /></span><p>{feature}</p></div>)}</div></section><section className="service-bottom section"><p>{t.ctaText}</p><button className="button text-button" onClick={onHome}>{t.explore} <ArrowUpRight size={18} /></button></section></main>
}

export default function App() {
  const [lang, setLang] = useState<Language>('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const [page, setPage] = useState(() => window.location.pathname.split('/')[1] || 'home')
  const t = copy[lang]
  useEffect(() => { const handlePopState = () => setPage(window.location.pathname.split('/')[1] || 'home'); window.addEventListener('popstate', handlePopState); return () => window.removeEventListener('popstate', handlePopState) }, [])
  const openPage = (slug: string) => { window.history.pushState({}, '', slug === 'home' ? '/' : `/${slug}`); setPage(slug); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const go = (id: string) => { if (page !== 'home') { openPage('home'); window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 0); return } document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }

  return <div className={lang === 'bn' ? 'app bangla' : 'app'}>
    <header className="header"><a className="brand" href="#home" onClick={() => go('home')}><img src="/assets/rex-logo.png" alt="Rex" /><span>REX<span>VENTURE</span></span></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? 'nav open' : 'nav'}><button onClick={() => go('home')}>{t.navHome}</button><button onClick={() => go('services')}>{t.navServices}</button><button onClick={() => go('about')}>{t.navAbout}</button><button className="nav-contact" onClick={() => go('contact')}>{t.navContact} <ArrowUpRight size={15} /></button><button className="lang" onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}><Globe2 size={15} /> {t.language}</button></nav>
    </header>
    {page === 'home' ? <main>
      <section className="hero" id="home"><div className="hero-glow" /><div className="hero-content"><p className="eyebrow">{t.eyebrow}</p><h1>{t.heroTitle}<br /><em>{t.heroAccent}</em></h1><p className="hero-text">{t.heroText}</p><div className="hero-actions"><button className="button primary" onClick={() => go('services')}>{t.explore} <ArrowUpRight size={18} /></button><button className="button text-button" onClick={() => go('contact')}>{t.talk} <ChevronRight size={17} /></button></div></div><div className="hero-orbit"><img src="/assets/rex-logo.png" alt="Rex Venture logo" /><span className="orbit-label label-one">01 / CONNECT</span><span className="orbit-label label-two">02 / PROTECT</span><span className="orbit-label label-three">03 / GROW</span></div><div className="scroll-note"><span />{t.scroll}</div></section>
      <section className="services section" id="services"><div className="section-heading"><div><p className="eyebrow">{t.servicesEyebrow}</p><h2>{t.servicesTitle}</h2></div><p>{t.servicesText}</p></div><div className="venture-grid">{ventures.map(({ key, icon: Icon, image, color }, index) => <article className={`venture-card ${color}`} key={key}>{image && <img className="card-image" src={image} alt="" />}<div className="card-shade" /><div className="card-content"><div className="card-top"><span className="number">0{index + 1}</span><span className="card-icon"><Icon size={20} /></span></div><div><span className="tag">{t[`${key}Tag`]}</span><h3>{t[`${key}Title`]}</h3><p>{t[`${key}Text`]}</p><button className="learn" onClick={() => openPage(key)}>{t.learn} <ArrowUpRight size={16} /></button></div></div></article>)}</div></section>
      <section className="difference section" id="about"><div className="difference-mark"><img src="/assets/rex-logo.png" alt="" /></div><div className="difference-copy"><p className="eyebrow">{t.whyEyebrow}</p><h2>{t.whyTitle}</h2><p className="lead">{t.whyText}</p><div className="reasons"><div><span>01</span><h3>{t.reason1}</h3><p>{t.reason1Text}</p></div><div><span>02</span><h3>{t.reason2}</h3><p>{t.reason2Text}</p></div><div><span>03</span><h3>{t.reason3}</h3><p>{t.reason3Text}</p></div></div></div></section>
      <section className="places section" id="places"><div className="section-heading"><div><p className="eyebrow">{t.placesEyebrow}</p><h2>{t.placesTitle}</h2></div><p>{t.placesText}</p></div><div className="places-layout"><div className="place-list">{places.map((place, index) => <a className={`place-card ${place.color}`} href={`/${place.slug}`} onClick={(event) => { event.preventDefault(); openPage(place.slug) }} key={place.name}><span className="place-number">0{index + 1}</span><div><h3>{place.name}</h3><p>{place.detail}</p></div><ExternalLink size={18} /></a>)}<div className="contact-numbers"><div><span className="contact-icon"><Phone size={18} /></span><div><small>{t.contactNumbers}</small><a href="tel:+8801707086543">+880 1707-086543</a></div></div><a className="mini-button" href="https://wa.me/8801707086543" target="_blank" rel="noreferrer"><CalendarDays size={16} /> {t.appointment}</a></div></div><div className="map-card"><div className="map-heading"><span className="contact-icon"><MapPin size={18} /></span><div><h3>{t.mapTitle}</h3><p>{t.mapText}</p></div></div><img className="map-image" src="/assets/service-map.png" alt={t.mapTitle} /><a className="map-link" href="https://www.google.com/maps/search/?api=1&query=24.412185,88.9963" target="_blank" rel="noreferrer">{t.mapText} <ArrowUpRight size={15} /></a></div></div></section>
      <section className="contact section" id="contact"><div><p className="eyebrow">{t.navContact}</p><h2>{t.ctaTitle}</h2><p>{t.ctaText}</p></div><a className="button light" href="https://wa.me/8801707086543" target="_blank" rel="noreferrer"><MessageCircle size={19} /> {t.ctaButton} <ArrowUpRight size={18} /></a></section>
    </main> : <ServicePage lang={lang} slug={page} onHome={() => openPage('home')} />}<footer><a className="brand" href="/" onClick={(event) => { event.preventDefault(); openPage('home') }}><img src="/assets/rex-logo.png" alt="Rex" /><span>REX<span>VENTURE</span></span></a><p>{t.footer}</p><div className="footer-links"><a href="https://www.facebook.com/share/p/1BU5gVV3mZ/" target="_blank" rel="noreferrer">Facebook</a><a href="https://wa.me/8801707086543" target="_blank" rel="noreferrer">WhatsApp</a></div></footer>
  </div>
}
