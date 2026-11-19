# Admin actions

> 📷 Screenshot needed: an approval step's **Admin Actions** tab, with **Can Stop SLA** selected and its information tip showing

Admin actions decide what the process's [request admins](request-admin-groups.md) can do while a request is at a step. The tab has one option, **Can Stop SLA**: it lets request admins pause a request's deadline at this step and resume it later, so time spent waiting on something outside the approver's control doesn't count against the step.

To change it, your system role needs the **Update Process** permission. See [System roles](../administration/system-roles.md).

To open it, go to **Configuration** > **Process Management** > **Service Catalog**, open the process, select the **Steps** tab, select an approval step and open **Admin Actions**.

## Let request admins stop the SLA

1. Select **Can Stop SLA**.
2. Select **Update**.

While a request is at this step, its request admins can stop the step's SLA and run it again. How stopping and resuming affects the deadlines is explained in [Request deadlines and escalation](../requests/request-sla.md).

Like every step setting, this reaches only requests submitted afterwards. See [Process steps](steps-and-flow.md).

## Related topics

- [Step SLA](step-sla.md)
- [Request admin groups](request-admin-groups.md)
- [Request deadlines and escalation](../requests/request-sla.md)
- [Roles](../concepts/roles.md)
