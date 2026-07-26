import type { ReactNode } from "react";

interface Props {
  title: string;
  value: string;
  icon: ReactNode;
}

export default function StatCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div className="text-emerald-600">
          {icon}
        </div>

      </div>

    </div>
  );
}