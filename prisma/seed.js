import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { username: "admin" },
  });

  if (existingAdmin) {
    console.log("✅ Admin user already exists, skipping seed.");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 12);

  await prisma.user.create({
    data: {
      username: "admin",
      name: "Admin",
      password: hashedPassword,
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  console.log("✅ Admin user created (username: admin / password: admin123)");

  // Create supervisor test user
  const existingSupervisor = await prisma.user.findUnique({
    where: { username: "supervisor" },
  });

  if (!existingSupervisor) {
    const supervisorPassword = await bcrypt.hash("super123", 12);
    await prisma.user.create({
      data: {
        username: "supervisor",
        name: "Supervisor",
        password: supervisorPassword,
        role: "SUPERVISOR",
        status: "ACTIVE",
        allowedSections: ["dashboard", "sales", "production", "inventory", "expenses"],
      },
    });
    console.log("✅ Supervisor user created (username: supervisor / password: super123)");
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
