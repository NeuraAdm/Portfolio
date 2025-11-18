"use client"

import type React from "react"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { ChevronDown, Moon, Sun, Github, Linkedin, Mail, ExternalLink, Sparkles, Code2, Layers, Box, Briefcase, Award, Users, CheckCircle2, Calendar, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "next-themes"
import Link from "next/link"
import Image from "next/image"
import { useBasePath } from "@/hooks/use-base-path"
import Tilt from "react-parallax-tilt"

export default function Portfolio() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<null | "success" | "error">(null)
  const basePath = useBasePath()

  const homeRef = useRef<HTMLElement | null>(null)
  const aboutRef = useRef<HTMLElement | null>(null)
  const servicesRef = useRef<HTMLElement | null>(null)
  const experienceRef = useRef<HTMLElement | null>(null)
  const projectsRef = useRef<HTMLElement | null>(null)
  const contactRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  // Mouse parallax effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 100 })
  const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 100 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 2
      const y = (clientY / innerHeight - 0.5) * 2
      mouseX.set(x)
      mouseY.set(y)
      setMousePosition({ x: clientX, y: clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  // Theme toggle
  useEffect(() => {
    setMounted(true)
  }, [])

  // Intersection observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    const sections = [homeRef.current, aboutRef.current, servicesRef.current, experienceRef.current, projectsRef.current, contactRef.current]
    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

  // Form handling
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("error")
      return
    }

    // In a real app, you would send this data to your backend
    console.log("Form submitted:", formData)
    setFormStatus("success")
    setFormData({ name: "", email: "", message: "" })

    // Reset form status after 3 seconds
    setTimeout(() => {
      setFormStatus(null)
    }, 3000)
  }

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  const projects = [
    {
      id: 1,
      title: "Landing Page Corporativa",
      description: "Una landing page corporativa para una empresa",
      image: `${basePath}neura.png?height=400&width=300`,
      tags: ["Node.js", "TypeScript", "React", "Tailwind CSS"],
      category: "web",
      link: "https://neuraadm.github.io/Neura/",
    },
    {
      id: 2,
      title: "Aplicacion Documental Primora",
      description: "Plataforma Web de Gestion Documental",
      image: `${basePath}primora.png?height=400&width=300`,
      tags: ["PHP", "AJAX", "JavaScript", "CSS", "HTML"],
      category: "app",
      link: "https://primora.app/",
    },
    {
      id: 3,
      title: "Landing Page Empresarial",
      description: "Una landing page empresarial para una empresa de SG-SST",
      image: `${basePath}gestus.png?height=400&width=300`,
      tags: ["React", "Node.JS", "TypeScript", "Tailwind CSS"],
      category: "web",
      link: "https://gestus-94579.web.app/",
    },
    {
      id: 4,
      title: "Diseño Web",
      description: "Diseño Web para un emprendimiento de Fotografia para Mascotas",
      image: `${basePath}lakanu.png?height=400&width=300`,
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      category: "web",
      link: "https://lakanustudio.com",
    },
    {
      id: 5,
      title: "Diseño Web",
      description: "Diseño Web para un emprendimiento de un Cafe/Bar",
      image: `${basePath}cafe.png?height=400&width=300`,
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      category: "web",
      link: "https://cafe-elreloj.web.app/",
    },
    {
      id: 6,
      title: "Diseño Web",
      description: "Diseño Web para una empresa de construccion con sede en Estados Unidos",
      image: `${basePath}jireh.png?height=400&width=300`,
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      category: "web",
      link: "https://jireh-construction-llc.web.app/",
    },
    {
      id: 7,
      title: "Diseño Web",
      description: "Diseño Web para una inmobiliaria con mostrario de propiedades",
      image: `${basePath}oportuna.png?height=400&width=300`,
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      category: "web",
      link: "https://oportunainmobiliaria.com.co/",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none" />
      
      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Link href={basePath || "/"} className="text-xl font-bold flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-teal">
                  <Code2 className="h-5 w-5 text-white" />
                </div>
                <span className="text-gradient-teal">Juan</span>
                <span>Portfolio</span>
              </Link>
            </motion.div>

            <nav className="hidden md:flex space-x-1 glass rounded-full px-2 py-1">
              {[
                { name: "Inicio", ref: homeRef, icon: Sparkles },
                { name: "Acerca De", ref: aboutRef, icon: Box },
                { name: "Servicios", ref: servicesRef, icon: Briefcase },
                { name: "Experiencia", ref: experienceRef, icon: Calendar },
                { name: "Proyectos", ref: projectsRef, icon: Layers },
                { name: "Contacto", ref: contactRef, icon: Mail },
              ].map((item) => (
                <motion.button
                  key={item.name.toLowerCase()}
                  onClick={() => scrollToSection(item.ref)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all flex items-center gap-2 ${
                    activeSection === item.name.toLowerCase()
                      ? "bg-primary text-white glow-teal"
                      : "hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </motion.button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="rounded-full glass hover:glow-teal"
              >
                {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <Button variant="outline" size="icon" className="md:hidden glass rounded-full">
                <ChevronDown className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <motion.section
          id="home"
          ref={homeRef}
          className="min-h-screen flex flex-col justify-center relative overflow-hidden"
        >
          {/* 3D floating elements */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              x: useTransform(smoothMouseX, [-1, 1], [-50, 50]),
              y: useTransform(smoothMouseY, [-1, 1], [-50, 50]),
            }}
          >
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
          </motion.div>

          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left side - Text content */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="inline-block mb-4">
                    <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm">Disponible para proyectos</span>
                    </div>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
                    Hola, Soy{" "}
                    <span className="text-gradient-teal">Juan Pablo</span>
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                    <span className="text-gradient-ocean">Arquitecto de Software</span>
                    <br />
                    Full Stack & Backend Developer
                  </h2>
                </motion.div>

                <motion.p
                  className="text-lg text-muted-foreground max-w-xl leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  Especializado en crear experiencias digitales innovadoras y escalables. 
                  Conecto con las personas para ejecutar proyectos que resuelven problemas reales, 
                  combinando arquitectura sólida con diseño moderno.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Button 
                    onClick={() => scrollToSection(projectsRef)} 
                    size="lg" 
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 glow-teal group"
                  >
                    <Layers className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Ver Proyectos
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => scrollToSection(contactRef)}
                    className="glass hover:glow-teal-light"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Contactame
                  </Button>
                </motion.div>

                {/* Social links */}
                <motion.div
                  className="flex gap-4 pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <a href="https://github.com/NeuraAdm" target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="glass hover:glow-teal">
                      <Github className="h-5 w-5" />
                    </Button>
                  </a>
                  <a href="https://www.linkedin.com/in/juan-pablo-a-a62719142" target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="glass hover:glow-teal">
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </a>
                  <a href="mailto:neura.admt@gmail.com">
                    <Button variant="ghost" size="icon" className="glass hover:glow-teal-light">
                      <Mail className="h-5 w-5" />
                    </Button>
                  </a>
                </motion.div>
              </div>

              {/* Right side - 3D Visual */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  {/* Rotating rings */}
                  <motion.div
                    className="absolute inset-0 border-2 border-primary/30 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-8 border-2 border-secondary/30 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-16 border-2 border-primary/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Center glow */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 bg-gradient-to-br from-primary to-secondary rounded-full blur-2xl opacity-50 animate-pulse" />
                  </div>
                  
                  {/* Tech stack badges floating around */}
                  {["React", "Node.js", "TypeScript", "PHP", "MySQL"].map((tech, i) => (
                    <motion.div
                      key={tech}
                      className="absolute glass px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        left: `${50 + 40 * Math.cos((i * 2 * Math.PI) / 5)}%`,
                        top: `${50 + 40 * Math.sin((i * 2 * Math.PI) / 5)}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 2 + i * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => scrollToSection(aboutRef)} 
                aria-label="Scroll down"
                className="glass rounded-full hover:glow-teal"
              >
                <ChevronDown className="h-6 w-6" />
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* About Section */}
        <section id="about" ref={aboutRef} className="py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16 text-center"
            >
              <div className="inline-block mb-4">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Conoce más</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Sobre <span className="text-gradient-teal">Mi</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Tilt
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  glareEnable={true}
                  glareMaxOpacity={0.2}
                  scale={1.02}
                  className="relative"
                >
                  <div className="relative w-full aspect-square max-w-md mx-auto overflow-hidden rounded-2xl glass">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                    <Image 
                      src={`${basePath}perfil.jpg?height=500&width=500`} 
                      alt="Profile" 
                      fill 
                      className="object-cover" 
                    />
                    <div className="absolute inset-0 border-2 border-white/10 rounded-2xl" />
                  </div>
                </Tilt>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Arquitecto de Software con +1 año de experiencia
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Me especializo en construir aplicaciones web modernas y escalables que resuelven problemas reales. 
                    Mi pasión reside en crear <span className="text-primary font-semibold">sistemas intuitivos, prácticos y escalables</span> para 
                    cualquier desafío digital.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Aplicando las mejores prácticas de desarrollo y gestión de proyectos, transformo ideas en 
                    realidad dentro de la era de innovación digital, con enfoque en <span className="text-secondary font-semibold">arquitectura robusta</span> y 
                    experiencias de usuario excepcionales.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <motion.div 
                    className="glass p-6 rounded-xl hover:glow-teal transition-all"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Code2 className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Frontend</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        React / Next.js
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        TypeScript
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        Tailwind CSS
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        Node.js
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div 
                    className="glass p-6 rounded-xl hover:glow-teal-light transition-all"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Box className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Backend</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                        PHP
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                        AJAX
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                        MySQL
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                        API REST
                      </li>
                    </ul>
                  </motion.div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  {["Arquitectura", "Full Stack", "Backend", "Escalabilidad"].map((skill) => (
                    <motion.span
                      key={skill}
                      className="glass px-4 py-2 rounded-full text-sm font-medium hover:glow-teal transition-all"
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" ref={servicesRef} className="py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16 text-center"
            >
              <div className="inline-block mb-4">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Qué ofrezco</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Mis <span className="text-gradient-teal">Servicios</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Code2,
                  title: "Desarrollo Full Stack",
                  description: "Aplicaciones web completas desde el frontend hasta el backend, con arquitectura escalable y código limpio.",
                  features: ["React/Next.js", "Node.js/PHP", "APIs RESTful", "Bases de datos"]
                },
                {
                  icon: Layers,
                  title: "Arquitectura de Software",
                  description: "Diseño de sistemas robustos y escalables siguiendo las mejores prácticas y patrones de arquitectura.",
                  features: ["Microservicios", "Clean Architecture", "Escalabilidad", "Documentación"]
                },
                {
                  icon: Rocket,
                  title: "Consultoría Técnica",
                  description: "Asesoría en decisiones tecnológicas, optimización de código y mejores prácticas de desarrollo.",
                  features: ["Code Review", "Refactoring", "Performance", "Best Practices"]
                },
                {
                  icon: Box,
                  title: "Backend Development",
                  description: "Desarrollo de APIs robustas, gestión de bases de datos y lógica de negocio compleja.",
                  features: ["API REST", "Autenticación", "Base de datos", "Integración"]
                },
                {
                  icon: Briefcase,
                  title: "Gestión de Proyectos",
                  description: "Planificación, coordinación y ejecución de proyectos de software con metodologías ágiles.",
                  features: ["Scrum/Agile", "Documentación", "Git/GitHub", "CI/CD"]
                },
                {
                  icon: Users,
                  title: "Trabajo en Equipo",
                  description: "Colaboración efectiva con equipos multidisciplinarios y comunicación clara de soluciones técnicas.",
                  features: ["Comunicación", "Colaboración", "Mentoría", "Code Review"]
                }
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <Tilt
                    tiltMaxAngleX={5}
                    tiltMaxAngleY={5}
                    scale={1.02}
                  >
                    <Card className="glass border-white/10 h-full hover:glow-teal transition-all group">
                      <CardContent className="p-6">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <service.icon className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                          {service.description}
                        </p>
                        <div className="space-y-2">
                          {service.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Tilt>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience/Timeline Section */}
        <section id="experience" ref={experienceRef} className="py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16 text-center"
            >
              <div className="inline-block mb-4">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Mi trayectoria</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gradient-teal">Experiencia</span> & Formación
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {[
                {
                  year: "2024 - Presente",
                  title: "Arquitecto de Software Freelance",
                  company: "Independiente",
                  description: "Desarrollo de soluciones web escalables y gestión de proyectos para diversos clientes, implementando arquitecturas robustas y código limpio.",
                  achievements: [
                    "Desarrollo de +7 proyectos web exitosos",
                    "Implementación de arquitecturas escalables",
                    "Mentoría y liderazgo técnico"
                  ]
                },
                {
                  year: "2023 - 2024",
                  title: "Desarrollador Full Stack",
                  company: "Proyectos Diversos",
                  description: "Creación de aplicaciones web modernas utilizando React, Next.js, TypeScript y PHP, con enfoque en experiencia de usuario y performance.",
                  achievements: [
                    "Landing pages corporativas de alto impacto",
                    "Aplicaciones de gestión documental",
                    "Integración con APIs y servicios externos"
                  ]
                },
                {
                  year: "2022 - 2023",
                  title: "Formación en Ingeniería de Software",
                  company: "Estudios Universitarios",
                  description: "Profundización en fundamentos de programación, estructuras de datos, algoritmos y patrones de diseño.",
                  achievements: [
                    "Fundamentos sólidos en CS",
                    "Desarrollo de proyectos académicos",
                    "Aprendizaje continuo de tecnologías"
                  ]
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative pl-8 pb-12 last:pb-0"
                >
                  {/* Timeline line */}
                  {index !== 2 && (
                    <div className="absolute left-[11px] top-8 bottom-0 w-px bg-gradient-to-b from-primary to-transparent" />
                  )}
                  
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary glow-teal flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>

                  <Card className="glass border-white/10 hover:glow-teal transition-all">
                    <CardContent className="p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div>
                          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-2">
                            {item.year}
                          </span>
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <p className="text-muted-foreground">{item.company}</p>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="space-y-2">
                        {item.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <Award className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={projectsRef} className="py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16 text-center"
            >
              <div className="inline-block mb-4">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Portfolio</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Mis <span className="text-gradient-teal">Proyectos</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6" />
              <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Prototipos y aplicaciones web que he desarrollado, cada uno refleja mi habilidad para 
                <span className="text-primary font-semibold"> resolver problemas</span> y crear 
                <span className="text-secondary font-semibold"> soluciones efectivas</span>. 
                Constantemente aprendiendo y mejorando, siempre abierto a nuevos desafíos.
              </p>
            </motion.div>

            <Tabs defaultValue="all" className="mb-12">
              <div className="flex justify-center mb-8">
                <TabsList className="glass p-1">
                  <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    Todos
                  </TabsTrigger>
                  <TabsTrigger value="web" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    Webs
                  </TabsTrigger>
                  <TabsTrigger value="app" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    Web Apps
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="web" className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects
                    .filter((p) => p.category === "web")
                    .map((project, index) => (
                      <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="app" className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects
                    .filter((p) => p.category === "app")
                    .map((project, index) => (
                      <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef} className="py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16 text-center"
            >
              <div className="inline-block mb-4">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Hablemos</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gradient-teal">Contactame</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6" />
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                ¿Tienes un proyecto en mente? Estoy disponible para discutir colaboraciones y nuevas oportunidades.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    Estoy disponible para discutir proyectos, colaboraciones o cualquier consulta. 
                    No dudes en contactarme a través de los siguientes canales.
                  </p>
                </div>

                <div className="space-y-6">
                  <motion.a
                    href="mailto:neura.admt@gmail.com"
                    className="flex items-center gap-4 glass p-4 rounded-xl hover:glow-teal transition-all group"
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">neura.admt@gmail.com</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://github.com/NeuraAdm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 glass p-4 rounded-xl hover:glow-teal transition-all group"
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Github className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">GitHub</p>
                      <p className="font-medium">github.com/NeuraAdm</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://www.linkedin.com/in/juan-pablo-a-a62719142"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 glass p-4 rounded-xl hover:glow-teal-light transition-all group"
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Linkedin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">LinkedIn</p>
                      <p className="font-medium">Juan Pablo Arias</p>
                    </div>
                  </motion.a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card className="glass border-white/10 overflow-hidden">
                  <CardContent className="pt-6">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      
                      if (!formData.name || !formData.email || !formData.message) {
                        setFormStatus("error");
                        return;
                      }

                      const message = `Vengo desde la web y estoy interesado en tus servicios.\n\nNombre: ${formData.name}\nEmail: ${formData.email}\nMensaje: ${formData.message}`;
                      const whatsappUrl = `https://wa.me/573043591840?text=${encodeURIComponent(message)}`;
                      
                      window.open(whatsappUrl, '_blank');
                      
                      setFormStatus("success");
                      setFormData({ name: "", email: "", message: "" });
                      
                      setTimeout(() => {
                        setFormStatus(null);
                      }, 3000);
                    }} className="space-y-4">
                      <div>
                        <Input 
                          placeholder="Tu Nombre" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleInputChange}
                          className="glass border-white/10" 
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="Tu Correo"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="glass border-white/10"
                        />
                      </div>
                      <div>
                        <Textarea
                          placeholder="Mensaje"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleInputChange}
                          className="glass border-white/10"
                        />
                      </div>

                      {formStatus === "success" && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 glass rounded-lg border border-green-500/50 text-green-400"
                        >
                          ¡Tu mensaje ha sido enviado con éxito!
                        </motion.div>
                      )}

                      {formStatus === "error" && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 glass rounded-lg border border-red-500/50 text-red-400"
                        >
                          Por favor llena todos los campos.
                        </motion.div>
                      )}

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 glow-teal"
                      >
                        Enviar Mensaje por WhatsApp
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 glass">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-teal">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <Link href={basePath || "/"} className="text-xl font-bold">
                <span className="text-gradient-teal">Juan</span> Portfolio
              </Link>
            </div>
            
            <div className="flex gap-4">
              <a href="https://github.com/NeuraAdm" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="glass hover:glow-teal">
                  <Github className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/juan-pablo-a-a62719142" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="glass hover:glow-teal">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </a>
              <a href="mailto:neura.admt@gmail.com">
                <Button variant="ghost" size="icon" className="glass hover:glow-teal-light">
                  <Mail className="h-5 w-5" />
                </Button>
              </a>
            </div>

            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Juan Portfolio. 
              <a 
                href="https://neuraadm.github.io/Neura/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="ml-2 text-primary hover:text-secondary transition-colors"
              >
                Diseñado por Neura
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

interface ProjectCardProps {
  project: {
    id: number
    title: string
    description: string
    image: string
    tags: string[]
    category: string
    link: string
    github?: string
  }
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        glareEnable={true}
        glareMaxOpacity={0.3}
        glareColor="#a855f7"
        glarePosition="all"
        scale={1.02}
      >
        <Card className="overflow-hidden h-full flex flex-col glass border-white/10 hover:border-primary/50 transition-all group">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button 
                size="lg" 
                asChild
                className="bg-white text-primary hover:bg-white/90"
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ver Proyecto
                </a>
              </Button>
            </div>
          </div>
          
          <CardContent className="flex-1 flex flex-col p-6 relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
            
            <h3 className="text-xl font-bold mb-2 group-hover:text-gradient-teal transition-all">
              {project.title}
            </h3>
            <p className="text-muted-foreground mb-4 flex-1 text-sm leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 glass text-xs rounded-full border border-primary/20 hover:border-primary/50 transition-all"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <Button size="sm" variant="ghost" asChild className="group/btn">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 group-hover/btn:rotate-45 transition-transform" />
                  <span className="text-sm">Ver en vivo</span>
                </a>
              </Button>
              
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Tilt>
    </motion.div>
  )
}

