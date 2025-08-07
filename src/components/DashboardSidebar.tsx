/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Package, UserIcon, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";

type Dictionary = {
  dashboard: {
    products: string;
    profile: string;
    logout: string;
  };
};

export function DashboardSidebar({
  user,
}: {
  user: { id: string; email: string; username: string };
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { language } = useLanguage();
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);

  useEffect(() => {
    async function loadDictionary() {
      const dict = await import(`@/dictionaries/${language}.json`).then(
        (module) => module.default
      );
      setDictionary(dict);
    }

    loadDictionary();
  }, [language]);

  if (!dictionary) {
    return null;
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const menuItems = [
    {
      title: dictionary.dashboard.products,
      href: "/dashboard/products",
      icon: Package,
    },
    {
      title: dictionary.dashboard.profile,
      href: "/dashboard/profile",
      icon: UserIcon,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2">
        <Link href="/dashboard" className="text-xl font-bold">
          AuthApp
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {dictionary.dashboard.logout}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
