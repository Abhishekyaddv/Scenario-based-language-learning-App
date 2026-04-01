## Plan: Fix Scenario Session Level Enum Mismatch

Root cause: `User.level` is stored in title case (`Beginner`/`Intermediate`/`Advanced`) while `ScenarioSession.level` enforces lowercase enum (`beginner`/`intermediate`/`advanced`). Saving a session passes `user.level` directly, so Mongoose rejects it.

**Steps**
1. Normalize `level` at save boundary in `saveSession` by converting `user.level` to lowercase before `ScenarioSession.create` (*recommended, blocks step 2*).
2. Add defensive fallback for missing level (`user.level?.toLowerCase()` with safe default if needed) and keep response behavior unchanged (*depends on 1*).
3. Optional consistency pass: standardize level casing across models (`Users` + `ScenarioSession`) or centralize in shared constants to prevent future drift (*parallel follow-up, not required for hotfix*).

**Relevant files**
- `c:/Users/a2z/Desktop/Scenario-based-learning-App/server/src/controllers/scenarioController.js` — `saveSession` currently sends `level: user.level` directly.
- `c:/Users/a2z/Desktop/Scenario-based-learning-App/server/src/models/ScenarioSession.js` — enum currently lowercase only.
- `c:/Users/a2z/Desktop/Scenario-based-learning-App/server/src/models/Users.js` — user profile level enum currently title case.
- `c:/Users/a2z/Desktop/Scenario-based-learning-App/client/src/pages/ScenarioSession.jsx` — save call does not send level (server derives from user).

**Verification**
1. Trigger scenario completion flow and ensure `POST /scenario/save` returns `201` instead of `500`.
2. Inspect saved `ScenarioSession` document and confirm `level` persists as lowercase enum value.
3. Re-run flow for at least one other level (`Intermediate` or `Advanced`) to verify normalization works for all enum options.

**Decisions**
- Included: identify exact mismatch and minimal-risk server-side fix path.
- Excluded: broad schema refactor, migration of historical data, and client payload contract changes unless requested.
- Recommendation: apply normalization in controller first because it is the safest immediate fix and preserves existing client behavior.