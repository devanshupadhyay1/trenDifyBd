const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create categories
  const clothing = await prisma.category.create({ data: { name: "Clothing" } });
  const footwear = await prisma.category.create({ data: { name: "Footwear" } });
  const accessories = await prisma.category.create({ data: { name: "Accessories" } });

  // Create products with local image paths
  await prisma.product.createMany({
    data: [
      {
        name: "T-Shirt",
        price: 19.99,
        image: "/images/tshirt.jpg",
        categoryId: clothing.id,
      },
      {
        name: "Sneakers",
        price: 59.99,
        image: "/images/sneakers.jpg",
        categoryId: footwear.id,
      },
      {
        name: "Hat",
        price: 14.99,
        image: "/images/hat.jpg",
        categoryId: accessories.id,
      },
      {
        name: "Jacket",
        price: 89.99,
        image: "/images/jacket.jpg",
        categoryId: clothing.id,
      },
      {
        name: "Sandals",
        price: 29.99,
        image: "/images/sandals.jpg",
        categoryId: footwear.id,
      },
    ],
  });

  console.log("Seeded categories and products with local image paths!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());