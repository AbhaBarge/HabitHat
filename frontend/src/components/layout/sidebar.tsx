import {
  LayoutDashboard,
  BarChart3,
  Target,
  Sparkles,
  Settings,
} from "lucide-react";

const items = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
  },
  {
    icon: Target,
    title: "Habits",
  },
  {
    icon: BarChart3,
    title: "Analytics",
  },
  {
    icon: Sparkles,
    title: "AI Coach",
  },
  {
    icon: Settings,
    title: "Settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-950 text-white flex flex-col">

      <div className="p-8 border-b border-slate-800">

        <h1 className="text-3xl font-bold">
          HabitHat
        </h1>

        <p className="text-slate-400 mt-2">
          Build yourself daily.
        </p>

      </div>

      <nav className="flex-1 mt-8 px-4">

        {items.map((item) => {

          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-slate-800 transition mb-2"
            >

              <Icon size={22} />

              <span>{item.title}</span>

            </button>
          );
        })}

      </nav>

    </aside>
  );
}