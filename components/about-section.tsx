"use client"

import { type Language, t } from "@/lib/i18n"

interface AboutSectionProps {
  lang: Language
}

export function AboutSection({ lang }: AboutSectionProps) {
  const highlights = [
    { 
      title: t(lang, "about_highlight_1_title"), 
      desc: t(lang, "about_highlight_1_desc") 
    },
    { 
      title: t(lang, "about_highlight_2_title"), 
      desc: t(lang, "about_highlight_2_desc") 
    },
    { 
      title: t(lang, "about_highlight_3_title"), 
      desc: t(lang, "about_highlight_3_desc") 
    },
  ]

  const metrics = [
    { 
      label: t(lang, "about_metric_1_label"), 
      value: "5+", 
      note: t(lang, "about_metric_1_note") 
    },
    { 
      label: t(lang, "about_metric_2_label"), 
      value: "100+", 
      note: t(lang, "about_metric_2_note") 
    },
    { 
      label: t(lang, "about_metric_3_label"), 
      value: t(lang, "about_metric_3_value"), 
      note: t(lang, "about_metric_3_note") 
    },
  ]
  return (
    <section
      id="nav_about"
      className="relative py-24 md:py-28 px-4 md:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/15 to-background" />

      <div className="relative max-w-6xl mx-auto space-y-14">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
            {t(lang, "about_title")}
          </h2>
          <p className="text-base sm:text-lg text-foreground/65 max-w-3xl mx-auto leading-relaxed">
            {t(lang, "about_desc")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl glass-effect border border-border/60 hover:border-accent/50 transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">
                {t(lang, "about_team_title")}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {t(lang, "about_team_desc")}
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-xl border border-border/60 hover:border-accent/50 bg-background/60 transition-colors duration-300"
                >
                  <h4 className="text-base font-semibold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-foreground/65 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="p-5 rounded-xl glass-effect border border-border/60 hover:border-accent/50 transition-all duration-300 flex flex-col gap-1"
              >
                <span className="text-3xl sm:text-4xl font-bold text-primary">{metric.value}</span>
                <span className="text-sm uppercase tracking-[0.15em] text-foreground/60">{metric.label}</span>
                <span className="text-xs text-foreground/50">{metric.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
