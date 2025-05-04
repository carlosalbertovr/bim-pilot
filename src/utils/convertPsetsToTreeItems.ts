import { TreeItem } from "../components/Viewer/components/AttributesTree";
import { ItemPsetMap } from "./formatItemPsets";

export function convertPsetsToTreeItems(
  obj: ItemPsetMap
): TreeItem[] {
  return Object.entries(obj).map(([key, val]) => {
    if (val !== null && typeof val === "object" && !Array.isArray(val)) {
      return {
        label: key,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: convertPsetsToTreeItems(val as any),
      };
    } else {
      return {
        label: key,
        value: String(val),
      };
    }
  });
}
