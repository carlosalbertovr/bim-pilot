import { ItemData } from "@thatopen/fragments";
import { TreeItem } from "../components/Viewer/components/AttributesTree";

export function convertAttributesToTreeItems(
  obj: ItemData
): TreeItem[] {
  return Object.entries(obj).map(([key, entry]) => {
    if (entry !== null && typeof entry === "object" && !Array.isArray(entry)) {
      const children: TreeItem[] = Object.entries(entry).map(
        ([childKey, childVal]) => {
          if (
            childVal !== null &&
            typeof childVal === "object" &&
            !Array.isArray(childVal)
          ) {
            return {
              label: childKey,
              value: convertAttributesToTreeItems(childVal as ItemData),
            };
          }

          return {
            label: childKey,
            value: String(childVal),
          };
        }
      );

      return {
        label: key,
        value: children,
      };
    }

    return {
      label: key,
      value: String(entry),
    };
  });
}
