# Requester actions

> 📷 Screenshot needed: an approval step's **Requester Actions** tab, with **Requester can cancel the request** and **Requester Can Assign Approver** both selected and two approval groups chosen in the list below

Requester actions give the person who raised a request more control while it waits at a particular step: they can cancel it there, or choose which approver handles the step. Each approval step has its own settings, so you can allow this at one step and not at the next.

To change them, your system role needs the **Update Process** permission. See [System roles](../administration/system-roles.md).

To open them, go to **Configuration** > **Process Management** > **Service Catalog**, open the process, select the **Steps** tab, select an approval step and open **Requester Actions**. Like every step setting, they reach only requests submitted afterwards. See [Process steps](steps-and-flow.md).

## Let the requester cancel at this step

1. Select **Requester can cancel the request**.
2. Select **Update**.

While a request is at this step, its requester can cancel it. This also works when the step has no one left to act on it, so the requester isn't stuck waiting; see [Steps without an approver](../requests/incidents.md). How cancelling works is explained in [Cancel or reopen a request](../requests/cancel-and-reopen.md).

## Let the requester choose the approver

Use this when the requester knows best which approver should handle the step.

1. Select **Requester Can Assign Approver**.
2. In the list that appears, choose one or more approval groups.
3. Select **Update**.

| Field | Details |
|---|---|
| Approval groups | Required when the option is on. The requester chooses an approver from the members of these groups. Lists only the approval groups assigned to the process. See [Assign groups to a process](process-groups-tab.md). |

The requester makes the choice while the request waits at the step. See [Pick up and assign requests](../requests/pick-up-and-assign.md).

> ℹ️ **The step's own approver must be an approval group.** If the step has a single approver, selecting **Update** saves nothing: the option is switched off and you must select **Update** again to save the rest of the tab. Change the approver to a group first. See [Step approver](step-approver.md).

## Related topics

- [Process steps](steps-and-flow.md)
- [Step approver](step-approver.md)
- [Approver actions](step-approver-actions.md)
- [Cancel or reopen a request](../requests/cancel-and-reopen.md)
- [Pick up and assign requests](../requests/pick-up-and-assign.md)
