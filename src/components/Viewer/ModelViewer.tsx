"use client";

import { useContext, useEffect, useRef } from "react";
import { cn } from "../../utils/tailwindMerge";
import * as OBC from "@thatopen/components";
import * as THREE from "three";
import { initStats } from "./utils/initStats";
import { ModelOutput } from "../../types/model";
import { initCoreSetup } from "./utils/initCoreSetup";
import { formatItemPsets } from "../../utils/formatItemPsets";
import { highlightMaterial } from "./styles/highlight";
import { getAttributes } from "./utils/getAttributes";
import { getItemPropertySets } from "./utils/getItemPropertySets";
import { Sidebar } from "./components/Sidebar";
import { ViewerContext } from "./context/ViewerContext";

type ModelViewerProps = {
  modelData: ModelOutput;
  onModelLoaded?: () => void;
};

export function ModelViewer(props: ModelViewerProps) {
  const { modelData } = props;
  const { modelUrl, fragmentsUrl } = modelData;

  const { updateSelectedPsets, updateSelectedAttributes, updateModelTree } =
    useContext(ViewerContext);

  const containerRef = useRef<HTMLDivElement>(null);
  const componentsRef = useRef<OBC.Components>(null);

  const selectedLocalIdRef = useRef<number | null>(null);

  useEffect(() => {
    let components: OBC.Components | null = null;
    let mouseDownPos = { x: 0, y: 0 };
    const clickThreshold = 5; // pixel threshold to detect dragging

    async function init() {
      if (typeof window === "undefined" || !containerRef.current) return;

      components = new OBC.Components();
      componentsRef.current = components;

      const worlds = components.get(OBC.Worlds);

      const world = worlds.create<
        OBC.SimpleScene,
        OBC.SimpleCamera,
        OBC.SimpleRenderer
      >();

      world.scene = new OBC.SimpleScene(components);
      world.renderer = new OBC.SimpleRenderer(components, containerRef.current);
      world.camera = new OBC.SimpleCamera(components);

      components.init();

      world.camera.controls.setLookAt(12, 6, 8, 0, 0, -10);
      world.scene.setup();

      const grids = components.get(OBC.Grids);
      grids.create(world);

      const { model, fragments } = await initCoreSetup({
        world: world,
        fragmentsUrl: fragmentsUrl,
      });

      const highlight = async (id: number) => {
        await model.highlight([id], highlightMaterial);
      };

      const resetHighlight = async (id: number) => {
        await model.resetHighlight([id]);
      };

      const mouse = new THREE.Vector2();

      const onMouseDown = (event: MouseEvent) => {
        mouseDownPos = { x: event.clientX, y: event.clientY };
      };

      const onLogAttributes = async () => {
        const data = await getAttributes(model, selectedLocalIdRef);
        if (!data) return;
        updateSelectedAttributes(data);
      };

      const onLogPsets = async () => {
        const data = await getItemPropertySets(model, selectedLocalIdRef);
        if (!data) return;
        const result = formatItemPsets(data);
        updateSelectedPsets(result);
      };

      const getSpatialStructure = async () => {
        const result = await model.getSpatialStructure();
        console.log("Spatial structure", result);
        updateModelTree(result);
        return result;
      };

      const onClick = async (event: MouseEvent) => {
        const dx = event.clientX - mouseDownPos.x;
        const dy = event.clientY - mouseDownPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If the mouse movement was significant, we assume it was a drag, not a click
        if (distance > clickThreshold) return;

        mouse.x = event.clientX;
        mouse.y = event.clientY;

        const result = await model.raycast({
          camera: world.camera.three,
          mouse,
          dom: world.renderer!.three.domElement!,
        });

        const promises = [];

        if (selectedLocalIdRef.current !== null) {
          promises.push(resetHighlight(selectedLocalIdRef.current));
        }

        if (result) {
          selectedLocalIdRef.current = result.localId;
          promises.push(highlight(result.localId));
        } else {
          selectedLocalIdRef.current = null;
          updateSelectedPsets(null);
          updateSelectedAttributes(null);
        }

        promises.push(fragments.update(true));
        Promise.all(promises);

        onLogAttributes();
        onLogPsets();
      };

      getSpatialStructure();

      containerRef.current.addEventListener("mousedown", onMouseDown);
      containerRef.current.addEventListener("click", onClick);

      initStats(world);
    }

    init();

    const container = containerRef.current;

    return () => {
      if (components) {
        components.dispose();
      }

      if (container) {
        container.removeEventListener("mousedown", () => {});
        container.removeEventListener("click", () => {});
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fragmentsUrl, modelUrl]);

  return (
    <div className={cn(["h-full relative"])}>
      <div id="container" ref={containerRef} className={cn(["h-full"])} />
      <Sidebar />
    </div>
  );
}
