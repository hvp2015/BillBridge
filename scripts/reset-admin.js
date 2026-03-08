const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin", 10);

  // First, try to delete any existing admin user to clear potential corruption
  try {
    await prisma.user.deleteMany({
      where: { username: "admin" }
    });
    console.log("Cleanup: Existing admin user(s) removed.");
  } catch (err) {
    console.log("Cleanup: No admin user to remove or error occurred.");
  }

  const user = await prisma.user.create({
    data: {
      username: "admin",
      name: "Administrator",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin user created fresh (username: admin / password: admin)");
  console.log("User ID:", user.id);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
