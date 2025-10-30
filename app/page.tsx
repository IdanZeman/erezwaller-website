'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, Mail, ShieldCheck, Hammer, Wrench, Ruler, Paintbrush, Building2, ChevronLeft, ChevronRight, Menu, X, Truck } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase, type Project } from '@/lib/supabase'

// Default project data (fallback)
const defaultProjects: Project[] = [
  {
    id: 1,
    title: 'שיפוץ דירה בתל אביב',
    description: 'שיפוץ מקיף של דירת 4 חדרים כולל פירוק, חשמל, אינסטלציה, ריצוף וצביעה. העבודה הושלמה תוך 3 חודשים עם שביעות רצון מלאה של הלקוח.',
    image_url: '/images/2_edited.avif',
    images: []
  },
  {
    id: 2,
    title: 'שדרוג מטבח מודרני',
    description: 'החלפת מטבח ישן במטבח מודרני עם ארונות חדשים, משטחי שיש, תאורה מעוצבת ומכשירי חשמל משולבים. פרויקט שהשלים תוך חודש.',
    image_url: '/images/iStock-1466874093-1.jpg',
    images: []
  },
  {
    id: 3,
    title: 'שיפוץ חדר אמבטיה',
    description: 'פרויקט שיפוץ מלא של חדר אמבטיה כולל אריחים איטלקיים, מקלחון זכוכית, כלים סניטריים חדשים ומערכת תאורה חכמה.',
    image_url: '/images/iStock-901157728-1.jpg',
    images: []
  },
  {
    id: 4,
    title: 'בניית מרפסת שמש',
    description: 'בניית מרפסת שמש מעץ איפאה עם גג רעפים, תריסי אלומיניום ורצפת דק. העבודה כללה גם חיבור חשמל ותאורה חיצונית.',
    image_url: '/images/ritzliserg001.jpg',
    images: []
  },
  {
    id: 5,
    title: 'שיפוץ משרדים',
    description: 'שיפוץ ועיצוב מחדש של משרדים בשטח 200 מ"ר כולל קירות גבס, חשמל, רשת תקשורת, ריצוף ועבודות צביעה מקצועיות.',
    image_url: '/images/שיפוצים-3.jpg',
    images: []
  },
  {
    id: 6,
    title: 'שיפוץ בית פרטי',
    description: 'שיפוץ מקיף של בית פרטי דו-משפחתי כולל הרחבה, שדרוג מערכות, חיפוי אבן טבעית ועיצוב גינה.',
    image_url: '/images/2_edited.avif',
    images: []
  },
]

