import React, { useContext } from "react";
import { cn } from "../../../../utils/tailwindMerge";
import { ViewerContext } from "../../context/ViewerContext";
import { AttributesTree } from "../AttributesTree";

export function ModelTreeSection() {
  const { modelTree } = useContext(ViewerContext);

  console.log("Model tree", modelTree);

  return (
    <React.Fragment>
      {modelTree ? (
        <div className={cn(["flex flex-col gap-4 overflow-y-auto h-full"])}>
          <div>
            <AttributesTree attributes={modelTree} isModelTree />
          </div>
        </div>
      ) : (
        <div
          className={cn(["flex flex-col items-center justify-center h-full"])}
        >
          <p className={cn(["text-sm dark:text-white"])}>
            El modelo no está disponible
          </p>
        </div>
      )}
    </React.Fragment>
  );
}
