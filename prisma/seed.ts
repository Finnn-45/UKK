import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient();

async function main() {
  await prisma.menu.createMany({
    data: [
      // 🌅 BREAKFAST
      {
        title: "Nasi Uduk Komplit",
        description: "Nasi uduk gurih dengan ayam goreng, telur, dan sambal khas.",
        price: 28000,
        image:
          "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=1200&auto=format&fit=crop",
        category: "Breakfast",
        rating: 4.8,
        color: "bg-[#FFD54F]",
      },
      {
        title: "Lontong Sayur Medan",
        description: "Lontong dengan kuah santan, labu, dan telur balado.",
        price: 25000,
        image:
          "https://images.unsplash.com/photo-1605478371310-a9f1b5d2c3c2",
        category: "Breakfast",
        rating: 4.7,
        color: "bg-[#FFB74D]",
      },

      // 🍛 LUNCH
      {
        title: "Nasi Padang Rendang",
        description: "Rendang sapi empuk dengan nasi hangat dan sambal hijau.",
        price: 45000,
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1200&auto=format&fit=crop",
        category: "Lunch",
        rating: 5.0,
        color: "bg-[#81C784]",
      },
      {
        title: "Ayam Geprek Mozzarella",
        description: "Ayam crispy pedas dengan lelehan keju mozzarella.",
        price: 32000,
        image:
          "https://images.unsplash.com/photo-1606755962773-d324e0a13086",
        category: "Lunch",
        rating: 4.9,
        color: "bg-[#E57373]",
      },
      {
        title: "Sate Ayam Madura",
        description: "Sate ayam dengan bumbu kacang khas Madura dan lontong.",
        price: 30000,
        image:
          "https://images.unsplash.com/photo-1529563021893-cc83c992d75d",
        category: "Lunch",
        rating: 4.8,
        color: "bg-[#A1887F]",
      },

      // 🍲 DINNER
      {
        title: "Sop Buntut Premium",
        description: "Sop buntut hangat dengan kuah kaldu kaya rempah.",
        price: 65000,
        image:
          "https://images.unsplash.com/photo-1625944525533-473f3b1f0d1a",
        category: "Dinner",
        rating: 4.9,
        color: "bg-[#90CAF9]",
      },
      {
        title: "Ikan Bakar Jimbaran",
        description: "Ikan bakar dengan sambal matah khas Bali.",
        price: 55000,
        image:
          "https://images.unsplash.com/photo-1617196034796-73dfa7b1b1a5",
        category: "Dinner",
        rating: 4.8,
        color: "bg-[#4DB6AC]",
      },

      // 🍰 DESSERT & SNACK
      {
        title: "Es Cendol Gula Aren",
        description: "Minuman segar tradisional dengan santan dan gula aren.",
        price: 15000,
        image:
          "https://images.unsplash.com/photo-1626074353765-517a681e40be",
        category: "Dessert",
        rating: 4.7,
        color: "bg-[#AED581]",
      },
      {
        title: "Pisang Goreng Coklat",
        description: "Pisang goreng crispy dengan lelehan coklat dan keju.",
        price: 18000,
        image:
          "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
        category: "Snack",
        rating: 4.6,
        color: "bg-[#FFCC80]",
      },

      // 🥗 HEALTHY / CATERING STYLE
      {
        title: "Healthy Bento Chicken",
        description: "Paket catering sehat: ayam grill, sayur, dan nasi merah.",
        price: 40000,
        image:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
        category: "Healthy",
        rating: 4.9,
        color: "bg-[#AED581]",
      },
      {
        title: "Paket Catering Hemat",
        description: "Nasi, ayam, sayur, dan sambal untuk makan harian.",
        price: 25000,
        image:
          "https://images.unsplash.com/photo-1604908554163-45f3c2b1a0c7",
        category: "Catering",
        rating: 4.7,
        color: "bg-[#BCAAA4]",
      },
    ],
  });
  
// 👤 SEED ADMIN USER (tambahan baru)
  const hashed = await bcrypt.hash('admin123', 10)

  await prisma.user.upsert({
    where: { email: "admin@catering.com" },
    update: { password: hashed }, // Pastikan password di-update ke versi hashed
    create: {
      name: "Admin Catering",
      email: "admin@catering.com",
      password: hashed,
    },
  });

  console.log("✅ Admin user created: admin@catering.com / admin123 (hashed)");
}

main()
  .then(() => {
    console.log("🌱 Seed berhasil! Catering Indonesia ready!");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });