import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function AdminPendingRacesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session || !session.user?.admin) {
    redirect("/admin/login")
  }

  return <>{children}</>
}
