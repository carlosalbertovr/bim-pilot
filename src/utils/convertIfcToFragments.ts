import * as FRAGS from "@thatopen/fragments";

type ConvertIfcProps = {
  ifcPath: string;
};

export async function convertIfcToFragments(props: ConvertIfcProps) {
  const { ifcPath } = props;

  const serializer = new FRAGS.IfcImporter();
  serializer.wasm = {
    absolute: true,
    path: "https://unpkg.com/web-ifc@0.0.68/",
  };

  console.log("Fetching model from:", ifcPath);

  const file = await fetch(ifcPath);

  if (!file.ok) {
    throw new Error(`Failed to fetch model: ${file.statusText}`);
  }

  const contentDisposition = file.headers.get("content-disposition");

  const fileName = contentDisposition
    ? contentDisposition.match(/filename="(.+)"/)?.[1]
    : ifcPath.split("/").pop() || "unknown";

  if (!fileName) {
    throw new Error("Failed to extract file name from URL");
  }

  const data = await file.arrayBuffer();
  const buffer = new Uint8Array(data);

  const fragmentBytes = await serializer.process({ bytes: buffer });

  const fragBase64 = Buffer.from(fragmentBytes).toString("base64");

  const response = await fetch("/api/save-fragments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileName: fileName.replace(".ifc", ""),
      fragments: fragBase64,
    }),
  });

  console.log("Response:", response);

  if (!response.ok) {
    throw new Error(`Failed to save files: ${response.statusText}`);
  }

  console.log("Files saved successfully");
}
