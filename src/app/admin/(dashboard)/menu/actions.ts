"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteMenuAction(id: number) {
  try {
    await prisma.menu.delete({
      where: { id }
    });
    
    // Ini sakti, Bang. Otomatis refresh data di halaman tanpa reload!
    revalidatePath("/admin/menu");
    return { success: true };
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false, error: "Gagal hapus data di database" };
  }
}