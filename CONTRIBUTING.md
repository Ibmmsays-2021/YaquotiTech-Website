# Contributing

`main` is protected. Every change goes through a pull request.

1. Create a branch from `main`: `git switch -c feature/short-name`
2. Commit, push the branch, and open a pull request into `main`.
3. The **Build & checks** job runs on every PR: `npm ci`, lint, Prettier check and the full prerendered build. It must pass.
4. The PR needs **2 approving reviews**. New commits dismiss earlier approvals, so re-request review after changes.
5. Once checks pass and two people have approved, merge. The branch must be up to date with `main`.

After merge, the same workflow builds `main` again and runs the **Deploy** job (Azure Static Web Apps when the `AZURE_STATIC_WEB_APPS_API_TOKEN` secret is set; otherwise the built site is attached to the run as the `site` artifact).

Before pushing, run locally:

```bash
npm run lint
npm run format      # fixes formatting
npm run build
```
