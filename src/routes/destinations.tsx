import { createFileRoute } from "@tanstack/react-router";
import { CinematicPage, worldHead } from "@/components/scene/CinematicPage";
import { worlds } from "@/content/site";
import { DestinationsSections } from "@/components/pages/sections";
const world = worlds.destinations;

export const Route = createFileRoute("/destinations")({
  head: () => worldHead(world),
  component: Page,
});

function Page() {
  return (
    <CinematicPage world={world}>
      <DestinationsSections />
    </CinematicPage>
  );
}
