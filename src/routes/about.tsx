import { createFileRoute } from "@tanstack/react-router";
import { CinematicPage, worldHead } from "@/components/scene/CinematicPage";
import { worlds } from "@/content/site";
import { AboutSections } from "@/components/pages/sections";
const world = worlds.about;

export const Route = createFileRoute("/about")({
  head: () => worldHead(world),
  component: Page,
});

function Page() {
  return (
    <CinematicPage world={world}>
      <AboutSections />
    </CinematicPage>
  );
}
