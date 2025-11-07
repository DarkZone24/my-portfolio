"use client";

import { useEffect, useState } from "react";
import { Facebook, Instagram, Github, Linkedin, Menu, ChevronUp } from "lucide-react";

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const fullText = "Software Developer";
  const projects = [
    {
      title: "Inventory Management System",
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=600&fit=crop",
      description: "A web-based application designed to help businesses efficiently manage their stock, sales, and suppliers. It provides real-time tracking of product quantities, automates stock level monitoring, and streamlines reporting for better decision-making."
    },
    {
      title: "Mobile Collector System",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      description: "A web-based application designed to help businesses efficiently manage their collections on loans, sharecapital, savings etc. It is designed to lessen the paper works and to make it easily collecting payments."
    },
    {
      title: "Automated Water Billing System",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
      description: "A desktop application designed to help businesses efficiently manage their water billing. It is designed to lessen the paper works and to make it easily collecting payments with automated computations."
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
      setScrolled(window.scrollY > 100);
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/98 shadow-lg shadow-cyan-500/10' : 'bg-slate-950/95'} backdrop-blur-xl border-b border-cyan-500/10`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-3 text-cyan-400 no-underline group">
            <span className="text-3xl group-hover:scale-110 transition-transform">💻</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">Portfolio</span>
          </a>
          
          <button 
            className="lg:hidden text-white hover:text-cyan-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={28} />
          </button>

          <ul className="hidden lg:flex list-none gap-10">
            {["HOME", "ABOUT", "SERVICES", "SKILLS", "PORTFOLIO", "CONTACT"].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className="text-white no-underline font-medium uppercase tracking-wider py-2 relative transition-all duration-300 hover:text-cyan-400 after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-cyan-400 after:to-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950/98 backdrop-blur-xl border-t border-cyan-500/10">
            <ul className="list-none py-5">
              {["HOME", "ABOUT", "SERVICES", "SKILLS", "PORTFOLIO", "CONTACT"].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="block px-6 py-4 text-white no-underline uppercase tracking-wider font-medium transition-all duration-300 hover:bg-cyan-500/10 hover:text-cyan-400" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(6,182,212,0.1)_0%,_transparent_50%),radial-gradient(circle_at_80%_20%,_rgba(6,182,212,0.1)_0%,_transparent_50%)] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
          <div className="animate-fadeIn">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
              Hi! I'm<br />
              <span className="bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">Mark Alexis Macarilay</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-normal mb-8 bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent min-h-[45px]">
              {typewriterText}<span className="animate-pulse">|</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-10 text-white/80 max-w-[500px]">
              I am a passionate Software Developer who creates innovative websites, desktop applications, and web applications with seamless API integration. Let's build something amazing together!
            </p>
            <div className="flex gap-5 flex-wrap">
              <a 
                href="/documents/Mark_Alexis_Macarilay_Resume_Final.pdf" 
                download 
                className="px-8 py-4 rounded-full no-underline font-semibold uppercase tracking-wider transition-all duration-300 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white border-2 border-transparent hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/40"
              >
                Download CV
              </a>
              <a 
                href="#contact" 
                className="px-8 py-4 rounded-full no-underline font-semibold uppercase tracking-wider transition-all duration-300 bg-transparent text-cyan-400 border-2 border-cyan-400 hover:bg-cyan-400 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/40"
              >
                Let's Talk
              </a>
            </div>
          </div>
          
          <div className="hidden lg:flex justify-center p-8">
            <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-1 animate-pulse">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img 
                  src="/images/dev.jpg" 
                  alt="Mark Alexis Macarilay"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-center text-4xl lg:text-5xl font-bold mb-16 bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">About Me</h2>
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-center">
            <div className="text-center">
              <div className="w-64 h-64 lg:w-80 lg:h-80 mx-auto rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 p-1 transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                <div className="w-full h-full rounded-3xl overflow-hidden">
                  <img 
                    src="/images/ImportedPhoto.759377415.333192.jpg" 
                    alt="Mark Alexis Macarilay"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl lg:text-3xl mb-5 text-cyan-400">Software Developer</h3>
              <p className="text-base lg:text-lg leading-relaxed text-white/80 mb-8">
                I am a dedicated Software Developer with a passion for creating innovative digital solutions. My expertise spans across web development, desktop applications, and seamless API integrations that bring ideas to life.
              </p>
              <p className="text-base lg:text-lg leading-relaxed text-white/80 mb-8">
                With a strong foundation in modern technologies and a keen eye for detail, I strive to deliver high-quality solutions that not only meet but exceed client expectations. I believe in continuous learning and staying updated with the latest industry trends.
              </p>
              <a 
                href="#contact" 
                className="inline-block px-8 py-4 rounded-full no-underline font-semibold uppercase tracking-wider transition-all duration-300 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white border-2 border-transparent hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/40"
              >
                Let's Talk
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-32 bg-gradient-to-br from-slate-950 to-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-center text-4xl lg:text-5xl font-bold mb-16 bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "💻", title: "Web Development", desc: "Creating responsive and modern websites with cutting-edge technologies and best practices for optimal user experience." },
              { icon: "🖥️", title: "Desktop Applications", desc: "Building robust desktop applications tailored to your specific needs with intuitive interfaces and powerful functionality." },
              { icon: "🔌", title: "API Integration", desc: "Seamless integration of third-party APIs and development of custom APIs to connect your applications with external services." },
              { icon: "🗄️", title: "Database Design", desc: "Efficient database architecture and optimization to ensure your applications run smoothly and scale effectively." },
              { icon: "🛠️", title: "Technical Support", desc: "Comprehensive technical support and maintenance services to keep your applications running at peak performance." }
            ].map((service, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 backdrop-blur-md p-8 lg:p-10 rounded-2xl text-center border border-cyan-500/10 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/20"
              >
                <div className="text-5xl mb-5">{service.icon}</div>
                <h4 className="text-xl lg:text-2xl mb-4 text-white">{service.title}</h4>
                <p className="text-white/70 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-center text-4xl lg:text-5xl font-bold mb-16 bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">My Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {[
              { icon: "🌐", name: "HTML5", desc: "Semantic markup" },
              { icon: "🎨", name: "CSS3", desc: "Modern styling" },
              { icon: "⚡", name: "JavaScript", desc: "Dynamic functionality" },
              { icon: "🐘", name: "PHP", desc: "Server-side scripting" },
              { icon: "🅛", name: "Laravel", desc: "PHP framework" },
              { icon: "🗄️", name: "MySQL", desc: "Database management" },
              { icon: "🔀", name: "Git", desc: "Version control" },
              { icon: "🌐", name: "REST APIs", desc: "API development" },
              { icon: "🔷", name: "C-Sharp", desc: "Desktop development" },
              { icon: "⚙️", name: ".Net", desc: "Desktop framework" }
            ].map((skill, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 backdrop-blur-md p-6 lg:p-8 rounded-2xl text-center border border-cyan-500/10 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/20"
              >
                <div className="text-3xl lg:text-4xl mb-4">{skill.icon}</div>
                <h4 className="text-lg lg:text-xl mb-2 text-white">{skill.name}</h4>
                <p className="text-white/70 text-sm">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 lg:py-32 bg-gradient-to-br from-slate-950 to-slate-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <h2 className="text-center text-4xl lg:text-5xl font-bold mb-16 bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">My Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div 
                key={idx} 
                className="relative overflow-hidden rounded-xl h-80 cursor-pointer group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/20"
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent flex flex-col justify-end p-6 translate-y-full opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                  <h4 className="text-xl font-bold mb-3 text-cyan-400">{project.title}</h4>
                  <p className="text-sm text-white/80 line-clamp-4">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-32 bg-gradient-to-br from-slate-950 to-slate-800 text-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">Let's Work Together</h2>
            <p className="text-lg lg:text-xl mb-10 text-white/80">Ready to bring your ideas to life? Let's collaborate and create something amazing together!</p>
            <a 
              href="https://www.linkedin.com/in/mark-alexis-macarilay-654287359/"
              className="inline-block px-8 py-4 rounded-full no-underline font-semibold uppercase tracking-wider transition-all duration-300 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white border-2 border-transparent hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/40"
            >
              Hire Me
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-16 text-center border-t border-cyan-500/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h3 className="text-2xl lg:text-3xl mb-3 bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">Mark Alexis Macarilay</h3>
          <p className="text-white/60 mb-8">Software Developer</p>
          <div className="flex justify-center gap-5 mb-8">
            {socialLinks.map((social, idx) => (
              <a 
                key={idx}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-full no-underline transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/50"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
          <p className="text-sm opacity-60">© 2025. All rights reserved.</p>
        </div>
      </footer>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop} 
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white border-0 rounded-full cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/50 z-50 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
}