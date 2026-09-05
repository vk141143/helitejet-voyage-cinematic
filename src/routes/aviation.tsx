import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CinematicPage, worldHead } from "@/components/scene/CinematicPage";
import { worlds } from "@/content/site";
import { JourneyPlanner } from "@/components/inquiry/JourneyPlanner";
import { AviationSections } from "@/components/pages/sections";
const world = worlds.aviation;

export const Route = createFileRoute("/aviation")({
  head: () => worldHead(world),
  component: Page,
});

function Page() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <>
      <CinematicPage world={world}>
        <AviationSections onOpenInquiry={() => setInquiryOpen(true)} />
      </CinematicPage>
      <JourneyPlanner context="flights" open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </>
  );
}
