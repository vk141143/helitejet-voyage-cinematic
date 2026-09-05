import { createFileRoute } from "@tanstack/react-router";
import { CinematicPage, worldHead } from "@/components/scene/CinematicPage";
import { worlds } from "@/content/site";
import { MobilitySections } from "@/components/pages/sections";
const world = worlds.mobility;

export const Route = createFileRoute("/mobility")({
  head: () => worldHead(world),
  component: Page,
});

function Page() {
  return (
    <CinematicPage world={world}>
      <MobilitySections />
    </CinematicPage>
  );
}
