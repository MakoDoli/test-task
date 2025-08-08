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
  SidebarRail,
  useSidebar,
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
  const { isMobile, setOpenMobile } = useSidebar();

  useEffect(() => {
    if (!language) return;
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

  const handleMenuClick = () => {
    // Close mobile sidebar when menu item is clicked
    if (isMobile) {
      setOpenMobile(false);
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
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="flex items-center gap-2 px-4 py-2">
            <Link
              href="/dashboard"
              className="text-xl font-bold truncate"
              onClick={handleMenuClick}
            >
              AuthApp
            </Link>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-2">
          <div className="space-y-2 py-2">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <Link href={item.href} onClick={handleMenuClick}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border">
          <div className="p-2">
            <div className="mb-2 px-2 py-1 text-xs text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">
              <div className="font-medium truncate">{user.username}</div>
              <div className="text-xs truncate">{user.email}</div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start h-8 px-2"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span className="group-data-[collapsible=icon]:hidden">
                {dictionary.dashboard.logout}
              </span>
            </Button>
          </div>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
    </>
  );
}
