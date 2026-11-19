# Submit a request

> 📷 Screenshot needed: the request form of a process, with the **Approval path** on the left, the form in the middle and **Request Details** and **Saved Drafts** on the right

The request form is where you give the details of your request and send it for approval. Beside the form, the **Approval path** lists the steps your request will go through, with each step's **SLA Duration** and approver.

To open the form, [choose a service](new-request-choose.md).

## Submit the request

1. Fill in the form. Required fields are marked.
2. Select **Submit**.

The request opens on its details page, at its first approval step. See [Request details](request-details.md).

If the form has no fields, the page says there's nothing to fill in. Select **Submit** and the request starts.

Some processes limit how many requests you can raise in a period, or how soon you can raise the next one. If you've reached the limit, the request isn't submitted. Try again later. See [Create a process](../process-design/process-basic.md).

> ℹ️ **Outside working hours, a request waits.** If you submit outside the process's working time, the request is saved with the status **Waiting** and starts at the next working time. The message after you submit tells you when. Deadlines are counted in the **Time zone** shown under **Request Details**. See [Holidays and working hours](../administration/working-time.md).

## Choose the approver of a step

Some steps let you pick who approves them. These steps show **Assign Approver** in the **Approval path**.

1. Select **Assign Approver** on the step.
2. In **Choose Approver group**, select a group.
3. Optionally, in **Choose Approver**, select one person from the group.
4. Submit the request.

To go back to the step's original approver, select **Remove**. To change the approver after you submit, see [Pick up and assign requests](pick-up-and-assign.md).

## Submit a request for someone else

When the process allows requests on behalf of others and you have permission to act on behalf of users, the form shows **On Behalf Request Action**.

1. In **Request on behalf**, select the person.
2. Fill in the form and select **Submit**.

The request is raised in that person's name, and the list offers only people who may request this process. They find it under **On My Behalf** in their [requests list](requests-list.md). You can't submit a sub-request on behalf of someone else.

## Save a draft

Save a draft to keep what you've entered and finish the request later.

1. Fill in at least one field.
2. Select **Save as Draft**.
3. Enter a **Draft Title** (2 to 50 characters) and select **Save**.

The draft appears under **Saved Drafts** each time you open this process. Your drafts are visible only to you.

To continue a draft, select it under **Saved Drafts**. Its values fill the form. Submitting doesn't remove the draft. To remove drafts you no longer need, select the delete icon on a draft, or **Delete All**.

## Submit many requests from Excel

Processes set up for bulk requests show **Bulk Requests** at the top of the form.

1. Select **Bulk Requests**.
2. Select **Download Template** and fill in one row per request.
3. Drop the completed file in the window, or browse for it.
4. Select **Upload**.

The file is processed in the background. You receive an email with the result. Requests created this way show the type **Bulk** in the [requests list](requests-list.md).

If the form has a field type that Excel can't hold, the template can't be downloaded. [TO VERIFY: which field types are unsupported in the bulk template]

## Handle a process change while you work

If an administrator changes the process while you have the form open, a warning appears in the corner of the page:

| Warning | What to do |
|---|---|
| **Held** | The process was put on hold. You can't submit until it's released. Save a draft to keep your entries. |
| **Deleted** | The process no longer exists. You can't submit this request. |
| **Invalid** | The process is missing an approver or a request admin group. You can't submit until it's fixed. |
| **Form Changed** | The form was edited. If you submit, the page reloads with the new form and you fill it in again. |

## Related topics

- [Choose a service](new-request-choose.md)
- [Request details](request-details.md)
- [Requests list](requests-list.md)
- [Sub-requests](sub-requests.md)
- [Request and step statuses](../concepts/statuses.md)
