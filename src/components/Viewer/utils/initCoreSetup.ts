import * as FRAGS from "@thatopen/fragments";
import * as OBC from "@thatopen/components";

const WORKER_PATH =
  "https://thatopen.github.io/engine_fragment/resources/worker.mjs";

type InitCoreSetupProps = {
  world: OBC.SimpleWorld<OBC.SimpleScene, OBC.SimpleCamera, OBC.SimpleRenderer>;
  fragmentsManager: OBC.FragmentsManager;
  fragmentsUrl: string;
};

export async function initCoreSetup(props: InitCoreSetupProps) {
  const { world, fragmentsUrl, fragmentsManager } = props;

  const fetchedWorker = await fetch(WORKER_PATH);
  const workerText = await fetchedWorker.text();
  const workerFile = new File([new Blob([workerText])], "worker.mjs", {
    type: "text/javascript",
  });

  const url = URL.createObjectURL(workerFile);

  const fragments = new FRAGS.FragmentsModels(url);

  world.camera.controls.addEventListener("rest", () => fragments.update(true));
  world.camera.controls.addEventListener("update", () => fragments.update());

  // Once a model is available in the list, we can tell what camera to use
  // in order to perform the culling and LOD operations.
  // Also, we add the model to the 3D scene.
  fragments.models.list.onItemSet.add(({ value: model }) => {
    model.useCamera(world.camera.three);
    world.scene.three.add(model.object);
    // At the end, you tell fragments to update so the model can be seen given
    // the initial camera position
    fragments.update(true);
  });

  const file = await fetch(fragmentsUrl);

  const contentDisposition = file.headers.get("content-disposition");

  const fragmentsFileName = contentDisposition
    ? contentDisposition.match(/filename="(.+)"/)?.[1]
    : fragmentsUrl.split("/").pop() || "unknown";

  if (!fragmentsFileName) {
    throw new Error("Failed to extract file name from URL");
  }

  const buffer = await file.arrayBuffer();

  fragmentsManager.load(new Uint8Array(buffer));

  const model = await fragments.load(buffer, { modelId: fragmentsFileName });

  return {
    fragments,
    model,
  };
}
