# Import users from Excel

> 📷 Screenshot needed: the **Excel Template** dialog on **Configuration** > **User Management** > **Users**, with a file selected

When you need many accounts at once, for example when the organization starts using Yaquoti Workflow, fill in an Excel template instead of creating users one by one. The template already holds your regions, sites, departments, positions and managers as dropdowns, so most cells are picked rather than typed.

To import users, your system role needs the **Users** permissions. See [System roles](system-roles.md). Your organization's email settings must be set up, because each new user receives a welcome email. See [Email and SMS settings](email-and-sms.md).

To open it, go to **Configuration** > **User Management** > **Users** and select **Excel Template**.

## Import users

1. Select **Download Template**.
2. Fill in one row per user and save the file.
3. Back in the dialog, drag the file in or **browse** for it.
4. Select **Upload File**.

A report file downloads when the upload finishes. Each row shows a **Status**, and failed rows show an **Error Message**. The totals of successful and failed rows are at the end.

| Column | Details |
|---|---|
| **First Name**, **Last Name** | Required. 2 to 20 characters. |
| **User Name** | Required. 5 to 50 characters. Must be unique. |
| **Region**, **Site**, **Department** | Choose in that order: each list shows only what belongs to the cell before it. |
| **Email** | Must not be used by any account, including inactive users and customers, or by another row. |
| **Mobile** | Its length depends on the **Country Code**. |
| Additional fields | One column per additional field, with its own rules. See [Additional fields](additional-fields.md). |

Only `.xlsx` files are accepted. Download a new template whenever regions, positions or additional fields change, because the lists in an old file are out of date.

## Fix rows that failed

1. Open the report file.
2. Correct the rows that show an **Error Message**.
3. Upload the report file again.

Rows that were imported the first time are skipped, so only the corrected rows are created.

## Add a few users in a grid

For a handful of users, select **Bulk** on the **Users** page. Each row is one user; press **Ctrl** + **U** to add a row, then select **Add Users**. The grid shows how many rows are **Valid**, have **Errors** and were **Imported**.

## Related topics

- [Users](users.md)
- [Additional fields](additional-fields.md)
- [Organization structure](organization-structure.md)
