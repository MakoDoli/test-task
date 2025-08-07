import { getDictionary } from "@/lib/dictionary";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";
  const dict = await getDictionary(locale);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{dict.profile.title}</h1>

      <div className="border rounded-lg p-6 space-y-4">
        <div>
          <h2 className="text-sm font-medium text-muted-foreground">
            {dict.profile.username}
          </h2>
          <p className="text-lg">{session.user.username}</p>
        </div>
        <div>
          <h2 className="text-sm font-medium text-muted-foreground">
            {dict.profile.email}
          </h2>
          <p className="text-lg">{session.user.email}</p>
        </div>
      </div>
    </div>
  );
}
