import React, { useState, useEffect } from 'react';
import { Github, Mail, Phone, MapPin, Download, Code, Database, Server, Globe, Award, BookOpen, Briefcase, User, Menu, X, ChevronUp, Settings, Linkedin } from 'lucide-react';
import ParticleBackground from './components/ParticleBackground';
import TypingAnimation from './components/TypingAnimation';
import ScrollProgress from './components/ScrollProgress';
import AnimatedCounter from './components/AnimatedCounter';
import FloatingElements from './components/FloatingElements';
import AdminPanel from './components/AdminPanel';
import CertificationsSection from './components/CertificationsSection';
import { useScrollAnimation } from './hooks/useScrollAnimation';


const ADMIN_PASSWORD = 'MDK-cv'; 
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [certifications, setCertifications] = useState([]);


  const skills = [
    { name: 'Python', level: 80, icon: Code },
    { name: 'C++', level: 75, icon: Code },
    { name: 'JavaScript', level: 70, icon: Globe },
    { name: 'HTML/CSS', level: 80, icon: Globe },
    { name: 'Database Systems', level: 75, icon: Database },
    { name: 'System Administration', level: 90, icon: Server },
    { name: 'AI/ML Algorithms', level: 65, icon: Code },
    { name: 'Network Security', level: 70, icon: Server }
  ];

  const projects = [
  {
    title: 'AI-Driven Smart Traffic Management System',
    description: 'Developed an intelligent traffic optimization system using advanced machine learning algorithms. Features include real-time monitoring, dynamic signal control, and incident detection for enhanced road safety.',
    technologies: ['Python', 'AI/ML', 'Real-time Processing'],
    type: 'Academic Project',
    highlights: ['Reduced traffic congestion by 30%', 'Real-time incident detection', 'Dynamic signal optimization']
  },
  {
    title: 'Custom PC Assembly Project',
    description: 'Successfully built and configured 15+ high-performance gaming PCs with meticulous component selection, custom configurations, and comprehensive technical support services.',
    technologies: ['Hardware Assembly', 'System Configuration', 'Technical Support'],
    type: 'Personal Project',
    highlights: ['15+ successful builds', 'Custom configurations', 'Ongoing support services']
  },
  {
    title: 'Network Security Lab Setup',
    description: 'Designed and implemented a comprehensive network security laboratory environment. Configured advanced firewall rules, security protocols, and conducted thorough vulnerability assessments.',
    technologies: ['Network Security', 'Wireshark', 'Penetration Testing'],
    type: 'Academic Project',
    highlights: ['Secure lab environment', 'Vulnerability assessments', 'Security protocol implementation']
  }
];

  const education = [
    {
      degree: 'Bachelor of Computer Science',
      institution: 'Al-Qassim University',
      period: '2020-2025',
      courses: [
        'Programming',
        'Software Engineering',
        'Computer Networks',
        'Data Structures & Algorithms',
        'Database Systems'
      ]
    }
  ];

  const typingTexts = [
    'Computer Science ',
       'Programmer ',
    'Web Development',
    'System Builder',
    'AI/ML Enthusiast',
    'Cybersecurity Specialist',
    'Technical Problem Solver'
  ];

  // Load certifications from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_certifications');
    if (saved) {
      setCertifications(JSON.parse(saved));
    }
  }, []);

  
  const aboutAnimation = useScrollAnimation({ threshold: 0.2 });
  const skillsAnimation = useScrollAnimation({ threshold: 0.1 });
  const projectsAnimation = useScrollAnimation({ threshold: 0.1 });
  const contactAnimation = useScrollAnimation({ threshold: 0.2 });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });

      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Admin functions
  const handleAdminLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    setShowAdminPanel(false);
  };

  // Keyboard shortcut for admin panel (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowAdminPanel(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      <ParticleBackground />
      <FloatingElements />
      <ScrollProgress />

      {/* Admin Panel */}
      {showAdminPanel && (
        <AdminPanel
          isAuthenticated={isAuthenticated}
          onLogin={handleAdminLogin}
          onLogout={handleAdminLogout}
        />
      )}

      {/* Hidden Admin Button (only visible when authenticated) */}
      {isAuthenticated && (
        <button
          onClick={() => setShowAdminPanel(true)}
          className="fixed bottom-8 left-8 p-3 bg-sky-600 hover:bg-sky-700 text-white rounded-full shadow-lg transition-all duration-300 hover-lift z-50"
          title="Admin Panel"
        >
          <Settings size={24} />
        </button>
      )}

      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-xl z-50 border-b border-sky-500/30 shadow-lg shadow-sky-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Enhanced Logo/Name */}
            <div className="flex items-center space-x-3">
              
              <div className="flex flex-col">
                <div className="text-2xl md:text-3xl font-bold text-white gradient-text tracking-tight">
                  Mohammed Aldkhily
                </div>
                <div className="text-xs text-sky-500 font-medium tracking-wider uppercase">
                     Computer Science
                </div>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`relative px-6 py-3 capitalize text-sm font-medium transition-all duration-300 rounded-lg group ${
                    activeSection === item
                      ? 'text-sky-400 bg-sky-400/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item}
                  {activeSection === item && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-sky-400 rounded-full animate-pulse" />
                  )}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-sky-400/0 via-sky-400/5 to-sky-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative p-2 text-white hover:text-sky-400 transition-colors transform hover:scale-110 bg-white/5 rounded-lg backdrop-blur-sm"
              >
                <div className="w-6 h-6 relative">
                  <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`} />
                  <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                  <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`} />
                </div>
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 animate-slide-up">
              <div className="flex flex-col space-y-1 bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-sky-500/20">
                {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize text-left py-3 px-4 rounded-lg transition-all duration-200 ${
                      activeSection === item
                        ? 'text-sky-400 bg-sky-400/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 p-2 animate-glow hover-lift shadow-2xl shadow-sky-500/30">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center border-2 border-sky-400/20">
                <User size={64} className="text-white" />
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-slide-up tracking-tight">
              <span className="hero-title gradient-text">Mohammed</span>
              <br />
              <span className="hero-title text-4xl md:text-6xl text-gray-300">Aldkhily</span>
            </h1>
            <div className="hero-subtitle text-2xl md:text-3xl text-sky-300 mb-4 h-12 flex items-center justify-center">
              <TypingAnimation texts={typingTexts} className="gradient-text font-medium" />
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '0.3s' }}>
              Passionate about <span className="text-sky-400 font-semibold">programmer</span>, 
              <span className="text-sky-400 font-semibold"> Web Development</span>, 
              <span className="text-sky-400 font-semibold"> networking</span>, and 
              <span className="text-sky-400 font-semibold"> cybersecurity</span>. 
              Experienced in developing intelligent systems and providing comprehensive technical support.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <a
              href="/CV.pdf"
              download
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white rounded-xl transition-all duration-300 hover-lift pulse-on-hover shadow-lg shadow-sky-500/25"
            >
              <Download size={24} className="mr-3 group-hover:animate-bounce" />
              <span className="font-semibold">See My CV</span>
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="group inline-flex items-center px-8 py-4 border-2 border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-black rounded-xl transition-all duration-300 hover-lift backdrop-blur-sm bg-white/5"
            >
              <Mail size={24} className="mr-3 group-hover:animate-bounce" />
              <span className="font-semibold">Get In Touch</span>
            </button>
          </div>

          <div className="flex justify-center space-x-8 animate-bounce-in" style={{ animationDelay: '0.9s' }}>
            {[
       { icon: Linkedin,  href: 'https://www.linkedin.com/in/mohammed-cs0', label: 'Linkedin' },
              { icon: Github, href: 'https://github.com/iMDK-cs', label: 'GitHub' },
              { icon: Mail, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=m7md.dk7@gmail.com', label: 'Email' },
              { icon: Phone, href: 'https://wa.me/966543156466', label: 'Phone' }
            ].map(({ icon: Icon, href, label }) => (
              <a 
                key={label}
                href={href} 
                className="group p-4 text-gray-400 hover:text-sky-400 transition-all duration-300 transform hover:scale-125 bg-white/5 rounded-xl backdrop-blur-sm border border-sky-500/20 hover:border-sky-400/50 hover:shadow-lg hover:shadow-sky-400/20"
                title={label}
              >
                <Icon size={28} className="group-hover:animate-pulse" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative z-20">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-5xl font-bold text-white text-center mb-16 gradient-text ${aboutAnimation.isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div ref={aboutAnimation.ref} className={`${aboutAnimation.isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <h3 className="text-3xl font-semibold text-white mb-6 gradient-text">Profile Summary</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Computer Science student with hands-on experience in programming,
             database management, and technical solutions , PC
           building. Passionate about technology with practical skills in hardware
            assembly and software development
            networking, and cybersecurity.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                I specialize in developing intelligent systems, implementing AI/ML algorithms, 
                and providing comprehensive technical support. My passion lies in creating 
                innovative solutions that bridge the gap between complex technology and practical applications.
              </p>
              
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="text-center glass rounded-xl p-6 border border-sky-500/20 hover-lift">
                  <div className="text-4xl font-bold text-sky-400 mb-2">
                    <AnimatedCounter end={15} suffix="+" />
                  </div>
                  <p className="text-gray-400 font-medium">PC Builds</p>
                </div>
                <div className="text-center glass rounded-xl p-6 border border-sky-500/20 hover-lift">
                  <div className="text-4xl font-bold text-sky-400 mb-2">
                    <AnimatedCounter end={3} suffix="+" />
                  </div>
                  <p className="text-gray-400 font-medium"> Projects</p>
                </div>
              </div>
            </div>
            
            <div className={`space-y-6 ${aboutAnimation.isVisible ? 'animate-slide-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              <div className="glass rounded-xl p-8 border border-sky-500/20 hover-lift">
                <div className="flex items-center mb-6">
                  <BookOpen className="text-sky-400 mr-4" size={28} />
                  <h4 className="text-2xl font-semibold text-white">Education</h4>
                </div>
                {education.map((edu, index) => (
                  <div key={index}>
                    <h5 className="text-xl font-medium text-white mb-2">{edu.degree}</h5>
                    <p className="text-sky-300 text-lg mb-1">{edu.institution}</p>
                    <p className="text-gray-400 mb-4">{edu.period}</p>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course, idx) => (
                        <span key={idx} className="px-3 py-2 bg-sky-600/20 text-sky-300 rounded-lg text-sm hover:bg-sky-600/30 transition-colors border border-sky-500/20">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass rounded-xl p-8 border border-sky-500/20 hover-lift">
                <div className="flex items-center mb-4">
                  <MapPin className="text-sky-400 mr-4" size={28} />
                  <h4 className="text-2xl font-semibold text-white">Location</h4>
                </div>
                <p className="text-gray-300 text-lg">Al-Qassim, Saudi Arabia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-gray-900/30 relative z-20">
        <div className="max-w-6xl mx-auto">
          <h2 ref={skillsAnimation.ref} className={`text-5xl font-bold text-white text-center mb-16 gradient-text ${skillsAnimation.isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            Skills & Technologies
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <div 
                  key={index} 
                  className={`glass rounded-xl p-8 border border-sky-500/20 hover:border-sky-400/50 transition-all duration-300 hover-lift group ${
                    skillsAnimation.isVisible ? 'animate-scale-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center mb-6">
                    <IconComponent className="text-sky-400 mr-4 group-hover:animate-bounce" size={28} />
                    <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden mb-3">
                    <div 
                      className="skill-progress bg-gradient-to-r from-sky-400 to-sky-600 h-3 rounded-full transition-all duration-2000 ease-out shadow-lg shadow-sky-400/30"
                      style={{ 
                        width: skillsAnimation.isVisible ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 0.1 + 0.5}s`
                      }}
                    ></div>
                  </div>
                  <p className="text-gray-400 font-medium">{skill.level}% Proficiency</p>
                </div>
              );
            })}
          </div>

          <div className={`mt-20 ${skillsAnimation.isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
            <h3 className="text-3xl font-semibold text-white text-center mb-12 gradient-text">Languages</h3>
            <div className="flex justify-center space-x-12">
              {[
                { name: 'English', level: 'Fluent' },
                { name: 'Arabic', level: 'Native' }
              ].map((lang, index) => (
                <div key={index} className="text-center hover-lift group">
                  <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-sky-600 rounded-2xl flex items-center justify-center mb-4 animate-glow shadow-lg shadow-sky-500/30 group-hover:shadow-sky-500/50 transition-all duration-300">
                    <Globe className="text-white group-hover:animate-spin" size={32} />
                  </div>
                  <p className="text-white font-semibold text-lg">{lang.name}</p>
                  <p className="text-sky-400 font-medium">{lang.level}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 relative z-20">
        <div className="max-w-6xl mx-auto">
          <h2 ref={projectsAnimation.ref} className={`text-5xl font-bold text-white text-center mb-16 gradient-text ${projectsAnimation.isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            Projects & Experience
         
         </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className={`glass rounded-xl p-8 border border-sky-500/20 hover:border-sky-400/50 transition-all duration-300 hover-lift group ${
                  projectsAnimation.isVisible ? 'animate-bounce-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <Briefcase className="text-sky-400 group-hover:animate-bounce" size={28} />
                  <span className="px-4 py-2 bg-sky-600/20 text-sky-300 rounded-lg text-sm font-medium border border-sky-500/20">
                    {project.type}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-sky-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                
                {/* ADD THIS KEY ACHIEVEMENTS SECTION */}
                {project.highlights && (
                  <div className="mb-4">
                    <h4 className="text-sky-400 text-sm font-semibold mb-2">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-gray-400 text-xs flex items-center">
                          <div className="w-1.5 h-1.5 bg-sky-400 rounded-full mr-2 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm hover:bg-sky-600/20 hover:text-sky-300 transition-colors border border-gray-600 hover:border-sky-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications Section */}
          <CertificationsSection
            certifications={certifications}
            isVisible={projectsAnimation.isVisible}
            animationDelay="0.8s"
          />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gray-900/30 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 ref={contactAnimation.ref} className={`text-5xl font-bold text-white mb-8 gradient-text ${contactAnimation.isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            Get In Touch
          </h2>
          <p className={`text-xl text-gray-300 mb-16 ${contactAnimation.isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            C O N T A C T
          </p>
          
          <div className="grid md:grid-cols-4 gap-4 mb-10">
  {[
    { icon: Linkedin, title: 'LinkedIn', value: 'Mohammed-cs', href: 'https://www.linkedin.com/in/mohammed-cs0' },
    { icon: Mail, title: 'Email', value: 'm7md.dk7@gmail.com', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=m7md.dk7@gmail.com' },
    { icon: Phone, title: 'Phone', value: '0543156466', href: 'https://wa.me/966543156466' }
  ].map((contact, index) => (
    <div 
      key={index}
      className={`glass rounded-xl p-3 border border-sky-500/20 hover-lift group ${
        contactAnimation.isVisible ? 'animate-scale-in' : 'opacity-0'
      }`}
      style={{ animationDelay: `${0.4 + index * 0.1}s` }}
    >
      <contact.icon className="text-sky-400 mx-auto mb-2 group-hover:animate-bounce" size={24} />
      <h3 className="text-sm font-semibold text-white mb-1">{contact.title}</h3>
      <a 
        href={contact.href} 
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-sky-400 transition-colors text-xs font-medium block text-center"
      >
        {contact.value}
      </a>
    </div>
  ))}

  {/* GitHub Card */}
  <div 
    className={`glass rounded-xl p-3 border border-sky-500/20 hover-lift group ${
      contactAnimation.isVisible ? 'animate-scale-in' : 'opacity-0'
    }`}
    style={{ animationDelay: `${0.4 + 3 * 0.1}s` }}
  >
    <Github className="text-sky-400 mx-auto mb-2 group-hover:animate-bounce" size={24} />
    <h3 className="text-sm font-semibold text-white mb-1">GitHub</h3>
    <a 
      href="https://github.com/iMDK-cs" 
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-300 hover:text-sky-400 transition-colors text-xs font-medium block text-center"
    >
      @iMDK-cs
    </a>
  </div>
</div>

          <div className={`glass rounded-xl p-10 border border-sky-500/20 hover-lift ${contactAnimation.isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
            <h3 className="text-3xl font-semibold text-white mb-8 gradient-text">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-6 py-4 bg-gray-800/50 border border-sky-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-sky-400 transition-all duration-300 focus:shadow-lg focus:shadow-sky-400/20 backdrop-blur-sm"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-6 py-4 bg-gray-800/50 border border-sky-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-sky-400 transition-all duration-300 focus:shadow-lg focus:shadow-sky-400/20 backdrop-blur-sm"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-6 py-4 bg-gray-800/50 border border-sky-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-sky-400 transition-all duration-300 focus:shadow-lg focus:shadow-sky-400/20 backdrop-blur-sm"
              />
              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full px-6 py-4 bg-gray-800/50 border border-sky-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-sky-400 transition-all duration-300 resize-none focus:shadow-lg focus:shadow-sky-400/20 backdrop-blur-sm"
              ></textarea>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white rounded-xl transition-all duration-300 transform hover:scale-105 pulse-on-hover font-semibold text-lg shadow-lg shadow-sky-500/25"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

     {/* Footer */}
<footer className="py-8 px-4 border-t border-sky-500/20 relative z-20">
  <div className="max-w-6xl mx-auto text-center">
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center mb-4 md:mb-0">
        <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg flex items-center justify-center mr-3">
           <User size={16} className="text-white" />
        </div>
        <div>
          <p className="text-white font-semibold">Mohammed Aldkhily</p>
          <p className="text-gray-400 text-sm">Computer Science </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-6">
        <a href="https://www.linkedin.com/in/mohammed-cs0" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-400 transition-colors">
          <Linkedin size={20} />
        </a>
        <a href="https://github.com/iMDK-cs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-sky-400 transition-colors">
          <Github size={20} />
        </a>
        <a href="mailto:m7md.dk7@gmail.com" className="text-gray-400 hover:text-sky-400 transition-colors">
          <Mail size={20} />
        </a>
      </div>
    </div>
    
    <div className="border-t border-sky-500/10 mt-6 pt-6">
      <p className="text-gray-400 text-sm">
        2025 Mohammed Aldkhily.
      </p>
      <p className="text-gray-500 text-xs mt-2">
        Built with React & TypeScript • By MDK
      </p>
    </div>
  </div>
</footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-sky-600 hover:bg-sky-700 text-white rounded-full shadow-lg transition-all duration-300 hover-lift pulse-on-hover z-50 animate-bounce-in"
        >
          <ChevronUp size={28} />
        </button>
      )}
    </div>
  );
}

export default App;
