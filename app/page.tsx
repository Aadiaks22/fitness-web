"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Clock,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Heart,
  Users,
  Trophy,
  Instagram,
  Facebook,
  Twitter,
  CheckCircle,
  Star,
  Award,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { BookDemoDialog } from "@/components/book-demo-dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { FlipCard } from "@/components/flip-card"
import { useAutoCarousel } from "@/hooks/use-auto-carousel"
import { ContactForm } from "@/components/contact-form"
import { PopupForm } from "@/components/popup-form"

export default function Home() {
  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Refs for service cards to track visibility
  const serviceRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [visibleServices, setVisibleServices] = useState<boolean[]>([false, false, false, false])

  // Auto carousel for Why Choose Us section
  const {
    setApi: setWhyChooseUsApi,
    pauseAutoPlay: pauseWhyChooseUs,
    resumeAutoPlay: resumeWhyChooseUs,
  } = useAutoCarousel(5000)

  // Auto carousel for Testimonials section
  const {
    setApi: setTestimonialsApi,
    pauseAutoPlay: pauseTestimonials,
    resumeAutoPlay: resumeTestimonials,
  } = useAutoCarousel(4000)

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMobileMenuOpen])

  // Set up intersection observer for service cards
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3, // When 30% of the element is visible
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = serviceRefs.current.findIndex((ref) => ref === entry.target)
        if (index !== -1) {
          setVisibleServices((prev) => {
            const newState = [...prev]
            newState[index] = entry.isIntersecting
            return newState
          })
        }
      })
    }, options)

    // Observe all service cards
    serviceRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      serviceRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Popup Form */}
      <PopupForm />

      {/* Top Bar with Contact Info */}

      {/* Fixed Social Media Icons */}
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-3 p-2 rounded-l-lg">
        <Link
          href="https://wa.me/917355519301?text=Hello%2C%20I'm%20interested%20in%20learning%20more%20about%20Balance%20Pro%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="text-custom-blue/70 hover:text-green-500 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path
              fillRule="evenodd"
              d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
              clipRule="evenodd"
            />
          </svg>
        </Link>

        <Link
          href="https://www.instagram.com/balancepro_india?igsh=bWc0aWJ3OG5yMDZr&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-custom-blue/70 hover:text-[#E1306C] transition-colors"
        >
          <Instagram className="h-6 w-6" />
        </Link>

        <Link
          href="https://www.facebook.com/share/1RgVd5FU4K/?mibextid=wwXIfr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-custom-blue/70 hover:text-primary transition-colors"
        >
          <Facebook className="h-6 w-6" />
        </Link>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 absolute top-16 left-0 right-0 z-50">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="#home"
                className="font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#about"
                className="font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#services"
                className="font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="#trainers"
                className="font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Trainers
              </Link>
              <Link
                href="#testimonials"
                className="font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="#contact"
                className="font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}

      <main>
        {/* Hero Section with Full Image */}
        <section id="home" className="relative h-screen">
          {/* Desktop Image - Hidden on mobile */}
          <div className="absolute inset-0 z-0 hidden md:block">
            <Image
              src="/webfront.jpg"
              alt="Fitness Hero Background - Desktop"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Mobile Image - Hidden on desktop */}
          <div className="absolute inset-0 z-0 block md:hidden">
            <Image
              src="/web15.jpg"
              alt="Fitness Hero Background - Mobile"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-custom-dark/60 to-custom-deep-blue/50 z-10"></div>

          <div className="w-full h-full flex flex-col justify-center items-center relative z-20 text-center text-white px-4 md:px-0">
            <div className="animate-float">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow">
                BALANCE<span className="text-primary">PRO</span>
              </h1>
              <p className="text-xl md:text-2xl mb-10 max-w-3xl text-shadow">
                Transform your life through accessible, online fitness services that restore posture, manage weight, and
                alleviate pain.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <BookDemoDialog>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white bg-white/10 hover:bg-white hover:text-black font-bold px-8 py-6 text-lg rounded-full transition-all duration-300"
                >
                  Book Free Demo
                </Button>
              </BookDemoDialog>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white bg-white/10 hover:bg-white hover:text-black font-bold px-8 py-6 text-lg rounded-full transition-all duration-300"
                onClick={() => {
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                SERVICES
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section - Why Choose Us */}
        <section id="why-choose-us" className="py-24 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-custom-off-white via-primary/5 to-white"></div>
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary/10 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-accent/10 translate-x-1/3 translate-y-1/3 blur-3xl"></div>
            <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-custom-blue/10 blur-2xl"></div>

            {/* Decorative patterns */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-20 h-20 border-2 border-primary rounded-lg rotate-12"></div>
              <div className="absolute top-40 right-20 w-16 h-16 border-2 border-accent rounded-full"></div>
              <div className="absolute bottom-20 left-1/3 w-24 h-24 border-2 border-custom-blue rounded-lg -rotate-12"></div>
              <div className="absolute top-1/2 right-1/3 w-12 h-12 border-2 border-primary rounded-full"></div>
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block relative">
                <h2 className="text-5xl font-bold mb-4 text-custom-deep-blue relative z-10">Why Choose Us</h2>
                <div className="absolute -bottom-3 left-0 right-0 h-3 bg-primary/30 -rotate-1 z-0 rounded-full"></div>
              </div>
              <div className="w-24 h-1 bg-primary mx-auto mb-6 mt-4"></div>
              <p className="text-custom-text max-w-2xl mx-auto mb-12 text-lg">
                We offer a comprehensive fitness experience with state-of-the-art equipment, expert trainers, and a
                supportive community.
              </p>
            </div>

            <div className="relative max-w-6xl mx-auto">
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-accent/20 rounded-full blur-xl"></div>

              <Carousel
                className="w-full"
                setApi={setWhyChooseUsApi}
                opts={{
                  align: "start",
                  loop: true,
                }}
                onMouseEnter={pauseWhyChooseUs}
                onMouseLeave={resumeWhyChooseUs}
              >
                <CarouselContent>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <FlipCard
                      title="EXPERT TRAINERS"
                      content="Our certified trainers have years of experience and specialized knowledge in various fitness disciplines. They create personalized workout plans tailored to your specific goals and needs, ensuring you get the most effective training possible."
                      icon={<Users className="h-10 w-10 text-white" />}
                      imageSrc="https://images.unsplash.com/photo-1734668487893-d686f3c8d0cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <FlipCard
                      title="PERSONALIZED PROGRAMS"
                      content="We don't believe in one-size-fits-all approaches. Each client receives a customized fitness program designed specifically for their body type, fitness level, and goals. Our personalized approach ensures faster, more sustainable results."
                      icon={<Award className="h-10 w-10 text-white" />}
                      imageSrc="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <FlipCard
                      title="PROVEN RESULTS"
                      content="Our methods are backed by science and proven to work. We've helped thousands of clients achieve their fitness goals, from weight loss and muscle gain to improved mobility and reduced pain. Our success stories speak for themselves."
                      icon={<Trophy className="h-10 w-10 text-white" />}
                      imageSrc="https://images.unsplash.com/photo-1535743686920-55e4145369b9?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D"
                    />
                  </CarouselItem>
                </CarouselContent>
                <div className="flex justify-center mt-12">
                  <CarouselPrevious className="relative static translate-y-0 left-0 mr-4 bg-primary text-white hover:bg-custom-deep-blue border-none h-12 w-12 rounded-full shadow-lg" />
                  <CarouselNext className="relative static translate-y-0 right-0 bg-primary text-white hover:bg-custom-deep-blue border-none h-12 w-12 rounded-full shadow-lg" />
                </div>
              </Carousel>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-10 left-0 w-full flex justify-center">
              <div className="w-3/4 h-4 bg-gradient-to-r from-transparent via-primary/20 to-transparent rounded-full blur-xl"></div>
            </div>

            {/* Progress indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary/30 animate-pulse-slow"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-custom-deep-blue">Our Services</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-custom-text max-w-2xl mx-auto">
                We offer a wide range of fitness services to help you achieve your goals, whether you're looking to
                build muscle, lose weight, or improve your overall health.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link
                ref={(el) => {
                  serviceRefs.current[0] = el;
                }}
                href="/services/strength-training#top"
                className={`block h-80 relative rounded-lg overflow-hidden group ${visibleServices[0] ? "service-visible" : ""}`}
              >
                <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-black/0 md:group-hover:bg-black/0 transition-colors duration-300"></div>
                <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 service-visible:opacity-100 bg-gradient-to-t from-primary/20 via-transparent to-transparent transition-opacity duration-500"></div>
                <div className="absolute inset-0 z-0 group-hover:blur-[1px] md:group-hover:blur-[1px]  transition-all duration-500">
                  <Image
                    src="/posturemg.png"
                    alt="Posture Restoration"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 md:group-hover:scale-110 service-visible:scale-110 active:scale-105 filter group-hover:brightness-110 md:group-hover:brightness-110 service-visible:brightness-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-30"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300 z-40">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-glow md:group-hover:text-glow">
                    Posture Restoration
                  </h3>
                  <div className="flex items-center text-white/90 text-sm font-medium">
                    <span className="group-hover:text-white md:group-hover:text-white service-visible:text-white transition-colors">
                      Learn More
                    </span>
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 md:group-hover:translate-x-1 service-visible:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 service-visible:opacity-100 shadow-[inset_0_0_30px_rgba(255,255,255,0.2)] z-30 transition-opacity duration-500 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 md:group-hover:scale-x-100 service-visible:scale-x-100 transition-transform duration-500 origin-left z-40"></div>
              </Link>

              <Link
                ref={(el) => {
                  serviceRefs.current[1] = el;
                }}
                href="/services/cardio-fitness#top"
                className={`block h-80 relative rounded-lg overflow-hidden group ${visibleServices[1] ? "service-visible" : ""}`}
              >
                <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-black/0 md:group-hover:bg-black/0 transition-colors duration-300"></div>
                <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 service-visible:opacity-100 bg-gradient-to-t from-primary/20 via-transparent to-transparent transition-opacity duration-500"></div>
                <div className="absolute inset-0 z-0 group-hover:blur-[1px] md:group-hover:blur-[1px] transition-all duration-500">
                  <Image
                    src="/weight.jpg"
                    alt="Weight Management"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 md:group-hover:scale-110 service-visible:scale-110 active:scale-105 filter group-hover:brightness-110 md:group-hover:brightness-110 service-visible:brightness-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-30"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300 z-40">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-glow md:group-hover:text-glow">
                    Weight Management
                  </h3>
                  <div className="flex items-center text-white/90 text-sm font-medium">
                    <span className="group-hover:text-white md:group-hover:text-white service-visible:text-white transition-colors">
                      Learn More
                    </span>
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 md:group-hover:translate-x-1 service-visible:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 service-visible:opacity-100 shadow-[inset_0_0_30px_rgba(255,255,255,0.2)] z-30 transition-opacity duration-500 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 md:group-hover:scale-x-100 service-visible:scale-x-100 transition-transform duration-500 origin-left z-40"></div>
              </Link>

              <Link
                ref={(el) => {
                  serviceRefs.current[2] = el;
                }}
                href="/services/weight-loss#top"
                className={`block h-80 relative rounded-lg overflow-hidden group ${visibleServices[2] ? "service-visible" : ""}`}
              >
                <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-black/0 md:group-hover:bg-black/0 transition-colors duration-300"></div>
                <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 service-visible:opacity-100 bg-gradient-to-t from-primary/20 via-transparent to-transparent transition-opacity duration-500"></div>
                <div className="absolute inset-0 z-0 group-hover:blur-[1px] md:group-hover:blur-[1px]  transition-all duration-500">
                  <Image
                    src="/painmg.png"
                    alt="Pain Management"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 md:group-hover:scale-110 service-visible:scale-110 active:scale-105 filter group-hover:brightness-110 md:group-hover:brightness-110 service-visible:brightness-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-30"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300 z-40">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-glow md:group-hover:text-glow ">
                    Pain Management
                  </h3>
                  <div className="flex items-center text-white/90 text-sm font-medium">
                    <span className="group-hover:text-white md:group-hover:text-white service-visible:text-white transition-colors">
                      Learn More
                    </span>
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 md:group-hover:translate-x-1 service-visible:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 service-visible:opacity-100 shadow-[inset_0_0_30px_rgba(255,255,255,0.2)] z-30 transition-opacity duration-500 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 md:group-hover:scale-x-100 service-visible:scale-x-100 transition-transform duration-500 origin-left z-40"></div>
              </Link>

              <Link
                ref={(el) => {
                  serviceRefs.current[3] = el;
                }}
                href="/services/nutrition-counseling#top"
                className={`block h-80 relative rounded-lg overflow-hidden group ${visibleServices[3] ? "service-visible" : ""}`}
              >
                <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-black/0 md:group-hover:bg-black/0 transition-colors duration-300"></div>
                <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 service-visible:opacity-100 bg-gradient-to-t from-primary/20 via-transparent to-transparent transition-opacity duration-500"></div>
                <div className="absolute inset-0 z-0 group-hover:blur-[1px] md:group-hover:blur-[1px]  transition-all duration-500">
                  <Image
                    src="/nutrition.jpg"
                    alt="Nutrition Counseling"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 md:group-hover:scale-110 service-visible:scale-110 active:scale-105 filter group-hover:brightness-110 md:group-hover:brightness-110 service-visible:brightness-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-30"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300 z-40">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-glow md:group-hover:text-glow ">
                    Nutrition Counseling
                  </h3>
                  <div className="flex items-center text-white/90 text-sm font-medium">
                    <span className="group-hover:text-white md:group-hover:text-white service-visible:text-white transition-colors">
                      Learn More
                    </span>
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 md:group-hover:translate-x-1 service-visible:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 service-visible:opacity-100 shadow-[inset_0_0_30px_rgba(255,255,255,0.2)] z-30 transition-opacity duration-500 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 md:group-hover:scale-x-100 service-visible:scale-x-100 transition-transform duration-500 origin-left z-40"></div>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section with Carousel */}
        <section id="testimonials" className="py-20 bg-gradient-to-r from-primary to-custom-blue text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block relative">
                <h2 className="text-3xl font-bold mb-4 text-white relative z-10">What Our Members Say</h2>
                <div className="absolute -bottom-3 left-0 right-0 h-3 bg-white/90 -rotate-1 z-0 rounded-full"></div>
              </div>
              <div className="w-20 h-1 bg-primary mx-auto mb-6 mt-4"></div>
              <p className="text-white max-w-2xl mx-auto mb-6 md:mb-0">
                Don't just take our word for it. Hear from our members who have transformed their lives with BalancePro.
              </p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-accent/20 rounded-full blur-xl"></div>

              <Carousel
                className="w-full"
                setApi={setTestimonialsApi}
                opts={{
                  align: "start",
                  loop: true,
                }}
                onMouseEnter={pauseTestimonials}
                onMouseLeave={resumeTestimonials}
              >
                <CarouselContent>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <div className="bg-white p-8 rounded-lg shadow-lg h-full hover-scale card-shadow">
                      <div className="flex items-center mb-6">
                        <div className="mr-4">
                          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                            <Image
                              src="/Madhvi.jpg"
                              alt="Testimonial Avatar"
                              width={160}
                              height={160}
                              className="rounded-full"
                            />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-custom-deep-blue">Madhvi</h4>
                          <p className="text-primary text-sm">Member since 2020</p>
                        </div>
                      </div>
                      <p className="text-custom-text mb-4 italic">
                        "I've been a member of BalancePro for over 5 years now, and it has completely transformed my
                        life. The trainers are knowledgeable and supportive, and the community is amazing."
                      </p>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-current" />
                        ))}
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <div className="bg-white p-8 rounded-lg shadow-lg h-full hover-scale card-shadow">
                      <div className="flex items-center mb-6">
                        <div className="mr-4">
                          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                            <Image
                              src="/Dr Amit singh (orthopaedic).jpg"
                              alt="Testimonial Avatar"
                              width={160}
                              height={160}
                              className="rounded-full"
                            />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-custom-deep-blue">Dr Amit singh (orthopaedic)</h4>
                          <p className="text-primary text-sm">Member since 2022</p>
                        </div>
                      </div>
                      <p className="text-custom-text mb-4 italic">
                        "Balance Pro fixed what years of bad posture ruined. I feel stronger, pain-free, and finally aligned!"
                      </p>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-current" />
                        ))}
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <div className="bg-white p-8 rounded-lg shadow-lg h-full hover-scale card-shadow">
                      <div className="flex items-center mb-6">
                        <div className="mr-4">
                          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                            <Image
                              src="/Dr Ajay Chaudhary (Gastroenterologist.jpg"
                              alt="Testimonial Avatar"
                              width={160}
                              height={160}
                              className="rounded-full"
                            />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-custom-deep-blue">Dr Ajay Chaudhary (Gastroenterologist)</h4>
                          <p className="text-primary text-sm">Member since 2022</p>
                        </div>
                      </div>
                      <p className="text-custom-text mb-4 italic">
                        "Joining BalancePro was the best decision I've made for my health. The supportive community,
                        expert guidance, and variety of training options keep me coming back. I feel stronger, more
                        energized, and genuinely excited about fitness again."
                      </p>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-current" />
                        ))}
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <div className="bg-white p-8 rounded-lg shadow-lg h-full hover-scale card-shadow">
                      <div className="flex items-center mb-6">
                        <div className="mr-4">
                          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                            <Image
                              src="/Shailendra.jpg"
                              alt="Testimonial Avatar"
                              width={160}
                              height={160}
                              className="rounded-full"
                            />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-custom-deep-blue">Shailendra</h4>
                          <p className="text-primary text-sm">Member since 2024</p>
                        </div>
                      </div>
                      <p className="text-custom-text mb-4 italic">
                        "BalancePro has completely transformed my approach to wellness. The guidance, the support, and
                        the structure have helped me build healthy habits that actually stick. I feel more energized,
                        focused, and confident in every part of my life."
                      </p>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-current" />
                        ))}
                      </div>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <div className="bg-white p-8 rounded-lg shadow-lg h-full hover-scale card-shadow">
                      <div className="flex items-center mb-6">
                        <div className="mr-4">
                          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                            <Image
                              src="/Shorya vats - U.S Washington.jpg"
                              alt="Testimonial Avatar"
                              width={160}
                              height={160}
                              className="rounded-full"
                            />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-custom-deep-blue">Shorya vats (U.S Washington)</h4>
                          <p className="text-primary text-sm">Member since 2023</p>
                        </div>
                      </div>
                      <p className="text-custom-text mb-4 italic">
                        “I used to suffer from constant neck and shoulder tension, especially after long workdays.
                        After just a few weeks of following the posture restoration program,
                        the tightness has almost completely disappeared. I feel more open, confident, and pain-free!”
                      </p>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-current" />
                        ))}
                      </div>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <div className="flex justify-center mt-8">
                  <CarouselPrevious className="relative static translate-y-0 left-0 mr-2 bg-primary text-white hover:bg-custom-deep-blue border-none" />
                  <CarouselNext className="relative static translate-y-0 right-0 bg-primary text-white hover:bg-custom-deep-blue border-none" />
                </div>
              </Carousel>

              {/* Progress indicator */}
              <div className="flex justify-center mt-4 space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-white/90 animate-pulse-slow"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trainers Section */}
        <section id="trainers" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-custom-deep-blue">Meet Our Expert Trainer</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-custom-text max-w-2xl mx-auto">
                Our certified trainer is dedicated to helping you achieve your fitness goals with personalized guidance
                and support.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover-scale card-shadow">
                <div className="relative h-80">
                  <Image
                    src="/admin_img2.jpg"
                    alt="Director of Balance Pro"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="p-6 relative z-10 -mt-16 bg-white rounded-t-lg">
                  <h3 className="text-xl font-bold mb-1 text-custom-deep-blue">Nitesh</h3>
                  <p className="text-primary mb-3">Director & Head Trainer</p>
                  <p className="text-custom-text mb-4">
                    "Welcome to Balance Pro! I'm excited to lead a team that's redefining fitness for the digital age.
                    Our focus isn't just on how you look—it's on how you feel. Through posture restoration, weight
                    management, and pain relief, we're here to guide you toward a body that works as well as it lives."
                  </p>
                  <div className="flex space-x-3">
                    <Link href="https://www.instagram.com/balancepro_india?igsh=bWc0aWJ3OG5yMDZr&utm_source=qr" className="text-custom-text hover:text-primary transition-colors">
                      <Instagram className="h-5 w-5" />
                    </Link>
                    <Link href="https://www.facebook.com/share/1RgVd5FU4K/?mibextid=wwXIfr" className="text-custom-text hover:text-primary transition-colors">
                      <Facebook className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Mission & Vision Sections */}
        <section className="py-20 bg-custom-blue/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-custom-deep-blue">Our Mission & Vision</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-custom-text max-w-2xl mx-auto">
                Learn about what drives us and where we're headed in our journey to transform lives through fitness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-lg shadow-lg hover-scale card-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/20">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-custom-deep-blue">Company Mission</h3>
                <p className="text-custom-text">
                  At Balance Pro, our mission is to transform lives through accessible, online fitness services that
                  restore posture, manage weight, and alleviate pain. We're dedicated to delivering expert-led,
                  personalized solutions that empower you to move better, feel stronger, and live healthier—wherever you
                  are, whenever you need us.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg hover-scale card-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/20">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-custom-deep-blue">Company Vision</h3>
                <p className="text-custom-text">
                  We see a future where everyone can achieve optimal health and mobility from the comfort of their own
                  space. Balance Pro strives to pioneer online fitness by blending science-driven posture restoration,
                  sustainable weight management, and effective pain relief, creating a global community that thrives on
                  balance, resilience, and well-being.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-primary to-custom-blue text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold mb-4">Ready to Start Your Fitness Journey?</h2>
                <p className="text-white mb-6 md:mb-0">
                  Join BalancePro today and take the first step towards a healthier, stronger you. Our team is ready to
                  help you achieve your fitness goals.
                </p>
              </div>
              <div className="md:w-1/3 flex flex-col sm:flex-row gap-4">
                <BookDemoDialog>
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-custom-off-white font-bold rounded-full shadow-lg transition-all duration-300"
                  >
                    BOOK FREE DEMO
                  </Button>
                </BookDemoDialog>
                <Link
                  href="https://wa.me/917355519301?text=Hello%2C%20I'm%20interested%20in%20learning%20more%20about%20Balance%20Pro%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 px-6 py-3 text-white font-bold transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Ask Your Query
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-custom-off-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-custom-deep-blue">Get In Touch</h2>
              <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-custom-text max-w-2xl mx-auto">
                Have questions or need more information? Contact us today and our team will be happy to assist you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-6 text-custom-deep-blue">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-primary/20 p-3 rounded-full mr-4">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-custom-deep-blue">Address</h4>
                        <p className="text-custom-text">2/317 Vishwas khand Gomtinagar, Lucknow</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-primary/20 p-3 rounded-full mr-4">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-custom-deep-blue">Phone</h4>
                        <p className="text-custom-text">+91 7355519301</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-primary/20 p-3 rounded-full mr-4">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-custom-deep-blue">Email</h4>
                        <p className="text-custom-text">balanceprofitness@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-primary/20 p-3 rounded-full mr-4">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-custom-deep-blue">Hours</h4>
                        <p className="text-custom-text">Monday - Saturday: 6:00 AM - 10:00 PM</p>
                        <p className="text-custom-text">Sunday: 8:00 AM - 8:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-6 text-custom-deep-blue">Follow Us</h3>
                  <div className="flex space-x-4">
                    <Link
                      href="https://www.facebook.com/share/1RgVd5FU4K/?mibextid=wwXIfr"
                      className="bg-primary/20 p-3 rounded-full hover:bg-primary hover:text-white transition-colors"
                    >
                      <Facebook className="h-6 w-6" />
                    </Link>
                    <Link
                      href="https://www.instagram.com/balancepro_india?igsh=bWc0aWJ3OG5yMDZr&utm_source=qr"
                      className="bg-primary/20 p-3 rounded-full hover:bg-primary hover:text-white transition-colors"
                    >
                      <Instagram className="h-6 w-6" />
                    </Link>
                  </div>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Image Section */}
              <div className="md:w-1/2 relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-lg z-0" />
                <Image
                  src="https://images.unsplash.com/photo-1562088287-bde35a1ea917?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="About Balance Pro"
                  width={600}
                  height={600}
                  className="rounded-lg shadow-lg relative z-10"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-lg z-0"></div>
              </div>

              {/* Text Content Section */}
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4 text-custom-deep-blue">About Balance Pro</h2>
                <div className="w-20 h-1 bg-primary mb-6"></div>
                <p className="text-custom-text mb-6">
                  At Balance Pro, we're redefining fitness by bringing balance to your life—wherever you are. We've been
                  on a mission to make wellness accessible, delivering expert-led online fitness sessions that fit
                  seamlessly into your schedule.
                </p>
                <p className="text-custom-text mb-6">
                  Our journey began with a simple idea: everyone deserves a shot at feeling their best, no gym required.
                  We've grown into a thriving community, helping clients achieve their goals through personalized
                  virtual training.
                </p>
                <p className="text-custom-text mb-6">
                  Since 2019, we've built a platform where balance isn't just a buzzword but a way of life. You're free
                  to train on your terms, backed by a team that's got your back every step of the way.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span className="text-custom-text">Posture Restoration</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span className="text-custom-text">Weight Management</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span className="text-custom-text">Pain Management</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span className="text-custom-text">Nutrition Counseling</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-custom-dark text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <Link href="/" className="flex items-center mb-6">
                <span className="text-2xl font-bold text-white">
                  BALANCE<span className="text-primary">PRO</span>
                </span>
              </Link>
              <p className="text-gray-400 mb-6">
                Your ultimate fitness destination with state-of-the-art equipment, expert trainers, and a supportive
                community.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="https://www.facebook.com/share/1RgVd5FU4K/?mibextid=wwXIfr"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.instagram.com/balancepro_india?igsh=bWc0aWJ3OG5yMDZr&utm_source=qr"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#home" className="text-gray-400 hover:text-primary transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-gray-400 hover:text-primary transition-colors flex items-center">
                    <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#services"
                    className="text-gray-400 hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="#trainers"
                    className="text-gray-400 hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                    Trainers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#testimonials"
                    className="text-gray-400 hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="text-gray-400 hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Services</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/services/strength-training"
                    className="text-gray-400 hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                    Posture Restoration
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/cardio-fitness"
                    className="text-gray-400 hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                    Weight Management
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/weight-loss"
                    className="text-gray-400 hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                    Pain Management
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/nutrition-counseling"
                    className="text-gray-400 hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                    Nutrition Counseling
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <span className="text-gray-400">2/317 Vishwas khand Gomtinagar, Lucknow</span>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <span className="text-gray-400">+91 7355519301</span>
                </li>
                <li className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <span className="text-gray-400">balanceprofitness@gmail.com</span>
                </li>
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <span className="text-gray-400">Mon - Sat: 6:00 AM - 10:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} BalancePro. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
