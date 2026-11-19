# Assign groups to a process

> 📷 Screenshot needed: a process's **Groups** tab, showing the **User Groups** and **Approval Groups** sections with their **Assign Groups** and **Create Group** buttons and one row's **Remove**, **Rename Link** and **Preview** buttons

A process's **Groups** tab decides which groups the process uses. Each kind of group has its own section, and only the groups assigned here can be chosen inside the process's steps:

| Section | What it decides | A new process starts with |
|---|---|---|
| **User Groups** | Who may raise requests for the process. See [User groups](user-groups.md). | *AllSystemUsers* (everyone) |
| **Approval Groups** | Which groups can be chosen as a step's approver. See [Approval groups](approval-groups.md). | *RequesterUser* (the requester) |
| **Activity Groups** | Which groups step activities can be sent to. See [Activity groups](activity-groups.md). | None |
| **Admin Groups** | Who administers the process's requests. See [Request admin groups](request-admin-groups.md). | *AllSystemUsers* (everyone) |

To see the tab, your system role needs the **Process** permission's **View**; assigning groups needs **Assign**, and removing or renaming them needs **Update**. Creating a group from here also needs the **Group** permission's **Create**. See [System roles](../administration/system-roles.md).

To open it, go to **Configuration** > **Process Management** > **Service Catalog**, open the process, and select the **Groups** tab. See [Create a process](process-basic.md).

## Assign a group

1. In the section for that kind of group, select **Assign Groups**.
2. Select a group in the list.
3. Select **Confirm**.

The list shows only active groups of that kind that the process doesn't have yet.

## Create a group and assign it

1. In the section, select **Create Group**.
2. Fill in the group and select **Submit**. See [User groups](user-groups.md).
3. Back on the **Groups** tab, select the new group in the **Assign Group** dialog and select **Confirm**.

## Rename a group's link name

Select **Rename Link** on the group's row, enter a name of up to 20 characters, and select **Confirm**. The link name is what the group is called inside this process only: in step approver and activity choices, and on its requests. The group itself keeps its name.

## Preview a group's members

Select **Preview** on the group's row to list who the group matches today.

> ℹ️ **Rules that depend on the requester are previewed with you as the requester.** For an approval or request admin group with a rule such as **Same As Requester**, the list shows who would match if you raised the request. To try another requester, use **Preview** in the group itself; see [User groups](user-groups.md).

## Remove a group from a process

1. Select **Remove** on the group's row.
2. Select **Confirm**.

The group itself isn't changed, and other processes keep it. What else happens depends on the kind of group:

> ⚠️ **Removing a group can change the process's steps.** Removing an approval group takes it off every step that uses it as approver, and the process shows **Process Invalid** until you choose a new approver; see [Step approver](step-approver.md). Removing an activity group deletes the activities of each step that uses it; see [Step activities](step-activities.md).

Removing the last group in **Admin Groups** makes the process invalid. Removing every group in **User Groups** means nobody can raise requests for it, except customers through the portal if the process is public.

## Related topics

- [User groups](user-groups.md)
- [Approval groups](approval-groups.md)
- [Activity groups](activity-groups.md)
- [Request admin groups](request-admin-groups.md)
- [Step approver](step-approver.md)
- [Create a process](process-basic.md)