export default function HandymanLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [projects, setProjects] = useState(defaultProjects)

  // Auto-advance images every 2 seconds
  useEffect(() => {
    if (selectedProject === null) return

    const project = projects.find(p => p.id === selectedProject)
    if (!project) return

    const allImages = [project.image_url, ...(project.images || [])]
    if (allImages.length <= 1) return // Don't auto-advance if only 1 image

    const interval = setInterval(() => {
      setSelectedImageIndex((prev) => 
        prev === allImages.length - 1 ? 0 : prev + 1
      )
    }, 5000) // Change every 2 seconds

    return () => clearInterval(interval)
  }, [selectedProject, selectedImageIndex, projects])

  // Load projects from Supabase
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error loading projects:', error)
          return
        }
        
        if (data && data.length > 0) {
          setProjects(data)
        }
      } catch (err) {
        console.error('Error:', err)
      }
    }

    loadProjects()
  }, [])

  return (
    <div id="top" dir="rtl" lang="he" className="min-h-screen bg-white text-slate-900 antialiased">
      {/* Top Contact Bar */}
      <div className="w-full bg-[#2C3E50] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex flex-row-reverse items-center justify-between text-xs md:text-sm">
          <div className="flex items-center gap-2 md:gap-4">
            <a href="tel:+972549250567" className="flex items-center gap-1 md:gap-2 hover:opacity-80">
              <Phone className="w-3 h-3 md:w-4 md:h-4" /> 
              <span dir="ltr" className="hidden sm:inline">054-925-0567</span>
            </a>
            <a href="mailto:erez@handyman.co.il" className="hidden sm:flex items-center gap-2 hover:opacity-80">
              <Mail className="w-4 h-4" /> <span dir="ltr">erez@handyman.co.il</span>
            </a>
          </div>
          <div className="flex items-center gap-1 md:gap-2 text-red-500">
            <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" /> 
            <span className="text-xs md:text-sm">אחריות מלאה</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between relative">
            {/* Mobile Menu Button - Left side on mobile */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors z-10"
              aria-label="תפריט"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo - Center on mobile, Right on desktop */}
            <a href="#top" className="text-2xl md:text-3xl font-black hover:opacity-80 transition-opacity absolute left-1/2 -translate-x-1/2 md:absolute md:right-0 md:left-auto md:translate-x-0">
              <span className="text-slate-900">ארז</span><span className="text-[#f0001c]">ולר</span>
            </a>

            {/* Desktop Navigation - Center */}
            <nav className="flex-1 hidden md:flex gap-8 text-slate-700 justify-center">
              <a href="#services" className="hover:text-slate-900 transition-colors">שירותים</a>
              <a href="#projects" className="hover:text-slate-900 transition-colors">פרויקטים</a>
            </nav>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 bg-white"
          >
            <nav className="flex flex-col py-4 px-6 space-y-4">
              <a 
                href="#services" 
                className="text-lg text-slate-700 hover:text-[#f0001c] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                שירותים
              </a>
              <a 
                href="#projects" 
                className="text-lg text-slate-700 hover:text-[#f0001c] transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                פרויקטים
              </a>

              <div className="pt-2 border-t border-slate-200">
                <a href="tel:+972549250567">
                  <Button className="w-full bg-[#f0001c] hover:bg-[#d00018] text-white">
                    <Phone className="w-4 h-4 ml-2" />
                    התקשר עכשיו
                  </Button>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <Image 
            src="/Construction.avif" 
            alt="אתר עבודה" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/60" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6">
              שיפוצים, תחזוקה ובנייה<br/>
              <span className="text-[#f0001c]">מקצועיות ללא פשרות</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-200 mb-4 font-semibold">
              עסק משפחתי, מבוטח ומהימן
            </p>
            <p className="text-lg text-slate-300 mb-10 max-w-3xl mx-auto">
              מעל 15 שנות ניסיון בביצוע וניהול פרויקטי שיפוצים, תחזוקה ובנייה לדירות, בתים פרטיים ועסקים
            </p>
            <a href="#contact">
              <Button size="lg" className="bg-[#f0001c] hover:bg-[#d00018] text-white font-bold text-lg px-10 py-6 h-auto rounded-full">
                קבל הצעת מחיר חינם
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Section - MRP style cards */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-4">השירותים שלנו</h2>
            <p className="text-xl text-slate-600">פתרונות מקצועיים ומקיפים לכל צורך</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {icon: <Hammer className="w-12 h-12"/>, title: 'שירותי הנדימן', desc: 'התקנה ותיקונים קטנים בבית או במשרד, כולל תיקוני חשמל, אינסטלציה, רהיטים ועוד.'},
              {icon: <Building2 className="w-12 h-12"/>, title: 'פרויקטי מגורים', desc: 'פרויקטי בניה החל מהתקנת דשא סינטטי, ריצוף ועד שיפוץ הבית'},
              {icon: <Truck className="w-12 h-12"/>, title: 'השכרת ציוד לאירועים', desc: 'השכרת ציוד לאירועים קטנים וגדולים כגון: שולחנות, כסאות, אוהלים ועוד.'},
            ].map((s, idx) => (
              <div key={idx} className="text-center group">
                <div className="mb-6 flex justify-center">
                  <div className="p-6 rounded-full bg-red-50 text-[#f0001c] group-hover:bg-[#f0001c] group-hover:text-white transition-all duration-300">
                    {s.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-4">פרויקטים נבחרים</h2>
            <p className="text-xl text-slate-600">עבודות שביצענו בהצלחה</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all cursor-pointer bg-white"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="relative w-full aspect-video overflow-hidden bg-slate-100 flex items-center justify-center">
                  <Image 
                    src={project.image_url} 
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    quality={85}
                  />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-bold text-slate-900">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
            onClick={() => {
              setSelectedProject(null)
              setSelectedImageIndex(0)
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const project = projects.find(p => p.id === selectedProject)
                if (!project) return null
                
                // Create gallery array: main image + additional images
                const allImages = [
                  project.image_url,
                  ...(project.images || [])
                ]
                
                return (
                  <>
                    {/* Close Button */}
                    <button
                      onClick={() => {
                        setSelectedProject(null)
                        setSelectedImageIndex(0)
                      }}
                      className="absolute top-3 left-3 bg-white hover:bg-slate-100 rounded-full p-2 shadow-lg transition-all z-20"
                      aria-label="סגור"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    {/* Image Gallery */}
                    <div className="relative flex-shrink-0 p-4 pb-0">
                      <div className="relative w-full h-[40vh] flex items-center justify-center rounded-xl overflow-hidden">
                        <Image 
                          src={allImages[selectedImageIndex]} 
                          alt={`${project.title} - תמונה ${selectedImageIndex + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 672px"
                          className="object-contain p-2"
                          quality={90}
                          priority
                        />
                      </div>

                      {/* Navigation Arrows (only if multiple images) */}
                      {allImages.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedImageIndex((prev) => 
                                prev === 0 ? allImages.length - 1 : prev - 1
                              )
                            }}
                            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                            aria-label="תמונה קודמת"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedImageIndex((prev) => 
                                prev === allImages.length - 1 ? 0 : prev + 1
                              )
                            }}
                            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                            aria-label="תמונה הבאה"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>

                          {/* Image Counter */}
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                            {selectedImageIndex + 1} / {allImages.length}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Thumbnail Gallery (only if multiple images) */}
                    {allImages.length > 1 && (
                      <div className="px-4 pt-3 pb-2 flex-shrink-0 overflow-hidden">
                        <div className="flex gap-2 justify-center flex-wrap">
                          {allImages.map((imageUrl, index) => (
                            <button
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedImageIndex(index)
                              }}
                              className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                                selectedImageIndex === index 
                                  ? 'border-[#f0001c] scale-105' 
                                  : 'border-slate-200 hover:border-slate-400'
                              }`}
                            >
                              <img 
                                src={imageUrl} 
                                alt={`תמונה ממוזערת ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Project Details */}
                    <div className="p-4 flex-shrink-0 border-t border-slate-100">
                      <h2 className="text-2xl font-black mb-2 text-slate-900 tracking-tight">{project.title}</h2>
                      <p className="text-sm text-slate-700 leading-relaxed mb-3 line-clamp-3">{project.description}</p>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Superior Service Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-4">שירות מעולה</h2>
            <p className="text-xl text-slate-600">אין עבודה גדולה מדי או קטנה מדי עבור צוות המקצוענים שלנו</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {icon: <ShieldCheck className="w-16 h-16"/>, title: '15+ שנות ניסיון', desc: 'אנו משרתים את האזור כבר מעל 15 שנה'},
              {icon: <Hammer className="w-16 h-16"/>, title: 'מהיר ויעיל', desc: 'אנו מציעים שירותים מהירים ללקוחותינו ללא לפגוע באיכות'},
              {icon: <Building2 className="w-16 h-16"/>, title: 'אחריות שנה', desc: 'אנו מחויבים לספק לכם שירות אמין, שביעות רצון מובטחת'},
              {icon: <Wrench className="w-16 h-16"/>, title: 'טכנאים מקצועיים', desc: 'אנו משתמשים במומחים המוסמכים ביותר לשרת אתכם'},
            ].map((s, idx) => (
              <div key={idx} className="text-center">
                <div className="mb-4 flex justify-center text-[#f0001c]">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black mb-4">המלצות לקוחות</h2>
            <p className="text-xl text-slate-600">מה הלקוחות שלנו אומרים</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {text: 'ארז נתן שירות מדהים, עמד בזמנים והבית נראה כמו חדש. ממליץ בחום!', name: 'דנה, תל אביב'},
              {text: 'הצעת מחיר שקופה וביצוע מוקפד עד הפרט האחרון. מקצועיות ברמה הגבוהה ביותר.', name: 'אורן, רמת גן'},
              {text: 'רציתי להודות לך ולצוות על ההתקנה המושלמת. הטכנאי היה נחמד, מקצועי ועשה עבודה מעולה.', name: 'יעל, ירושלים'},
            ].map((t, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg shadow-md">
                <p className="text-slate-700 leading-relaxed mb-4 text-lg italic">"{t.text}"</p>
                <p className="font-bold text-slate-900">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a252f] text-slate-300 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="text-3xl font-black mb-4">
                <span className="text-white">ארז</span><span className="text-[#f0001c]">ולר</span>
              </div>
              <p className="text-slate-400 mb-4">שיפוצים, תחזוקה ובנייה – שירות מקצועי בכל גודל</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4"/>
                  <a href="tel:+972549250567" className="hover:text-[#f0001c] transition-colors" dir="ltr">054-925-0567</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4"/>
                  <a href="mailto:erez@handyman.co.il" className="hover:text-[#f0001c] transition-colors" dir="ltr">erez@handyman.co.il</a>
                </div>
              </div>
            </div>
            <div>
              <div className="font-bold mb-4 text-white text-lg">ניווט מהיר</div>
              <ul className="space-y-2">
                <li><a href="#services" className="hover:text-[#f0001c] transition-colors">שירותים</a></li>
                <li><a href="#projects" className="hover:text-[#f0001c] transition-colors">פרויקטים</a></li>
                <li><a href="#about" className="hover:text-[#f0001c] transition-colors">אודות</a></li>
                <li><a href="#contact" className="hover:text-[#f0001c] transition-colors">צור קשר</a></li>
              </ul>
            </div>
            <div>
              <div className="font-bold mb-4 text-white text-lg">שעות פעילות</div>
              <p className="text-slate-400">ראשון–חמישי<br/>08:00–18:00</p>
              <p className="text-slate-400 mt-2">שישי<br/>08:00–13:00</p>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-500">
            <p>© {new Date().getFullYear()} ארזולר. כל הזכויות שמורות</p>
          </div>
        </div>
      </footer>


      {/* Sticky WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a href="https://wa.me/972549250567" target="_blank" rel="noopener noreferrer" className="block">
          <div className="w-14 h-14 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 bg-[#25D366] flex items-center justify-center">
            <Image 
              src="/icons8-whatsapp-48.svg" 
              alt="WhatsApp" 
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
        </a>
      </div>
    </div>
  )
}
