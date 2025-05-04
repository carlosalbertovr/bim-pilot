import Stats from "stats.js";
import * as OBC from "@thatopen/components";

export function initStats(
  world: OBC.SimpleWorld<OBC.SimpleScene, OBC.SimpleCamera, OBC.SimpleRenderer>
) {
  if (typeof window === "undefined" || !world.renderer) return;

  const stats = new Stats();
  stats.showPanel(2);

  const statsDom = stats.dom;
  statsDom.style.position = "fixed";
  statsDom.style.right = "0px";
  statsDom.style.left = "unset";
  statsDom.style.top = "48px";
  statsDom.style.zIndex = "1000";

  document.body.appendChild(statsDom);

  world.renderer.onBeforeUpdate.add(() => stats.begin());
  world.renderer.onAfterUpdate.add(() => stats.end());
}
