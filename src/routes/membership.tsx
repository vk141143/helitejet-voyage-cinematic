import { createFileRoute } from "@tanstack/react-router";
import { CinematicPage, worldHead } from "@/components/scene/CinematicPage";
import { worlds } from "@/content/site";
import { MembershipSections } from "@/components/pages/sections";
const world = worlds.membership;

export const Route = createFileRoute("/membership")({
  head: () => worldHead(world),
  component: Page,
});

function Page() {
  return (
    <CinematicPage world={world}>
      <MembershipSections />
    </CinematicPage>
  );
}
