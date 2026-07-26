interface Props {
  percentage: number;
}

export default function ProgressRing({ percentage }: Props) {
  const radius = 70;
  const stroke = 12;

  const normalizedRadius = radius - stroke * 2;

  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference -
    (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-3xl shadow p-8 flex justify-center">

      <svg
        height={radius * 2}
        width={radius * 2}
      >
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        <circle
          stroke="#10b981"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />

        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-slate-800 text-xl font-bold"
        >
          {percentage}%
        </text>
      </svg>

    </div>
  );
}