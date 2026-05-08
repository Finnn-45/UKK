import prisma from "@/lib/prisma";

import MenuClient from "./MenuClient";

export default async function MenuPage() {
  const menus = await prisma.menu.findMany();

  return (
    <MenuClient menus={menus} />
  );
}