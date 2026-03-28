import React from "react";

const stats = [
  { val: "40+", label: "Languages" },
  { val: "200+", label: "AI Scenarios" },
  { val: "12k+", label: "Active Learners" },
  { val: "94%", label: "Completion Rate" },
];

export default function StatsSection() {
  return (
    <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--surface)", padding: "48px 24px" }}>
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <div key={i}>
            <div className="font-display gradient-text" style={{ fontSize: 42, fontWeight: 700, lineHeight: 1 }}>{s.val}</div>
            <div style={{ fontSize: 13, color: "var(--dim)", marginTop: 8 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
