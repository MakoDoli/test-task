import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  // Create a test user
  const hashedPassword = await bcrypt.hash("password123", 10);

  const user = await prisma.testUser.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      username: "First-User",
      password: hashedPassword,
    },
  });

  console.log("Created test user:", user);

  // Create some test products
  const products = [
    {
      name: "Grounded coffee",
      description: "If you are lazy to grind",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1606791405792-1004f1718d0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Coffee whole beans",
      description: "For freshly grinded coffee aroma lovers",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1625021659159-f63f546d74a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Instant coffee",
      description: "This is not even coffee",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1648127688906-d230b7b31658?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("Created test products");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
