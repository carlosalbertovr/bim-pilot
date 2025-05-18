import { useState } from "react";
import { cn } from "../../../../utils/tailwindMerge";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import "./index.css"

export type TreeItem = {
  label: string;
  value: string | TreeItem[];
};

type AttributeTreeProps = {
  attributes: TreeItem[];
};

export function AttributesTree(props: AttributeTreeProps) {
  const { attributes } = props;

  const [openDetails, setOpenDetails] = useState<Record<string, boolean>>({});

  const handleToggle = (key: string) => {
    setOpenDetails((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderTree = (items: TreeItem[], parentKey = "", isChild?: boolean) => {
    return items.map((item, index) => {
      const key = `${parentKey}-${index}`;
      const isOpen = openDetails[key] || false;

      if (Array.isArray(item.value)) {
        return (
          <li key={key} className={cn("list-none")}>
            <div
              className={cn(
                "transition-all duration-300 ease-in-out text-gray-400",
                isChild ? "ml-6" : "ml-0",
                isOpen ? "tree-border" : undefined
              )}
            >
              <summary
                className={cn(
                  "text-sm flex flex-row items-center cursor-pointer transition-all duration-200 ease-in-out hover:bg-gray-900 rounded-md py-1",
                  isOpen ? "text-white" : "hover:text-white"
                )}
              >
                <button
                  className={cn(
                    "px-2 py-1 flex flex-row items-center gap-2 w-full text-left cursor-pointer"
                  )}
                  onClick={() => handleToggle(key)}
                >
                  <ChevronRightIcon
                    className={cn([
                      "h-4 transition-transform duration-200",
                      isOpen ? "rotate-90" : "rotate-0",
                    ])}
                  />
                  {item.label}
                </button>
              </summary>
              {isOpen && (
                <ul className={cn("animate-fade-down animate-duration-250")}>
                  {renderTree(item.value, key, true)}
                </ul>
              )}
            </div>
          </li>
        );
      }
      return (
        <li
          key={key}
          className={cn([
            "flex flex-col gap-1",
            "mb-3",
            isChild ? "ml-7.5" : "ml-0",
          ])}
        >
          <p className={cn(["text-xs"])}>{item.label}: </p>
          <div
            className={cn([
              "flex flex-row items-center gap-2 bg-gray-900 px-2 py-1 rounded-md",
            ])}
          >
            <p className={cn(["text-sm dark:text-white"])}>
              {item.value === "" ? "N/A" : item.value}
            </p>
          </div>
        </li>
      );
    });
  };

  return (
    <ul className={cn("w-full h-full overflow-hidden ")}>
      {renderTree(attributes)}
    </ul>
  );
}
