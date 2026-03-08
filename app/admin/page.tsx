"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  UserCheck,
  UserX,
  UserPlus,
  FileText,
  TrendingUp,
  DollarSign,
  Handshake,
  Package,
  Activity,
  Loader2,
} from "lucide-react";

interface Stats {
  users: {
    total: number;
    active: number;
    suspended: number;
    blocked: number;
    newThisMonth: number;
    newLastMonth: number;
    recentLogins: number;
  };
  business: {
    totalInvoices: number;
    totalSales: number;
    totalExpenses: number;
    totalPartners: number;
    totalProducts: number;
  };
  recentActivity: Array<{
    id: string;
    action: string;
    details: string | null;
    createdAt: string;
    performedBy: { name: string; username: string };
  }>;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getActionColor(action: string) {
  if (action.includes("CREATED")) return "bg-green-500/10 text-green-600 dark:text-green-400";
  if (action.includes("DELETED")) return "bg-red-500/10 text-red-600 dark:text-red-400";
  if (action.includes("SUSPENDED") || action.includes("BLOCKED") || action.includes("BLACKLISTED"))
    return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
  return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-muted-foreground">
        Failed to load stats
      </div>
    );
  }

  const userGrowth =
    stats.users.newLastMonth > 0
      ? ((stats.users.newThisMonth - stats.users.newLastMonth) / stats.users.newLastMonth) * 100
      : stats.users.newThisMonth > 0
      ? 100
      : 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Platform overview and system statistics
        </p>
      </div>

      {/* User Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.users.recentLogins} active in last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.users.active}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.users.total > 0
                ? Math.round((stats.users.active / stats.users.total) * 100)
                : 0}
              % of total users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New This Month</CardTitle>
            <UserPlus className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users.newThisMonth}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {userGrowth > 0 ? "+" : ""}
              {userGrowth.toFixed(0)}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Restricted</CardTitle>
            <UserX className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {stats.users.suspended + stats.users.blocked}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.users.suspended} suspended, {stats.users.blocked} blocked
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Business Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.business.totalInvoices}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.business.totalSales)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.business.totalExpenses)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Partners</CardTitle>
            <Handshake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.business.totalPartners}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.business.totalProducts}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest administrative actions</CardDescription>
        </CardHeader>
        <CardContent>
          {stats.recentActivity.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4 text-center">
              No activity recorded yet
            </p>
          ) : (
            <div className="space-y-3">
              {stats.recentActivity.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-card"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        variant="secondary"
                        className={getActionColor(log.action)}
                      >
                        {log.action.replace(/_/g, " ")}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        by {log.performedBy.name}
                      </span>
                    </div>
                    {log.details && (
                      <p className="text-sm text-muted-foreground mt-1 truncate">
                        {log.details}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDate(log.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
