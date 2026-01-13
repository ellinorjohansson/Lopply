import { IRace } from "@/models/Race";

export async function getBucketlistRaces(): Promise<IRace[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/bucketlist`,
      {
        cache: "no-store",
        credentials: "include",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch bucketlist");
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching bucketlist:", error);
    return [];
  }
}

export async function addToBucketlist(raceId: string): Promise<boolean> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/bucketlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ raceId }),
        credentials: "include",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to add to bucketlist");
    }

    return true;
  } catch (error) {
    console.error("Error adding to bucketlist:", error);
    return false;
  }
}

export async function removeFromBucketlist(raceId: string): Promise<boolean> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/bucketlist`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ raceId }),
        credentials: "include",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to remove from bucketlist");
    }

    return true;
  } catch (error) {
    console.error("Error removing from bucketlist:", error);
    return false;
  }
}
