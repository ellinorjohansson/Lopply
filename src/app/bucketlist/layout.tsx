import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function BucketlistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect("/user/login")
  }

  return <>{children}</>
}
