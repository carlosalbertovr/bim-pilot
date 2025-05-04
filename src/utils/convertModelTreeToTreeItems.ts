import { TreeItem } from "../components/Viewer/components/AttributesTree";

type SpatialTreeItem = {
  category: string | null;
  localId: number | null;
  children?: SpatialTreeItem[];
};

export function convertModelTreeToTreeItems(tree: SpatialTreeItem): TreeItem[] {
  function convert(node: SpatialTreeItem): TreeItem {
    const labelParts = [];
    if (node.category) labelParts.push(node.category);
    if (node.localId !== null && node.localId !== undefined)
      labelParts.push(String(node.localId));
    const label = labelParts.join(" - ") || "Unnamed Node";

    const children = node.children?.length ? node.children.map(convert) : [];

    return {
      label,
      value: children.length > 0 ? children : "",
    };
  }

  return [convert(tree)];
}
