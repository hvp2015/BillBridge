import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { logActivity } from "@/lib/activity-log";

// Get single user
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session: any = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;

  const user = await db.user.findUnique({
    where: { id },
    select: {
      id: true, name: true, username: true, role: true,
      status: true, allowedSections: true, lastLoginAt: true,
      createdAt: true, updatedAt: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// Update user
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session: any = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { name, username, password, role, allowedSections, status } = body;

  const existingUser = await db.user.findUnique({ where: { id } });
  if (!existingUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Prevent admin from deactivating themselves
  if (id === session.user.id && status && status !== "ACTIVE") {
    return NextResponse.json({ error: "Cannot change your own status" }, { status: 400 });
  }

  // Check username uniqueness if changed
  if (username && username !== existingUser.username) {
    const existing = await db.user.findUnique({ where: { username } });
    if (existing) {
      return NextResponse.json({ error: "Username already exists" }, { status: 409 });
    }
  }

  const data: any = {};
  if (name) data.name = name;
  if (username) data.username = username;
  if (role) data.role = role;
  if (status) data.status = status;
  if (allowedSections !== undefined) data.allowedSections = allowedSections;
  if (password && password.length >= 6) {
    data.password = await hash(password, 12);
  }

  const user = await db.user.update({
    where: { id },
    data,
    select: {
      id: true, name: true, username: true, role: true,
      status: true, allowedSections: true, lastLoginAt: true,
      createdAt: true, updatedAt: true,
    },
  });

  const changes: string[] = [];
  if (name && name !== existingUser.name) changes.push(`name: "${existingUser.name}" → "${name}"`);
  if (status && status !== existingUser.status) changes.push(`status: ${existingUser.status} → ${status}`);
  if (role && role !== existingUser.role) changes.push(`role: ${existingUser.role} → ${role}`);
  if (password) changes.push("password changed");

  await logActivity({
    action: status && status !== existingUser.status
      ? `USER_${status.toUpperCase()}`
      : "USER_UPDATED",
    details: `Updated user "${existingUser.username}": ${changes.join(", ") || "no visible changes"}`,
    targetType: "User",
    targetId: id,
    userId: session.user.id,
  });

  return NextResponse.json(user);
}

// Delete user
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session: any = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;

  // Prevent self-deletion
  if (id === session.user.id) {
    return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 });
  }

  const user = await db.user.findUnique({ where: { id } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Delete activity logs for that user first
  await db.activityLog.deleteMany({ where: { userId: id } });
  await db.user.delete({ where: { id } });

  await logActivity({
    action: "USER_DELETED",
    details: `Deleted user "${user.username}" (${user.name})`,
    targetType: "User",
    targetId: id,
    userId: session.user.id,
  });

  return NextResponse.json({ success: true });
}
