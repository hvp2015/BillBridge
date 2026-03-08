import { db } from "@/lib/db";

export async function logActivity({
  action,
  details,
  targetType,
  targetId,
  userId,
  ipAddress,
}: {
  action: string;
  details?: string;
  targetType?: string;
  targetId?: string;
  userId: string;
  ipAddress?: string;
}) {
  try {
    await db.activityLog.create({
      data: {
        action,
        details,
        targetType,
        targetId,
        userId,
        ipAddress,
      },
    });
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
}
