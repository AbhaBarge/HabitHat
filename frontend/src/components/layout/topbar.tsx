import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="bg-white border-b h-20 flex items-center justify-between px-10">

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-4 text-slate-400"
        />

        <input
          placeholder="Search habits..."
          className="pl-11 pr-4 py-3 rounded-xl bg-slate-100 w-96 outline-none"
        />

      </div>

      <div className="flex items-center gap-6">

        <Bell />

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">

            A

          </div>

          <div>

            <p className="font-semibold">
              Abha
            </p>

            <p className="text-sm text-slate-500">
              Software Engineer
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}