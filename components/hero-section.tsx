"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { type Language, t } from "@/lib/i18n"

interface HeroSectionProps {
  lang: Language
}

export function HeroSection({ lang }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
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
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()

    let animationId: number
    let time = 0

    // Matrix rain characters - mix of numbers, letters, and symbols
    const matrixChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>{}[]()+-*/=<>{}[]()+-*/="
    
    // Matrix rain columns
    interface MatrixColumn {
      x: number
      y: number
      speed: number
      chars: string[]
      charIndex: number
    }
    
    const matrixColumns: MatrixColumn[] = []
    const columnCount = isMobile ? 50 : 80
    const columnSpacing = canvas.width / columnCount
    
    // Initialize matrix columns - ensure continuous coverage
    const charHeight = isMobile ? 14 : 16
    const minCharsNeeded = Math.ceil((canvas.height * 2) / charHeight) // Enough to cover screen twice
    
    for (let i = 0; i < columnCount; i++) {
      const startY = (i / columnCount) * -canvas.height * 0.5 // Stagger start positions
      matrixColumns.push({
        x: i * columnSpacing + Math.random() * columnSpacing,
        y: startY,
        speed: Math.random() * 2.5 + 1.5, // Faster speed
        chars: [],
        charIndex: 0,
      })
      
      // Generate enough characters to always cover the screen
      const charCount = minCharsNeeded + Math.floor(Math.random() * 10) + 10
      for (let j = 0; j < charCount; j++) {
        matrixColumns[i].chars.push(matrixChars[Math.floor(Math.random() * matrixChars.length)])
      }
    }

    // Wave parameters - theme aware colors
    const getWaves = () => {
      if (isDark) {
        return [
          { amplitude: 60, frequency: 0.002, speed: 0.5, y: canvas.height * 0.3, color: "rgba(184, 147, 74, 0.15)" },
          { amplitude: 80, frequency: 0.0015, speed: 0.3, y: canvas.height * 0.5, color: "rgba(140, 187, 255, 0.12)" },
          { amplitude: 50, frequency: 0.0025, speed: 0.4, y: canvas.height * 0.7, color: "rgba(184, 147, 74, 0.1)" },
        ]
      } else {
        return [
          { amplitude: 60, frequency: 0.002, speed: 0.5, y: canvas.height * 0.3, color: "rgba(184, 147, 74, 0.25)" },
          { amplitude: 80, frequency: 0.0015, speed: 0.3, y: canvas.height * 0.5, color: "rgba(140, 187, 255, 0.2)" },
          { amplitude: 50, frequency: 0.0025, speed: 0.4, y: canvas.height * 0.7, color: "rgba(184, 147, 74, 0.15)" },
        ]
      }
    }
    
    let waves = getWaves()

    const animate = () => {
      // Clear canvas with very subtle fade for smooth trail
      // Using destination-out for natural fade without rectangular edges
      ctx.save()
      ctx.globalCompositeOperation = "destination-out"
      ctx.globalAlpha = 0.005
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.restore()

      // Fill with theme-aware background color
      ctx.fillStyle = isDark ? "rgba(2, 2, 2, 1)" : "rgba(250, 250, 250, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 0.01

      // Draw Matrix rain effect
      ctx.font = `${isMobile ? 10 : 12}px 'Geist Mono', monospace`
      ctx.textAlign = "center"
      
      matrixColumns.forEach((column, colIndex) => {
        // Update column position
        column.y += column.speed
        
        // Reset column position when it goes off screen - ensure continuous flow
        const charHeight = isMobile ? 14 : 16
        const totalColumnHeight = column.chars.length * charHeight
        
        if (column.y > canvas.height) {
          // Reset to top - place it above screen so it flows continuously
          column.y = -totalColumnHeight + (column.y - canvas.height)
          column.charIndex = 0
        }
        
        // Also handle case when column is too far above - reset it
        if (column.y < -totalColumnHeight - canvas.height) {
          column.y = -totalColumnHeight * 0.5
        }
        
        // Draw characters in column with gradient effect
        column.chars.forEach((char, charIdx) => {
          const charY = column.y + charIdx * charHeight
          
          // Draw all characters that are visible or just off-screen for smooth transition
          if (charY > -charHeight * 2 && charY < canvas.height + charHeight * 2) {
            // Calculate opacity based on position (brighter at top, fading down)
            const opacity = Math.max(0.3, 1 - (charIdx / column.chars.length) * 0.7)
            
            // First character is brightest (head of the column)
            const isHead = charIdx === column.charIndex
            const brightness = isHead ? 1 : opacity * 0.8
            
            // Alternate between gold and blue colors - theme aware
            const useGold = colIndex % 3 === 0
            const color = useGold
              ? isDark
                ? `rgba(184, 147, 74, ${brightness * 0.7})`
                : `rgba(184, 147, 74, ${brightness * 0.5})`
              : isDark
                ? `rgba(140, 187, 255, ${brightness * 0.6})`
                : `rgba(100, 150, 255, ${brightness * 0.5})`
            
            ctx.fillStyle = color
            ctx.fillText(char, column.x, charY)
            
            // Add glow effect to head character
            if (isHead) {
              ctx.shadowBlur = 15
              ctx.shadowColor = useGold
                ? isDark
                  ? "rgba(184, 147, 74, 0.8)"
                  : "rgba(184, 147, 74, 0.6)"
                : isDark
                  ? "rgba(140, 187, 255, 0.8)"
                  : "rgba(100, 150, 255, 0.6)"
              ctx.fillText(char, column.x, charY)
              ctx.shadowBlur = 0
            }
          }
        })
        
        // Update character index for trailing effect
        if (Math.random() < 0.05) {
          column.charIndex = (column.charIndex + 1) % column.chars.length
        }
      })

      // Draw flowing waves
      waves.forEach((wave, waveIndex) => {
        ctx.beginPath()
        ctx.moveTo(0, wave.y)

        const points = 200
        for (let i = 0; i <= points; i++) {
          const x = (i / points) * canvas.width
          const y = wave.y + Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude
          ctx.lineTo(x, y)
        }

        // Create gradient for wave
        const gradient = ctx.createLinearGradient(0, wave.y - wave.amplitude, 0, wave.y + wave.amplitude)
        gradient.addColorStop(0, wave.color)
        gradient.addColorStop(0.5, wave.color.replace("0.15", "0.25").replace("0.12", "0.2").replace("0.1", "0.15"))
        gradient.addColorStop(1, wave.color)

        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.stroke()

        // Fill wave with subtle gradient
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        
        const fillGradient = ctx.createLinearGradient(0, wave.y - wave.amplitude * 2, 0, wave.y + wave.amplitude * 2)
        fillGradient.addColorStop(0, wave.color.replace("0.15", "0.05").replace("0.12", "0.04").replace("0.1", "0.03"))
        fillGradient.addColorStop(1, "transparent")
        
        ctx.fillStyle = fillGradient
        ctx.fill()
      })

      // Draw connecting lines (only on desktop)
      if (!isMobile && mousePos.x > 0 && mousePos.y > 0) {
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        
        // Create radial lines from center to edges
        const lineCount = 8
        for (let i = 0; i < lineCount; i++) {
          const angle = (i / lineCount) * Math.PI * 2 + time * 0.2
          const length = Math.min(canvas.width, canvas.height) * 0.4
          const endX = centerX + Math.cos(angle) * length
          const endY = centerY + Math.sin(angle) * length

          // Mouse influence
          const dx = mousePos.x - centerX
          const dy = mousePos.y - centerY
          const distance = Math.sqrt(dx * dx + dy * dy)
          const influence = Math.max(0, 1 - distance / 400)
          
          const offsetX = dx * influence * 0.3
          const offsetY = dy * influence * 0.3

          const gradient = ctx.createLinearGradient(centerX, centerY, endX + offsetX, endY + offsetY)
          gradient.addColorStop(0, "rgba(140, 187, 255, 0.2)")
          gradient.addColorStop(0.5, "rgba(184, 147, 74, 0.15)")
          gradient.addColorStop(1, "rgba(140, 187, 255, 0)")

          ctx.strokeStyle = gradient
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(centerX, centerY)
          ctx.lineTo(endX + offsetX, endY + offsetY)
          ctx.stroke()
        }

        // Mouse interaction glow
        const radius = 150
        const mouseGradient = ctx.createRadialGradient(
          mousePos.x,
          mousePos.y,
          0,
          mousePos.x,
          mousePos.y,
          radius
        )
        if (isDark) {
          mouseGradient.addColorStop(0, "rgba(140, 187, 255, 0.08)")
          mouseGradient.addColorStop(0.5, "rgba(184, 147, 74, 0.05)")
          mouseGradient.addColorStop(1, "rgba(140, 187, 255, 0)")
        } else {
          mouseGradient.addColorStop(0, "rgba(140, 187, 255, 0.15)")
          mouseGradient.addColorStop(0.5, "rgba(184, 147, 74, 0.1)")
          mouseGradient.addColorStop(1, "rgba(140, 187, 255, 0)")
        }

        ctx.fillStyle = mouseGradient
        ctx.beginPath()
        ctx.arc(mousePos.x, mousePos.y, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Subtle grid pattern (very minimal) - theme aware
      if (!isMobile) {
        ctx.strokeStyle = isDark ? "rgba(140, 187, 255, 0.02)" : "rgba(100, 150, 255, 0.05)"
        ctx.lineWidth = 0.5
        const gridSize = 150

        for (let x = 0; x < canvas.width; x += gridSize) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, canvas.height)
          ctx.stroke()
        }

        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(canvas.width, y)
          ctx.stroke()
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      setCanvasSize()
      setIsMobile(window.innerWidth < 768)
      // Update wave positions on resize
      waves = getWaves()
      
      // Reinitialize matrix columns on resize
      const newColumnCount = isMobile ? 50 : 80
      const newColumnSpacing = canvas.width / newColumnCount
      const newCharHeight = isMobile ? 14 : 16
      const newMinCharsNeeded = Math.ceil((canvas.height * 2) / newCharHeight)
      
      matrixColumns.length = 0
      
      for (let i = 0; i < newColumnCount; i++) {
        const startY = (i / newColumnCount) * -canvas.height * 0.5
        matrixColumns.push({
          x: i * newColumnSpacing + Math.random() * newColumnSpacing,
          y: startY,
          speed: Math.random() * 2.5 + 1.5,
          chars: [],
          charIndex: 0,
        })
        
        const charCount = newMinCharsNeeded + Math.floor(Math.random() * 10) + 10
        for (let j = 0; j < charCount; j++) {
          matrixColumns[i].chars.push(matrixChars[Math.floor(Math.random() * matrixChars.length)])
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isMobile, isDark])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/40 via-transparent to-background/60" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/20 via-transparent to-background/20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 sm:h-64 z-[2] bg-gradient-to-b from-transparent via-background/30 to-background" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        {/* Logo - responsive and elegant */}
        <div className="mb-8 md:mb-12 lg:mb-16 flex justify-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            <Image
              src="/shoshi-logo.png"
              alt="ShoShiy Logo"
              width={isMobile ? 200 : 300}
              height={isMobile ? 200 : 300}
              className="relative animate-float drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.01]"
              priority
            />
          </div>
        </div>

        {/* Hero Text Content - minimal and elegant */}
        <div className="text-center max-w-5xl w-full space-y-6 md:space-y-8">
          {/* Subtitle */}
          <div className="inline-block">
            <h2 className="text-xs sm:text-sm md:text-base lg:text-lg text-primary/80 mb-2 font-light tracking-[0.2em] uppercase">
              {t(lang, "hero_subtitle")}
            </h2>
            <div className="h-px w-16 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1] tracking-tight px-4">
            <span className="block mb-2">{t(lang, "hero_title")}</span>
          </h1>

          {/* Description */}
          <p className="text-foreground/60 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-4">
            {t(lang, "about_desc")}
          </p>

          {/* CTA Buttons - minimal and modern */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-4 md:pt-8">
            <button 
              onClick={() => scrollToSection("nav_works")}
              className="group relative px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full font-medium text-sm sm:text-base hover:shadow-sm hover:shadow-primary/5 transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] w-full sm:w-auto min-w-[200px] overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {t(lang, "btn_portfolio")}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button 
              onClick={() => scrollToSection("nav_contact")}
              className="group relative px-8 sm:px-10 py-3 sm:py-4 border border-accent/50 text-accent rounded-full font-medium text-sm sm:text-base hover:bg-accent/5 hover:border-accent hover:shadow-sm hover:shadow-accent/5 transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] w-full sm:w-auto min-w-[200px] backdrop-blur-sm"
            >
              <span className="relative z-10">{t(lang, "btn_contact")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Minimal scroll indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-foreground/40 uppercase tracking-wider">Scroll</span>
          <svg className="w-5 h-5 text-accent/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
