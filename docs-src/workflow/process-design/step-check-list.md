# Check list

> 📷 Screenshot needed: an approval step's **Check List** tab with three items, one marked **Required**, and the **New Check List** panel open on the right

A check list reminds the approver of what to verify before deciding on a step, such as *Original receipt attached* or *Budget code confirmed*. Mark an item as required when skipping it isn't acceptable. How approvers tick items is explained in [Approve or decline a step](../requests/decide-on-a-step.md).

To add items, your system role needs the **Update Process** and **Create Process** permissions. See [System roles](../administration/system-roles.md).

To open it, go to **Configuration** > **Process Management** > **Service Catalog**, open the category, the sub category and the process, select the **Steps** tab, select an approval step and open **Check List**. Only approval steps have a check list.

## Add a check list item

1. Open the step's **Check List** tab.
2. Select **Add Check List**.
3. Enter a **Name**, and optionally a **Description**.
4. Turn on **Required** if the approver must tick the item.
5. Select **Submit**.

| Field | Details |
|---|---|
| **Name** | Required. 3 to 50 characters, with no space at the start or end. Must be unique within the step. |
| **Description** | Optional. 3 to 100 characters. Shown under the name. |
| **Required** | Off by default. When on, the approver can't approve, not approve or cancel the request until the item is ticked. |

Items appear in the order you add them, and can't be edited or reordered afterwards. To change an item, delete it and add it again.

> ℹ️ **Changes reach new requests only.** A request takes a copy of the check list when it's submitted. Requests already in progress keep the items they started with.

## Delete a check list item

Select the item's **Remove** icon, then **Delete** to confirm. Deleting can't be undone. [TO VERIFY: which system role permission shows the Remove icon]

## Related topics

- [Process steps](steps-and-flow.md)
- [Approve or decline a step](../requests/decide-on-a-step.md)
- [Approver actions](step-approver-actions.md)
