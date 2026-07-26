import { Sparkles } from "lucide-react";

export default function AIInsightCard() {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl p-8 text-white">

      <div className="flex items-center gap-3">

        <Sparkles />

        <h2 className="text-xl font-bold">
          AI Coach
        </h2>

      </div>

      <p className="mt-6 leading-8 opacity-90">
        Your reading habit is becoming consistent.
        Completing workouts before 9 AM could improve
        your weekly streak by approximately 20%.
      </p>

      <button className="mt-8 bg-white text-indigo-600 px-5 py-3 rounded-xl font-semibold">

        Generate Advice

      </button>

    </div>
  );
}