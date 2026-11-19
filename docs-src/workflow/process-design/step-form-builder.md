# Form builder

> 📷 Screenshot needed: an approval step's **Form Builder** tab on a large screen, with the component groups on the left (**Basic Components** open), a form containing a **Panel** with two fields and a **Data Grid**, and the **Update** button at the bottom

Each step has its own form. The **Submit** step's form is the request form that requesters fill in when they [submit a request](../requests/new-request-submit.md); an approval step's form is filled in by the approver when they [act on the step](../requests/decide-on-a-step.md). **Complete** and **Cancel** have no form.

To change a form, your system role needs the **Update Process** permission. See [System roles](../administration/system-roles.md).

To open it, go to **Configuration** > **Process Management** > **Service Catalog**, open the category, the sub category and the process, select the **Steps** tab, select the step and open **Form Builder**. The form builder works on large screens only; on a smaller screen the tab shows a message instead.

## Build a step's form

1. Open the step's **Form Builder** tab.
2. Open a component group: **Basic Components**, **Advanced Components**, **Layout**, **Data Components** or **File**.
3. Drag a component onto the form.
4. In the settings window, enter the **Label** and any other settings, and select **Save**.
5. Repeat for each field, and drag fields to reorder them.
6. Select **Update**.

**Update** is available only when the form has changes. If you open another tab or step before selecting it, you're asked whether to discard your changes or stay.

> ⚠️ **Saving a form resets who can see its fields.** Every field of the form becomes visible again on all the process's other **Submit** and approval steps, even where you had hidden it. Check the other steps' [Allowed fields](step-allowed-fields.md) after you save.

Saving the **Submit** step's form also alerts anyone filling in a new request for this process that the form has changed. Requests already submitted keep the form they were submitted with.

## Group fields with layouts

Use the **Layout** group to arrange fields: **Columns** places fields side by side, **Tabs** and **Panel** split a long form into parts, and **Table**, **Field Set** and **Well** frame related fields. Layouts hold no data of their own; the requester fills in only the fields inside them.

A panel's heading is its **Title**; a field set's heading is its **Legend**.

## Add a table of rows

When the requester must enter a list, such as several items or travellers, use **Data Grid** or **Edit Grid** from **Data Components**. Drag the fields that make up one row into the grid. A **Data Grid** shows the rows as a table that the requester types into directly; an **Edit Grid** adds and edits one row at a time. When a request is [held for correction](../requests/hold-for-correction.md), the approver can send back single rows of a grid.

> ⚠️ **A grid can contain only input fields.** If a **Data Grid** or **Edit Grid** contains a layout or another grid, the form isn't saved and a message names the component to move. Move it out of the grid, then select **Update** again.

## Let requesters attach files

Drag **Upload** from the **File** group onto the form. In its settings you can limit the file types and the file size; the default maximum is 45 MB per file.

Files are saved inside the request itself, not in a separate file store, so they stay with the request. Because a whole submission travels as one, it can carry only about 35 MB of files in total, whatever each **Upload** field allows. [TO VERIFY: the practical total of attached files per submission]

## Make a field required or validate it

Open the field's settings and the **Validation** tab. Select **Required** so the form can't be sent without the field. Depending on the component, you can also set limits such as a minimum and maximum length or a pattern the value must match.

A **Select** that allows several choices saves the chosen options as one value separated by commas.

## Show or hide a field with a condition

Use a condition when a field applies only to some requests, for example *Return date* only when *Trip type* is *Return*.

1. Open the field's settings and the **Conditional** tab.
2. Choose whether the field is shown or hidden, the field it depends on, and the value that triggers it.
3. Select **Save**, then **Update**.

The requester sees the field only while the condition is met. An **Upload** field has no **Conditional** tab of its own.

## Related topics

- [Process steps](steps-and-flow.md)
- [Allowed fields](step-allowed-fields.md)
- [Logic and automation](step-logic-and-automation.md)
- [Submit a request](../requests/new-request-submit.md)
- [Approve or decline a step](../requests/decide-on-a-step.md)
- [Hold a request for correction](../requests/hold-for-correction.md)
