import Image from "next/image";
import { cn } from "../../utils/tailwindMerge";

export function Topbar() {
  return (
    <div
      className={cn([
        "h-12 py-2 px-8 flex flex-row items-center justify-between border-b border-gray-800",
      ])}
    >
      <div className={cn("flex flex-row items-center justify-center gap-2")}>
        <Image
          className={cn("dark:invert")}
          src="/logo.svg"
          alt="BIM Pilot logo"
          width={16}
          height={16}
          priority
        />
        <h1 className={cn("text-sm uppercase font-semibold")}>BIM Pilot</h1>
      </div>
    </div>
  );
}
