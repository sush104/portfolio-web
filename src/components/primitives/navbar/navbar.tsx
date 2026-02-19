import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/primitives/button/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/primitives/sheet/sheet";
import { ThemeToggle } from "@/components/primitives/theme-toggle/theme-toggle";
import { cn } from "@/lib/utils";

export interface NavItem {
  name: string;
  href: string;
  icon?: ReactNode;
}

export interface NavbarProps {
  brand?: string | ReactNode;
  brandHref?: string;
  navItems?: NavItem[];
  showThemeToggle?: boolean;
  actions?: ReactNode;
  className?: string;
  sticky?: boolean;
  onNavItemClick?: (item: NavItem) => void;
}

const defaultNavItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Skills", href: "/skills" },
  { name: "Contact", href: "/contact" },
];

const Navbar = ({
  brand = "Sushant Shelke",
  brandHref = "/",
  navItems = defaultNavItems,
  showThemeToggle = true,
  actions,
  className,
  sticky = false,
  onNavItemClick,
}: NavbarProps) => {
  const location = useLocation();

  const handleNavClick = (item: NavItem) => {
    onNavItemClick?.(item);
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <nav
      className={cn(
        "top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        sticky ? "sticky" : "fixed",
        className,
      )}
    >
      <div className="w-full px-6 lg:px-8 flex h-16 items-center">
        {/* Logo/Brand - Left */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link to={brandHref}>
            <img
              src="/profile.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-primary"
            />
          </Link>
          <div className="text-2xl font-bold">
            {typeof brand === "string" ? (
              <Link
                to={brandHref}
                className="transition-colors hover:text-primary"
              >
                {brand}
              </Link>
            ) : (
              brand
            )}
          </div>
        </div>

        {/* Desktop Navigation - Center */}
        <div className="hidden md:flex md:flex-1 md:justify-center">
          <ul className="flex gap-6 lg:gap-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={() => handleNavClick(item)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary relative group inline-flex items-center gap-2",
                    isActive(item.href) && "text-primary",
                  )}
                >
                  {item.icon}
                  {item.name}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                      isActive(item.href) ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions & Theme Toggle - Right */}
        <div className="hidden md:flex md:items-center md:gap-2 md:flex-shrink-0">
          {actions}
          {showThemeToggle && <ThemeToggle />}
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 ml-auto md:hidden">
          {actions}
          {showThemeToggle && <ThemeToggle />}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => handleNavClick(item)}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary py-2 inline-flex items-center gap-2",
                      isActive(item.href) && "text-primary",
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
