"use client";


import { Facebook, Instagram, Github, Linkedin, Menu, ChevronUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fullText = "Software Engineer";

  // Loading timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      title: "Inventory Management System",
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=600&fit=crop",
      description: "A web-based application designed to help businesses efficiently manage their stock, sales, and suppliers. It provides real-time tracking of product quantities, automates stock level monitoring, and streamlines reporting for better decision-making.",
      demoUrl: "#",
      sourceUrl: "https://github.com/DarkZone24/inventory_management_system"
    },
    {
      title: "Mobile Collector System",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      description: "A web-based application designed to help businesses efficiently manage their collections on loans, sharecapital, savings etc. It is designed to lessen the paper works and to make it easily collecting payments.",
      demoUrl: "https://staging-e-collect.coredev.ph/",
      sourceUrl: "https://github.com/DarkZone24/mobile-collector-app"
    }
  ];

  const socialLinks = [
    { icon: Facebook, url: "https://www.facebook.com/sphinx0224/", label: "Facebook" },
    { icon: Instagram, url: "https://www.instagram.com/kraken022400/", label: "Instagram" },
    { icon: Github, url: "https://github.com/DarkZone24", label: "GitHub" },
    { icon: Linkedin, url: "https://www.linkedin.com/in/mark-alexis-macarilay-654287359/", label: "LinkedIn" }
  ];

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    let isDeleting = false;
    let speed = 150;

    const type = () => {
      if (!isDeleting && i < fullText.length) {
        setTypewriterText(fullText.substring(0, i + 1));
        i++;
        speed = 150;
      } else if (isDeleting && i > 0) {
        setTypewriterText(fullText.substring(0, i - 1));
        i--;
        speed = 100;
      }

      if (i === fullText.length && !isDeleting) {
        isDeleting = true;
        speed = 1000;
      } else if (i === 0 && isDeleting) {
        isDeleting = false;
        speed = 500;
      }

      setTimeout(type, speed);
    };

    type();
  }, []);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "a3a1f70d-0e97-4053-b282-34a8185bdb72",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert("Something went wrong. Please try again or email me directly.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Theme classes
  const theme = {
    bg: 'bg-linear-to-br from-slate-950 via-[#0a0a0c] to-[#020617]',
    text: 'text-slate-50',
    textMuted: 'text-slate-400',
    textLight: 'text-slate-500',
    navBg: 'bg-[#0a0a0c]/90',
    navBorder: 'border-white/5',
    cardBg: 'bg-white/[0.03]',
    cardBorder: 'border-white/10',
    cardHover: 'hover:border-indigo-500/30',
    sectionAlt: 'bg-linear-to-br from-[#0a0a0c] via-[#020617] to-black',
    sectionAlt2: 'bg-linear-to-br from-black to-[#0a0a0c]',
    footerBg: 'bg-black',
    gradient: 'bg-[radial-gradient(circle_at_20%_80%,_rgba(79,70,229,0.08)_0%,_transparent_40%),radial-gradient(circle_at_80%_20%,_rgba(139,92,246,0.08)_0%,_transparent_40%)]',
    shadow: 'shadow-indigo-500/5',
    accent: 'from-indigo-400 via-violet-400 to-indigo-500',
    btnPrimary: 'bg-linear-to-r from-indigo-600 to-violet-600 text-white',
    btnSecondary: 'border-indigo-400/50 text-indigo-400 hover:bg-indigo-400/10'
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${theme.bg}`}
        >
          <div className="relative">
            {/* Main Spinner Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-t border-b border-indigo-500/40 shadow-[0_0_30px_rgba(79,70,229,0.2)]"
            />
            {/* Inner Ring (Reversed) */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 rounded-full border-l border-r border-violet-500/30 opacity-60"
            />
            {/* Center pulsing icon */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center font-mono text-2xl sm:text-3xl text-indigo-400 font-bold"
            >
              &lt; /&gt;
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-12 flex flex-col items-center"
          >
            <div className="text-[10px] uppercase tracking-[0.4em] text-indigo-500/60 mb-4 font-bold">
              Engineering Excellence
            </div>
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scaleY: [1, 2, 1],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1 h-4 bg-indigo-500 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={`min-h-screen ${theme.bg} ${theme.text} overflow-x-hidden transition-colors duration-300`}
        >
          {/* Navigation */}
          <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? `${theme.navBg} shadow-lg ${theme.shadow} py-3` : `${theme.navBg} py-4`} backdrop-blur-xl border-b ${theme.navBorder}`}>
            {/* ... navigation content ... */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center">
              <motion.button
                onClick={() => scrollToSection('home')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 sm:gap-3 text-indigo-400 bg-transparent border-0 cursor-pointer group"
              >
                <span className="text-2xl sm:text-3xl transition-transform group-hover:rotate-12">💻</span>
                <span className={`text-xl sm:text-2xl font-bold bg-linear-to-r ${theme.accent} bg-clip-text text-transparent`}>Portfolio</span>
              </motion.button>

              <div className="flex items-center gap-2 xs:gap-4 sm:gap-6">

                {/* Mobile Menu Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`lg:hidden ${theme.text} hover:text-cyan-400 transition-colors bg-transparent border-0 cursor-pointer p-1.5 sm:p-2 rounded-lg ${theme.cardBg} border ${theme.cardBorder}`}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
                </motion.button>
              </div>

              <motion.ul
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden lg:flex list-none gap-6 xl:gap-10 m-0 p-0 items-center"
              >
                {["HOME", "ABOUT", "SERVICES", "SKILLS", "PORTFOLIO", "CONTACT"].map((item) => (
                  <li key={item}>
                    <motion.button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`${theme.text} bg-transparent border-0 cursor-pointer font-medium text-xs sm:text-sm uppercase tracking-widest py-2 relative transition-all duration-300 hover:text-indigo-400 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-linear-to-r after:${theme.accent} after:transition-all after:duration-300 hover:after:w-full`}
                    >
                      {item}
                    </motion.button>
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className={`${theme.navBg} backdrop-blur-xl border-t ${theme.navBorder}`}>
                <ul className="list-none py-2 m-0 p-0">
                  {["HOME", "ABOUT", "SERVICES", "SKILLS", "PORTFOLIO", "CONTACT"].map((item) => (
                    <li key={item}>
                      <motion.button
                        onClick={() => scrollToSection(item.toLowerCase())}
                        whileTap={{ scale: 0.98, x: 5 }}
                        className={`w-full text-left px-6 py-4 ${theme.text} bg-transparent border-0 cursor-pointer uppercase tracking-[0.2em] font-medium text-xs transition-all duration-300 hover:bg-indigo-500/5 hover:text-indigo-400`}
                      >
                        {item}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>


          {/* Hero Section */}
          <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-20 sm:pt-24 pb-12 sm:pb-16">
            <div className={`absolute inset-0 ${theme.gradient} pointer-events-none`}></div>

            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center lg:text-left order-2 lg:order-1"
              >
                <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-bold mb-3 sm:mb-4 lg:mb-5 leading-tight tracking-tight">
                  Hi, I am<br />
                  <span className={`bg-linear-to-r ${theme.accent} bg-clip-text text-transparent`}>Mark Alexis Macarilay</span>
                </h1>
                <h2 className={`text-lg xs:text-2xl sm:text-3xl font-medium mb-6 sm:mb-7 lg:mb-8 bg-linear-to-r ${theme.accent} bg-clip-text text-transparent min-h-[3.5rem] tracking-wide flex items-center justify-center lg:justify-start`}>
                  {typewriterText}<span className="animate-pulse ml-1 text-indigo-400">|</span>
                </h2>
                <p className={`text-sm xs:text-base sm:text-lg leading-relaxed mb-8 sm:mb-9 lg:mb-10 ${theme.textMuted} max-w-[550px] mx-auto lg:mx-0 px-2 sm:px-0 font-light`}>
                  A passionate Software Engineer dedicated to crafting robust digital experiences, sophisticated desktop solutions, and seamless architectural integrations.
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex flex-col xs:flex-row gap-4 sm:gap-6 justify-center lg:justify-start px-4 xs:px-0"
                >
                  <motion.a
                    href="/documents/Mark_Alexis_Macarilay_Resume_Final (1).pdf"
                    download
                    whileHover={{ y: -3, boxShadow: "0px 10px 25px rgba(79, 70, 229, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-8 sm:px-10 py-4 sm:py-5 rounded-lg text-center no-underline font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-500 ${theme.btnPrimary} shadow-xl shadow-indigo-600/20`}
                  >
                    Download CV
                  </motion.a>
                  <motion.button
                    onClick={() => scrollToSection('contact')}
                    whileHover={{ y: -3, backgroundColor: 'rgba(79, 70, 229, 0.05)' }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-8 sm:px-10 py-4 sm:py-5 rounded-lg text-center border cursor-pointer font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-500 bg-transparent ${theme.btnSecondary}`}
                  >
                    Let's Talk
                  </motion.button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="flex justify-center p-2 xs:p-4 sm:p-6 lg:p-8 order-1 lg:order-2"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-violet-600 rounded-full blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative w-48 h-48 xs:w-64 xs:h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-linear-to-br from-indigo-500 via-indigo-600 to-violet-700 p-[2px] shadow-2xl shadow-indigo-500/10">
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-950">
                      <img
                        src="/images/dev.jpg"
                        alt="Mark Alexis Macarilay"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className={`py-16 sm:py-20 lg:py-32 ${theme.sectionAlt}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`text-center text-3xl xs:text-4xl sm:text-5xl font-bold mb-10 sm:mb-12 lg:mb-16 bg-linear-to-r ${theme.accent} bg-clip-text text-transparent tracking-tight`}
              >
                About Me
              </motion.h2>
              <div className="grid lg:grid-cols-[1fr_2fr] gap-8 sm:gap-10 lg:gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="text-center"
                >
                  <div className="w-56 h-56 xs:w-64 xs:h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 p-[1px] transition-all duration-700 hover:shadow-2xl hover:shadow-indigo-500/10 grayscale-[0.5] hover:grayscale-0">
                    <div className="w-full h-full rounded-xl overflow-hidden bg-slate-900">
                      <img
                        src="/images/alexis (2).jpg"
                        alt="Mark Alexis Macarilay"
                        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                      />
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center lg:text-left px-2 sm:px-4 lg:px-0"
                >
                  <h3 className="text-xl xs:text-2xl sm:text-3xl mb-4 sm:mb-5 text-indigo-400 font-semibold tracking-wide">Software Engineer</h3>
                  <p className={`text-sm xs:text-base sm:text-lg leading-relaxed ${theme.textMuted} mb-5 sm:mb-6 lg:mb-8 font-light`}>
                    I am a dedicated Software Engineer specialized in architecting sophisticated digital ecosystems. My approach combines technical precision with creative problem-solving to deliver resilient, scalable solutions.
                  </p>
                  <p className={`text-sm xs:text-base sm:text-lg leading-relaxed ${theme.textMuted} mb-6 sm:mb-7 lg:mb-8 font-light`}>
                    Committed to engineering excellence, I leverage contemporary methodologies and emerging technologies to translate complex requirements into seamless, high-performance applications.
                  </p>
                  <motion.button
                    onClick={() => scrollToSection('contact')}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`inline-block px-8 py-4 rounded-lg border-0 cursor-pointer font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-500 ${theme.btnPrimary} shadow-lg shadow-indigo-600/10`}
                  >
                    Initiate Collaboration
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className={`py-16 sm:py-20 lg:py-32 ${theme.sectionAlt2}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`text-center text-3xl xs:text-4xl sm:text-5xl font-bold mb-10 sm:mb-12 lg:mb-16 bg-linear-to-r ${theme.accent} bg-clip-text text-transparent tracking-tight`}
              >
                Services
              </motion.h2>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
                className="flex flex-wrap justify-center gap-6 sm:gap-8"
              >
                {[
                  { icon: "💻", title: "Web Development", desc: "Creating responsive and modern websites with cutting-edge technologies and best practices for optimal user experience." },
                  { icon: "🖥️", title: "Desktop Applications", desc: "Building robust desktop applications tailored to your specific needs with intuitive interfaces and powerful functionality." },
                  { icon: "🔌", title: "API Integration", desc: "Seamless integration of third-party APIs and development of custom APIs to connect your applications with external services." },
                  { icon: "🗄️", title: "Database Administration", desc: "Efficient database architecture and optimization to ensure your applications run smoothly and scale effectively." },
                  { icon: "🛠️", title: "Technical Support", desc: "Comprehensive technical support and maintenance services to keep your applications running at peak performance." }
                ].map((service, idx) => (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                    whileHover={{ y: -8, borderColor: 'rgba(79, 70, 229, 0.4)' }}
                    className={`${theme.cardBg} backdrop-blur-sm p-8 sm:p-10 rounded-xl text-center border ${theme.cardBorder} transition-all duration-500 ${theme.cardHover} flex flex-col items-center group relative overflow-hidden w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] max-w-[400px]`}
                  >
                    <div className="text-3xl sm:text-4xl mb-6 relative">
                      <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <span className="relative z-10">{service.icon}</span>
                    </div>
                    <h4 className={`text-lg sm:text-xl font-bold mb-4 ${theme.text} tracking-wide`}>{service.title}</h4>
                    <p className={`text-xs sm:text-sm ${theme.textLight} leading-relaxed font-light px-2`}>{service.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className={`py-16 sm:py-20 lg:py-32 ${theme.sectionAlt}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center text-3xl xs:text-4xl sm:text-5xl font-bold mb-10 sm:mb-12 lg:mb-16 bg-linear-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent"
              >
                My Skills
              </motion.h2>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.05 }
                  }
                }}
                className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 xs:gap-4 sm:gap-6 lg:gap-8"
              >
                {[
                  { icon: "🌐", name: "HTML5", desc: "Semantic markup", level: 95 },
                  { icon: "🎨", name: "CSS3", desc: "Modern styling", level: 90 },
                  { icon: "⚡", name: "JavaScript", desc: "Dynamic functionality", level: 85 },
                  { icon: "🐘", name: "PHP", desc: "Server-side scripting", level: 88 },
                  { icon: "🅛", name: "Laravel", desc: "PHP framework", level: 82 },
                  { icon: "🗄️", name: "MySQL", desc: "Database management", level: 85 },
                  { icon: "", name: "Git", desc: "Version control", level: 80 },
                  { icon: "🌐", name: "REST APIs", desc: "API development", level: 85 },
                  { icon: "🔷", name: "C-Sharp", desc: "Desktop development", level: 75 },
                  { icon: "⚙️", name: ".Net", desc: "Desktop framework", level: 78 }
                ].map((skill, idx) => (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
                    }}
                    whileHover={{ y: -8, borderColor: 'rgba(79, 70, 229, 0.4)' }}
                    className={`${theme.cardBg} backdrop-blur-sm p-6 sm:p-8 rounded-xl text-center border ${theme.cardBorder} transition-all duration-500 ${theme.cardHover} group flex flex-col items-center justify-center gap-3 overflow-hidden relative`}
                  >
                    <div className="text-2xl sm:text-3xl transition-transform duration-500 group-hover:scale-110 mb-2">{skill.icon || "⚙️"}</div>
                    <h4 className={`text-xs sm:text-sm ${theme.text} font-bold tracking-widest uppercase mb-1`}>{skill.name}</h4>
                    <p className={`${theme.textLight} text-[9px] uppercase tracking-[0.2em] font-medium opacity-60 mb-4`}>{skill.desc}</p>

                    {/* Progress Bar Container */}
                    <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        className="h-full bg-linear-to-r from-indigo-500 to-violet-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]"
                      />
                    </div>
                    <div className="flex justify-between w-full mt-2">
                      <span className="text-[8px] uppercase tracking-tighter text-slate-500 font-bold">Proficiency</span>
                      <span className="text-[8px] text-indigo-400 font-bold">{skill.level}%</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Portfolio Section */}
          <section id="portfolio" className={`py-16 sm:py-20 lg:py-32 ${theme.sectionAlt2}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`text-center text-3xl xs:text-4xl sm:text-5xl font-bold mb-10 sm:mb-12 lg:mb-16 bg-linear-to-r ${theme.accent} bg-clip-text text-transparent`}
              >
                My Projects
              </motion.h2>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2 }
                  }
                }}
                className="flex flex-wrap justify-center gap-6 sm:gap-8"
              >
                {projects.map((project, idx) => (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                    }}
                    whileHover={{ y: -10 }}
                    className="group relative overflow-hidden rounded-xl h-64 xs:h-72 sm:h-80 w-full xs:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] max-w-[400px] cursor-pointer shadow-lg transition-all duration-700 hover:shadow-indigo-500/10 border border-white/5"
                  >

                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent z-10 transition-opacity duration-700 opacity-60 group-hover:opacity-80"></div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    {/* Desktop Overlay: Show on hover */}
                    <motion.div
                      initial={{ opacity: 0, scale: 1.05 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="hidden lg:flex absolute inset-0 z-20 bg-[#0a0a0c]/90 backdrop-blur-sm flex-col justify-center items-center p-8 text-center"
                    >
                      <h4 className="text-xl font-bold mb-3 text-white tracking-widest uppercase">{project.title}</h4>
                      <p className="text-xs text-slate-400 mb-8 line-clamp-3 leading-relaxed font-light">{project.description}</p>

                      <div className="flex gap-4">
                        <motion.a
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                          whileTap={{ scale: 0.95 }}
                          className="px-5 py-2.5 rounded-lg border border-white/20 text-white font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center gap-2"
                        >
                          <Github size={14} /> Source
                        </motion.a>
                        <motion.a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)" }}
                          whileTap={{ scale: 0.95 }}
                          className="px-5 py-2.5 rounded-lg bg-linear-to-r from-indigo-600 to-violet-600 text-white font-bold text-[10px] uppercase tracking-widest transition-shadow flex items-center gap-2"
                        >
                          Live Demo
                        </motion.a>
                      </div>
                    </motion.div>
                    {/* Mobile Info Overlay: Persistent on small screens */}
                    <div className="lg:hidden absolute bottom-0 left-0 right-0 z-20 p-6 bg-linear-to-t from-black via-black/80 to-transparent">
                      <h4 className="text-base font-bold text-indigo-400 mb-1 tracking-tight">{project.title}</h4>
                      <div className="flex gap-3 mt-3">
                        <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Github size={16} /></a>
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 font-bold text-[10px] uppercase tracking-widest underline decoration-indigo-500/30 underline-offset-4">Live Demo</a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className={`py-16 sm:py-20 lg:py-32 ${theme.sectionAlt}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className={`text-3xl xs:text-4xl sm:text-5xl font-bold mb-6 bg-linear-to-r ${theme.accent} bg-clip-text text-transparent tracking-tight`}>
                    Let's Connect
                  </h2>
                  <p className={`text-base sm:text-lg mb-8 ${theme.textMuted} font-light leading-relaxed`}>
                    Have a project in mind or just want to say hi? I'm always open to discussing new opportunities, creative ideas, or being part of your visions.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-indigo-400 group-hover:border-indigo-500/50 transition-colors">
                        📧
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Email</p>
                        <p className="text-sm font-medium">itdeveloper081124@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-indigo-400 group-hover:border-indigo-500/50 transition-colors">
                        📍
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Location</p>
                        <p className="text-sm font-medium">Philippines</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`${theme.cardBg} backdrop-blur-md p-8 sm:p-10 rounded-2xl border ${theme.cardBorder} relative overflow-hidden`}
                >
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="h-full flex flex-col items-center justify-center text-center py-10"
                      >
                        <div className="w-20 h-20 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-3xl mb-6">
                          ✓
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                        <p className="text-slate-400 font-light">Thank you for reaching out. I'll get back to you shortly.</p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleContactSubmit}
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-5"
                      >
                        <div>
                          <input
                            type="text"
                            placeholder="Your Name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm focus:outline-hidden focus:border-indigo-500/50 transition-colors placeholder:text-slate-600"
                          />
                        </div>
                        <div>
                          <input
                            type="email"
                            placeholder="Email Address"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm focus:outline-hidden focus:border-indigo-500/50 transition-colors placeholder:text-slate-600"
                          />
                        </div>
                        <div>
                          <textarea
                            placeholder="Your Message"
                            required
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm focus:outline-hidden focus:border-indigo-500/50 transition-colors placeholder:text-slate-600 resize-none"
                          />
                        </div>
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 ${isSubmitting ? 'bg-slate-800 text-slate-500' : theme.btnPrimary} flex items-center justify-center gap-2`}
                        >
                          {isSubmitting ? 'Sending...' : 'Connect With Me!'}
                        </motion.button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className={`${theme.footerBg} py-10 sm:py-12 lg:py-16 text-center border-t ${theme.navBorder}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
              <h3 className="text-xl xs:text-2xl sm:text-3xl mb-2 sm:mb-3 bg-linear-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent font-bold">Mark Alexis Macarilay</h3>
              <p className={`${theme.textLight} mb-6 sm:mb-8 text-sm xs:text-base`}>Software Engineer</p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex justify-center gap-6 mb-10 flex-wrap"
              >
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    whileHover={{ y: -3, scale: 1.1, color: '#818cf8' }}
                    whileTap={{ scale: 0.9 }}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-slate-500 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </motion.div>
              <p className="text-xs xs:text-sm opacity-60 text-white">© 2026. All rights reserved.</p>
            </div>
          </footer>

          {/* Scroll to Top */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 w-12 h-12 ${theme.btnPrimary} border-0 rounded-lg cursor-pointer transition-all duration-500 shadow-2xl shadow-indigo-600/20 z-50 flex items-center justify-center`}
                aria-label="Scroll to top"
              >
                <ChevronUp size={20} />
              </motion.button>
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  );
}