import { createFileRoute } from "@tanstack/react-router";
import { CinematicPage, worldHead } from "@/components/scene/CinematicPage";
import { worlds } from "@/content/site";
import { ExperiencesSections } from "@/components/pages/sections";
const world = worlds.experiences;

export const Route = createFileRoute("/experiences")({
  head: () => worldHead(world),
  component: Page,
});

function Page() {
  return (
    <CinematicPage world={world}>
      <ExperiencesSections />
    </CinematicPage>
  );
}
