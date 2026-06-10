"use client";

interface Props {
  scores: number[];
}

export default function MiniRadar({ scores }: Props) {
  const size = 180;
  const center = size / 2;
  const radius = 64;
  const labels = ["M", "C", "V", "R", "O", "F"];

  const axisPoint = (idx: number, r: number) => {
    const angle = (Math.PI * 2 * idx) / 6 - Math.PI / 2;
    return { x: center + Math.cos(angle) * r, y: center + Math.sin(angle) * r };
  };

  const polyPoints = scores
    .map((s, i) => axisPoint(i, (s / 100) * radius))
    .map((p) => `${p.x},${p.y}`)
    .join(" ");

  const guides = [0.33, 0.66, 1.0];

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[200px] mx-auto">
      {guides.map((g, i) => {
        const pts = Array.from({ length: 6 }, (_, j) => axisPoint(j, radius * g));
        return (
          <polygon key={i} points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none" stroke="#EEEAF2" strokeWidth="1" />
        );
      })}
      {Array.from({ length: 6 }).map((_, idx) => {
        const p = axisPoint(idx, radius);
        return <line key={idx} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#EEEAF2" strokeWidth="1" />;
      })}
      <polygon points={polyPoints} fill="#6B1158" fillOpacity="0.2" stroke="#6B1158" strokeWidth="1.5"
        style={{ transition: "all 60ms linear" }} />
      {scores.map((s, i) => {
        const p = axisPoint(i, (s / 100) * radius);
        return <circle key={i} cx={p.x} cy={p.y} r="3" fill="#C9207A" />;
      })}
      {labels.map((l, idx) => {
        const p = axisPoint(idx, radius + 14);
        return (
          <text key={l} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
            className="text-[10px] font-black fill-ink-400">{l}</text>
        );
      })}
    </svg>
  );
}
