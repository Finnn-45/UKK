import prisma from "@/lib/prisma";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const menus = await prisma.menu.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <HomeClient menus={menus} />
  );
}