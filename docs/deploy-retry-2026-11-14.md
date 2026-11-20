# Workers deployment retry — 2026-11-14

Commit 96f2f7d / build 441acb43-1dff-4d2a-a9bd-51e7219441e8:
- Cloudflare OpenNext build succeeded.
- New static assets uploaded successfully.
- Worker version registration failed at /workers/scripts/resetclinic/versions with API code 10013 and generic unknown-error text.
- This log does not establish a source-code defect. No speculative application/configuration changes made.
- Retry the same application code with this documentation commit; verify the new Workers Builds check.
- Local Windows OpenNext exits after its compatibility warning without a diagnostic; do not confuse this with the Cloudflare Linux deployment failure.

Reference: https://developers.cloudflare.com/workers/observability/errors/
