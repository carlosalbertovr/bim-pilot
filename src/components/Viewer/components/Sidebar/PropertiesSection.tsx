import React, { useContext, useState } from "react";
import { cn } from "../../../../utils/tailwindMerge";
import { AttributesTree } from "../AttributesTree";
import { ViewerContext } from "../../context/ViewerContext";
import { CustomTabs } from "../../../common/CustomTabs";

export function PropertiesSection() {
  const { itemProperties } = useContext(ViewerContext);
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <React.Fragment>
      <CustomTabs
        options={["Attributes", "Property Sets"]}
        onChange={(index) => setSelectedTab(index)}
      />
      <div className={cn(["flex flex-col gap-4 overflow-y-auto h-full"])}>
        {itemProperties.selectedAttributes && itemProperties.selectedPsets ? (
          selectedTab === 0 ? (
            <div>
              {itemProperties.selectedAttributes.length > 0 && (
                <AttributesTree attributes={itemProperties.selectedAttributes} />
              )}
            </div>
          ) : (
            <div>
              {itemProperties.selectedPsets.length > 0 && (
                <AttributesTree attributes={itemProperties.selectedPsets} />
              )}
            </div>
          )
        ) : (
          <div
            className={cn(["flex flex-col items-center justify-center h-full"])}
          >
            <p className={cn(["text-sm dark:text-white"])}>
              Select an element first
            </p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
