# Steps without an approver

> 📷 Screenshot needed: **Configuration** > **Request Management** > **Incident Requests**, showing one process with its **Requests Count** and the **Assign Approval** panel open

A step without an approver happens when the approval group or the approver of a step is deleted or deactivated while requests are waiting at that step. Nobody can pick up those steps, so the requests are stuck until a request admin gives them a new approver. The system calls this an incident.

On the request, the step shows **Incident - no approver**, and the only action left is **Solve Incident**. Approvers of the old group no longer see the step under **Pick**.

Request admins solve incidents. To use the **Incident Requests** list, your system role also needs the **Incidents Requests** permissions. See [System roles](../administration/system-roles.md).

## Solve an incident on one request

As a request admin of the request:

1. Open the request.
2. Select **Actions** > **Solve Incident**.
3. Select a new approval group or approver.
4. Save.

The step goes to the new group's queue, or straight to the approver you chose.

## Solve incidents for a whole process

When many requests of one process are stuck at the same step, fix them together from **Incident Requests**.

To open it, go to **Configuration** > **Request Management** > **Incident Requests**.

1. Select **Steps Without Approvals** on the left. The list shows each process with stuck requests, the **Current Step Name** and the **Requests Count**.
2. Select **Assign** on the process.
3. Select an **Approver** or an **Approval Group**.
4. Select **Assign**.

Every stuck request of that process that you administer gets the new approver. With many requests this runs in the background, and you're notified when it's finished. To see which requests are affected first, select **Details** on the process.

> ℹ️ **This fixes the waiting requests, not the process.** New requests still go to the deleted group or approver and get stuck again. Change the step's approver in the process too. See [Step approver](../process-design/step-approver.md).

## Related topics

- [Pick up and assign requests](pick-up-and-assign.md)
- [Request details](request-details.md)
- [Step approver](../process-design/step-approver.md)
- [Approval groups](../process-design/approval-groups.md)
