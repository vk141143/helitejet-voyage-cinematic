import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CinematicPage, worldHead } from "@/components/scene/CinematicPage";
import { worlds } from "@/content/site";
import { JourneyPlanner } from "@/components/inquiry/JourneyPlanner";
import { YachtsSections } from "@/components/pages/sections";
const world = worlds.yachts;

export const Route = createFileRoute("/yachts")({
  head: () => worldHead(world),
  component: Page,
});

function Page() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <>
      <CinematicPage world={world}>
        <YachtsSections onOpenInquiry={() => setInquiryOpen(true)} />
      </CinematicPage>
      <JourneyPlanner context="yachts" open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </>
  );
}
