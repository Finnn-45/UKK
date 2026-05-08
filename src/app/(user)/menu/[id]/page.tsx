// src/app/(user)/menu/[id]/page.tsx

import prisma from "@/lib/prisma";

import { notFound } from "next/navigation";

import DetailClient from "./DetailClient";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const menu = await prisma.menu.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!menu) {
    return notFound();
  }

  return <DetailClient menu={menu} />;
}