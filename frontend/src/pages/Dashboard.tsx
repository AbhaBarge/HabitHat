import { useEffect, useState } from "react";
import api from "../lib/api";
import {
  Flame,
  Target,
  Calendar,
  Sparkles,
  Plus,
  CheckCircle2,
  Circle,
  Trash2,
} from "lucide-react";
import { HabitService } from "../services/habit";
import ProgressRing from "../components/dashboard/ProgressRing";
import WeeklyChart from "../components/dashboard/WeeklyChart";
import StatCard from "../components/dashboard/StatCard";
import { motion } from "framer-motion";


interface Habit {
  id: string;
  title: string;
}

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user")!);

  const [title, setTitle] = useState("");
  const [habits, setHabits] = useState<Habit[]>([]);
  const [stats, setStats] = useState({
    totalHabits: 0,
    completedToday: 0,
    completionRate: 0,
    longestStreak: 0,
  });

  async function loadDashboard() {
    const [habitData, statsData] = await Promise.all([
      HabitService.getHabits(),
      HabitService.getStats(),
    ]);

    setHabits(habitData);
    setStats(statsData);
  }

  async function loadHabits() {
    const res = await api.get("/habits");

    setHabits(res.data);
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const completion = habits.length
    ? Math.round((habits.length / Math.max(habits.length, 5)) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-slate-100"
    >

      <header className="bg-white shadow-sm px-10 py-6 flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            HabitHat
          </h1>

          <p className="text-slate-500">
            Good Morning, {user.name} 👋
          </p>
        </div>

      </header>

      <div className="mx-8 mt-8 bg-white rounded-3xl shadow p-6">

          <h2 className="text-xl font-bold mb-4">
            Create Habit
          </h2>

          <div className="flex gap-3">

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-xl p-3 flex-1"
              placeholder="Workout, Reading..."
            />

            <button
              onClick={async () => {

                if (!title) return;

                await HabitService.createHabit(title);

                setTitle("");

                loadDashboard();

              }}
              className="bg-emerald-600 text-white px-6 rounded-xl"
            >
              Add Habit
            </button>

          </div>

        </div>

      <main className="w-full px-10 py-8">

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6">

          <StatCard
            icon={<Flame className="text-orange-500" />}
            title="Current Streak"
            value={`${stats.longestStreak} Days`}
          />

          <StatCard
            icon={<Target className="text-indigo-500" />}
            title="Completion"
            value={`${stats.completionRate}%`}
          />

          <StatCard
            icon={<Calendar className="text-green-500" />}
            title="Today's Habits"
            value={String(stats.totalHabits)}
          />

          </div>

          <div className="grid lg:grid-cols-3 gap-6 mt-8">

              <ProgressRing percentage={stats.completionRate} />

              <div className="lg:col-span-2">
                <WeeklyChart />
              </div>

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

            {habits.map((habit: any) => (

              <motion.div
                key={habit.id}
                layout
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="flex justify-between items-center py-4 border-b"
              >

                <span className="font-medium">
                  {habit.title}
                </span>

                <div className="flex gap-4 items-center">

                  <button
                    onClick={async () => {
                      await HabitService.completeHabit(habit.id);
                      loadDashboard();
                    }}
                  >
                    {habit.completed ? (
                      <CheckCircle2 className="text-emerald-600" />
                    ) : (
                      <Circle />
                    )}
                  </button>

                  <Trash2
                    size={18}
                    className="cursor-pointer text-red-500"
                    onClick={async () => {
                      await HabitService.deleteHabit(habit.id);
                      loadDashboard();
                    }}
                  />

                </div>

              </motion.div>

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

    </motion.div>
  );
}