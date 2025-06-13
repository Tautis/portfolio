import dynamic from "next/dynamic";
import { projects } from "../public/data.js";

// Dynamically import the client component
const HomeClient = dynamic(() => import("@/components/HomeClient"), {
  ssr: false,
});

export default function Home() {
  return <HomeClient projects={projects} />;
}
