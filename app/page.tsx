import { Suspense } from "react";
import dynamic from "next/dynamic";

const HomeAnimation = dynamic(() => import("@/components/HomeAnimation"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-[#111111]" />,
});

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#111111]" />}>
      <HomeAnimation />
    </Suspense>
  );
}
