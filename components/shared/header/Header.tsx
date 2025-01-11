import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "./Menu";
import CategoryDrawer from "./CategoryDrawer";
import { Search } from "./Search";

export const Header = () => {
  return (
    <header className="w-full border-b dark:border-gray-700">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <CategoryDrawer />
          <Link href="/" className="flex-start ml-4">
            <Image
              src="/images/logo.svg"
              alt={`${APP_NAME} logo`}
              height={48}
              width={48}
              priority={true}
            />
            <span className="ml-3 hidden text-2xl font-bold lg:block">
              {APP_NAME}
            </span>
          </Link>
        </div>

        <div className="hidden md:block">
          <Search />
        </div>
        <Menu />
      </div>
    </header>
  );
};
