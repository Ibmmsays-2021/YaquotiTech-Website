# Logic and automation

> 📷 Screenshot needed: a step's **Logic** tab showing two rules grouped under the same "when", one of them marked **Off**, with the **Add Rule** button visible

Rules let a step act on its own: remind the approver before the SLA is due, approve automatically when the amount is small, call another system, or open a follow-up request. Each rule says **when** it runs and **then** what it does.

To change rules, your system role needs the **Process** permission to update processes and the **Step Logic** permissions. See [System roles](../administration/system-roles.md).

To open them, go to **Configuration** > **Process Management** > **Service Catalog**, open the process, select a step on the **Steps** tab and open its **Logic** tab. Only approval steps have rules; the submit, complete and cancel steps don't. See [Process steps](steps-and-flow.md).

## Create a rule

1. Select **Add Rule**.
2. Enter a **Rule Name**. Leave **Rule is on** ticked so the rule runs.
3. Under **When**, choose the **Timing** and the **Event**, and fill in the fields that appear.
4. Under **Then**, choose **Direct Action** to always run the actions, or **Condition** to choose them by conditions.
5. Add the actions.
6. Select **Save**.

| Field | Details |
|---|---|
| **Rule Name** | Required. Up to 200 characters. Must be unique on the step. |
| **Timing** | **On** runs the rule the moment the event happens. **Before** is possible only for **SLA due** and **Date field**. **After** runs it a set time later. |
| **How Long** and **Unit** | Required for **Before** and **After**. A whole number of **Minutes**, **Hours** or **Days**. **% of the SLA** (1 to 100) is possible only for **After** a **Step started**. |
| **Date Field** and **At Time (optional)** | For the **Date field** event: a Date / Time or Day field of the process form. The time is HH:mm, in the time of the process site. |
| **Only If** | Optional. Checked when the rule is due; if it's no longer true, the rule doesn't run. For example, **The step is still not picked**. |
| **Repeat Every** and **Maximum Times** | Optional, for **After** only. Minutes, hours or days, repeated 1 to 100 times. |

| Event | Runs when |
|---|---|
| **Step started** | The request reaches this step. |
| **First picked**, **First unpicked** | An approver picks up or unpicks the step for the first time. |
| **Approved**, **Not approved** | The step is decided. |
| **Cancelled by approver**, **Cancelled by requester** | The request is cancelled. |
| **SLA due**, **First SLA stopped**, **First SLA resumed** | The step's deadline is reached, or its SLA is stopped or run again for the first time. See [Step SLA](step-sla.md). |
| **Date field** | The date entered in a date field of the request arrives. If the field is empty, the rule doesn't run. |
| **Request created**, **First request reopened** | The request is raised, or reopened for the first time. |
| **API execution failed** | An **Api Execution** action of this step fails. |

The sentence under the fields shows the "when" in words. If anything in the rule is missing, nothing is saved and the problems are listed above **Save**.

> ℹ️ **An "On" rule runs once per request.** It runs the first time its event happens on the step; if the step is unpicked and picked again, it doesn't run a second time.

Each time a rule runs, the request's history records it, with the branch taken and the outcome of each action. See [Request history](../requests/request-history.md).

## Add conditions

Use conditions to run different actions depending on the request, for example to approve automatically when the amount is under 1,000.

1. Under **Then**, select **Condition**.
2. Select the **Value** box, pick a **Form Field**, an **API Function** value or a **Static** value, and select **Create**.
3. Choose a **Comparison** and pick the **Compared With** value the same way.
4. To check more than one thing, select **Add Condition** and choose **AND** or **OR**.
5. Add the **Actions** that run when the branch is true.
6. Optionally, select **Add Else If** for another branch, and add **Else** actions for when no branch is true.

Branches are checked from the top, and only the first true one runs. Two numbers are compared as numbers; anything else is compared as text, ignoring upper and lower case. For an **API Function** value, enter in **Property Schema** the name of the value in the integration's response, as listed in its response schema. See [Integration factories](integrations.md). If the call fails, the value is empty.

## Choose the actions

Actions run from top to bottom; use **Run earlier** and **Run later** to change the order. If an action fails, the actions after it in the same list don't run.

| Action | What it does |
|---|---|
| **Send Notification** | Sends an email, SMS or system notification from an [activity template](activity-templates.md) to one or more [activity groups](activity-groups.md). An email can also attach **Saved Reports**. |
| **Api Execution** | Runs a saved integration, chosen in **API Function**. |
| **Create Request** | Raises a request in another process. |
| **Create Sub Request** | Raises a sub-request. With **Required**, the request can't continue until the sub-request is completed. See [Sub-requests](../requests/sub-requests.md). |
| **Change Approver** | Gives the step to an [approval group](approval-groups.md) or to one approver, not both. |
| **Approve** | Approves the step. Choose an approval group or approver to record it as theirs; leave both empty to approve as the System user. |
| **Not Approve** | Doesn't approve the step. |
| **Cancel** | Cancels the request. A **Cancellation Note** is required. |
| **No Action** | Does nothing. Only in a condition branch, and only on its own. |

A list can hold only one of **Approve**, **Not Approve** and **Cancel**. For **Cancel**, **Not Approve** and **Create Request**, **Perform This Action As** chooses who the action is recorded as: the System user, the requester, the approver who picked the step (the System user if nobody did) or a specific user. A sub-request is opened by the approver or the requester; when the approver opens it, it's always required.

**Fill Data** sets the values the action enters into a form: the first step of the chosen process for a new request, or this step's form for the other actions. To use a request's details, copy a variable from **System Variables** and paste it into a field; it's replaced with the request's value when the rule runs.

> ⚠️ **A new request's data must match the chosen process's form.** The rule can't be saved until **Fill Data** is done. If that process's first-step form changes later, the action fails until you open the rule and fill the data again.

## Turn off, reorder, copy or delete a rule

The list groups rules that run at the same moment; inside a group they run from top to bottom. Drag a rule, or use **Run earlier** and **Run later**, to change the order.

- Use the switch on a rule to turn it off or on. A rule that is off shows **Off**.
- Select **Duplicate** to open a copy as a new rule, named "Copy of" the original.
- Select **Delete** and confirm to remove a rule.

> ℹ️ **Requests already raised keep the rules they started with.** Each request takes a copy of the step's rules when it's raised. Editing, turning off, reordering or deleting a rule changes only requests raised afterwards.

## Related topics

- [Process steps](steps-and-flow.md)
- [Step activities](step-activities.md)
- [Step SLA](step-sla.md)
- [Activity templates](activity-templates.md)
- [Integration factories](integrations.md)
- [Request history](../requests/request-history.md)
- [Sub-requests](../requests/sub-requests.md)
