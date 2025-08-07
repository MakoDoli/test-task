import { getDictionary } from "@/lib/dictionary";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";
  const dict = await getDictionary(locale);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        {dict.dashboard.welcome}, {session.user.username}!
      </h1>
      <p className="text-muted-foreground">
        Select a section from the sidebar to get started.
      </p>
    </div>
  );
}
