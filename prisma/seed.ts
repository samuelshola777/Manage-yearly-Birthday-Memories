import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  try {
    // Check if test user exists
    const existingUser = await prisma.appUser.findUnique({
      where: {
        email: "test@gmail.com",
      },
    });

    if (!existingUser) {
      // Create test user if it doesn't exist
      const hashedPassword = await hash("password", 12);
      
      const newUser = await prisma.appUser.upsert({
        where: {
          email: "test@gmail.com",
        },
        update: {
          email: "test@gmail.com",
          firstName: "Alex",
          lastName: "Parker",
          password: hashedPassword,
       
        },
        create: {
          email: "test@gmail.com",
          firstName: "Alex",
          lastName: "Parker",
          password: hashedPassword,
        },
      });
      
      console.log("✅ Seeded test user successfully:", newUser.email);
    } else {
      console.log("ℹ️ Test user already exists");
    }
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 