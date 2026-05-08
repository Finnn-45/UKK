type Props = {
  value: string;
  onChange: (value: string) => void;
};

import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Cari menu..."
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full md:w-72 bg-white border border-gray-100 rounded-full px-6 py-4 pl-14 text-sm outline-none"
      />

      <Search
        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />
    </div>
  );
}