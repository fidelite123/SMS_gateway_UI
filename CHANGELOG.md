# Changelog — SMS_gateway_UI

This changelog contains the recent changes made to the customer/client Send SMS functionality and SMS logs. Use this file as a single place in the repository to review edits.

## 2025-12-02 — Client-side validation, logging, costs, and normalization
- Added strict validation on client Send SMS pages (accept only Rwandan mobile numbers)
  - Acceptable formats: local (07xxxxxxxx) and international (+2507xxxxxxxx)
  - Numbers are normalized to local 10-digit format (07xxxxxxxx) for validation, logging and billing
- Bulk upload parsing updated: will accept and normalize +2507xxxxxxx and local 07xxxxxxx lines
- Per-recipient cost calculation and wallet deduction implemented for client flows
- SMS logs updated to show per-recipient cost entries
- Changes applied to both copies of the client UI (repo has two mirrored/client folders)

### Files changed (customer/client side)
- sms_ui/src/pages/client/SendSMS.jsx — validation, normalization, cost calculation, wallet deduction, bulk parsing
- sms_ui/src/pages/client/SMSLogs.jsx — added a Cost column and display per-message cost
- SMS_gateway_UI/sms_ui/src/pages/client/SendSMS.jsx — same changes for the duplicated file copy
- SMS_gateway_UI/sms_ui/src/pages/client/SMSLogs.jsx — same log UI changes for the duplicated file copy

## How to view code changes locally
You can inspect these changes with git. From the repository root run:

```powershell
# show changed files in your local branch
git status

# show a short summary of edits in the working tree
git diff --name-only

# view details of commits in the current branch
git log --pretty=oneline --graph --decorate -n 10

# display the file-by-file diff for changes not yet committed
git diff path/to/file
```

If the changes have already been committed and pushed, run:

```powershell
# compare your branch to main (or to a remote branch)
git fetch origin

# show diff between your branch and origin/main
git diff origin/main..HEAD
```

## Run the UI to test the changes
Start the dev server in the `sms_ui` folder to see the pages in the browser (PowerShell):

```powershell
cd .\sms_ui
npm install
npm run dev
```

Open the app as a client, check the "Send SMS" page and the "SMS Logs" page to confirm validation, wallet deduction, and log cost columns.

---

If you prefer a UI page inside the app listing these changes or a more detailed / formatted changelog, tell me and I can add it as a lightweight route under the Client dashboard (non-intrusive).