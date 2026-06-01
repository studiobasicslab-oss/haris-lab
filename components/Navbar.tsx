import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-6 px-8">
      <Link
        href="/"
        className="text-2xl tracking-wide"
      >
        Hari's Lab
      </Link>

      <div className="flex gap-8 text-sm">
        <Link href="/archive">Archive</Link>
        <Link href="/experiments">Experiments</Link>
        <Link href="/sketchbook">Sketchbook</Link>
        <Link href="/reading-room">Reading Room</Link>
      </div>
    </nav>
  );
}