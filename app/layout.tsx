import type React from "react"
import type { Metadata } from "next"
import { Geologica } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CustomCursor } from "@/components/custom-cursor"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const geologica = Geologica({
  subsets: ["latin", "cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-geologica",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.shoshiy.uz'),
  
  title: {
    default: 'ShoShiy — Разработка ПО и 3D решения | IT Студия в Ташкенте',
    template: '%s | ShoShiy Studio'
  },
  
  description: 'Premium IT & 3D студия в Узбекистане. Разработка веб-приложений, мобильных приложений, 3D визуализация, CRM системы. 5+ лет опыта, 100+ проектов.',
  
  keywords: [
    'разработка ПО Ташкент',
    'веб-разработка Узбекистан',
    'мобильные приложения',
    'IT студия Ташкент',
    'создание сайтов',
    '3D визуализация',
    'CRM системы',
    'автоматизация бизнеса',
    'ShoShiy',
    'web development Uzbekistan',
    'software development Tashkent',
    'dasturiy ta\'minot ishlab chiqish',
    'veb sayt yaratish'
  ],
  
  authors: [{ name: 'ShoShiy Studio' }],
  creator: 'ShoShiy',
  publisher: 'ShoShiy Studio',
  
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['uz_UZ', 'en_US'],
    url: 'https://www.shoshiy.uz',
    siteName: 'ShoShiy Studio',
    title: 'ShoShiy — Premium IT & 3D Studio в Ташкенте',
    description: 'Создаем цифровые решения нового поколения: веб-приложения, мобильные приложения, 3D визуализация, CRM системы. 5+ лет опыта.',
    images: [
      {
        url: '/shoshi-logo.png',
        width: 1200,
        height: 630,
        alt: 'ShoShiy Studio Logo',
      }
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'ShoShiy — Premium IT & 3D Studio',
    description: 'Разработка веб и мобильных приложений, 3D визуализация в Ташкенте',
    images: ['/shoshi-logo.png'],
  },
  
  verification: {
    // Добавьте после регистрации
    // google: 'ваш-код-google-search-console',
    // yandex: 'ваш-код-yandex-webmaster',
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: '/apple-icon.png',
  },
  
  manifest: '/manifest.json',
  
  alternates: {
    canonical: 'https://www.shoshiy.uz',
    languages: {
      'ru': 'https://www.shoshiy.uz',
      'uz': 'https://www.shoshiy.uz',
      'en': 'https://www.shoshiy.uz',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        {/* Верификация Яндекс и Google - добавьте после регистрации */}
        {/* <meta name="yandex-verification" content="ваш-код" /> */}
        {/* <meta name="google-site-verification" content="ваш-код" /> */}
        
        {/* Дополнительные языки */}
        <link rel="alternate" hrefLang="ru" href="https://www.shoshiy.uz" />
        <link rel="alternate" hrefLang="uz" href="https://www.shoshiy.uz" />
        <link rel="alternate" hrefLang="en" href="https://www.shoshiy.uz" />
        <link rel="alternate" hrefLang="x-default" href="https://www.shoshiy.uz" />
        
        {/* Структурированные данные Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ShoShiy Studio",
              "alternateName": "ShoShiy",
              "description": "Premium IT & 3D Studio",
              "url": "https://www.shoshiy.uz",
              "logo": "https://www.shoshiy.uz/shoshi-logo.png",
              "image": "https://www.shoshiy.uz/shoshi-logo.png",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ташкент",
                "addressRegion": "Ташкент",
                "addressCountry": "UZ"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+998970110033",
                "email": "groupshoshi@gmail.com",
                "contactType": "Customer Service",
                "availableLanguage": ["Russian", "Uzbek", "English"],
                "areaServed": "UZ"
              },
              "sameAs": [
                "https://t.me/+998777943535"
              ],
              "foundingDate": "2019",
              "numberOfEmployees": {
                "@type": "QuantitativeValue",
                "value": "10-50"
              },
              "slogan": "Создаем цифровые решения нового поколения"
            })
          }}
        />
        
        {/* Структурированные данные Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "ShoShiy Studio",
              "image": "https://www.shoshiy.uz/shoshi-logo.png",
              "url": "https://www.shoshiy.uz",
              "telephone": "+998970110033",
              "email": "groupshoshi@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ташкент",
                "addressCountry": "UZ"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "41.2995",
                "longitude": "69.2401"
              },
              "priceRange": "$$",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "areaServed": {
                "@type": "Country",
                "name": "Узбекистан"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Услуги разработки",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Веб-разработка",
                      "description": "Современные, масштабируемые веб-приложения"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Разработка мобильных приложений",
                      "description": "Нативные и кроссплатформенные приложения для iOS и Android"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "3D визуализация",
                      "description": "Потрясающая 3D графика и интерактивные решения"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "CRM системы",
                      "description": "Индивидуальные CRM системы и автоматизация бизнес-процессов"
                    }
                  }
                ]
              }
            })
          }}
        />
        
        {/* Breadcrumb */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Главная",
                  "item": "https://www.shoshiy.uz"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Работы",
                  "item": "https://www.shoshiy.uz#nav_works"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Услуги",
                  "item": "https://www.shoshiy.uz#nav_services"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "О нас",
                  "item": "https://www.shoshiy.uz#nav_about"
                },
                {
                  "@type": "ListItem",
                  "position": 5,
                  "name": "Контакты",
                  "item": "https://www.shoshiy.uz#nav_contact"
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${geologica.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CustomCursor />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}