import Homepage from "@/components/home/Homepage";
import Navbar from "@/components/shared/Navbar";
import Sidebar from "@/components/shared/Sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-white">
      <Navbar />
      <div className="flex h-full pt-14">
        <aside className="">
          <Sidebar />
        </aside>

        <main className="flex-1 overflow-y-auto">
          <Homepage />
        </main>
      </div>
    </div>
  );
}
