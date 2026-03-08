import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { logActivity } from "@/lib/activity-log";

// List all users with search/filter
export async function GET(req: Request) {
  const session: any = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const role = searchParams.get("role") || "";

  const where: any = {};
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { username: { contains: search, mode: "insensitive" } },
    ];
  }
  if (status) where.status = status;
  if (role) where.role = role;

  const users = await db.user.findMany({
    where,
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
      status: true,
      allowedSections: true,
      lastLoginAt: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(users);
}

// Create a new user
export async function POST(req: Request) {
  const session: any = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { name, username, password, role, allowedSections } = body;

  if (!name || !username || !password || !role) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (username.length < 3 || username.length > 50) {
    return NextResponse.json({ error: "Username must be 3-50 characters" }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
  }

  const existing = await db.user.findUnique({ where: { username } });
  if (existing) {
    return NextResponse.json({ error: "Username already exists" }, { status: 409 });
  }

  const hashed = await hash(password, 12);

  const ALL_SECTIONS = [
    "dashboard", "raw-materials", "production", "inventory",
    "sales", "expenses", "reports", "partners", "settings",
  ];

  const sections = role === "SUPERVISOR" && Array.isArray(allowedSections) && allowedSections.length > 0
    ? allowedSections
    : ALL_SECTIONS;

  const user = await db.user.create({
    data: {
      name,
      username,
      password: hashed,
      role,
      allowedSections: sections,
    },
    select: {
      id: true, name: true, username: true, role: true,
      status: true, allowedSections: true, createdAt: true,
    },
  });

  await logActivity({
    action: "USER_CREATED",
    details: `Created user "${username}" with role ${role}`,
    targetType: "User",
    targetId: user.id,
    userId: session.user.id,
  });

  return NextResponse.json(user);
}
