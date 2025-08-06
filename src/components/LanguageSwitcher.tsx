"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/providers/LanguageProvider";

export function LanguageSwitcher() {
  const router = useRouter();
  const { setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <Globe className="h-5 w-5" />
      </Button>
    );
  }

  const switchLanguage = async (locale: string) => {
    document.cookie = `locale=${locale};path=/;max-age=31536000`;
    setLanguage(locale);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLanguage("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage("uk")}>
          Українська
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
