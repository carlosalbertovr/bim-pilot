import { ViewerContextProvider } from "../components/Viewer/context/ViewerContext";
import { ModelViewer } from "../components/Viewer/ModelViewer";
import { ModelOutput } from "../types/model";
import { cn } from "../utils/tailwindMerge";

const mockModelData: ModelOutput = {
  modelUrl: "/models/Sample-2.ifc",
  fragmentsUrl: "/models/fragments/Sample-2.frag",
};

export default function Home() {
  return (
    <ViewerContextProvider>
      <div className={cn(["w-full h-full"])}>
        <ModelViewer modelData={mockModelData} />
      </div>
    </ViewerContextProvider>
  );
}
