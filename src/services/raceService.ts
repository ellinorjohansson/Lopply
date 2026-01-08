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

export async function getPendingRaces(): Promise<IRace[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/races?status=pending`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch pending races");
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching pending races:", error);
    return [];
  }
}

export async function updateRaceStatus(id: string, status: 'pending' | 'approved' | 'rejected'): Promise<boolean> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/races`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      },
    );

    if (!res.ok) {
      throw new Error("Failed to update race status");
    }

    const data = await res.json();
    return data.success;
  } catch (error) {
    console.error("Error updating race status:", error);
    return false;
  }
}
