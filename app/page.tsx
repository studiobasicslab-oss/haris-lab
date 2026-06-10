import Hero from "@/components/Hero";
import Tabs from "@/components/Tabs";
// import LibrariansDesk from "@/components/LibrariansDesk";

export default function Home() {
  return (
    <main className="relative overflow-hidden min-h-screen">
      <div className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none"/>
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[1000px]
          h-[500px]
          bg-amber-900/10
          blur-3xl
        "
      />
    </div>

      <Hero />
      <Tabs />
      {/* <LibrariansDesk /> */}

      <footer className="text-center py-20 text-[var(--muted)] text-sm">
        <p>Hari's Lab</p>

        <p className="mt-2">
          Built one curiosity at a time.
        </p>
      </footer>

    </main>
  );
}

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-red-500 text-white flex items-center justify-center">
//       <h1 className="text-6xl">
//         HARI'S LAB
//       </h1>
//     </main>
//   );
// }