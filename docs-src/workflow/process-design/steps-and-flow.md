# Process steps

> 📷 Screenshot needed: a process's **Steps** tab, with the step list on the left (Submit, two approval steps, Complete, Cancel), one approval step showing the warning icon for a missing approver, and that step's **Basic** tab open on the right

Every request passes through its process's steps in order, from the requester's submission to completion. On the **Steps** tab you decide which approval steps a process has, in what order, and what each one is called. A process always has these kinds of step:

| Step | Position | What you set on it |
|---|---|---|
| **Submit** | Always first | The request form, its fields, and the activities sent when a request is held for correction back to it |
| Approval step | Between **Submit** and **Complete**; at least one | Everything: approver, actions, form, SLA, check list and logic |
| **Complete** | After the last approval step | The activities that run when a request is completed |
| **Cancel** | Always last | The activities that run when a request is cancelled |

To change steps, your system role needs the **Update Process** permission. See [System roles](../administration/system-roles.md).

To open it, go to **Configuration** > **Process Management** > **Service Catalog**, open the category, the sub category and the process, and select the **Steps** tab.

## Add a step

A new process starts with **Submit**, one approval step called *First Step*, **Complete** and **Cancel**. Add a step for each further approval the request needs.

1. Select **Add New Step**.
2. Enter a **Step Name**, and optionally a **Description**.
3. Choose an **Approval Group** or a single **Approver**. See [Step approver](step-approver.md).
4. Select **Submit**.

| Field | Details |
|---|---|
| **Step Name** | Required. 2 to 30 characters. Must be unique within the process. |
| **Description** | Optional. 2 to 100 characters. |
| **Approval Group** or **Approver** | One of the two is required. The list shows only the approval groups assigned to the process. See [Assign groups to a process](process-groups-tab.md). |

The new step becomes the last approval step, just before **Complete**. It starts with an SLA of 8 hours; change it on its **SLA** tab.

## Set up a step

Select a step in the list to open its tabs. Each tab saves on its own with its **Update** button. A tab that doesn't apply to that kind of step shows that it isn't allowed.

- **Basic**: the name, description and button labels. See the next section.
- **Approver Actions**: [Step approver](step-approver.md) and [Approver actions](step-approver-actions.md).
- **Requester Actions**: [Requester actions](step-requester-actions.md).
- **Admin Actions**: [Admin actions](step-admin-actions.md).
- **Activities** and **SLA**: [Step activities](step-activities.md) and [Step SLA](step-sla.md). Escalation is set here; there is no separate escalation step.
- **Form Builder** and **Allowed Fields**: [Form builder](step-form-builder.md) and [Allowed fields](step-allowed-fields.md).
- **Check List** and **Logic**: [Check list](step-check-list.md) and [Logic and automation](step-logic-and-automation.md).

> ⚠️ **Select Update before you open another step.** Changes you haven't saved on a tab are lost without a warning when you select another step. Only the **Form Builder** asks first.

> ℹ️ **Changes reach new requests only.** A request takes a copy of the process's steps when it's submitted. Adding, removing, reordering or changing steps affects requests submitted afterwards; requests already in progress keep the steps they started with.

## Rename a step or change its button labels

1. Select the step and open the **Basic** tab.
2. Change the **Step Name** or **Description**.
3. On an approval step, optionally change the labels under **Step Action Buttons**.
4. Select **Update**.

The name follows the same rules as when you add a step. An approval step has three pairs of labels. **Approve Name**, **Not Approve Name** and **Cancel Name** are the buttons the approver sees; each has a matching past-tense name that records the outcome in the [request's history](../requests/request-history.md). They start as *Approve* / *Approved*, *Not Approve* / *Not Approved* and *Cancel* / *Cancelled*. Each label is required, 2 to 20 characters.

The approver sees either the not-approve button or the cancel button, depending on **Can Decline**. See [Approver actions](step-approver-actions.md).

## Reorder steps

Approval steps run one after another, in the order of the list; a process can't have parallel steps. Instead, on a request in a [dynamic process](process-basic.md), the approver can split the current step into sequential or parallel sub steps. See [Dynamic actions](../requests/dynamic-actions.md).

Drag an approval step by its handle to a new place in the list. The new order is saved at once.

**Submit** always stays first, and **Complete** and **Cancel** stay last: you can't move them, or drop an approval step outside them. When a process has only one approval step, the handle is hidden.

## Remove a step

1. In the step list, select the approval step's **Remove Step** icon.
2. Select **Delete** to confirm.

> ⚠️ **Removing a step can't be undone.** The step and everything set on it are removed. A process must keep at least one approval step, so the last one has no remove icon. **Submit**, **Complete** and **Cancel** can never be removed.

## Related topics

- [Create a process](process-basic.md)
- [Step approver](step-approver.md)
- [Assign groups to a process](process-groups-tab.md)
- [Dynamic actions](../requests/dynamic-actions.md)
- [Step SLA](step-sla.md)
