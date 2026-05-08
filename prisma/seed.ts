import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.menu.createMany({
    data: [
      {
        title: "Sunrise Bowl",
        description: "Açai, granola organik, buah segar.",
        price: 35000,
        image:
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        category: "Breakfast",
        rating: 4.9,
        color: "bg-[#FFD54F]",
      },
      {
        title: "Earthly Rice",
        description: "Nasi merah premium dan ayam panggang.",
        price: 45000,
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
        category: "Lunch",
        rating: 4.8,
        color: "bg-[#81C784]",
      },
      {
        title: "Matcha Treat",
        description: "Dessert matcha creamy premium.",
        price: 25000,
        image:
          "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
        category: "Dessert",
        rating: 5.0,
        color: "bg-[#A1887F]",
      },
    ],
  });
}

main()
  .then(() => {
    console.log("Seed berhasil 🌱");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });