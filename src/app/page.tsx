import { getDictionary } from "@/lib/dictionary";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";
  const dict = await getDictionary(locale);

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-6">{dict.home.title}</h1>
        <p className="text-xl text-muted-foreground mb-8 text-center max-w-2xl">
          {dict.home.description}
        </p>
      </div>
    </main>
  );
}
