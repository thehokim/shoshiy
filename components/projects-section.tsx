"use client"

import { useState, useEffect } from "react"
import { type Language, t } from "@/lib/i18n"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { useCarousel } from "@/components/ui/carousel"

interface Project {
  id: number
  titleKey: string
  type: "Website" | "App" | "3D" | "CRM" | "Server" | "E-Learning"
  image: string
  date: string
  descriptionKey: string
  url: string
}

const projects: Project[] = [
  {
    id: 1,
    titleKey: "project_1_title",
    type: "Website",
    image: "/fresh-fruits-ecommerce-platform.jpg",
    date: "2024-01",
    descriptionKey: "project_1_desc",
    url: "https://fruit-rosy-three.vercel.app",
  },
  {
    id: 2,
    titleKey: "project_2_title",
    type: "Website",
    image: "/fashion-clothing-marketplace.jpg",
    date: "2024-02",
    descriptionKey: "project_2_desc",
    url: "https://dresshub.vercel.app",
  },
  {
    id: 3,
    titleKey: "project_3_title",
    type: "Website",
    image: "/corporate-business-website.png",
    date: "2024-03",
    descriptionKey: "project_3_desc",
    url: "https://www.chesterfrontline.com",
  },
  {
    id: 4,
    titleKey: "project_4_title",
    type: "E-Learning",
    image: "/education-training-platform.jpg",
    date: "2024-04",
    descriptionKey: "project_4_desc",
    url: "https://futureengineers.cmspace.uz",
  },
  {
    id: 5,
    titleKey: "project_5_title",
    type: "E-Learning",
    image: "/professional-training-courses.jpg",
    date: "2024-05",
    descriptionKey: "project_5_desc",
    url: "https://training.cmspace.uz",
  },
  {
    id: 6,
    titleKey: "project_6_title",
    type: "Website",
    image: "/creative-agency-portfolio.png",
    date: "2024-06",
    descriptionKey: "project_6_desc",
    url: "https://dalayongini.cmspace.uz",
  },
]

const getTypeTranslation = (lang: Language, type: Project["type"]): string => {
  const typeMap = {
    Website: "project_type_website",
    App: "project_type_app",
    "3D": "project_type_3d",
    CRM: "project_type_crm",
    Server: "project_type_server",
    "E-Learning": "project_type_elearning",
  }
  return t(lang, typeMap[type] as any)
}

interface ProjectsSectionProps {
  lang: Language
}

function CustomCarouselButton({ direction }: { direction: "prev" | "next" }) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()
  const isPrev = direction === "prev"
  const canScroll = isPrev ? canScrollPrev : canScrollNext
  const handleClick = isPrev ? scrollPrev : scrollNext

  return (
    <button
      onClick={handleClick}
      disabled={!canScroll}
      className={`
        hidden md:flex
        absolute top-1/2 -translate-y-1/2 z-10
        ${isPrev ? "-left-16 lg:-left-20" : "-right-16 lg:-right-20"}
        w-14 h-14 lg:w-16 lg:h-16
        items-center justify-center
        rounded-full
        bg-background
        border border-border/50
        text-accent
        shadow-lg
        hover:border-accent
        hover:scale-110
        active:scale-95
        transition-all duration-300
        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
        group
      `}
      aria-label={isPrev ? "Previous slide" : "Next slide"}
    >
      {isPrev ? (
        <ChevronLeft className="w-7 h-7 lg:w-8 lg:h-8 text-primary group-hover:text-accent active:text-accent group-hover:translate-x-[-2px] transition-transform" />
      ) : (
        <ChevronRight className="w-7 h-7 lg:w-8 lg:h-8 text-primary group-hover:text-accent active:text-accent group-hover:translate-x-[2px] transition-transform" />
      )}
    </button>
  )
}

export function ProjectsSection({ lang }: ProjectsSectionProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1)
    }

    api.on("select", handleSelect)

    // Autoplay: automatically scroll to next slide every 6 seconds
    const autoplayId = window.setInterval(() => {
      // extra guard in case api becomes undefined
      api.scrollNext()
    }, 6000)

    return () => {
      api.off("select", handleSelect)
      window.clearInterval(autoplayId)
    }
  }, [api])

  return (
    <section id="nav_works" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent">
        {t(lang, "works_title")}
      </h2>
      <p className="text-foreground/60 text-center mb-20 text-lg tracking-wide">{t(lang, "works_description")}</p>

      <div className="relative py-4">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4 py-4">
            {projects.map((project) => (
              <CarouselItem key={project.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-2xl glass-effect hover:border-accent transition-all duration-500 cursor-pointer hover:shadow-sm hover:shadow-accent/5 transform hover:scale-[1.01] block h-full"
                >
                  <div className="aspect-video overflow-hidden relative rounded-t-2xl">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={t(lang, project.titleKey as any)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="text-xl font-semibold group-hover:text-accent transition-colors tracking-tight">
                        {t(lang, project.titleKey as any)}
                      </h3>
                    </div>
                    <p className="text-sm text-foreground/70 mb-4 leading-relaxed">{t(lang, project.descriptionKey as any)}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-3 py-1.5 rounded-full bg-accent/20 text-accent font-medium">
                        {getTypeTranslation(lang, project.type)}
                      </span>
                      <span className="text-xs text-foreground/50">{project.date}</span>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CustomCarouselButton direction="prev" />
          <CustomCarouselButton direction="next" />
        </Carousel>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index + 1 === current
                  ? "w-8 bg-accent"
                  : "w-2 bg-foreground/20 hover:bg-foreground/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
