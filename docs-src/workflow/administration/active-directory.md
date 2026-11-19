# Active Directory

> 📷 Screenshot needed: **Configuration** > **Active Directory Integration** > **Active Directory**, **Servers** tab, showing a domain controller card with **Test Connection** and **Import**

If your organization keeps its staff in a directory, Yaquoti Workflow can create accounts from it, so you don't type users in by hand. People then sign in with the password they already use at work.

| Directory | What it does |
|---|---|
| **Active Directory** | Imports users from your organization's own domain controllers, once or on a schedule. They sign in on the normal sign-in page with their directory password. |
| **Azure Active Directory** | Brings in users from Microsoft's cloud directory. They sign in with the Microsoft account button. |

To manage directory settings, your system role needs the **Active Directory** permissions. See [System roles](system-roles.md).

Both are under **Configuration** > **Active Directory Integration**.

## Add a domain controller

1. Open **Active Directory** and, on the **Servers** tab, select **New**.
2. Enter the **Domain Controller Name**, **Server Name** and **Server Port**, and choose whether to **Use-SSL**.
3. Enter the **Domain User Name** and **Domain Password** of an account that can read the directory.
4. Select **Test Connection** to check the details, then **Create**.

The **Domain Controller Name** must be unique. If the test fails, the message says whether the server can't be reached or the account details are wrong.

## Import users from a domain controller

1. On the domain controller's card, select **Import**.
2. Select the organization units whose users you want.
3. To keep them in step with the directory, enter a schedule name and choose a frequency: daily, weekly, monthly or yearly.
4. Match each user field to a directory field, or give it a **Default Value**, then select **Next**.
5. Check the **Review**, then select **Next**.

The **Result** step shows how many users were created and why any failed. Imported users sign in with their directory password, and their Yaquoti Workflow password can't be used.

> ⚠️ **Each import and scheduled run deactivates users who were removed from the directory.** They can no longer sign in to Yaquoti Workflow. See [Users](users.md).

## Follow imports and schedules

- The **Schedules** tab lists the scheduled imports. Select **Stop** to end one.
- The **Tracking** tab lists every run, with its organization unit, status, number of users and the time it ran.

## Edit or delete a domain controller

Select **Edit** or **Delete** on the domain controller's card.

> ⚠️ **Deleting a domain controller stops all its schedules and can't be undone.**

## Connect Azure Active Directory

1. Open **Azure Active Directory**.
2. Enter the **Tenant ID**, **Client ID**, **Scopes** and **Client Secret** from your Microsoft Entra app registration.
3. Optionally, turn on **Automatic Sync** and set **Auto Sync every** so many hours, days or months.
4. Select **Submit**.

Select **Sync Now** to bring in users straight away. The interval can be 1 to 23 hours, 1 to 28 days or 1 to 11 months.

People who sign in with a Microsoft account for the first time are asked for their work details and wait for an administrator to accept them. See [Complete your account](complete-your-data.md).

## Related topics

- [Sign in](sign-in.md)
- [Users](users.md)
- [Complete your account](complete-your-data.md)
