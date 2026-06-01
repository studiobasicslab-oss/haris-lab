import RoomCard from "./Roomcard";

export default function Rooms() {
  return (
    <section className="max-w-5xl mx-auto px-8 pb-24">

      <div className="grid gap-8">

        <RoomCard
          title="📚 Archive"
          description="Videos, articles and discoveries."
          href="/archive"
        />

        <RoomCard
          title="⚗️ Experiments"
          description="Games, tools and software projects."
          href="/experiments"
        />

        <RoomCard
          title="🎨 Sketchbook"
          description="Drawings and creative work."
          href="/sketchbook"
        />

        <RoomCard
          title="🕯 Reading Room"
          description="Books, reviews and favourite ideas."
          href="/reading-room"
        />

      </div>
    </section>
  );
}