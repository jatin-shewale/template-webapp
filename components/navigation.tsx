"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Menu, X, Music, Disc } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useSubscription } from "@/contexts/subscription-context"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Navigation() {
  const pathname = usePathname()
  const { user, isLoading } = useAuth()
  const { isPro } = useSubscription()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Explore", href: "/wrapped" },
    { name: "Pricing", href: "/upgrade" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <nav
        className={`container mx-auto px-6 transition-all duration-300 ${
          scrolled ? "max-w-5xl" : "max-w-7xl"
        }`}
      >
        <div
          className={`flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300 ${
            scrolled ? "glass shadow-2xl" : "bg-transparent"
          }`}
        >
          <Link
            href="/"
            className="flex items-center gap-2 group transition-all duration-300"
          >
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20"
            >
              <Music className="w-6 h-6 text-white" />
            </motion.div>
            <span className="font-bold text-2xl tracking-tight text-white group-hover:text-primary transition-colors">
              Sound<span className="text-primary">DNA</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-white/70"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-4 w-[1px] bg-white/10" />

            <div className="flex items-center gap-4">
              {!isLoading && user ? (
                <div className="flex items-center gap-4">
                  <Link
                    href="/profile"
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                      pathname === "/profile" ? "bg-primary/20 text-primary" : "text-white/70 hover:bg-white/5"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Profile</span>
                  </Link>
                </div>
              ) : (
                <Link href="/spotify/login">
                  <Button className="rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 border-none px-6">
                    Connect Spotify
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl glass text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-4 p-6 rounded-2xl glass shadow-2xl space-y-4"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block py-2 text-lg font-medium text-white/80 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10">
                {!isLoading && (
                  user ? (
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 py-2 text-white/80 hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </Link>
                  ) : (
                    <Link href="/spotify/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full rounded-xl bg-primary hover:bg-primary/90">
                        Connect Spotify
                      </Button>
                    </Link>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}