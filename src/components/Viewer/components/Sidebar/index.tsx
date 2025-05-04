import { useState } from "react";
import { cn } from "../../../../utils/tailwindMerge";
import { PropertiesSection } from "./PropertiesSection";
import { TreeView, List, Stack, Funnel } from "@phosphor-icons/react";
import { ModelTreeSection } from "./ModelTreeSection";

type SidebarSections = "model_tree" | "properties" | "plans" | "filters";

type SidebarSectionControl = {
  value: SidebarSections;
  label: string;
  icon: React.ReactNode;
};

const ICON_SIZE = 20;

const sidebarSections: SidebarSectionControl[] = [
  {
    value: "model_tree",
    label: "Model Tree",
    icon: <TreeView size={ICON_SIZE} />,
  },
  {
    value: "properties",
    label: "Properties",
    icon: <List size={ICON_SIZE} />,
  },
  {
    value: "plans",
    label: "Plans",
    icon: <Stack size={ICON_SIZE} />,
  },
  {
    value: "filters",
    label: "Filters",
    icon: <Funnel size={ICON_SIZE} />,
  },
];

function renderSection(selectedSection: SidebarSections) {
  switch (selectedSection) {
    case "properties":
      return <PropertiesSection />;
    case "model_tree":
      return <ModelTreeSection />;
    // Add cases for other sections as needed
    default:
      return null;
  }
}

export function Sidebar() {
  const [selectedSection, setSelectedSection] =
    useState<SidebarSections>("properties");

  const currentSection = sidebarSections.find(
    (section) => section.value === selectedSection
  );

  return (
    <div
      className={cn(["absolute top-6 left-12 bottom-12 flex flex-col gap-4"])}
    >
      <div
        className={cn([
          "flex flex-col gap-4 h-full transition-all duration-100 min-h-0 border border-gray-200/20 rounded-2xl shadow-lg px-6 py-4 bg-[var(--background)]",
          selectedSection === "model_tree" ? "w-[35rem]" : "w-[20rem]",
        ])}
      >
        <h2 className={cn(["text-sm text-gray-400"])}>
          {currentSection?.label || "Section"}
        </h2>
        {renderSection(selectedSection)}
      </div>
      <div className="flex justify-center w-[20rem]">
        <div
          className={cn([
            "flex flex-row w-fit gap-2 p-[0.25rem] border border-gray-200/20 rounded-[0.75rem] shadow-lg bg-[var(--background)]",
          ])}
        >
          {sidebarSections.map((section) => (
            <div
              key={section.value}
              onClick={() => setSelectedSection(section.value)}
              className={cn([
                "flex flex-row justify-center items-center p-2 rounded-[0.5rem] transition-all ease-in-out duration-100 cursor-pointer",
                selectedSection === section.value
                  ? "bg-gray-900 border border-gray-200/20"
                  : "hover:bg-gray-900 border border-transparent hover:border hover:border-gray-200/20",
              ])}
            >
              {section.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
