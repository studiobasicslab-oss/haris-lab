"use client";

import { useState } from "react";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("archive");

  return (
    <section className="max-w-5xl mx-auto px-8 py-12">

      {/* Tabs */}

      <div className="border-b border-[var(--border)]">

        <div className="flex gap-12 text-2xl">

          <button
            onClick={() => setActiveTab("archive")}
            className={`pb-6 ${
              activeTab === "archive"
                ? "text-[var(--gold)] border-b-2 border-[var(--gold)]"
                : ""
            }`}
          >
            Archive
          </button>

          <button
            onClick={() => setActiveTab("experiments")}
            className={`pb-6 ${
              activeTab === "experiments"
                ? "text-[var(--gold)] border-b-2 border-[var(--gold)]"
                : ""
            }`}
          >
            Experiments
          </button>

          <button
            onClick={() => setActiveTab("curiosities")}
            className={`pb-6 ${
              activeTab === "curiosities"
                ? "text-[var(--gold)] border-b-2 border-[var(--gold)]"
                : ""
            }`}
          >
            Curiosities
          </button>

          <button
            onClick={() => setActiveTab("observatory")}
            className={`pb-6 ${
              activeTab === "observatory"
                ? "text-[var(--gold)] border-b-2 border-[var(--gold)]"
                : ""
            }`}
          >
            Observatory
          </button>

        </div>
      </div>

      {/* Content */}

      <div className="py-12">

        {activeTab === "archive" && (
          <div>
            <h2 className="text-4xl mb-4">
              Archive
            </h2>

            <p className="text-[var(--muted)]">
              YouTube videos, articles and future digital products.
            </p>
          </div>
        )}

        {activeTab === "experiments" && (
          <div>
            <h2 className="text-4xl mb-4">
              Experiments
            </h2>

            <p className="text-[var(--muted)]">
              Games, VS Code extensions and future projects.
            </p>
          </div>
        )}

        {activeTab === "curiosities" && (
          <div>
            <h2 className="text-4xl mb-4">
              Curiosities
            </h2>

            <p className="text-[var(--muted)]">
              Books, drawings, piano and future hobbies.
            </p>
          </div>
        )}

        {activeTab === "observatory" && (
          <div>
            <h2 className="text-4xl mb-4">
              Observatory
            </h2>

            <p className="text-[var(--muted)]">
              Questions, paradoxes and ideas that linger.
            </p>
          </div>
        )}

      </div>

    </section>
  );
}