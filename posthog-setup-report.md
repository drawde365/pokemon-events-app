<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into the Pokemon Events app. The following changes were made:

- **`instrumentation-client.ts`** (new): Initializes PostHog client-side using the Next.js 15.3+ `instrumentation-client.ts` approach. Configured with a reverse proxy path (`/ingest`), exception capture, and debug mode in development.
- **`next.config.ts`** (updated): Added reverse proxy rewrites for `/ingest/static/*` and `/ingest/*` to route PostHog requests through the Next.js server, avoiding ad blockers. Also set `skipTrailingSlashRedirect: true`.
- **`components/ExploreBtn.tsx`** (updated): Added `posthog.capture("explore_events_clicked")` to the existing button `onClick` handler.
- **`components/EventCard.tsx`** (updated): Added `"use client"` directive and `posthog.capture("event_card_clicked", { title, location, date, slug })` on the Link `onClick`.
- **`.env.local`** (new): Contains `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` (covered by `.gitignore`).

| Event | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the Explore Events button to scroll to the events list | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks an event card, with title, location, date, and slug as properties | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/352667/dashboard/1387767
- **Insight — Events engagement over time**: https://us.posthog.com/project/352667/insights/lvUPvZeW
- **Insight — Explore to event card conversion funnel**: https://us.posthog.com/project/352667/insights/QDE8uTVR
- **Insight — Most clicked events (by title)**: https://us.posthog.com/project/352667/insights/IUk0JaNd

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
