import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Rooms from "@/components/Rooms";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Rooms />
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