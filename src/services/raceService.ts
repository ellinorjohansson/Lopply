import { IRace } from "@/models/Race";

export async function getRaces(): Promise<IRace[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/races`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch races");
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching races:", error);
    return [];
  }
}
