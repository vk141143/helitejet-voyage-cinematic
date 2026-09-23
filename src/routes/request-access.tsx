import { createFileRoute } from "@tanstack/react-router";
import { CinematicPage, worldHead } from "@/components/scene/CinematicPage";
import { worlds } from "@/content/site";
import { PublicRequestWizard } from "@/components/inquiry/PublicRequestWizard";
const world = worlds.access;

export const Route = createFileRoute("/request-access")({
  head: () => worldHead(world),
  component: Page,
});

function Page() {
  return (
    <CinematicPage world={world}>
      <PublicRequestWizard />
    </CinematicPage>
  );
}
