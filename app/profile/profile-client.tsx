"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { CreditCard, LogOut, Trash2, Sparkles, User, Mail, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useSubscription } from "@/contexts/subscription-context"
import { toast } from "sonner"
import { motion } from "framer-motion"

interface ProfileClientProps {
  user: {
    id: string
    email: string
  }
}

export function ProfileClient({ user }: ProfileClientProps) {
  const { isPro, tier, downgradeToFree } = useSubscription()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isDowngrading, setIsDowngrading] = useState(false)
  const [showDowngradeDialog, setShowDowngradeDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleLogout = async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)

    try {
      await fetch("/api/auth/signout", { method: "POST" })
    } catch (error) {
      console.error("Logout error:", error)
    }

    window.location.href = "/"
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true)

    try {
      const response = await fetch("/api/account/delete", {
        method: "POST",
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to delete account")
      }

      setShowDeleteDialog(false)
      window.location.href = "/"
    } catch (error) {
      console.error("Delete account error:", error)
      toast.error("Failed to delete account. Please try again.")
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  const handleDowngrade = async () => {
    setIsDowngrading(true)

    try {
      await downgradeToFree()
      setShowDowngradeDialog(false)
      toast.success("You've been downgraded to the Free plan.")
    } catch (error) {
      console.error("Downgrade error:", error)
      toast.error("Failed to downgrade. Please try again.")
    } finally {
      setIsDowngrading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-8 bg-slate-900/50 p-10 rounded-[2.5rem] glass border-white/5"
          >
            <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl shadow-primary/20">
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight mb-2">Musical Profile</h1>
              <div className="flex items-center gap-2 text-white/50 font-medium">
                <Mail className="w-4 h-4" />
                {user.email}
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Subscription Management */}
            <Card className="md:col-span-3 glass border-white/5 p-10 rounded-[2.5rem] space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-white">Identity Plan</h2>
              </div>

              <div className="bg-white/5 rounded-3xl p-8 space-y-6">
                {isPro ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] mb-1">Status</p>
                        <p className="text-2xl font-black text-white flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-primary" />
                          Pro DNA
                        </p>
                      </div>
                      <div className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-xs font-bold border border-green-500/20">
                        Active
                      </div>
                    </div>

                    <AlertDialog open={showDowngradeDialog} onOpenChange={setShowDowngradeDialog}>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" className="text-white/30 hover:text-white hover:bg-white/5 p-0 h-auto font-medium text-sm">
                          Need to downgrade?
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="glass border-white/10 rounded-[2rem]">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-2xl font-bold text-white">Pause your Pro access?</AlertDialogTitle>
                          <AlertDialogDescription className="text-white/60">
                            You'll lose access to unlimited DNA reports and priority processing immediately.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-xl bg-white/5 border-none text-white hover:bg-white/10">Keep Pro</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={(e) => {
                              e.preventDefault()
                              handleDowngrade()
                            }}
                            disabled={isDowngrading}
                            className="rounded-xl bg-destructive text-white hover:bg-destructive/90"
                          >
                            {isDowngrading ? "Processing..." : "Confirm Downgrade"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] mb-1">Status</p>
                        <p className="text-2xl font-black text-white">Free Plan</p>
                      </div>
                      <Link href="/upgrade">
                        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6">
                          Upgrade
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* Account Actions */}
            <Card className="md:col-span-2 glass border-white/5 p-10 rounded-[2.5rem] space-y-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-white/50" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Settings</h2>
                </div>

                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full h-14 rounded-2xl border-white/10 glass text-white font-bold justify-start group"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    <LogOut className="w-5 h-5 mr-3 group-hover:text-primary transition-colors" />
                    {isLoggingOut ? "Signing out..." : "Sign Out"}
                  </Button>

                  <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full h-14 rounded-2xl text-destructive/50 hover:text-destructive hover:bg-destructive/10 justify-start"
                        disabled={isDeleting}
                      >
                        <Trash2 className="w-5 h-5 mr-3" />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="glass border-white/10 rounded-[2rem]">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl font-bold text-white">Terminate Identity?</AlertDialogTitle>
                        <AlertDialogDescription className="space-y-4 text-white/60">
                          <p>This action is absolute and cannot be reversed. Your musical genome data will be purged.</p>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl bg-white/5 border-none text-white">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={(e) => {
                            e.preventDefault()
                            handleDeleteAccount()
                          }}
                          disabled={isDeleting}
                          className="rounded-xl bg-destructive text-white hover:bg-destructive/90"
                        >
                          {isDeleting ? "Deleting..." : "Permanently Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

