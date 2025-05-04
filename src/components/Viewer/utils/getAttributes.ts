import { FragmentsModel } from "@thatopen/fragments";

export async function getAttributes(
  model: FragmentsModel,
  selectedLocalIdRef: React.RefObject<number | null>,
  attributes?: string[]
) {
  if (!selectedLocalIdRef.current) return null;
  // This model method is the most straightforward way to get information
  // about one or multiple elements.
  // You can see the options in the API reference.
  const [data] = await model.getItemsData([selectedLocalIdRef.current], {
    attributesDefault: !attributes,
    attributes,
  });
  return data;
}
