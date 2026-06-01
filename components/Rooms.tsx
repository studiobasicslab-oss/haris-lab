import RoomCard from "./Roomcard";

export default function Rooms() {
  return (
    <section className="max-w-5xl mx-auto px-8 pb-24">

      <div className="grid gap-8">

        <RoomCard
          title="📚 Archive"
          description="Maps, discoveries, ideas and notes collected over time."
          href="/archive"
        />

        <RoomCard
          title="⚗️ Experiments"
          description="Projects, games and software built from curiosity."
          href="/experiments"
        />

        <RoomCard
          title="🎨 Sketchbook"
          description="Drawings, practice pieces and visual explorations."
          href="/sketchbook"
        />

        <RoomCard
          title="🕯 Reading Room"
          description="Books that stayed, thoughts that lingered, lessons worth revisiting."
          href="/reading-room"
        />

      </div>
    </section>
  );
}