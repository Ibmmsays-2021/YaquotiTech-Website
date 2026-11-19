# Step approver

> 📷 Screenshot needed: an approval step's **Approver Actions** tab, with the **By Approval Group** list open showing two groups and the **Assign Group** and **Add & Assign Group** buttons at the bottom

Every approval step needs someone to act on it. Give it an approval group when several people can share the work, so any member can pick up a request; give it a single approver when only one person may act.

To change the approver, your system role needs the **Update Process** permission; creating a group from the step also needs **Create Group**. See [System roles](../administration/system-roles.md).

You choose the approver when you [add a step](steps-and-flow.md). To change it later, go to **Configuration** > **Process Management** > **Service Catalog**, open the process and select the **Steps** tab.

## Choose the step's approver

1. Select the approval step and open **Approver Actions**. The approver is under **Approvement Method**.
2. Choose a group in **By Approval Group**, or a user in **By Approver**.
3. Select **Update**.

| Field | Details |
|---|---|
| **By Approval Group** | Any member of the group can pick up the step. Lists only the approval groups assigned to the process. |
| **By Approver** | Only this user can act on the step. You can choose an employee or a vendor user here; when you add a step, only employees are offered. |

A step has either a group or one approver, never both: choosing one clears the other, and you can't save with neither. How approvers then pick up or are assigned work is explained in [Pick up and assign requests](../requests/pick-up-and-assign.md).

A new approver applies to requests submitted afterwards. For a request already in progress, the approver can be changed on the request itself; see [Dynamic actions](../requests/dynamic-actions.md).

> ℹ️ **A single approver turns off Requester Can Assign Approver.** Requesters can choose an approver only from groups, so saving a new single approver switches that option off for the step and clears its groups. See [Requester actions](step-requester-actions.md).

Until every approval step has an approver, the step list shows a warning icon on the steps without one, and requesters can't see the process. If the group or user is deactivated later, requests waiting at that step have no one to act on them. See [Steps without an approver](../requests/incidents.md).

## Assign or create a group from the step

If the group you need isn't in the **By Approval Group** list, use the buttons at the bottom of the list:

- **Assign Group** assigns an existing approval group to the process, as on the process's Groups tab. The group then appears in the list. See [Assign groups to a process](process-groups-tab.md).
- **Add & Assign Group** opens the form for a new approval group. See [Approval groups](approval-groups.md).

> ℹ️ **A group created with Add & Assign Group isn't assigned to the process yet.** After you save it, you return to the process. Open the list again, select **Assign Group** to assign the new group, and then choose it.

## Related topics

- [Process steps](steps-and-flow.md)
- [Approval groups](approval-groups.md)
- [Assign groups to a process](process-groups-tab.md)
- [Requester actions](step-requester-actions.md)
- [Pick up and assign requests](../requests/pick-up-and-assign.md)
- [Steps without an approver](../requests/incidents.md)
