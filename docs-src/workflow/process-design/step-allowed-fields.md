# Allowed fields

> 📷 Screenshot needed: an approval step's **Allowed Fields** tab, with **Previous Allowed Fields Steps** showing the **Submit** step expanded (some fields ticked, one unticked) and **Next Allowed Fields Steps** showing a later approval step

Allowed fields decide which fields from the process's other steps the people working on a step can see on a request. Use them to keep sensitive data, such as salary or medical details, away from approvers who don't need it, or to show the requester what a later step filled in. A step always shows its own form; allowed fields cover only the other steps.

| Who works on the step | What allowed fields add |
|---|---|
| The approvers of an approval step | The other steps' fields ticked on that step, next to the step's own form |
| The person who submitted the request | The later steps' fields ticked on the **Submit** step |

To change allowed fields, your system role needs the **Update Process** permission. See [System roles](../administration/system-roles.md).

To open them, go to **Configuration** > **Process Management** > **Service Catalog**, open the category, the sub category and the process, select the **Steps** tab, select the step and open **Allowed Fields**. **Complete** and **Cancel** have no allowed fields.

## Choose the fields a step can see

1. Open the step's **Allowed Fields** tab.
2. Under **Previous Allowed Fields Steps**, expand a step that comes before this one, and tick the fields to show.
3. Under **Next Allowed Fields Steps**, do the same for the steps that come after it.
4. Select **Update**.

Each list shows only steps that have a form. Ticking a step or a layout such as a panel ticks every field inside it. [TO VERIFY: a data grid or edit grid from another step is shown when its row fields are ticked]

A new step starts with every field of the process ticked, so nothing is hidden until you untick it.

> ⚠️ **Saving another step's form ticks its fields again.** When you select **Update** on a step's [form builder](step-form-builder.md), all of that form's fields become visible again on every other step. After changing a form, come back here and untick the fields you want to keep hidden.

> ℹ️ **Changes reach new requests only.** A request keeps the allowed fields its steps had when it was submitted. Requests already in progress don't change.

## Related topics

- [Form builder](step-form-builder.md)
- [Process steps](steps-and-flow.md)
- [Request details](../requests/request-details.md)
- [Approve or decline a step](../requests/decide-on-a-step.md)
