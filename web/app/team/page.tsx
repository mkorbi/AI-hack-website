import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { SiteLayout } from "@/components/layout/site-layout";
import { TeamMembers } from "@/components/team/team-members";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Team",
  description:
    "Meet the volunteers behind AI Hack Fest, the community event for AI engineering and AI platforms in Munich.",
  pathname: "/team",
});

export default function TeamPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Team"
        title={
          <>
            Meet the people
            {' '}
            <br />
            <span className="text-on-dark-muted">behind AI Hack Fest</span>
          </>
        }
        description="Engineers from the Munich community who build AI systems and platforms themselves, and want a day that is about exactly that."
      />
      <TeamMembers />
    </SiteLayout>
  );
}
