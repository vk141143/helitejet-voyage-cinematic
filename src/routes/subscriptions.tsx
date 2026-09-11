import { createFileRoute } from "@tanstack/react-router";
import { CinematicPage, worldHead } from "@/components/scene/CinematicPage";
import { worlds } from "@/content/site";
import { SubscriptionsSections } from "@/components/pages/sections";

const world = worlds.subscriptions;

export const Route = createFileRoute("/subscriptions")({
  head: () => worldHead(world),
  component: Page,
});

function Page() {
  return (
    <CinematicPage world={world}>
      <SubscriptionsSections />
    </CinematicPage>
  );
}
