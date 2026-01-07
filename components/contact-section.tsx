"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { type Language, t } from "@/lib/i18n"
import { Phone, Mail, Send } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface ContactSectionProps {
  lang: Language
}

export function ContactSection({ lang }: ContactSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      // Use section height instead of full window height
      const section = sectionRef.current
      if (section) {
        canvas.height = section.offsetHeight
      } else {
        canvas.height = 800 // Default height
      }
    }
    setCanvasSize()

    let animationId: number
    let time = 0

    const codeSnippets = [
      "function()", "{}", "</>", "let", "const", "0101", "if()", "return;", "=>",
      "async", "await", "class", "import", "export", "interface", "type", "const", "var",
      "() =>", "[]", "{}", "null", "undefined", "true", "false", "this", "super",
      "try", "catch", "finally", "throw", "new", "typeof", "instanceof", "void", "delete"
    ]

    const animate = () => {
      // Smooth fade using destination-out for natural trail fade
      ctx.save()
      ctx.globalCompositeOperation = "destination-out"
      ctx.globalAlpha = 0.01
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.restore()

      // Fill with theme-aware background color
      ctx.fillStyle = isDark ? "rgba(2, 2, 2, 1)" : "rgba(250, 250, 250, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 0.02

      ctx.font = "12px 'Geist Mono', monospace"
      ctx.fillStyle = isDark ? "rgba(0, 217, 255, 0.15)" : "rgba(0, 150, 200, 0.25)"
      ctx.textAlign = "center"

      codeSnippets.forEach((code, index) => {
        const x = (canvas.width / codeSnippets.length) * index + Math.sin(time + index) * 30
        const y = canvas.height - ((time * 150 + index * 60) % (canvas.height + 150))

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate((time + index) * 0.01)
        ctx.fillText(code, 0, 0)
        ctx.restore()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      setCanvasSize()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [isDark])

  const contactMethods: Array<{
    name: string
    link: string
    icon: LucideIcon
    value?: string
  }> = [
    {
      name: t(lang, "contact_phone"),
      link: "tel:+998970110033",
      icon: Phone,
      value: "+998 97 011 00 33",
    },
    {
      name: t(lang, "contact_email"),
      link: "mailto:groupshoshi@gmail.com",
      icon: Mail,
      value: "groupshoshi@gmail.com",
    },
    {
      name: t(lang, "contact_telegram"),
      link: "https://t.me/+998777943535",
      icon: Send,
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="nav_contact"
      className="relative py-16 md:py-20 px-4 md:px-8 bg-gradient-to-br from-background via-secondary/30 to-background overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            {t(lang, "contact_title")}
          </h2>
          <p className="text-foreground/65 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed tracking-wide">
            {lang === "ru"
              ? "Готовы создать что-то великое? Свяжитесь с нами."
              : lang === "uz"
                ? "Biror narsani ajoyib yaratishga tayyormisiz? Biz bilan bog'lanish."
                : "Бироре нарсани ажойиб ярата ўзлашимангиз? Биз билан боғланинг."}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <a
              key={method.name}
              href={method.link}
              target={method.link.startsWith("http") ? "_blank" : undefined}
              rel={method.link.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group relative p-6 sm:p-8 rounded-2xl border border-border/40 bg-background/60 backdrop-blur-sm hover:border-accent/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/10"
            >
              {/* Gradient accent on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon with animated background */}
                <div className="mb-6 relative">
                  <div className="absolute inset-0 w-16 h-16 rounded-xl bg-primary/10 group-hover:bg-accent/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <method.icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-accent transition-colors tracking-tight">
                  {method.name}
                </h3>
                {method.value && (
                  <p className="text-foreground/60 text-sm group-hover:text-accent/80 transition-colors">
                    {method.value}
                  </p>
                )}

                {/* Decorative line on hover */}
                <div className="mt-6 h-px w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
