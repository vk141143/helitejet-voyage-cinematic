import { createFileRoute } from "@tanstack/react-router";
import { CinematicPage, worldHead } from "@/components/scene/CinematicPage";
import { worlds } from "@/content/site";
import { PrivateSections } from "@/components/pages/sections";
const world = worlds.private;

export const Route = createFileRoute("/private")({
  head: () => worldHead(world),
  component: Page,
});

function Page() {
  return (
    <CinematicPage world={world}>
      <PrivateSections />
    </CinematicPage>
  );
}
