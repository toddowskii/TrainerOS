# TrainerOS: Copilot instructions
Mobile app for freelance personal trainers in Poland. Current scope: FRONT END ONLY on mock data.
## Stack
Expo (latest SDK), React Native, TypeScript (strict), Expo Router, TanStack Query,
react-hook-form + zod, NativeWind v4 (className, Tailwind 3), i18next.
## Architecture rules
1. Folders: app/ (routes), src/components, src/features/<feature>, src/data (repositories + mocks),
   src/i18n, src/types.
2. Screens get data ONLY through repository interfaces in src/data: ClientsRepo, SessionsRepo,
   PaymentsRepo, TrainerRepo, BookingRepo. Current implementations are in-memory mocks with simulated
   latency (300-600ms) and occasional errors. They will later be replaced by Supabase implementations
   WITHOUT changing any screen.
3. Types in src/types:
   - Trainer: id, fullName, email, instagramHandle, bookingSlug, plan, stripeAccountId?
   - Client: id, trainerId, fullName, email, phone?, status (active|inactive|churned),
     lastSessionAt (nullable), intakeSurveyUrl?, consentAt
   - Session: id, trainerId, clientId, scheduledAt, durationMin,
     status (scheduled|completed|cancelled|no_show), meetingUrl?
   - Payment: id, trainerId, clientId, sessionId, amountGrosz,
     status (pending|paid|failed|refunded), dueDate?, paidAt?, reminderCount
Money is always integer grosz; format as PLN only in the UI.
4. All user-facing strings go through i18next. Polish (pl) is default; English (en) also provided.
5. Every list screen has loading, empty and error states.
6. Accessibility: labels on inputs, touch targets >= 44pt, light and dark mode.
7. Libraries are installed. Do NOT install auth, payments or backend SDKs yet. Leave
   `TODO(integration)` comments where Stripe, meeting links, survey links and magic links will plug in.
## Design direction
- Style all UI with NativeWind className. Colors, fonts and radii live in tailwind.config.js
  (theme.extend), not scattered hex values.
- Clean, modern fitness-coaching feel: one strong accent color, neutral surfaces, generous spacing,
  large rounded cards (rounded-2xl), soft shadows, clear type hierarchy.
- Status colors everywhere: paid = green, unpaid = red, inactive = amber.
- Build reusable primitives first (Button, Card, Badge, Input, ScreenHeader, EmptyState) and reuse them.
- Support dark mode with the dark: variant.
## Working style
- Do only what the current prompt asks. Do not touch unrelated files.
- After changes run typecheck and lint and fix what you broke.
- No new dependencies without telling me why.
- A client is "inactive" after 14+ days without a session; clients with lastSessionAt = null
  must be handled explicitly.
