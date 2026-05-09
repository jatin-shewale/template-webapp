"use client"

import Link from "next/link"
import { Music, Github, Twitter, Instagram } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/#features" },
        { name: "Pricing", href: "/upgrade" },
        { name: "Demo", href: "/wrapped" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
      ],
    },
    {
      title: "Social",
      links: [
        { name: "Twitter", href: "https://twitter.com", icon: Twitter },
        { name: "GitHub", href: "https://github.com", icon: Github },
        { name: "Instagram", href: "https://instagram.com", icon: Instagram },
      ],
    },
  ]

  return (
    <footer className="border-t border-white/5 bg-slate-950 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <Music className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">
                Sound<span className="text-primary">DNA</span>
              </span>
            </Link>
            <p className="text-white/50 max-w-sm mb-6 leading-relaxed">
              Uncover the genetic makeup of your musical soul. Analyze your Spotify data to reveal your listening archetype and genre DNA.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-primary transition-colors text-sm flex items-center gap-2"
                    >
                      {link.icon && <link.icon className="w-4 h-4" />}
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/40 text-sm">
            © {currentYear} SoundDNA. Built with ❤️ for music lovers.
          </p>
          <div className="flex items-center gap-8 text-sm text-white/40">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

