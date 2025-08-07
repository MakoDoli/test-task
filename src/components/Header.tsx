import Link from "next/link";
import { Button } from "@/components/ui/button";

import { cookies } from "next/headers";

import { getDictionary } from "@/lib/dictionary";
import { auth } from "@/lib/auth";
import { LanguageSwitcher } from "./LanguageSwitcher";

export async function Header() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";
  const dict = await getDictionary(locale);
  const session = await auth();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          AuthApp
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          {session ? (
            <Button asChild>
              <Link href="/dashboard">{dict.header.dashboard}</Link>
            </Button>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link href="/login">{dict.header.login}</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">{dict.header.register}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
