import { createFileRoute } from "@tanstack/react-router";
import { CinematicPage, worldHead } from "@/components/scene/CinematicPage";
import { worlds } from "@/content/site";
import { SubscriptionsSections } from "@/components/pages/sections";
import { SubscriptionPurchase } from "@/components/subscription/SubscriptionPurchase";

const world = worlds.subscriptions;

export const Route = createFileRoute("/subscriptions")({
  head: () => worldHead(world),
  component: Page,
});

function Page() {
  return (
    <CinematicPage world={world}>
      <SubscriptionsSections />
      <section className="border-t border-ivory/10 bg-obsidian px-7 py-[10vh] md:px-[7vw]">
        <SubscriptionPurchase />
      </section>
    </CinematicPage>
  );
}
