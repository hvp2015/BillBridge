import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 12);

  // Try to update existing admin user, or create if not exists
  const existing = await prisma.user.findUnique({
    where: { username: "admin" },
  });

  if (existing) {
    await prisma.user.update({
      where: { username: "admin" },
      data: {
        password: hashedPassword,
        status: "ACTIVE",
      },
    });
    console.log("✅ Admin password reset to 'admin123' and status set to ACTIVE");
  } else {
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
  }

  // Ensure all existing users have ACTIVE status
  await prisma.user.updateMany({
    where: { status: undefined },
    data: { status: "ACTIVE" },
  });
  console.log("✅ All existing users updated with ACTIVE status");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
