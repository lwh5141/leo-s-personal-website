import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Globe,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Rocket,
  Megaphone,
  ArrowRight,
  Send,
  Mail,
  Github,
  MessageSquare,
  Copy,
  Check,
  Menu,
  X
} from 'lucide-react';
import {
  SKILLS_DATA,
  PROJECTS_DATA,
  COLLAB_DATA,
  NAV_LINKS,
  TRANSLATIONS
} from './data';

export default function App() {
  const [isEnglish, setIsEnglish] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>('ai-agent');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Custom lens coordinates
  const [mouseCoords, setMouseCoords] = useState({ x: -1000, y: -1000 });
  const [isMouseInHero, setIsMouseInHero] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, translateX: 0, translateY: 0 });
  
  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({ name: false, email: false, message: false });
  const [isSending, setIsSending] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Copied alert state
  const [copiedToast, setCopiedToast] = useState(false);

  // Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  // Get current active translation dictionary
  const t = isEnglish ? TRANSLATIONS.en : TRANSLATIONS.zh;

  // Handle coord tracking on Hero for the masking lens
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const xVal = e.clientX - rect.left;
    const yVal = e.clientY - rect.top;
    setMouseCoords({ x: xVal, y: yVal });

    // Calculate displacement from center to drive beautiful 3D tilt interaction
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const pctX = (xVal - centerX) / centerX; // roughly -1 to 1
    const pctY = (yVal - centerY) / centerY; // roughly -1 to 1

    const maxRotate = 8;     // Mild rotational degrees to remain stylish & elegant
    const maxTranslate = 10; // Follow displacement in pixels

    setTilt({
      rotateY: pctX * maxRotate,
      rotateX: -pctY * maxRotate,
      translateX: pctX * maxTranslate,
      translateY: pctY * maxTranslate,
    });
  };

  const handleHeroMouseEnter = () => {
    setIsMouseInHero(true);
  };

  const handleHeroMouseLeave = () => {
    setIsMouseInHero(false);
    setTilt({ rotateX: 0, rotateY: 0, translateX: 0, translateY: 0 });
  };

  // Quick action prefill from Collab item
  const handleCollabClick = (collabId: string) => {
    let prefillMsg = '';
    if (collabId === 'consulting') {
      prefillMsg = isEnglish 
        ? "Hi Leo, I would like to consult your expertise for AI Agent architecture design." 
        : "你好 Leo，我想针对「AI Agent 架构设计」开展技术咨询，期待交流。";
    } else if (collabId === 'development') {
      prefillMsg = isEnglish
        ? "Hi Leo, I have a project development idea regarding end-to-end LLM/RAG integration."
        : "你好 Leo，我有一个关于「AI应用系统集成与大模型落地」的开发项目，寻求合作。";
    } else if (collabId === 'sharing') {
      prefillMsg = isEnglish
        ? "Hi Leo, we would love to host you for a technical workshop/corporate training session."
        : "你好 Leo，我们希望邀请你进行一场企业技术沙龙/模型开发最佳实践分享。";
    }
    
    setFormData(prev => ({ ...prev, message: prefillMsg }));
    
    // Scroll smoothly to contact form
    if (contactRef.current) {
      const headerOffset = 90;
      const elementPosition = contactRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Auto focus textarea
      setTimeout(() => {
        messageInputRef.current?.focus();
      }, 800);
    }
  };

  // Scroll to simple sections safely with offset
  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    
    if (sectionId === 'about') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Copy WeChat ID
  const handleCopyWeChat = () => {
    navigator.clipboard.writeText(t.wechatVal);
    setCopiedToast(true);
    setTimeout(() => {
      setCopiedToast(false);
    }, 2500);
  };

  // Form submission handling
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !formData.email.includes('@'),
      message: !formData.message.trim(),
    };
    
    setFormErrors(errors);

    const hasErrors = Object.values(errors).some(v => v);
    if (hasErrors) return;

    setIsSending(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSending(false);
      setShowSuccessModal(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  // Decorative tags drift animations config (positioned near center but avoiding text overlap)
  const floatingTags = [
    { textZh: 'AIGC 素材流水线', textEn: 'AIGC Asset Pipeline', initialX: '12%', initialY: '18%', delay: 0 },
    { textZh: 'RAG 检索增强', textEn: 'RAG Vector Search', initialX: '83%', initialY: '15%', delay: 1 },
    { textZh: '数字员工编排', textEn: 'Workflow Engine', initialX: '10%', initialY: '72%', delay: 2 },
    { textZh: 'RPA 自动化协作', textEn: 'Robotics RPA', initialX: '85%', initialY: '70%', delay: 3 },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-black selection:text-white text-black font-sans relative">
      
      {/* 1. STICKY HEADER */}
      <header className="sticky top-0 z-50 w-full bg-[#fafafa]/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <div 
            onClick={() => scrollToSection('about')} 
            className="text-2xl font-display font-black tracking-tighter cursor-pointer hover:opacity-8 focus:outline-none"
            id="header-brand"
          >
            LEO
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-12">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium tracking-tight text-black/60 hover:text-black transition-colors focus:outline-none cursor-pointer"
                id={`nav-${link.id}`}
              >
                {isEnglish ? link.label_en : link.label_zh}
              </button>
            ))}
          </nav>

          {/* Location & Language Pill */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Location Capsule */}
            <div 
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-black/5 bg-white text-xs text-black/70 font-mono tracking-tight"
              id="header-location-pill"
            >
              <MapPin className="w-3 h-3 text-black" />
              <span>{t.location}</span>
            </div>

            {/* Language Switch Core */}
            <button
              onClick={() => setIsEnglish(!isEnglish)}
              className="flex items-center space-x-1 px-4 py-1.5 rounded-full border-2 border-black bg-black text-white text-xs font-semibold hover:bg-white hover:text-black transition-all cursor-pointer shadow-sm active:scale-95"
              id="lang-toggle-button"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isEnglish ? '中' : 'EN'}</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Lang button */}
            <button
              onClick={() => setIsEnglish(!isEnglish)}
              className="flex items-center space-x-0.5 px-2.5 py-1 rounded-full border border-black/10 bg-black text-white text-xs font-semibold cursor-pointer active:scale-95"
              id="mobile-lang-toggle"
            >
              <span>{isEnglish ? '中' : 'EN'}</span>
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 rounded-lg border border-black/10 bg-white hover:bg-black/5 active:scale-95"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-black/5 bg-[#fafafa] overflow-hidden"
              id="mobile-drawer"
            >
              <div className="px-6 py-6 flex flex-col space-y-4">
                {NAV_LINKS.map(link => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-left py-2 font-display text-lg font-medium text-black/80 hover:text-black border-b border-black/5"
                  >
                    {isEnglish ? link.label_en : link.label_zh}
                  </button>
                ))}
                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-xs text-black/60 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-black" />
                    <span>{t.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. CORE HERO SECTION WITH SVG MASK EXPLORATION EFFECT */}
      <section 
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseEnter={handleHeroMouseEnter}
        onMouseLeave={handleHeroMouseLeave}
        className="relative min-h-[82vh] md:min-h-[86vh] overflow-hidden w-full cursor-none dots-bg-light border-b border-black/5"
        id="about"
      >
        
        {/* ================= SHARED 3D TRANSFORM STRING ================= */}
        {(() => {
          const transform3D = `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateX(${tilt.translateX}px) translateY(${tilt.translateY}px)`;
          const transition3D = isMouseInHero ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';

          return (
            <>
              {/* ================= LAYER 0: FLOATING BUBBLES (BOTTOM) ================= */}
              <div className="absolute inset-0 pointer-events-none select-none z-0">
                {floatingTags.map((tag, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: 0, y: 0 }}
                    animate={{ 
                      x: [0, 15, -12, 10, 0], 
                      y: [0, -18, 12, -8, 0] 
                    }}
                    transition={{
                      duration: 10 + i * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: tag.delay
                    }}
                    style={{ left: tag.initialX, top: tag.initialY }}
                    className="absolute hidden sm:flex flex-col items-center justify-center w-20 h-20 rounded-full border border-black/10 bg-white/40 backdrop-blur-xs text-center p-1.5 opacity-60"
                  >
                    <div className="font-mono text-[9px] uppercase text-black/55">NODE</div>
                    <div className="font-sans text-[10px] font-medium text-black/90 mt-0.5">
                      {isEnglish ? tag.textEn : tag.textZh}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* ================= LAYER 1: LIGHT (BASE LAYER) ================= */}
              <div className="absolute inset-0 flex items-center justify-center z-10 select-none">
                <div 
                  className="text-center px-6 max-w-4xl mx-auto"
                  style={{
                    transform: transform3D,
                    transition: transition3D,
                  }}
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-[#6b7280] px-3 py-1 rounded-full mb-6 italic block">
                    {isEnglish ? 'HELLO, WORLD' : '你好, 世界'}
                  </span>
                  <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter text-black leading-none uppercase mb-6">
                    {isEnglish ? (
                      <>HELLO, I'M <span className="font-serif italic font-normal text-black font-display tracking-tight block sm:inline">LEO</span></>
                    ) : (
                      <>您好，我是 <span className="font-serif italic font-normal text-black font-display tracking-tight block sm:inline">李文浩</span></>
                    )}
                  </h1>
                  <p className="text-sm sm:text-lg md:text-xl font-display font-medium tracking-tight text-black/60 mt-2">
                    {isEnglish 
                      ? 'AI Product Manager / 27 / Hangzhou, Zhejiang' 
                      : 'AI 产品经理 / 27岁 / 浙江杭州'}
                  </p>
                </div>
              </div>

              {/* ================= LAYER 2: DARK (MIRRORED - FULL SECTION MASK) ================= */}
              <div 
                className="absolute inset-0 flex items-center justify-center select-none z-20"
                style={{
                  clipPath: isMouseInHero
                    ? `circle(140px at ${mouseCoords.x}px ${mouseCoords.y}px)`
                    : `circle(0px at ${mouseCoords.x}px ${mouseCoords.y}px)`,
                  transition: isMouseInHero ? 'none' : 'clip-path 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
                }}
              >
                
                <div className="absolute inset-0 bg-[#000000] dots-bg-dark -z-10" />
                
                {/* Dark Theme Bubbles (mirrored) */}
                <div className="absolute inset-0 pointer-events-none select-none">
                  {floatingTags.map((tag, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: 0, y: 0 }}
                      animate={{ 
                        x: [0, 15, -12, 10, 0], 
                        y: [0, -18, 12, -8, 0] 
                      }}
                      transition={{
                        duration: 10 + i * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: tag.delay
                      }}
                      style={{ left: tag.initialX, top: tag.initialY }}
                      className="absolute hidden sm:flex flex-col items-center justify-center w-20 h-20 rounded-full border border-white/15 bg-black/60 backdrop-blur-xs text-center p-1.5"
                    >
                      <div className="font-mono text-[9px] uppercase text-white/30">CORE</div>
                      <div className="font-sans text-[10px] font-medium text-white/80 mt-0.5">
                        {isEnglish ? tag.textZh : tag.textEn}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div 
                  className="text-center px-6 max-w-4xl mx-auto"
                  style={{
                    transform: transform3D,
                    transition: transition3D,
                  }}
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-[#fafafa] px-3 py-1 rounded-full mb-6 italic block">
                    {isEnglish ? '你好, 世界' : 'HELLO, WORLD'}
                  </span>
                  <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter text-white leading-none uppercase mb-6">
                    {isEnglish ? (
                      <>您好，我是 <span className="font-serif italic font-normal text-white font-display tracking-tight block sm:inline">李文浩</span></>
                    ) : (
                      <>HELLO, I'M <span className="font-serif italic font-normal text-white font-display tracking-tight block sm:inline">LEO</span></>
                    )}
                  </h1>
                  <p className="text-sm sm:text-lg md:text-xl font-display font-medium tracking-tight text-white/70 mt-2">
                    {isEnglish 
                      ? 'AI 产品经理 / 27岁 / 浙江杭州'
                      : 'AI Product Manager / 27 / Hangzhou, Zhejiang'}
                  </p>
                </div>
              </div>

              {/* ================= SCROLL HINT (ALWAYS VISIBLE) ================= */}
              <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center pointer-events-none z-30">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="text-black/30 mb-2"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
                <p className="text-xs tracking-tight text-black/40 font-mono">
                  {isEnglish ? 'Move mouse to explore • Scroll down' : '移动鼠标探索 • 向下滚动'}
                </p>
              </div>

              {/* ================= CURSOR INDICATOR DOT ================= */}
              <div 
                className="absolute hidden md:block w-3 h-3 bg-white/80 rounded-full pointer-events-none z-50 backdrop-blur-sm" 
                style={{
                  left: `${mouseCoords.x - 6}px`,
                  top: `${mouseCoords.y - 6}px`,
                  opacity: isMouseInHero ? 1 : 0,
                  transition: 'opacity 0.15s'
                }}
              />
            </>
          );
        })()}
      </section>

      {/* 3. PROFESSIONAL SKILLS SECTION */}
      <section className="py-24 max-w-5xl mx-auto px-6 border-b border-black/5" id="skills">
        
        {/* Section Title */}
        <div className="mb-16 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-black/40 border border-black/10 px-2.5 py-1 rounded-full bg-white">
              {t.skillsBadge}
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-black mt-3">
              {t.skillsTitle}
            </h2>
          </div>
          <span className="hidden sm:block font-mono text-xs text-black/30">03 // SKILL BASE</span>
        </div>

        {/* Four Main Accordion Category Cards */}
        <div className="space-y-4">
          {SKILLS_DATA.map((category) => {
            const isExpanded = expandedCategory === category.id;
            const stats = isEnglish ? category.stats_en : category.stats_zh;

            return (
              <div 
                key={category.id}
                className={`border border-black/10 bg-white rounded-xl overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'shadow-md border-black/20 ring-1 ring-black/5' : 'hover:border-black/20 hover:shadow-2xs'
                }`}
                id={`skill-card-${category.id}`}
              >
                
                {/* Category Header (Clickable trigger) */}
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                  className="w-full text-left px-6 py-6 md:px-8 md:py-7 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer select-none focus:outline-none"
                >
                  
                  {/* Left block (Icon, name & description) */}
                  <div className="flex items-start md:items-center space-x-5">
                    
                    {/* Dark Minimal Block Label */}
                    <div className="w-12 h-12 rounded-lg bg-black text-white font-mono font-bold text-sm tracking-wide flex items-center justify-center shrink-0">
                      {category.iconText}
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold tracking-tight text-black">
                        {isEnglish ? category.title_en : category.title_zh}
                      </h3>
                      <p className="text-xs font-mono text-black/50 mt-1">
                        {isEnglish ? category.desc_en : category.desc_zh}
                      </p>
                    </div>
                  </div>

                  {/* Right block (Bilingual metric statistics + expansion arrow) */}
                  <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-10 border-t border-black/5 pt-4 md:pt-0 md:border-t-0">
                    
                    {/* Highlights stats bar */}
                    <div className="flex space-x-6 sm:space-x-8">
                      {stats.map((stat, i) => (
                        <div key={i} className="text-left font-mono">
                          <div className="text-black/40 text-[10px] uppercase tracking-wider">{stat.label}</div>
                          <div className="text-sm font-bold text-black mt-0.5">{stat.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Expand indicator icon */}
                    <div className="w-8 h-8 rounded-full border border-black/5 bg-[#fafafa] flex items-center justify-center text-black/40 shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>

                  </div>

                </button>

                {/* Expanded Skill level meters container */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-black/5 bg-[#fafafa]/50 overflow-hidden"
                    >
                      <div className="px-6 py-6 md:px-8 md:py-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                          
                          {category.skills.map((skill, index) => {
                            const badge = isEnglish ? skill.badge_en : skill.badge_zh;
                            const skillName = isEnglish ? skill.name_en : skill.name_zh;

                            return (
                              <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="font-sans font-medium text-black/85">
                                    {skillName}
                                  </span>
                                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-black bg-black/5 px-2 py-0.5 rounded-sm">
                                    {badge} • {skill.level}%
                                  </span>
                                </div>
                                
                                {/* Base bar */}
                                <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                                  {/* Dynamic loaded progress bar */}
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.level}%` }}
                                    transition={{ duration: 0.9, delay: index * 0.1, ease: 'easeOut' }}
                                    className="h-full bg-black rounded-full"
                                  />
                                </div>
                              </div>
                            );
                          })}

                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

      </section>

      {/* 4. DETAILS OF PROJECTS SECTION */}
      <section className="py-24 max-w-5xl mx-auto px-6 border-b border-black/5" id="projects">
        
        {/* Section title */}
        <div className="mb-16 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-black/40 border border-black/10 px-2.5 py-1 rounded-full bg-white">
              {t.projectsBadge}
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-black mt-3">
              {t.projectsTitle}
            </h2>
          </div>
          <span className="hidden sm:block font-mono text-xs text-black/30">04 // RECENT RELEASES</span>
        </div>

        {/* Project Card Stack Layout */}
        <div className="grid grid-cols-1 gap-6">
          {PROJECTS_DATA.map((project) => {
            const description = isEnglish ? project.desc_en : project.desc_zh;
            const title = isEnglish ? project.title_en : project.title_zh;

            return (
              <motion.div
                key={project.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group relative border border-black/10 hover:border-black bg-white rounded-xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-2xs transition-colors duration-300"
                id={`project-card-${project.id}`}
              >
                
                {/* Information details */}
                <div className="space-y-4 max-w-2xl">
                  
                  {/* Tech Tags group */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="font-mono text-[10px] font-bold text-black border border-black/15 bg-[#fafafa]/80 rounded-full px-2.5 py-0.5 tracking-tight"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-display text-2xl font-black tracking-tight text-neutral-900 group-hover:text-black mt-1">
                    {title}
                  </h3>

                  <p className="text-sm leading-relaxed text-[#6b7280]">
                    {description}
                  </p>

                  {/* Year info stamp */}
                  <div className="flex items-center space-x-1 font-mono text-xs text-black/40 pt-1">
                    <span>LAUNCHED:</span>
                    <span className="font-bold text-black/60">{project.period}</span>
                  </div>

                </div>

                {/* Serifed Enormous ID Number Indicator */}
                <div className="flex md:flex-col items-baseline justify-between w-full md:w-auto shrink-0 border-t border-black/5 pt-4 md:border-t-0 md:pt-0">
                  <span className="font-serif italic text-6xl md:text-8xl tracking-tighter text-black/10 group-hover:text-black/20 select-none transition-colors duration-300 font-bold block">
                    {project.id}
                  </span>
                </div>

              </motion.div>
            );
          })}
        </div>

      </section>

      {/* 5. INTERACTIVE COLLABORATION ("WORK WITH ME") */}
      <section className="py-24 max-w-5xl mx-auto px-6 border-b border-black/5" id="collab">
        
        {/* Section titles */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-black/40 border border-black/10 px-2.5 py-1 rounded-full bg-white">
            COLLAB
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-black mt-4">
            {t.collabTitle}
          </h2>
          <p className="text-sm md:text-base text-black/50 mt-4 leading-relaxed font-sans font-medium">
            {t.collabSubtitle}
          </p>
        </div>

        {/* 3 Columns Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLLAB_DATA.map((collab) => {
            const title = isEnglish ? collab.title_en : collab.title_zh;
            const desc = isEnglish ? collab.desc_en : collab.desc_zh;
            const buttonText = isEnglish ? collab.buttonText_en : collab.buttonText_zh;

            return (
              <motion.div
                key={collab.id}
                whileHover={{ y: -6 }}
                className="border border-black/10 hover:border-black rounded-xl p-6 md:p-8 bg-white flex flex-col justify-between items-start shadow-3xs transition-all duration-300"
                id={`collab-card-${collab.id}`}
              >
                <div>
                  {/* Decorative Icon Circle */}
                  <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center text-black mb-6">
                    {collab.icon === 'lightbulb' && <Lightbulb className="w-5 h-5 text-black" />}
                    {collab.icon === 'rocket' && <Rocket className="w-5 h-5 text-black" />}
                    {collab.icon === 'megaphone' && <Megaphone className="w-5 h-5 text-black" />}
                  </div>

                  <h3 className="font-display font-black text-xl text-black mb-3">
                    {title}
                  </h3>

                  <p className="text-xs font-sans font-medium text-black/60 leading-relaxed min-h-[3.5rem]">
                    {desc}
                  </p>
                </div>

                {/* Floating prefill button prompt */}
                <button
                  onClick={() => handleCollabClick(collab.id)}
                  className="mt-6 flex items-center space-x-1.5 font-mono text-xs font-bold text-black border-b-2 border-black pb-0.5 hover:opacity-75 focus:outline-none cursor-pointer self-start"
                  id={`collab-action-${collab.id}`}
                >
                  <span>{buttonText}</span>
                </button>

              </motion.div>
            );
          })}
        </div>

      </section>

      {/* 6. CONTACT SECTION, FORM AND FOOTER */}
      <section ref={contactRef} className="py-24 bg-white/70 border-b border-black/5" id="contact">
        <div className="max-w-5xl mx-auto px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            
            {/* Left Column Information */}
            <div className="md:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-black/40 border border-black/10 px-2.5 py-1 rounded-full bg-white">
                  CONTACT Me
                </span>
                <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-black mt-4">
                  {t.contactTitle}
                </h2>
                <p className="text-sm text-black/50 mt-4 leading-relaxed font-sans font-medium">
                  {t.contactSubtitle}
                </p>
              </div>

              {/* Informative Specs stack */}
              <div className="space-y-4 border-t border-black/5 pt-6 font-mono text-sm">
                
                {/* Spec element 1 */}
                <div className="flex justify-between py-2 border-b border-black/5">
                  <span className="text-black/45">{t.coor}</span>
                  <span className="font-semibold text-black/80 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-black" />
                    {t.coorVal}
                  </span>
                </div>

                {/* Spec element 2 */}
                <div className="flex justify-between py-2 border-b border-black/5">
                  <span className="text-black/45">{t.career}</span>
                  <span className="font-semibold text-black/80">{t.careerVal}</span>
                </div>

              </div>

              {/* Horizontal Skill Badges stack */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['Python', 'AI Agent', 'LLM', 'RAG', 'System Design'].map((subTag, i) => (
                  <span 
                    key={i}
                    className="font-mono text-[10px] text-black border border-black/10 bg-[#fafafa] rounded-sm px-2 py-1 select-none"
                  >
                    {subTag}
                  </span>
                ))}
              </div>

            </div>

            {/* Right Column Interactive minimal form */}
            <div className="md:col-span-7">
              <div className="border border-black/10 rounded-xl bg-white p-6 md:p-8 shadow-xs">
                
                <h3 className="font-display font-bold text-xl text-black mb-6">
                  {t.quickContact}
                </h3>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  
                  {/* Name field */}
                  <div className="relative">
                    <label className="block text-[11px] font-mono tracking-widest uppercase text-black/50 mb-1.5 font-semibold">
                      {t.yourName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, name: e.target.value }));
                        setFormErrors(prev => ({ ...prev, name: false }));
                      }}
                      className={`w-full bg-[#fafafa] border ${
                        formErrors.name ? 'border-red-500' : 'border-black/10 focus:border-black/70'
                      } rounded-lg px-4 py-3 text-sm text-black outline-hidden font-display transition-colors duration-250`}
                      placeholder={isEnglish ? "e.g. Leo" : "请输入您的称呼，例如：Leo"}
                      id="form-name-input"
                    />
                    {formErrors.name && (
                      <span className="text-red-500 text-[10px] font-mono font-bold mt-1 block">
                        {isEnglish ? "Name is required" : "请输入您的姓名"}
                      </span>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="relative">
                    <label className="block text-[11px] font-mono tracking-widest uppercase text-black/50 mb-1.5 font-semibold">
                      {t.emailAddr} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, email: e.target.value }));
                        setFormErrors(prev => ({ ...prev, email: false }));
                      }}
                      className={`w-full bg-[#fafafa] border ${
                        formErrors.email ? 'border-red-500' : 'border-black/10 focus:border-black/70'
                      } rounded-lg px-4 py-3 text-sm text-black outline-hidden font-display transition-colors duration-250`}
                      placeholder="example@qq.com"
                      id="form-email-input"
                    />
                    {formErrors.email && (
                      <span className="text-red-500 text-[10px] font-mono font-bold mt-1 block">
                        {isEnglish ? "Please provide a valid email" : "请输入有效的邮箱地址"}
                      </span>
                    )}
                  </div>

                  {/* Message field */}
                  <div className="relative">
                    <label className="block text-[11px] font-mono tracking-widest uppercase text-black/50 mb-1.5 font-semibold">
                      {t.message} *
                    </label>
                    <textarea
                      ref={messageInputRef}
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, message: e.target.value }));
                        setFormErrors(prev => ({ ...prev, message: false }));
                      }}
                      className={`w-full bg-[#fafafa] border ${
                        formErrors.message ? 'border-red-500' : 'border-black/10 focus:border-black/70'
                      } rounded-lg px-4 py-3 text-sm text-black outline-hidden font-display resize-none transition-colors duration-250`}
                      placeholder={isEnglish ? "How can we collaborate..." : "欢迎在这里写下您的合作需求..."}
                      id="form-message-input"
                    />
                    {formErrors.message && (
                      <span className="text-red-500 text-[10px] font-mono font-bold mt-1 block">
                        {isEnglish ? "Message text is required" : "请填写留言内容"}
                      </span>
                    )}
                  </div>

                  {/* Form Submit Trigger button */}
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full flex items-center justify-center space-x-2 bg-black hover:bg-black/85 text-white py-3.5 px-6 rounded-lg font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    id="form-submit-button"
                  >
                    {isSending ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>{t.sending}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{t.sendMessage}</span>
                      </>
                    )}
                  </button>

                </form>

              </div>
            </div>

          </div>

          {/* Quick Contact Highlight Cards (Email, GitHub, WeChat) */}
          <div className="mt-16 border-t border-black/5 pt-16">
            <h4 className="font-display font-black text-center text-lg text-black/50 mb-8 uppercase tracking-widest font-mono text-xs">
              {isEnglish ? 'COLLABORATE CHANNELS' : '快捷联系渠道'}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Email */}
              <button
                onClick={() => window.location.href = `mailto:${t.emailVal}`}
                className="group border border-black/5 hover:border-black rounded-xl p-6 bg-white text-left shadow-3xs transition-all duration-250 cursor-pointer focus:outline-none"
                id="contact-channel-email"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full border border-black/10 bg-black/5 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-300 overflow-hidden shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-black/40">{t.emailLabel}</div>
                    <div className="text-sm font-bold text-black font-mono mt-0.5">{t.emailVal}</div>
                    <div className="text-[11px] text-black/50 mt-1 flex items-center gap-1 font-sans">
                      <span>{t.emailAction}</span>
                      <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </button>

              {/* Card 2: GitHub */}
              <a
                href="https://github.com/lwh5141"
                target="_blank"
                rel="noreferrer"
                className="group border border-black/5 hover:border-black rounded-xl p-6 bg-white shrink-0 shadow-3xs transition-all duration-250 block"
                id="contact-channel-github"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full border border-black/10 bg-black/5 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-300 overflow-hidden shrink-0">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-black/40">{t.githubLabel}</div>
                    <div className="text-sm font-bold text-black font-mono mt-0.5">{t.githubVal}</div>
                    <div className="text-[11px] text-black/50 mt-1 flex items-center gap-1 font-sans">
                      <span>{t.githubAction}</span>
                      <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </a>

              {/* Card 3: WeChat */}
              <button
                onClick={handleCopyWeChat}
                className="group border border-black/5 hover:border-black rounded-xl p-6 bg-white text-left shadow-3xs transition-all duration-250 cursor-pointer focus:outline-none relative"
                id="contact-channel-wechat"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full border border-black/10 bg-black/5 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all duration-300 overflow-hidden shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-black/40">{t.wechatLabel}</div>
                    <div className="text-sm font-bold text-black font-mono mt-0.5">{t.wechatVal}</div>
                    <div className="text-[11px] text-black/50 mt-1 flex items-center gap-1 font-sans">
                      <span>{t.wechatAction}</span>
                      <Copy className="w-2.5 h-2.5 text-black/40 group-hover:text-black group-hover:scale-110 transition-all ml-0.5" />
                    </div>
                  </div>
                </div>
              </button>

            </div>
          </div>

        </div>
      </section>

      {/* 7. MINIMAL FOOTER */}
      <footer className="py-12 bg-[#fafafa] border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-4 font-mono text-[11px] text-black/40">
          <div>
            © 2026 LEO. ALL RIGHTS RESERVED.
          </div>
          <div>
            DESIGNED & REPLICATED WITH PRECISION // ENJOY THE LENS
          </div>
        </div>
      </footer>

      {/* ================= SUCCESS MODAL (TO CONFIRM SUCCESS ON FORM SUBMISSION) ================= */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-100 flex items-center justify-center px-4" id="success-message-modal">
            
            {/* Dark glass cover background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="absolute inset-0 bg-black/65 backdrop-blur-xs cursor-pointer"
            />

            {/* Modal Dialog Content Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-md border border-neutral-800 bg-black text-white rounded-xl py-8 px-6 text-center shadow-xl z-10 select-none"
            >
              <div className="w-12 h-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center mx-auto mb-5 text-white">
                <Check className="w-5 h-5 text-green-400" />
              </div>

              <h4 className="font-display font-bold text-2xl tracking-tight text-white">
                {t.successTitle}
              </h4>

              <p className="text-xs text-white/70 tracking-normal leading-relaxed mt-3 max-w-sm mx-auto">
                {t.successMsg}
              </p>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="mt-6 border border-white/20 hover:border-white text-white font-mono text-[10px] font-bold tracking-wider uppercase px-6 py-2 rounded-lg bg-white/5 cursor-pointer hover:bg-white/10 transition-all duration-200"
              >
                {t.close}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= GLOBAL SUCCESS TOAST FOR COPIED WECHAT ID ================= */}
      <AnimatePresence>
        {copiedToast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-100 flex items-center space-x-2 border border-black bg-black text-white px-5 py-3 rounded-lg shadow-lg font-mono text-[11px]"
            id="wechat-copied-notification"
          >
            <Check className="w-3.5 h-3.5 text-green-400" />
            <span>{t.copied}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
