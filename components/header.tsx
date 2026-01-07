"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { type Language, t } from "@/lib/i18n"
import { LanguageSwitcher } from "./language-switcher"
import { ThemeToggle } from "./theme-toggle"

interface HeaderProps {
  lang: Language
  onLanguageChange: (lang: Language) => void
}

export function Header({ lang, onLanguageChange }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 glass-effect backdrop-blur-xl border-b border-border/50 shadow-lg shadow-background/50"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo with creative design */}
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className="flex-shrink-0 group relative cursor-pointer"
        >
          <div className="relative flex items-center gap-2 sm:gap-3">
            {/* Glow effect behind logo */}
            <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Logo image */}
            <div className="relative z-10">
              <Image
                src="/shoshi-logo.png"
                alt="ShoShiy"
                width={isMobile ? 32 : 40}
                height={isMobile ? 32 : 40}
                className="transition-transform duration-300 group-hover:scale-110 drop-shadow-lg"
                priority
              />
            </div>
            
            {/* Creative text with gradient */}
            <div className="relative z-10 hidden sm:block">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                ShoShiy
              </span>
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </a>

        {/* Navigation with creative hover effects */}
        <div className="hidden md:flex gap-6 lg:gap-8 items-center">
          {["nav_works", "nav_services", "nav_about", "nav_contact"].map((key) => (
            <a
              key={key}
              href={`#${key}`}
              onClick={(e) => scrollToSection(key, e)}
              className="relative text-foreground/70 hover:text-accent transition-all duration-300 text-base sm:text-lg font-medium group cursor-pointer"
            >
              <span className="relative z-10">{t(lang, key as any)}</span>
              {/* Underline effect */}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
              {/* Glow effect on hover */}
              <span className="absolute inset-0 bg-accent/10 rounded blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          ))}
        </div>

        {/* Language Switcher and Theme Toggle */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <LanguageSwitcher currentLang={lang} onLanguageChange={onLanguageChange} />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
