import { useState } from 'react'
import { ArrowUpRight, Check, ChevronRight, Globe2, Menu, MessageCircle, ShieldCheck, Sparkles, Wifi, X } from 'lucide-react'

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
    ctaTitle: 'আপনার কোনো প্রজেক্ট, প্রশ্ন বা আইডিয়া আছে?', ctaText: 'আপনার জন্য সঠিক রেক্স সেবা খুঁজে নিতে আমাদের সাথে কথা বলুন।', ctaButton: 'কথা শুরু করুন', footer: 'কপিরাইট © রেক্স ভেঞ্চার লিমিটেড · খুঁটিনাটিতে মনোযোগী।'
  }
}

const ventures = [
  { key: 'wifi', icon: Wifi, image: null, color: 'cyan' },
  { key: 'security', icon: ShieldCheck, image: '/assets/security.png', color: 'green' },
  { key: 'computers', icon: Sparkles, image: '/assets/computers.jpg', color: 'purple' },
  { key: 'agro', icon: Check, image: '/assets/agro.jpg', color: 'orange' }
] as const

export default function App() {
  const [lang, setLang] = useState<Language>('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const t = copy[lang]
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }

  return <div className={lang === 'bn' ? 'app bangla' : 'app'}>
    <header className="header"><a className="brand" href="#home" onClick={() => go('home')}><img src="/assets/rex-logo.png" alt="Rex" /><span>REX<span>VENTURE</span></span></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? 'nav open' : 'nav'}><button onClick={() => go('home')}>{t.navHome}</button><button onClick={() => go('services')}>{t.navServices}</button><button onClick={() => go('about')}>{t.navAbout}</button><button className="nav-contact" onClick={() => go('contact')}>{t.navContact} <ArrowUpRight size={15} /></button><button className="lang" onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}><Globe2 size={15} /> {t.language}</button></nav>
    </header>
    <main>
      <section className="hero" id="home"><div className="hero-glow" /><div className="hero-content"><p className="eyebrow">{t.eyebrow}</p><h1>{t.heroTitle}<br /><em>{t.heroAccent}</em></h1><p className="hero-text">{t.heroText}</p><div className="hero-actions"><button className="button primary" onClick={() => go('services')}>{t.explore} <ArrowUpRight size={18} /></button><button className="button text-button" onClick={() => go('contact')}>{t.talk} <ChevronRight size={17} /></button></div></div><div className="hero-orbit"><img src="/assets/rex-logo.png" alt="Rex Venture logo" /><span className="orbit-label label-one">01 / CONNECT</span><span className="orbit-label label-two">02 / PROTECT</span><span className="orbit-label label-three">03 / GROW</span></div><div className="scroll-note"><span />{t.scroll}</div></section>
      <section className="services section" id="services"><div className="section-heading"><div><p className="eyebrow">{t.servicesEyebrow}</p><h2>{t.servicesTitle}</h2></div><p>{t.servicesText}</p></div><div className="venture-grid">{ventures.map(({ key, icon: Icon, image, color }, index) => <article className={`venture-card ${color}`} key={key}>{image && <img className="card-image" src={image} alt="" />}<div className="card-shade" /><div className="card-content"><div className="card-top"><span className="number">0{index + 1}</span><span className="card-icon"><Icon size={20} /></span></div><div><span className="tag">{t[`${key}Tag`]}</span><h3>{t[`${key}Title`]}</h3><p>{t[`${key}Text`]}</p><button className="learn">{t.learn} <ArrowUpRight size={16} /></button></div></div></article>)}</div></section>
      <section className="difference section" id="about"><div className="difference-mark"><img src="/assets/rex-logo.png" alt="" /></div><div className="difference-copy"><p className="eyebrow">{t.whyEyebrow}</p><h2>{t.whyTitle}</h2><p className="lead">{t.whyText}</p><div className="reasons"><div><span>01</span><h3>{t.reason1}</h3><p>{t.reason1Text}</p></div><div><span>02</span><h3>{t.reason2}</h3><p>{t.reason2Text}</p></div><div><span>03</span><h3>{t.reason3}</h3><p>{t.reason3Text}</p></div></div></div></section>
      <section className="contact section" id="contact"><div><p className="eyebrow">{t.navContact}</p><h2>{t.ctaTitle}</h2><p>{t.ctaText}</p></div><a className="button light" href="https://wa.me/8801707086543" target="_blank" rel="noreferrer"><MessageCircle size={19} /> {t.ctaButton} <ArrowUpRight size={18} /></a></section>
    </main><footer><a className="brand" href="#home"><img src="/assets/rex-logo.png" alt="Rex" /><span>REX<span>VENTURE</span></span></a><p>{t.footer}</p><div className="footer-links"><a href="https://www.facebook.com/share/p/1BU5gVV3mZ/" target="_blank" rel="noreferrer">Facebook</a><a href="https://wa.me/8801707086543" target="_blank" rel="noreferrer">WhatsApp</a></div></footer>
  </div>
}
