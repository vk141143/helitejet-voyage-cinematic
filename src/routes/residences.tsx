import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CinematicPage, worldHead } from "@/components/scene/CinematicPage";
import { worlds } from "@/content/site";
import { JourneyPlanner } from "@/components/inquiry/JourneyPlanner";
import { ResidencesSections } from "@/components/pages/sections";
const world = worlds.residences;

export const Route = createFileRoute("/residences")({
  head: () => worldHead(world),
  component: Page,
});

function Page() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <>
      <CinematicPage world={world}>
        <ResidencesSections onOpenInquiry={() => setInquiryOpen(true)} />
      </CinematicPage>
      <JourneyPlanner context="residences" open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </>
  );
}
