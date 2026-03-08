import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session: any = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    totalUsers,
    activeUsers,
    suspendedUsers,
    blockedUsers,
    newUsersThisMonth,
    newUsersLastMonth,
    recentLogins,
    totalInvoices,
    totalSalesAmount,
    totalExpensesAmount,
    totalPartners,
    totalProducts,
    recentActivity,
  ] = await Promise.all([
    db.user.count(),
    db.user.count({ where: { status: "ACTIVE" } }),
    db.user.count({ where: { status: "SUSPENDED" } }),
    db.user.count({ where: { status: { in: ["BLOCKED", "BLACKLISTED"] } } }),
    db.user.count({ where: { createdAt: { gte: startOfMonth } } }),
    db.user.count({ where: { createdAt: { gte: startOfLastMonth, lt: startOfMonth } } }),
    db.user.count({ where: { lastLoginAt: { gte: thirtyDaysAgo } } }),
    db.invoice.count(),
    db.invoice.aggregate({ _sum: { totalAmount: true } }),
    db.expense.aggregate({ _sum: { amount: true } }),
    db.partner.count(),
    db.productType.count(),
    db.activityLog.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { performedBy: { select: { name: true, username: true } } },
    }),
  ]);

  return NextResponse.json({
    users: {
      total: totalUsers,
      active: activeUsers,
      suspended: suspendedUsers,
      blocked: blockedUsers,
      newThisMonth: newUsersThisMonth,
      newLastMonth: newUsersLastMonth,
      recentLogins,
    },
    business: {
      totalInvoices,
      totalSales: totalSalesAmount._sum.totalAmount || 0,
      totalExpenses: totalExpensesAmount._sum.amount || 0,
      totalPartners,
      totalProducts,
    },
    recentActivity,
  });
}
