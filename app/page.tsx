"use client"

import { useState } from "react"
import Image from "next/image"
import type { Language } from "@/lib/i18n"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { t } from "@/lib/i18n"
import { Mail, Phone, Send, Github, Linkedin, Instagram, Facebook } from "lucide-react"

export default function Home() {
  const [lang, setLang] = useState<Language>("ru")

  // Smooth scroll function
  const scrollToSection = (sectionId: string, e?: React.MouseEvent<HTMLAnchorElement>) => {
    e?.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80 // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <main className="bg-background text-foreground">
      <Header lang={lang} onLanguageChange={setLang} />
      <HeroSection lang={lang} />
      <AboutSection lang={lang} />
      <ProjectsSection lang={lang} />
      <ServicesSection lang={lang} />
      <ContactSection lang={lang} />

      <footer className="bg-secondary/30 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/shoshi-logo.png"
                  alt="ShoShiy Logo"
                  width={40}
                  height={40}
                  className="drop-shadow-lg"
                />
                <span className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  ShoShiy
                </span>
              </div>
              <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                {t(lang, "footer_description")}
              </p>
              <p className="text-foreground/60 text-xs">
                {t(lang, "hero_subtitle")}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">
                {t(lang, "footer_quick_links")}
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#nav_works"
                    onClick={(e) => scrollToSection("nav_works", e)}
                    className="text-foreground/70 hover:text-accent transition-colors text-sm cursor-pointer"
                  >
                    {t(lang, "nav_works")}
                  </a>
                </li>
                <li>
                  <a
                    href="#nav_services"
                    onClick={(e) => scrollToSection("nav_services", e)}
                    className="text-foreground/70 hover:text-accent transition-colors text-sm cursor-pointer"
                  >
                    {t(lang, "footer_services")}
                  </a>
                </li>
                <li>
                  <a
                    href="#nav_about"
                    onClick={(e) => scrollToSection("nav_about", e)}
                    className="text-foreground/70 hover:text-accent transition-colors text-sm cursor-pointer"
                  >
                    {t(lang, "nav_about")}
                  </a>
                </li>
                <li>
                  <a
                    href="#nav_contact"
                    onClick={(e) => scrollToSection("nav_contact", e)}
                    className="text-foreground/70 hover:text-accent transition-colors text-sm cursor-pointer"
                  >
                    {t(lang, "nav_contact")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">
                {t(lang, "footer_contact_us")}
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:+998970110033"
                    className="flex items-center gap-2 text-foreground/70 hover:text-accent transition-colors text-sm group"
                  >
                    <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>+998 97 011 00 33</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:groupshoshi@gmail.com"
                    className="flex items-center gap-2 text-foreground/70 hover:text-accent transition-colors text-sm group"
                  >
                    <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>groupshoshi@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/+998777943535"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-foreground/70 hover:text-accent transition-colors text-sm group"
                  >
                    <Send className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Telegram</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">
                {t(lang, "footer_follow_us")}
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/thehokim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/50 border border-border hover:border-accent flex items-center justify-center text-foreground/70 hover:text-accent transition-all duration-300 hover:scale-110 group"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/shoshi-group-2483ab393/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/50 border border-border hover:border-accent flex items-center justify-center text-foreground/70 hover:text-accent transition-all duration-300 hover:scale-110 group"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/shoshiy.group?igsh=MXgxYW1rNWIxbmJhcA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/50 border border-border hover:border-accent flex items-center justify-center text-foreground/70 hover:text-accent transition-all duration-300 hover:scale-110 group"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/share/1McChph6UR/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/50 border border-border hover:border-accent flex items-center justify-center text-foreground/70 hover:text-accent transition-all duration-300 hover:scale-110 group"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border/50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-foreground/50 text-sm">
                {t(lang, "footer_copyright")}
              </p>
              <p className="text-foreground/50 text-sm">
                {t(lang, "footer_all_rights")}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
