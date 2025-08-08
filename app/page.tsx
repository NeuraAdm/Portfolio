"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, Moon, Sun, Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "next-themes"
import Link from "next/link"
import Image from "next/image"
import { useBasePath } from "@/hooks/use-base-path"

export default function Portfolio() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<null | "success" | "error">(null)
  const basePath = useBasePath()

  const homeRef = useRef<HTMLElement | null>(null)
  const aboutRef = useRef<HTMLElement | null>(null)
  const projectsRef = useRef<HTMLElement | null>(null)
  const contactRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

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

    const sections = [homeRef.current, aboutRef.current, projectsRef.current, contactRef.current]
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
      image: `${basePath}/neura.png?height=400&width=300`,
      tags: ["Node.js", "TypeScript", "React", "Tailwind CSS"],
      category: "web",
      link: "https://neuraadm.github.io/Neura/",
    },
    {
      id: 2,
      title: "Aplicacion Primora",
      description: "Plataforma Web de Gestion Documental",
      image: `${basePath}/primora.png?height=400&width=300`,
      tags: ["PHP", "AJAX", "JavaScript", "CSS", "HTML"],
      category: "app",
      link: "https://primora.app/",
    },
    {
      id: 3,
      title: "Landing Page Empresarial",
      description: "Una landing page empresarial para una empresa de SG-SST",
      image: `${basePath}/gestus.png?height=400&width=300`,
      tags: ["React", "Node.JS", "TypeScript", "Tailwind CSS"],
      category: "web",
      link: "https://gestus-94579.web.app/",
    },
    {
      id: 4,
      title: "Diseño Web",
      description: "Diseño Web para un emprendimiento de Fotografia para Mascotas",
      image: `${basePath}/lakanu.png?height=400&width=300`,
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      category: "web",
      link: "https://lakanustudio.com",
    },
    {
      id: 5,
      title: "Diseño Web",
      description: "Diseño Web para un emprendimiento de un Cafe/Bar",
      image: `${basePath}/cafe.png?height=400&width=300`,
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      category: "web",
      link: "https://cafe-elreloj.web.app/",
    },
    {
      id: 6,
      title: "Diseño Web",
      description: "Diseño Web para una empresa de construccion con sede en Estados Unidos",
      image: `${basePath}/jireh.png?height=400&width=300`,
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      category: "web",
      link: "https://jireh-construction-llc.web.app/",
    },
    {
      id: 7,
      title: "Diseño Web",
      description: "Diseño Web para una inmobiliaria con mostrario de propiedades",
      image: `${basePath}/oportuna.png?height=400&width=300`,
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      category: "web",
      link: "https://oportunainmobiliaria.com.co/",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href={basePath || "/"} className="text-xl font-bold">
              <span className="text-primary">Juan </span>Portfolio
            </Link>
          </motion.div>

          <nav className="hidden md:flex space-x-8">
            {[
              { name: "Inicio", ref: homeRef },
              { name: "Acerca De", ref: aboutRef },
              { name: "Proyectos", ref: projectsRef },
              { name: "Contacto", ref: contactRef },
            ].map((item) => (
              <motion.button
                key={item.name.toLowerCase()}
                onClick={() => scrollToSection(item.ref)}
                className={`text-sm font-medium hover:text-primary transition-colors ${
                  activeSection === item.name.toLowerCase() ? "text-primary" : ""
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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
            >
              {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button variant="outline" size="icon" className="md:hidden">
              <ChevronDown className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <motion.section
          id="home"
          ref={homeRef}
          className="min-h-[90vh] flex flex-col justify-center relative overflow-hidden"
          style={{ opacity, scale }}
        >
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Hola, Yo Soy <span className="text-primary">Juan Pablo</span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-2xl md:text-4xl font-semibold mb-6">Desarrollador de Software & Ingeniero de Software</h2>
              </motion.div>

              <motion.p
                className="text-lg text-muted-foreground mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Conecto con las personas a la hora de ejecutar proyectos, y me gusta crear soluciones que resuelvan
                problemas reales. Me apasiona aprender nuevas tecnologías y mejorar mis habilidades constantemente.
                <br />
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Button onClick={() => scrollToSection(projectsRef)} size="lg">
                  Ver Proyectos
                </Button>
                <Button variant="outline" size="lg" onClick={() => scrollToSection(contactRef)}>
                  Contactame
                </Button>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
              <Button variant="ghost" size="icon" onClick={() => scrollToSection(aboutRef)} aria-label="Scroll down">
                <ChevronDown className="h-6 w-6" />
              </Button>
            </motion.div>
          </div>

          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          </div>
        </motion.section>

        {/* About Section */}
        <section id="about" ref={aboutRef} className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl font-bold mb-2">Sobre Mi</h2>
              <div className="w-20 h-1 bg-primary mx-auto" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="relative w-full aspect-square max-w-md mx-auto overflow-hidden rounded-xl">
                  <Image src={`${basePath}/perfil.jpg?height=500&width=500`} alt="Profile" fill className="object-cover" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h3 className="text-2xl font-semibold mb-4">Desarrollador de Software con mas de 1 año de experiencia</h3>
                <p className="text-muted-foreground mb-6">
                  Me especializo en construir aplicaciones web modernas que solucionen. Mi pasion recide en
                  crear sistemas intuitivos, practicos y escalables para cualquier problema digital.
                </p>
                <p className="text-muted-foreground mb-6">
                  Llevando a cabo las mejores practicas de desarrollo y gestion de proyectos para que cada proyecto se haga realidad dentro de una era de innovacion digital.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <h4 className="font-medium mb-2">Frontend</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>React / NextJS</li>
                      <li>TypeScript</li>
                      <li>Tailwind CSS</li>
                      <li>NodeJS</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Backend</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>PHP</li>
                      <li>AJAX</li>
                      <li>MySQL</li>  
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={projectsRef} className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl font-bold mb-2">Mis Proyectos</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Estos son algunos de mis proyectos los cuales son prototipos de aplicaciones web que he desarrollado. Cada uno de ellos refleja mi habilidad para resolver problemas
                y crear soluciones efectivas. Estoy constantemente aprendiendo y mejorando mis habilidades, por lo que siempre estoy abierto a nuevos desafíos y oportunidades.
                <br />
                Si tienes alguna pregunta o deseas discutir un proyecto en particular, no dudes en contactarme.
                <br />
                <span className="text-primary">¡Espero que disfrutes explorando mi trabajo!</span>
              </p>
            </motion.div>

            <Tabs defaultValue="all" className="mb-12">
              <div className="flex justify-center">
                <TabsList>
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="web">Webs</TabsTrigger>
                  <TabsTrigger value="app">Web Apps</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="web" className="mt-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {projects
                    .filter((p) => p.category === "web")
                    .map((project, index) => (
                      <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="app" className="mt-8">
                <div className="grid md:grid-cols-2 gap-8">
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
        <section id="contact" ref={contactRef} className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl font-bold mb-2">Contactame</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Si deseas discutir un proyecto, hacerme una pregunta o simplemente charlar, no dudes en contactarme. Estoy siempre abierto a nuevas oportunidades y colaboraciones.
                <br />
                Puedes enviarme un mensaje a través del formulario a continuación o contactarme directamente por correo electrónico.
                <br />
                <span className="text-primary">¡Espero saber de ti pronto!</span>
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h3 className="text-xl font-semibold mb-4">Informacion de Contacto</h3>
                <p className="text-muted-foreground mb-8">
                  Estoy disponible para discutir proyectos, colaboraciones o cualquier otra consulta que puedas tener. No dudes en contactarme a través de los siguientes canales:
                  <br />
                  <span className="text-primary">¡Espero saber de ti pronto!</span>
                  <br />
                </p>

                <div className="space-y-6">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-4 text-primary" />
                    <span>neura.admt@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <Github className="h-5 w-5 mr-4 text-primary" />
                    <a href="https://github.com/NeuraAdm" className="hover:text-primary transition-colors">
                      github.com/NeuraAdm
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Linkedin className="h-5 w-5 mr-4 text-primary" />
                    <a href="https://www.linkedin.com/in/juan-pablo-a-a62719142" className="hover:text-primary transition-colors">
                      linkedin.com/in/Juan Pablo Arias
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      
                      // Validate form
                      if (!formData.name || !formData.email || !formData.message) {
                        setFormStatus("error");
                        return;
                      }

                      // Construct WhatsApp message
                      const message = `Vengo desde la web y estoy interesado en tus servicios.\n\nNombre: ${formData.name}\nEmail: ${formData.email}\nMensaje: ${formData.message}`;
                      
                      // Create WhatsApp URL (phone number without '+' sign)
                      const whatsappUrl = `https://wa.me/573043591840?text=${encodeURIComponent(message)}`;
                      
                      // Open WhatsApp in a new tab
                      window.open(whatsappUrl, '_blank');
                      
                      // Reset form
                      setFormStatus("success");
                      setFormData({ name: "", email: "", message: "" });
                      
                      // Reset form status after 3 seconds
                      setTimeout(() => {
                        setFormStatus(null);
                      }, 3000);
                    }} className="space-y-4">
                      <div>
                        <Input placeholder="Tu Nombre" name="name" value={formData.name} onChange={handleInputChange} />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="Tu Correo"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Textarea
                          placeholder="Mensaje"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleInputChange}
                        />
                      </div>

                      {formStatus === "success" && (
                        <div className="p-3 bg-green-100 text-green-700 rounded-md dark:bg-green-900 dark:text-green-100">
                          Tu mensaje ha sido enviado con exito!
                        </div>
                      )}

                      {formStatus === "error" && (
                        <div className="p-3 bg-red-100 text-red-700 rounded-md dark:bg-red-900 dark:text-red-100">
                          Por favor llena todos los campos.
                        </div>
                      )}

                      <Button type="submit" className="w-full">
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
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href={basePath || "/"} className="text-xl font-bold">
                <span className="text-primary">Juan </span>Portfolio
              </Link>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
              © {new Date().getFullYear()} Juan Portfolio. All rights reserved.
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
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <CardContent className="flex-1 flex flex-col p-6">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-muted-foreground mb-4 flex-1">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-muted text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex justify-between">
            <Button size="sm" asChild>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Live
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

