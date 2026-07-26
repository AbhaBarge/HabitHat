import { CheckCircle2, Circle } from "lucide-react";

interface Props {
  title: string;
  completed: boolean;
}

export default function HabitCard({
  title,
  completed,
}: Props) {
  return (
    <div className="flex justify-between items-center border-b py-5">

      <span className="font-medium">
        {title}
      </span>

      {completed ? (
        <CheckCircle2 className="text-emerald-600" />
      ) : (
        <Circle />
      )}

    </div>
  );
}