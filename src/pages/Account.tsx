
"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import DonateButton from "@/components/DonateButton"
import { supabase } from "@/integrations/supabase/client"

const Account = () => {
  const [loading, setLoading] = useState(false)
  const [displayName, setDisplayName] = useState<string | null>("")
  const [firstName, setFirstName] = useState<string | null>("")
  const [lastName, setLastName] = useState<string | null>("")
  const [website, setWebsite] = useState<string | null>("")
  const [avatarUrl, setAvatarUrl] = useState<string | null>("")
  const [updatedAt, setUpdatedAt] = useState<string | null>("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true)
        if (!user) throw new Error("Please login to update your profile.")

        let { data, error, status } = await supabase
          .from("profiles")
          .select(`display_name, first_name, last_name, website, avatar_url, updated_at`)
          .eq("id", user?.id)
          .single()

        if (error && status !== 406) {
          throw error
        }

        if (data) {
          setDisplayName(data.display_name)
          setFirstName(data.first_name)
          setLastName(data.last_name)
          setWebsite(data.website)
          setAvatarUrl(data.avatar_url)
          setUpdatedAt(data.updated_at)
        }
      } catch (error: any) {
        console.error(error)
        alert(error.message)
      } finally {
        setLoading(false)
      }
    }

    getProfile()
  }, [user])

  async function updateProfile({
    displayName,
    firstName,
    lastName,
    website,
    avatarUrl,
  }: {
    displayName: string | null
    firstName: string | null
    lastName: string | null
    website: string | null
    avatarUrl: string | null
  }) {
    try {
      setLoading(true)
      if (!user) throw new Error("Please login to update your profile.")

      const updates = {
        id: user?.id,
        updated_at: new Date().toISOString(),
        display_name: displayName,
        first_name: firstName,
        last_name: lastName,
        website: website,
        avatar_url: avatarUrl,
      }

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return values after insert
      })

      if (error) {
        throw error
      }
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    } catch (error: any) {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 5000)
      console.error(error)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 py-24 flex-grow">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center justify-center">
            <Avatar className="h-32 w-32 border-2 border-muted-foreground mb-4">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt="Avatar" />
              ) : (
                <AvatarFallback>{displayName?.slice(0, 2).toUpperCase()}</AvatarFallback>
              )}
            </Avatar>
            <p className="text-sm text-muted-foreground">
              Last updated: {updatedAt ? new Date(updatedAt).toLocaleDateString() : "Not available"}
            </p>
          </div>

          {/* Form Section */}
          <div>
            <form className="space-y-6">
              <div>
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  type="text"
                  value={displayName || ""}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName || ""}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={lastName || ""}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={website || ""}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="avatarUrl">Avatar URL</Label>
                <Input
                  id="avatarUrl"
                  type="url"
                  value={avatarUrl || ""}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                />
              </div>

              <div>
                <Button
                  className="w-full"
                  disabled={loading}
                  onClick={() =>
                    updateProfile({ displayName, firstName, lastName, website, avatarUrl })
                  }
                >
                  {loading ? "Updating ..." : "Update Profile"}
                </Button>
              </div>
              {success && (
                <motion.p
                  className="text-green-500"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Profile updated successfully!
                </motion.p>
              )}
              {error && (
                <motion.p
                  className="text-red-500"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Failed to update profile. Please try again.
                </motion.p>
              )}
            </form>
          </div>
        </div>
      </main>

      <Footer />
      <DonateButton />
    </div>
  )
}

export default Account
