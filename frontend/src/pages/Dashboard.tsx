import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Flame,
  Target,
  Calendar,
  Sparkles,
  Plus,
  CheckCircle2,
  Circle,
} from "lucide-react";

interface Habit {
  id: string;
  title: string;
}

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user")!);

  const [title, setTitle] = useState("");
  const [habits, setHabits] = useState<Habit[]>([]);

  async function loadHabits() {
    const res = await api.get("/habits", {
      params: {
        userId: user.id,
      },
    });

    setHabits(res.data);
  }

  useEffect(() => {
    loadHabits();
  }, []);

  async function createHabit() {
    if (!title.trim()) return;

    await api.post("/habits", {
      title,
      userId: user.id,
    });

    setTitle("");

    loadHabits();
  }

  const completion = habits.length
    ? Math.round((habits.length / Math.max(habits.length, 5)) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-slate-100">

      <header className="bg-white shadow-sm px-10 py-6 flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            HabitHat
          </h1>

          <p className="text-slate-500">
            Good Morning, {user.name} 👋
          </p>
        </div>

        <div className="flex gap-3">

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New Habit"
            className="border rounded-xl px-4 py-3 w-72"
          />

          <button
            onClick={createHabit}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-5 flex items-center gap-2"
          >
            <Plus size={18} />
            Add Habit
          </button>

        </div>

      </header>

      <main className="max-w-7xl mx-auto p-10">

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6">

          <StatCard
            icon={<Flame className="text-orange-500" />}
            title="Current Streak"
            value="8 Days"
          />

          <StatCard
            icon={<Target className="text-indigo-500" />}
            title="Completion"
            value={`${completion}%`}
          />

          <StatCard
            icon={<Calendar className="text-green-500" />}
            title="Today's Habits"
            value={String(habits.length)}
          />

        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-8">

          {/* Habit List */}

          <div className="lg:col-span-2 bg-white rounded-3xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6">
              Today's Habits
            </h2>

            {habits.length === 0 && (
              <p className="text-slate-500">
                No habits yet. Add your first habit!
              </p>
            )}

            {habits.map((habit) => (

              <div
                key={habit.id}
                className="flex justify-between items-center py-4 border-b last:border-none"
              >

                <span className="text-lg">
                  {habit.title}
                </span>

                <Circle className="text-slate-400" />

              </div>

            ))}

          </div>

          {/* AI Coach */}

          <div className="bg-white rounded-3xl shadow p-8">

            <div className="flex items-center gap-3">

              <Sparkles className="text-indigo-500" />

              <h2 className="text-xl font-bold">
                AI Coach
              </h2>

            </div>

            <p className="mt-6 text-slate-600 leading-7">

              {habits.length === 0
                ? "Start by creating your first habit today."
                : `Great start! You currently have ${habits.length} habits. Consistency beats intensity.`}

            </p>

            <button
              className="mt-8 w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-3"
            >
              Generate Advice
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-3xl shadow p-8">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        {icon}

      </div>

    </div>
  );
}