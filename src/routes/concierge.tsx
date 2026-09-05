import { createFileRoute } from "@tanstack/react-router";
import { CinematicPage, worldHead } from "@/components/scene/CinematicPage";
import { worlds } from "@/content/site";
import { ConciergeForm } from "@/components/forms/ConciergeForm";
const world = worlds.concierge;

export const Route = createFileRoute("/concierge")({
  head: () => worldHead(world),
  component: Page,
});

function Page() {
  return (
    <CinematicPage world={world}>
      <ConciergeForm />
    </CinematicPage>
  );
}
