"use client";

import { useState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { deleteMenuAction } from './actions'; // Impor action tadi

export default function DeleteButton({ id }: { id: number }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Yakin mau hapus menu ini, Bang?')) return;

    setIsDeleting(true);
    
    // Panggil action langsung seperti fungsi biasa
    const result = await deleteMenuAction(id);

    if (result.success) {
      // Tidak perlu router.refresh() karena revalidatePath sudah menanganinya
    } else {
      alert(result.error);
    }
    
    setIsDeleting(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all active:scale-90 shadow-sm disabled:cursor-not-allowed"
    >
      {isDeleting ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Trash2 size={18} />
      )}
    </button>
  );
}