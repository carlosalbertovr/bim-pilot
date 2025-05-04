/* eslint-disable @typescript-eslint/no-unused-vars */
import * as FRAGS from "@thatopen/fragments";

export type ItemPset = {
  [key: string]: string | number | boolean | null;
};
export type ItemPsetMap = {
  [key: string]: ItemPset;
};

export function formatItemPsets(rawPsets: FRAGS.ItemData[]) {
  const result: ItemPsetMap = {};
  for (const [_, pset] of rawPsets.entries()) {
    const { Name: psetName, HasProperties } = pset;

    if (!("value" in psetName && Array.isArray(HasProperties))) continue;

    const props: ItemPset = {};

    for (const [_, prop] of HasProperties.entries()) {
      const { Name, NominalValue } = prop;
      if (!("value" in Name && "value" in NominalValue)) continue;
      const name = Name.value;
      const nominalValue = NominalValue.value;
      if (!(name && nominalValue !== undefined)) continue;
      props[name] = nominalValue;
    }
    result[psetName.value] = props;
  }
  return result;
}
