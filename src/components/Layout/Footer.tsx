import Image from "next/image";
import { cn } from "../../utils/tailwindMerge";

export function Footer() {
  return (
    <footer
      className={cn(
        "h-12 py-2 px-8 flex flex-row items-center justify-between border-t border-gray-800"
      )}
    >
      <p className={cn("text-sm")}>
        © 2025 Carlos Velázquez. Personal project.
      </p>
      <div className={cn("flex flex-row items-center justify-center gap-4")}>
        <p className={cn("text-sm")}>Built with Next.js</p>
        <Image
          className={cn("dark:invert")}
          src="/next.svg"
          alt="Next.js logo"
          width={50}
          height={16}
          priority
        />
      </div>
    </footer>
  );
}
