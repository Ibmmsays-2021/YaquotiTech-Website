# Backup approvals

> 📷 Screenshot needed: **Configuration** > **Users Management** > **Backup Approvals**, the list filtered on **Active**, with the **Actions** menu of one backup open

A backup approval lets someone else approve on behalf of an employee for a period, for example during their leave. During that period, the steps where the employee is the named approver go to the backup person instead, and the employee's pending requests can move to them too. When the period ends, everything returns to the employee.

Only the employee's direct manager can arrange their backup. To open the list, your system role also needs the **Backup Approvals** permissions. See [System roles](../administration/system-roles.md).

To open it, go to **Configuration** > **Users Management** > **Backup Approvals**.

## Create a backup approval

1. Select **New**.
2. In **Approver**, select the employee who will be away. Only people who report to you are listed.
3. In **Backup Approval**, select the person who covers for them.
4. Set the **Start Date** and **End Date**.
5. Optionally, tick **Move pending approvals** and, in **Select Requests**, choose the waiting requests to hand over.
6. Optionally, add a **Description**, and select **Confirm**.

| Field | Details |
|---|---|
| **Backup Approval** | Required. Can't be the approver themself. |
| **Start Date** and **End Date** | Required. The start can't be after the end. |
| **Description** | Optional. 2 to 200 characters. |

The period can't overlap another backup in which either person is the approver or the backup.

You can create a backup only for an employee who is the named approver of at least one step, or who has pending requests to move.

> ℹ️ **Only steps assigned to the person count.** Steps the employee approves as a member of an approval group stay with the group, whose other members can still pick them up.

## Backup statuses

| Status | What it means |
|---|---|
| **Hold** | The backup is planned and hasn't started yet. |
| **Active** | The period is running. The backup person approves the employee's steps. |
| **Completed** | The period has ended and everything has returned to the employee. |
| **Canceled** | The backup was cancelled before it ended. |

To see which steps and requests a backup covers, open its **Actions** menu and select **View Backups**. **Steps At Setup** lists the steps handed over, and **Moved Requests** the requests that moved.

## Edit a backup approval

You can edit a backup only while it's on **Hold**, before its start date. Open its **Actions** menu, select **Edit**, change the backup person, dates or description, and select **Confirm**.

## Cancel a backup approval

1. Open the backup's **Actions** menu and select **Cancel**.
2. Select **Cancel backup** to confirm.

> ⚠️ **Cancelling can't be undone.** An active backup ends at once, and the steps and moved requests return to the employee. A backup on hold never starts. A backup that has already ended can't be cancelled.

## Related topics

- [Roles](../concepts/roles.md)
- [Users](../administration/users.md)
- [Step approver](../process-design/step-approver.md)
- [Pick up and assign requests](pick-up-and-assign.md)
