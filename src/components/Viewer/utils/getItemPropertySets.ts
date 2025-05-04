import { FragmentsModel, ItemData } from "@thatopen/fragments";

export async function getItemPropertySets(
  model: FragmentsModel,
  selectedLocalIdRef: React.RefObject<number | null>
) {
  if (!selectedLocalIdRef.current) return null;
  const [data] = await model.getItemsData([selectedLocalIdRef.current], {
    attributesDefault: false,
    attributes: ["Name", "NominalValue"],
    relations: {
      IsDefinedBy: { attributes: true, relations: true },
      DefinesOcurrence: { attributes: false, relations: false },
    },
  });
  return (data.IsDefinedBy as ItemData[]) ?? [];
}
