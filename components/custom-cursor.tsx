"use client"

import { useEffect, useState, useRef } from "react"

interface TrailPoint {
  x: number
  y: number
  timestamp: number
}

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [matrixChars, setMatrixChars] = useState<string[]>([])
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [matrixRain, setMatrixRain] = useState<Array<{id: number, y: number, char: string}>>([])
  
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const matrixRef = useRef<HTMLDivElement>(null)
  const scanLineRef = useRef<HTMLDivElement>(null)
  const radarRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef({ x: 0, y: 0 })

  // Generate random matrix characters
  useEffect(() => {
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
    const randomChars = Array.from({ length: 12 }, () => 
      chars[Math.floor(Math.random() * chars.length)]
    )
    setMatrixChars(randomChars)
    
    const interval = setInterval(() => {
      const newChars = Array.from({ length: 12 }, () => 
        chars[Math.floor(Math.random() * chars.length)]
      )
      setMatrixChars(newChars)
    }, 150)
    
    return () => clearInterval(interval)
  }, [])

  // Matrix rain effect
  useEffect(() => {
    if (!isVisible) return
    
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
    const rain: Array<{id: number, y: number, char: string}> = []
    
    for (let i = 0; i < 15; i++) {
      rain.push({
        id: i,
        y: Math.random() * 100 - 50,
        char: chars[Math.floor(Math.random() * chars.length)]
      })
    }
    
    setMatrixRain(rain)
    
    const interval = setInterval(() => {
      setMatrixRain(prev => prev.map(drop => ({
        ...drop,
        y: drop.y > 50 ? -50 : drop.y + 2,
        char: Math.random() > 0.7 ? chars[Math.floor(Math.random() * chars.length)] : drop.char
      })))
    }, 50)
    
    return () => clearInterval(interval)
  }, [isVisible])

  // Trail effect
  useEffect(() => {
    if (!isVisible) return
    
    const updateTrail = () => {
      setTrail(prev => {
        const newTrail = [
          { x: positionRef.current.x, y: positionRef.current.y, timestamp: Date.now() },
          ...prev.slice(0, 8)
        ].filter(point => Date.now() - point.timestamp < 200)
        return newTrail
      })
    }
    
    const interval = setInterval(updateTrail, 16)
    return () => clearInterval(interval)
  }, [isVisible])

  useEffect(() => {
    // Check if device supports hover (not touch device)
    const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches
    if (isTouchDevice) {
      return // Don't show custom cursor on touch devices
    }

    setIsVisible(true)

    const isClickingRef = { current: false }
    const isHoveringRef = { current: false }
    
    const updateCursorPosition = (x: number, y: number) => {
      positionRef.current = { x, y }
      
      if (cursorRef.current) {
        cursorRef.current.style.left = `${x}px`
        cursorRef.current.style.top = `${y}px`
        cursorRef.current.style.transform = `translate(-50%, -50%) scale(${isClickingRef.current ? 0.9 : 1})`
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${x}px`
        ringRef.current.style.top = `${y}px`
        ringRef.current.style.transform = `translate(-50%, -50%) scale(${isHoveringRef.current ? 1.2 : isClickingRef.current ? 1.05 : 1.1})`
      }
      if (glowRef.current) {
        glowRef.current.style.left = `${x}px`
        glowRef.current.style.top = `${y}px`
        glowRef.current.style.transform = `translate(-50%, -50%) scale(${isHoveringRef.current ? 1.3 : isClickingRef.current ? 1.15 : 1.2})`
      }
      if (matrixRef.current) {
        matrixRef.current.style.left = `${x}px`
        matrixRef.current.style.top = `${y}px`
        matrixRef.current.style.transform = `translate(-50%, -50%) scale(${isHoveringRef.current ? 1.1 : 1})`
      }
      if (scanLineRef.current) {
        scanLineRef.current.style.left = `${x}px`
        scanLineRef.current.style.top = `${y}px`
      }
      if (radarRef.current) {
        radarRef.current.style.left = `${x}px`
        radarRef.current.style.top = `${y}px`
      }
    }

    const updateCursor = (e: MouseEvent) => {
      // Instant update - no lerp, no delay
      updateCursorPosition(e.clientX, e.clientY)
    }

    const handleMouseDown = () => {
      isClickingRef.current = true
      setIsClicking(true)
    }
    const handleMouseUp = () => {
      isClickingRef.current = false
      setIsClicking(false)
    }

    // Simplified interactive check
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.closest("[role='button']") !== null

      isHoveringRef.current = isInteractive
      setIsHovering(isInteractive)
    }

    const handleMouseOut = () => {
      isHoveringRef.current = false
      setIsHovering(false)
    }

    // Hide cursor when mouse leaves window
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", updateCursor, { passive: true })
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", updateCursor)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Trail effect */}
      {trail.map((point, index) => {
        const opacity = (trail.length - index) / trail.length * 0.6
        const size = (trail.length - index) / trail.length * 3
        return (
          <div
            key={`${point.x}-${point.y}-${index}`}
            className="fixed pointer-events-none z-[9994]"
            style={{
              left: `${point.x}px`,
              top: `${point.y}px`,
              transform: `translate(-50%, -50%)`,
              opacity,
              width: `${size}px`,
              height: `${size}px`,
              background: `radial-gradient(circle, rgba(0,170,255,0.75) 0%, transparent 70%)`,
              borderRadius: '50%',
              transition: 'opacity 0.1s ease-out',
            }}
          />
        )
      })}

      {/* Matrix rain around cursor */}
      {matrixRain.map((drop) => {
        const angle = (drop.id * 360) / matrixRain.length
        const radius = 15 + (drop.id % 3) * 5
        const x = Math.cos((angle * Math.PI) / 180) * radius
        const y = Math.sin((angle * Math.PI) / 180) * radius + drop.y
        
        return (
          <div
            key={drop.id}
            className="fixed pointer-events-none z-[9993]"
            style={{
              left: `${positionRef.current.x + x}px`,
              top: `${positionRef.current.y + y}px`,
              transform: `translate(-50%, -50%)`,
              opacity: 0.6 - Math.abs(drop.y) / 100,
            }}
          >
            <span
              className="text-[8px] font-mono text-[#00aaff]"
              style={{
                textShadow: "0 0 3px rgba(0,170,255,0.8)",
                filter: "blur(0.3px)",
              }}
            >
              {drop.char}
            </span>
          </div>
        )
      })}

      {/* Main cursor - Matrix style square */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] will-change-transform"
        style={{
          transform: `translate(-50%, -50%)`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className={`relative transition-all duration-100 ${
            isHovering
              ? "w-[5px] h-[5px] shadow-[0_0_8px_rgba(0,170,255,0.7),inset_0_0_4px_rgba(0,170,255,0.5)]"
              : isClicking
              ? "w-[4px] h-[4px] shadow-[0_0_6px_rgba(0,170,255,0.5)]"
              : "w-[4px] h-[4px] shadow-[0_0_6px_rgba(0,170,255,0.5)]"
          }`}
          style={{
            background: isHovering
              ? "linear-gradient(135deg, rgba(0,180,255,0.95) 0%, rgba(0,140,255,0.8) 50%, rgba(0,180,255,0.95) 100%)"
              : "linear-gradient(135deg, rgba(0,170,255,0.85) 0%, rgba(0,120,255,0.7) 100%)",
            border: "1px solid rgba(0,170,255,1)",
            boxShadow: isHovering
              ? "0 0 12px rgba(0,170,255,0.8), inset 0 0 6px rgba(0,170,255,0.5), 0 0 20px rgba(0,170,255,0.3)"
              : "0 0 8px rgba(0,170,255,0.6), inset 0 0 4px rgba(0,170,255,0.4)",
          }}
        >
          {/* Corner brackets */}
          <div className="absolute -top-0.5 -left-0.5 w-1 h-1 border-t border-l border-[#00aaff]" />
          <div className="absolute -top-0.5 -right-0.5 w-1 h-1 border-t border-r border-[#00aaff]" />
          <div className="absolute -bottom-0.5 -left-0.5 w-1 h-1 border-b border-l border-[#00aaff]" />
          <div className="absolute -bottom-0.5 -right-0.5 w-1 h-1 border-b border-r border-[#00aaff]" />
          
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[2px] h-[2px] bg-[#00aaff] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Outer grid ring - Matrix style */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] will-change-transform"
        style={{
          transform: `translate(-50%, -50%)`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className={`transition-all duration-150 ${
            isHovering
              ? "w-6 h-6 border border-[#00aaff]/70 shadow-[0_0_8px_rgba(0,170,255,0.4)]"
              : "w-5 h-5 border border-[#00aaff]/50 shadow-[0_0_6px_rgba(0,170,255,0.3)]"
          }`}
          style={{
            background: "transparent",
            borderStyle: "solid",
            position: "relative",
          }}
        >
          {/* Grid lines */}
          <div className="absolute inset-0 border border-[#00aaff]/30" style={{
            backgroundImage: `
              linear-gradient(rgba(0,170,255,0.16) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,170,255,0.16) 1px, transparent 1px)
            `,
            backgroundSize: "3px 3px",
          }} />
          
          {/* Corner brackets */}
          <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 border-t border-l border-[#00aaff]/70" />
          <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 border-t border-r border-[#00aaff]/70" />
          <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 border-b border-l border-[#00aaff]/70" />
          <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 border-b border-r border-[#00aaff]/70" />
        </div>
      </div>

      {/* Matrix characters around cursor */}
      {isHovering && (
        <div
          ref={matrixRef}
          className="fixed pointer-events-none z-[9997] will-change-transform"
          style={{
            transform: `translate(-50%, -50%)`,
            opacity: isVisible ? 0.75 : 0,
          }}
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            {matrixChars.map((char, index) => {
              const angle = (index * 360) / matrixChars.length
              const radius = 12
              const x = Math.cos((angle * Math.PI) / 180) * radius
              const y = Math.sin((angle * Math.PI) / 180) * radius
              return (
                <span
                  key={index}
                  className="absolute text-[7px] font-mono text-[#00aaff] opacity-85 animate-pulse"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    animationDelay: `${index * 0.1}s`,
                    textShadow: "0 0 4px rgba(0,170,255,0.8)",
                  }}
                >
                  {char}
                </span>
              )
            })}
          </div>
        </div>
      )}

      {/* Scanning line effect */}
      <div
        ref={scanLineRef}
        className="fixed pointer-events-none z-[9996] will-change-transform"
        style={{
          transform: `translate(-50%, -50%)`,
          opacity: isVisible ? (isHovering ? 0.4 : 0.2) : 0,
        }}
      >
        <div
          className="w-px h-6 bg-gradient-to-b from-transparent via-[#00aaff] to-transparent animate-pulse"
          style={{
            boxShadow: "0 0 4px rgba(0,170,255,0.6)",
            animation: "scan-line 2s linear infinite",
          }}
        />
      </div>

      {/* Radar/Scanning circle effect */}
      <div
        ref={radarRef}
        className="fixed pointer-events-none z-[9995] will-change-transform"
        style={{
          transform: `translate(-50%, -50%)`,
          opacity: isVisible ? (isHovering ? 0.3 : 0.15) : 0,
        }}
      >
        <div
          className={`transition-all duration-300 ${
            isHovering ? "w-8 h-8" : "w-6 h-6"
          }`}
          style={{
            border: "1px solid rgba(0,170,255,0.3)",
            borderRadius: "50%",
            background: "conic-gradient(from 0deg, transparent 0%, rgba(0,170,255,0.1) 50%, transparent 100%)",
            animation: "rotate-slow 3s linear infinite",
            boxShadow: "0 0 12px rgba(0,170,255,0.15)",
          }}
        />
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            isHovering ? "w-6 h-6" : "w-4 h-4"
          }`}
          style={{
            border: "1px dashed rgba(0,170,255,0.4)",
            borderRadius: "50%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "rotate-slow 2s linear infinite reverse",
          }}
        />
      </div>

      {/* Glow effect - Matrix blue */}
      <div
        ref={glowRef}
        className="fixed pointer-events-none z-[9995] will-change-transform"
        style={{
          transform: `translate(-50%, -50%)`,
          opacity: isVisible ? (isHovering ? 0.35 : 0.18) : 0,
        }}
      >
        <div
          className={`transition-opacity duration-200 ${
            isHovering ? "w-8 h-8 blur-xl" : "w-6 h-6 blur-2xl"
          }`}
          style={{
            background: "radial-gradient(circle, rgba(0,170,255,0.4) 0%, transparent 70%)",
          }}
        />
      </div>
    </>
  )
}

