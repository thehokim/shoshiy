"use client"

import { type Language, t } from "@/lib/i18n"
import { Code, Smartphone, Palette, Server, Settings, MessageSquare } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Service {
  id: number
  icon: LucideIcon
  titleKey: string
  descriptionKey: string
}

const services: Service[] = [
  {
    id: 1,
    icon: Code,
    titleKey: "service_1_title",
    descriptionKey: "service_1_desc",
  },
  {
    id: 2,
    icon: Smartphone,
    titleKey: "service_2_title",
    descriptionKey: "service_2_desc",
  },
  {
    id: 3,
    icon: Palette,
    titleKey: "service_3_title",
    descriptionKey: "service_3_desc",
  },
  {
    id: 4,
    icon: Server,
    titleKey: "service_4_title",
    descriptionKey: "service_4_desc",
  },
  {
    id: 5,
    icon: Settings,
    titleKey: "service_5_title",
    descriptionKey: "service_5_desc",
  },
  {
    id: 6,
    icon: MessageSquare,
    titleKey: "service_6_title",
    descriptionKey: "service_6_desc",
  },
]

interface ServicesSectionProps {
  lang: Language
}

export function ServicesSection({ lang }: ServicesSectionProps) {
  return (
    <section id="nav_services" className="relative py-24 md:py-28 px-4 md:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="space-y-4 text-center mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            {t(lang, "services_title")}
          </h2>
          <p className="text-foreground/65 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed tracking-wide">
            {t(lang, "services_description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative p-6 sm:p-8 rounded-2xl border border-border/40 bg-background/60 backdrop-blur-sm hover:border-accent/50 transition-all duration-500 cursor-pointer transform hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/10"
            >
              {/* Gradient accent on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Icon with animated background */}
                <div className="mb-6 relative">
                  <div className="absolute inset-0 w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-accent/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold mb-3 group-hover:text-accent transition-colors tracking-tight">
                  {t(lang, service.titleKey as any)}
                </h3>
                <p className="text-foreground/70 text-sm sm:text-base leading-relaxed">
                  {t(lang, service.descriptionKey as any)}
                </p>

                {/* Decorative line on hover */}
                <div className="mt-6 h-px w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
