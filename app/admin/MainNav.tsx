"use client";

import { adminLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";

export const MainNav = ({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {adminLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            !pathname.includes(link.href) && "text-muted-foreground",
          )}
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
};
