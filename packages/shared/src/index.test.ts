import { describe, expect, it } from "vitest";
import { readFile } from "node:fs/promises";

interface PackageManifest {
  name?: unknown;
  private?: unknown;
  type?: unknown;
}

describe("shared package bootstrap", () => {
  it("keeps the package configured as a private ESM workspace package", async () => {
    const manifest = JSON.parse(
      await readFile(new URL("../package.json", import.meta.url), "utf8"),
    ) as PackageManifest;

    expect(manifest).toMatchObject({
      name: "@inbox-forge/shared",
      private: true,
      type: "module",
    });
  });
});
