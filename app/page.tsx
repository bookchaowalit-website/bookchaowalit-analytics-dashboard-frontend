"use client";

import { useMemo, useState } from "react";

type WindowKey = "24h" | "7d" | "30d";

type Reading = {
  label: string;
  values: number[];
  ticks: string[];
  visitors: string;
  sessions: string;
  conversion: string;
  change: string;
  note: string;
};

const readings: Record<WindowKey, Reading> = {
  "24h": {
    label: "Last 24 hours",
    values: [4, 6, 5, 8, 7, 9, 6, 10, 8, 7, 9, 11],
    ticks: ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"],
    visitors: "420",
    sessions: "610",
    conversion: "2.8%",
    change: "+14%",
    note: "The evening lift is the clearest movement in this window. Check what was published around 18:00 before treating it as a trend.",
  },
  "7d": {
    label: "Last 7 days",
    values: [120, 140, 110, 160, 180, 150, 200],
    ticks: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    visitors: "3.1k",
    sessions: "4.8k",
    conversion: "3.4%",
    change: "+22%",
    note: "The week closes above its opening level, but Wednesday is a real dip. Keep that interruption visible when comparing the next period.",
  },
  "30d": {
    label: "Last 30 days",
    values: [800, 920, 880, 1100, 1050, 1200, 1150, 1300],
    ticks: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
    visitors: "12.4k",
    sessions: "19k",
    conversion: "3.1%",
    change: "+31%",
    note: "The longer view is climbing in steps rather than smoothly. That shape is useful evidence, not noise to hide behind an average.",
  },
};

const windowKeys: WindowKey[] = ["24h", "7d", "30d"];

function linePoints(values: number[]) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const spread = Math.max(max - min, 1);

  return values.map((value, index) => ({
    x: 32 + (index * 936) / Math.max(values.length - 1, 1),
    y: 42 + ((max - value) / spread) * 218,
    value,
  }));
}

function formatReading(value: number) {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toLocaleString();
}

export default function Home() {
  const [windowKey, setWindowKey] = useState<WindowKey>("7d");
  const [copied, setCopied] = useState(false);
  const reading = readings[windowKey];
  const points = useMemo(() => linePoints(reading.values), [reading.values]);
  const average = Math.round(reading.values.reduce((sum, value) => sum + value, 0) / reading.values.length);
  const peak = Math.max(...reading.values);
  const peakIndex = reading.values.indexOf(peak);
  const polyline = points.map((point) => `${point.x},${point.y}`).join(" ");

  async function copyReading() {
    const summary = `${reading.label}: ${reading.change} movement, ${reading.visitors} visitors, peak ${formatReading(peak)}.`;
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="ledger-shell">
      <div className="ledger-frame">
        <header className="ledger-header">
          <div className="wordmark">
            <span className="wordmark-mark" aria-hidden="true">SL</span>
            <span>Signal Ledger</span>
          </div>
          <p className="honesty-note">Local reading instrument · sample data</p>
        </header>

        <section className="intro" aria-labelledby="page-title">
          <div>
            <h1 id="page-title">See what moved.</h1>
            <p className="intro-copy">A quiet place to read a performance signal, keep the interruption visible, and decide what to investigate next.</p>
          </div>
          <div className="window-control" aria-label="Choose a reading window" role="group">
            <span className="control-label">Reading window</span>
            <div className="window-buttons">
              {windowKeys.map((key) => (
                <button
                  key={key}
                  type="button"
                  className={windowKey === key ? "window-button is-active" : "window-button"}
                  aria-pressed={windowKey === key}
                  onClick={() => setWindowKey(key)}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        </section>

        <dl className="reading-strip" aria-label={`${reading.label} summary`}>
          <div className="reading-cell reading-cell-featured">
            <dt>Movement</dt>
            <dd>{reading.change} <span>{reading.label}</span></dd>
          </div>
          <div className="reading-cell">
            <dt>Visitors</dt>
            <dd>{reading.visitors} <span>unique visits</span></dd>
          </div>
          <div className="reading-cell">
            <dt>Sessions</dt>
            <dd>{reading.sessions} <span>observed visits</span></dd>
          </div>
          <div className="reading-cell">
            <dt>Conversion</dt>
            <dd>{reading.conversion} <span>demo signal</span></dd>
          </div>
        </dl>

        <section className="plot-section" aria-labelledby="plot-title">
          <div className="section-heading">
            <div>
              <h2 id="plot-title">Traffic trace</h2>
              <p>{reading.label} · plotted at each observed interval</p>
            </div>
            <span className="trace-key"><span className="trace-key-line" aria-hidden="true" /> visitors</span>
          </div>

          <div className="plot-paper">
            <svg className="trace-chart" viewBox="0 0 1000 330" role="img" aria-labelledby="chart-title chart-description">
              <title id="chart-title">{`Visitor trace for ${reading.label}`}</title>
              <desc id="chart-description">The line peaks at {formatReading(peak)} around {reading.ticks[peakIndex] ?? "the final interval"}. The average is {formatReading(average)}.</desc>
              {[42, 97, 152, 207, 262].map((y) => <line key={y} className="chart-grid" x1="32" x2="968" y1={y} y2={y} />)}
              <line className="chart-axis" x1="32" x2="968" y1="262" y2="262" />
              <polyline className="chart-trace" points={polyline} />
              {points.map((point, index) => (
                <g key={`${point.x}-${point.y}`}>
                  <circle className="chart-point" cx={point.x} cy={point.y} r="5" />
                  <title>{`${reading.ticks[index] ?? "Interval"}: ${formatReading(point.value)} visitors`}</title>
                </g>
              ))}
              {reading.ticks.map((tick, index) => {
                const x = 32 + (index * 936) / Math.max(reading.ticks.length - 1, 1);
                return <text key={tick} className="chart-label" aria-hidden="true" x={x} y="298" textAnchor="middle">{tick}</text>;
              })}
            </svg>
          </div>
        </section>

        <section className="observation-grid" aria-label="Reading notes">
          <article className="observation-note">
            <p className="note-label">Field note</p>
            <p className="note-copy">{reading.note}</p>
            <button type="button" className="text-action" onClick={copyReading}>{copied ? "Reading copied" : "Copy this reading"}</button>
          </article>
          <dl className="observation-facts">
            <div>
              <dt>Peak</dt>
              <dd>{formatReading(peak)} <span>{reading.ticks[peakIndex]}</span></dd>
            </div>
            <div>
              <dt>Average</dt>
              <dd>{formatReading(average)} <span>per interval</span></dd>
            </div>
            <div>
              <dt>Next question</dt>
              <dd>What changed before the lift?</dd>
            </div>
          </dl>
        </section>

        <footer className="ledger-footer">
          <span>Built for inspection, not theatre.</span>
          <span>Nothing here connects to a production source.</span>
        </footer>
      </div>
    </main>
  );
}
