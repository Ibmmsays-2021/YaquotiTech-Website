# Step SLA

> 📷 Screenshot needed: an approval step's **SLA** tab showing **Resolve With (SLA)** with **Business Days**, **Hours** and **Mins** filled in, next to the **Activities** tab's **SLA Activities** section with one **SLA Escalation** and one **SLA Notifications** row

A step's SLA is the time its approvers have to act on a request. You set it per approval step, and you can have the step escalated to another approval group, or reminders sent, when part of that time has passed. How the deadline and escalation look on a request, and how request admins stop and restart it, is explained in [Request deadlines and escalation](../requests/request-sla.md).

To change the SLA, your system role needs the **Update Process** permission. See [System roles](../administration/system-roles.md).

To open it, go to **Configuration** > **Process Management** > **Service Catalog**, open the category, the sub category and the process, select the **Steps** tab, and select an approval step. The time is on the **SLA** tab; escalation and reminders are under **SLA Activities** on the **Activities** tab. **Submit**, **Complete** and **Cancel** have no SLA.

## Set the time to resolve a step

1. Open the step's **SLA** tab.
2. Under **Resolve With (SLA)**, enter **Business Days**, **Hours** and **Mins**.
3. Select **Update**.

| Field | Details |
|---|---|
| **Business Days** | 0 to 365. One business day is one full working day of the process site's working hours, not 24 hours. |
| **Hours** | 0 to 24. |
| **Mins** | 0 to 60. |

At least one of the three must be more than 0. A new step starts with 8 hours.

The SLA runs only during the working hours of the process's site and skips its holidays, so a request that reaches the step in the evening starts using its time the next working morning. See [Holidays and working hours](../administration/working-time.md).

Whether a request admin may stop and restart the SLA on a request is set on the step's **Admin Actions** tab. See [Admin actions](step-admin-actions.md).

## Escalate a step that runs late

Escalation moves a request to another approval group when the step has used a share of its SLA, for example to a manager's group at 75%.

1. Open the step's **Activities** tab and go to **SLA Activities** > **SLA Escalation**.
2. Select **Add**.
3. Enter **Escalated at %**.
4. Choose the group in **Select Approver Groups**.
5. Select **Update**.

| Field | Details |
|---|---|
| **Escalated at %** | Required. 30 to 100, starts at 51. The share of the step's SLA, counted from when the request reached the step. |
| **Select Approver Groups** | Required. One approval group. Lists only the approval groups assigned to the process. See [Assign groups to a process](process-groups-tab.md). |

> ⚠️ **Escalation takes the request away from its current approver.** At that point the group's members become the step's approvers and the request waits for one of them to [pick it up](../requests/pick-up-and-assign.md). A step that is already finished isn't escalated.

## Send reminders before the deadline

SLA notifications send an activity template to activity groups when the step has used a share of its SLA, for example a reminder to the approvers at 50%.

1. On the **Activities** tab, go to **SLA Activities** > **SLA Notifications** and select **Add**.
2. Enter **Notify at %**: 30 to 100, starts at 51.
3. Choose the **Activity Type** and the **Activity Template**.
4. Choose one or more groups in **Select Activity Groups**.
5. Select **Update**.

The template and at least one group are required. When a step is escalated, the new approvers also receive the step's SLA notifications. The other activities on this tab are explained in [Step activities](step-activities.md).

> ℹ️ **Changes reach new requests only.** A request takes a copy of the step's SLA, escalations and notifications when it's submitted. Requests already in progress keep the timing they started with.

## Related topics

- [Request deadlines and escalation](../requests/request-sla.md)
- [Holidays and working hours](../administration/working-time.md)
- [Step activities](step-activities.md)
- [Admin actions](step-admin-actions.md)
- [Approval groups](approval-groups.md)
- [Activity templates](activity-templates.md)
