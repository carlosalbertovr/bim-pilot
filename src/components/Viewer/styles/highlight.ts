import * as THREE from "three";
import * as FRAGS from "@thatopen/fragments";

const HIGHLIGHTER_COLOR = "#bcf124";

export const highlightMaterial: FRAGS.MaterialDefinition = {
  color: new THREE.Color(HIGHLIGHTER_COLOR),
  renderedFaces: FRAGS.RenderedFaces.TWO,
  opacity: 1,
  transparent: false,
};
