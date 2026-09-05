import { createFileRoute } from "@tanstack/react-router";
import { CinematicPage, worldHead } from "@/components/scene/CinematicPage";
import { JourneyPlanner } from "@/components/inquiry/JourneyPlanner";
import { worlds } from "@/content/site";

const world = worlds.home;

export const Route = createFileRoute("/")({
  head: () => worldHead(world),
  component: Page,
});

function Page() {
  return (
    <CinematicPage world={world} heroContent={<JourneyPlanner context="flights" open embedded />} />
  );
}
