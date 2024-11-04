"use client";
import RecomendationHistory from "@/components/RecomendationHistory";
import { Suspense } from "react";

export default function HistoryPage() {
  return (
    <Suspense fallback={<></>}>
      <RecomendationHistory />
    </Suspense>
  );
}
