# Request history

> 📷 Screenshot needed: the **History** tab of a request in **Timeline** layout, showing a person's action, a **System** event and an **Automation rule** with **Show steps** open

The **History** tab is the full record of what happened to a request: every action people took, every automation rule that ran, and every event the system triggered on its own, such as an escalation. Use it to find out who did what and when, or why a request moved the way it did.

Everyone on the request sees the **History** tab. See [Request details](request-details.md).

## What the history shows

The newest entries are at the top.

| Entry | What it records |
|---|---|
| People's actions | Submitting, picking up, assigning, approving, not approving, holding, updating, cancelling and reopening, with who did it, when, and any note. |
| **System** events | What the system did by itself: a step or the whole request escalated, a request closed or rejected because it was late, or a scheduled notification sent. |
| **Automation rule** | A rule from the step's logic that ran, what started it (for example an approval or the step starting), which branch it took (**IF**, **ELSE IF**, **ELSE**) and the outcome. |

An automation rule shows **Succeeded**, **Failed**, **Skipped** or **No actions ran**. Select **Show steps** to see each condition and action it ran. If an action failed, the entry says which one and gives the reason, for example that the target process is on hold or an integration didn't respond. Actions after a failed one are skipped.

When the same event happened several times in a row, it's shown once. Select **Show all** to see each time.

How rules are built is explained in [Logic and automation](../process-design/step-logic-and-automation.md).

## Layouts and filters

| Option | What it does |
|---|---|
| **Timeline** | Shows every entry in time order. |
| **By step** | Groups the entries under the step they belong to, with the number of events per step. |
| **All activity** | Shows everything. |
| **System** | Shows only system events and automation rules. |
| **Failures** | Shows only what went wrong, such as failed rules. The number next to it is how many there are. |

## Related topics

- [Request details](request-details.md)
- [Conversations and activities](conversations-and-activities.md)
- [Logic and automation](../process-design/step-logic-and-automation.md)
- [Request deadlines and escalation](request-sla.md)
