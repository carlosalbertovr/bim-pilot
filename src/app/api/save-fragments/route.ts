import { writeFile } from "fs/promises";
import path from "path";

/**
 * Handles a POST request to save fragment files to the server.
 *
 * @param request - The incoming HTTP request object.
 * The request body should be a JSON object with the following structure:
 * ```json
 * {
 *   "fileName": "string", // The name of the file to be saved (without extension).
 *   "fragments": "string" // The base64-encoded string representing the fragment data.
 * }
 * ```
 * 
 * @returns A `Response` object with a status of 200 and a message indicating that the files were saved.
 */
export async function POST(request: Request) {
  const body = await request.json();

  const fragPath = path.join(
    process.cwd(),
    `public/models/fragments/${body.fileName}.frag`
  );
  // const jsonPath = path.join(
  //   process.cwd(),
  //   `public/models/fragments/${body.fileName}.json`
  // );

  await writeFile(fragPath, Buffer.from(body.fragments, "base64"));
  // await writeFile(jsonPath, JSON.stringify(body.properties, null, 2));

  return new Response("Files saved", { status: 200 });
}
