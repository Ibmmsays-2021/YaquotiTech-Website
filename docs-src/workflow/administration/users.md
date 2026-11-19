# Users

> 📷 Screenshot needed: **Configuration** > **User Management** > **Users**, **Employee** tab, with the **New User** panel open

Users are the people who work in Yaquoti Workflow: they raise requests, approve steps and run processes. Each employee has a site, a department, a position and a manager, and those details decide which groups they belong to.

| Tab | Who is listed |
|---|---|
| **Employee** | Employees, however their account was created |
| **Customer** | Customers who signed up to the customer portal |
| **Google-Form** | Accounts used to submit requests from Google Forms |

To manage users, your system role needs the **Users** permissions. See [System roles](system-roles.md).

To open the list, go to **Configuration** > **User Management** > **Users**.

## Create a user

1. On the **Employee** tab, select **New**.
2. Enter the **First Name**, **Last Name**, **User Name** and email address.
3. Choose the **Region**, **Site**, **Department**, **Position**, **Position Level** and **Reports To**.
4. Fill in any **Additional Fields** your organization uses, and optionally a phone, mobile and description.
5. Select **Submit**.

| Field | Details |
|---|---|
| **First Name**, **Last Name** | Required. 2 to 20 characters. |
| **User Name** | Required. Latin letters and digits, no spaces, and at most one of `@ . / _ - +`. Must be unique. |
| Email address | Required. 5 to 50 characters. Must not be used by any account, including inactive ones and customers. |
| **Department** | Lists the departments of the site you chose. |
| Mobile | Optional. Must not be used by another account. |

The user receives an email with a temporary password and must replace it at first sign-in. See [Sign in](sign-in.md).

If your organization's email settings aren't set up, you can only create fast users. See [Email and SMS settings](email-and-sms.md).

To add many users at once, see [Import users from Excel](import-users.md).

## Create a fast user

A fast user is created straight away, without an email address. Use it for people who don't have a work email.

1. In the **New User** panel, turn on **Fast User Creation**.
2. Fill in the form as for any other user. The email field stays empty.
3. Select **Submit**, then note the temporary password shown.

Give the password to the user yourself. They set their own password at first sign-in and can't change it afterwards; only an administrator can, with **Change Password** in the user's **Options** menu. Fast users receive notifications by SMS and inside the system only.

To make a fast user a full user, edit them and add an email address.

## Edit a user

Open the user's **Options** menu and select **Edit**. Inactive users can't be edited.

To change the user's system role, select **Assign Role** instead. See [System roles](system-roles.md).

## Hand over a user's work

Use **Handover** when someone leaves or changes job and another person takes over everything they did.

1. Open the leaving user's **Options** menu and select **Handover**.
2. Choose the replacement from the **Active Users List**.
3. Optionally, tick **Include requests created by the user**.
4. Select **Submit**.

The replacement takes over the leaving user's site, department, position, manager, system role and organization roles, their place in group rules, their approver role in process steps, and the requests they administer or act on behalf of. With the option ticked, they also become the creator of the leaving user's requests.

> ⚠️ **The leaving user is deactivated, and a handover can't be undone.** Steps the leaving user had picked up are released, so someone else can pick them up. See [Pick up and assign requests](../requests/pick-up-and-assign.md).

## Deactivate or activate a user

Use the switch in the user's row.

You can't deactivate a user who is still a member of a group, a step approver, an organization role holder, a department head or linked to a vendor category. The message lists where the user is used; remove them there first, or use **Handover**.

A deactivated user can't sign in, and group rules that name them stop matching until you activate them again.

## Related topics

- [Import users from Excel](import-users.md)
- [System roles](system-roles.md)
- [Additional fields](additional-fields.md)
- [Organization structure](organization-structure.md)
- [Backup approvals](../requests/backup-approvals.md)
