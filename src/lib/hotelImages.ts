// Maps `seed:<basename>` image_url values to their bundled asset URLs.
// Pre-existing hotels use seeded keys; admin-uploaded hotels store full https URLs.

const seedAssets = import.meta.glob("/src/assets/*.{jpg,jpeg,png,webp,svg}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

// Build basename (no extension) -> url
const seedMap: Record<string, string> = {};
for (const [path, url] of Object.entries(seedAssets)) {
  const file = path.split("/").pop() ?? "";
  const key = file.replace(/\.(jpg|jpeg|png|webp|svg)$/i, "");
  seedMap[key] = url;
}

const placeholder = "/placeholder.svg";

export function resolveHotelImage(imageUrl: string | null | undefined): string {
  if (!imageUrl) return placeholder;
  if (imageUrl.startsWith("seed:")) {
    const key = imageUrl.slice(5);
    return seedMap[key] ?? placeholder;
  }
  return imageUrl;
}
