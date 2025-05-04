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
  itemProperties: ItemPropertySet;
  modelTree: TreeItem[] | null;
  updateSelectedAttributes: (attributes: ItemData | null) => void;
  updateSelectedPsets: (psets: ItemPsetMap | null) => void;
  updateModelTree: (modelTree: SpatialTreeItem | null) => void;
}

export const ViewerContext = React.createContext<IViewerContext>({
  itemProperties: {
    selectedAttributes: null,
    selectedPsets: null,
  },
  modelTree: null,
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
  const [itemProperties, setItemProperties] = React.useState<ItemPropertySet>({
    selectedAttributes: null,
    selectedPsets: null,
  });
  const [modelTree, setModelTree] = React.useState<TreeItem[] | null>(null);

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
        itemProperties,
        modelTree,
        updateSelectedAttributes,
        updateSelectedPsets,
        updateModelTree,
      }}
    >
      {children}
    </ViewerContext.Provider>
  );
}
