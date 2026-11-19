# Request deadlines and escalation

> 📷 Screenshot needed: the **OLA** tab of a request, with one step past its **Deadline** and **Escalation Activated** shown

Every request and every step has a deadline, set by the process. If a step isn't finished in time, the process can escalate it to another group or take another action automatically. Deadlines count only working time, so nights, weekends and holidays don't use them up. See [Holidays and working hours](../administration/working-time.md).

How long each step may take and what happens when it's late is set by the administrator. See [Step SLA](../process-design/step-sla.md).

## Due dates

| Where | What it shows |
|---|---|
| **Request Timing** card | The request's **Request Due Date** and whether it's **On track**, **Due soon** or **Overdue**. After the request closes, it shows **SLA met** or **Closed late**. |
| **Step Due Date** | When the current step should be finished, in the step's details. |
| **Due Date** column | The request's due date, in the [requests list](requests-list.md). |

A request submitted outside working hours waits, and its deadlines start at the next working time. See [Submit a request](new-request-submit.md).

## Escalation

When a step reaches the point set by the administrator, for example 80% of its time, it's escalated:

- The step leaves whoever picked it and goes to the escalation group's queue.
- The escalation group is notified, and the step shows under **From Escalation** in their [requests list](requests-list.md) and in the request admins' list.

A process can also act when the whole request passes its due date: escalate it, notify people, close it or reject it. An escalated request shows the status **Escalated**, and a rejected one **Rejected**.

## The OLA tab

Request admins see the **OLA** tab, which shows the timing of each step:

| Column | What it shows |
|---|---|
| **Start Time** and **End Time** | When the step started and finished. |
| **Deadline** | When the step should have finished. |
| **Time Used** | The working time the step took. |
| **Stopped Time** | How long its deadline was stopped. |
| **Time To Escalation** | How long before the step escalates. |
| **Escalation Activated** | Whether the step was escalated, and to whom. |
| **Deadline Achieved** | Whether the step finished on time. |

## Stop a step's deadline

As a request admin, you can stop the current step's deadline, for example while waiting for something outside the system. The step's settings must allow it.

1. Open the request.
2. Select **Actions** > **Stop SLA**.
3. Enter the **Reason** and confirm.

The step shows under **Stopped SLA** in its approvers' requests list. Planned escalations are cancelled.

> ⚠️ **Nobody can act on a step while its deadline is stopped.** The approver can't approve, decline or hold it, and no sub-request can be created from it. Run the deadline again to continue.

## Run a stopped deadline again

1. Open the request.
2. Select **Actions** > **Run SLA**.

The step goes back to the approver who had it, or to the group's queue if nobody had picked it. The request's and the step's due dates move later by the working time the deadline was stopped, and escalation is planned again.

A required sub-request also stops its parent step's deadline until it's finished. See [Sub-requests](sub-requests.md).

## Related topics

- [Step SLA](../process-design/step-sla.md)
- [Holidays and working hours](../administration/working-time.md)
- [Request details](request-details.md)
- [Requests list](requests-list.md)
- [Request and step statuses](../concepts/statuses.md)
