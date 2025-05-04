import { cn } from "../../../utils/tailwindMerge";
import { useState } from "react";

type CustomTabsProps = {
  options: string[];
  onChange?: (index: number) => void;
};

export function CustomTabs(props: CustomTabsProps) {
  const { options, onChange } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={cn(["flex bg-gray-900 rounded-md"])}>
      {options.map((option, index) => (
        <button
          key={index}
          className={cn([
            "flex-1 py-1 text-sm rounded-md hover:bg-gray-700 border border-transparent cursor-pointer",
            index === selectedIndex && "bg-gray-800 border border-white/10",
          ])}
          onClick={() => {
            setSelectedIndex(index);
            if (onChange) {
              onChange(index);
            }
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
