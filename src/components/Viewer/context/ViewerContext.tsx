"use client";

import React, { useCallback } from "react";
import { TreeItem } from "../components/AttributesTree";
import { ItemData, SpatialTreeItem } from "@thatopen/fragments";
import { ItemPsetMap } from "../../../utils/formatItemPsets";
import { convertAttributesToTreeItems } from "../../../utils/convertAttributesToTreeItems";
import { convertPsetsToTreeItems } from "../../../utils/convertPsetsToTreeItems";
import { convertModelTreeToTreeItems } from "../../../utils/convertModelTreeToTreeItems";

type ItemPropertySet = {
  selectedAttributes: TreeItem[] | null;
  selectedPsets: TreeItem[] | null;
};

export interface IViewerContext {
  selectedLocalId: number | null;
  selectionOrigin: "tree" | "model" | null;
  itemProperties: ItemPropertySet;
  modelTree: TreeItem[] | null;
  updateSelectedLocalId: (id: number | null) => void;
  updateSelectionOrigin: (origin: "tree" | "model" | null) => void;
  updateSelectedAttributes: (attributes: ItemData | null) => void;
  updateSelectedPsets: (psets: ItemPsetMap | null) => void;
  updateModelTree: (modelTree: SpatialTreeItem | null) => void;
}

export const ViewerContext = React.createContext<IViewerContext>({
  selectedLocalId: null,
  selectionOrigin: null,
  itemProperties: {
    selectedAttributes: null,
    selectedPsets: null,
  },
  modelTree: null,
  updateSelectedLocalId: () => {},
  updateSelectionOrigin: () => {},
  updateSelectedAttributes: () => {},
  updateSelectedPsets: () => {},
  updateModelTree: () => {},
});

type ViewerContextProviderProps = {
  children: React.ReactNode;
};

export function ViewerContextProvider({
  children,
}: ViewerContextProviderProps) {
  const [selectedLocalId, setSelectedLocalId] = React.useState<number | null>(
    null
  );

  const [selectionOrigin, setSelectionOrigin] = React.useState<
    "tree" | "model" | null
  >(null);

  const [itemProperties, setItemProperties] = React.useState<ItemPropertySet>({
    selectedAttributes: null,
    selectedPsets: null,
  });
  const [modelTree, setModelTree] = React.useState<TreeItem[] | null>(null);

  const updateSelectedLocalId = useCallback((id: number | null) => {
    setSelectedLocalId(id);
  }, []);

  const updateSelectionOrigin = useCallback((origin: "tree" | "model" | null) => {
    setSelectionOrigin(origin);
  }, []);

  const updateSelectedAttributes = useCallback(
    (attributes: ItemData | null) => {
      if (!attributes)
        return setItemProperties((prev) => ({
          ...prev,
          selectedAttributes: null,
        }));

      const formattedAttributes = attributes
        ? convertAttributesToTreeItems(attributes)
        : [];

      setItemProperties((prev) => ({
        ...prev,
        selectedAttributes: formattedAttributes,
      }));
    },
    []
  );

  const updateSelectedPsets = useCallback((psets: ItemPsetMap | null) => {
    if (!psets)
      return setItemProperties((prev) => ({
        ...prev,
        selectedPsets: null,
      }));

    const formattedPsets = psets ? convertPsetsToTreeItems(psets) : [];

    setItemProperties((prev) => ({
      ...prev,
      selectedPsets: formattedPsets,
    }));
  }, []);

  const updateModelTree = useCallback((modelTree: SpatialTreeItem | null) => {
    if (!modelTree) return setModelTree(null);

    const formattedModelTree = modelTree
      ? convertModelTreeToTreeItems(modelTree)
      : [];

    setModelTree(formattedModelTree);
  }, []);

  return (
    <ViewerContext.Provider
      value={{
        selectedLocalId,
        selectionOrigin,
        itemProperties,
        modelTree,
        updateSelectedLocalId,
        updateSelectionOrigin,
        updateSelectedAttributes,
        updateSelectedPsets,
        updateModelTree,
      }}
    >
      {children}
    </ViewerContext.Provider>
  );
}
