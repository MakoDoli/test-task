import { getDictionary } from "@/lib/dictionary";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LoginForm } from "@/components/LoginForm";

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }

  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";
  const dict = await getDictionary(locale);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">{dict.auth.login}</h1>
          </div>
          <LoginForm dictionary={dict.auth} />
        </div>
      </div>
    </div>
  );
}
