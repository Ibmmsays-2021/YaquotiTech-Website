# Contributing

All work happens on **`develop`** (the default branch). **`main`** only receives releases from `develop` and is what gets deployed. Both branches are protected: nobody pushes to them directly.

```
feature/xyz ──PR──▶ develop ──PR (release)──▶ main ──▶ deploy
```

## Day-to-day changes

1. Start from the latest `develop`:
   ```bash
   git switch develop
   git pull
   git switch -c feature/short-name
   ```
2. Commit, push the branch, and open a pull request into **`develop`** (GitHub picks it by default).
3. The **Build & checks** job runs on every PR: `npm ci`, lint, Prettier check and the full prerendered build. It must pass.
4. The PR needs **2 approving reviews**. New commits dismiss earlier approvals, so re-request review after changes. All review conversations must be resolved.
5. Once checks pass and two people have approved, merge. The branch must be up to date with `develop`.

## Releasing to production

1. Open a pull request from **`develop` into `main`**.
2. It runs the same checks plus **Release source**, which only accepts `develop` (or `hotfix/*`) as the source branch.
3. After 2 approvals, merge. The workflow builds `main` and runs the **Deploy** job (Azure Static Web Apps when the `AZURE_STATIC_WEB_APPS_API_TOKEN` secret is set; otherwise the built site is attached to the run as the `site` artifact).

## Urgent fixes

Branch `hotfix/short-name` from `main`, open a PR into `main` (2 approvals), then open a PR from `main` into `develop` so the fix isn't lost.

## Before pushing

```bash
npm run lint
npm run format      # fixes formatting
npm run build
```
