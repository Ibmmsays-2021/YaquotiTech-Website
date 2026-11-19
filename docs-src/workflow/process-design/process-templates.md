# Print templates

> 📷 Screenshot needed: a process's **Templates** tab with **Variables From** set to **Request**, the variable list above the editor, and a template in the editor that contains several variables

A print template is the document layout used when someone [prints a request](../requests/print-and-export.md) of this process with its template, for example a leave approval letter. You design it once; every print fills in that request's own data.

To see the template, your system role needs the **Process** permission **View**; to save it, **Update**. See [System roles](../administration/system-roles.md).

To open it, go to **Configuration** > **Process Management** > **Service Catalog**, open the category, the sub category and the process, then select the **Templates** tab. The tab works only on a large screen.

## Create the template

1. Write the document in the editor: text, headings and tables.
2. To add request data, choose a source in **Variables From**.
3. Select a variable to copy it, then paste it where the value should appear.
4. Select **Create**.

| Source | What its variables print |
|---|---|
| **Request** | The request's details, such as its code, status, creation date, link, and its process, category and sub category names. **RequestStamp** prints a round stamp: **APPROVED**, **REJECTED** or **CANCELLED** with the closing date, or **IN PROGRESS**. |
| **Requester** | The requester's name, contact details, position, department, site and organization, and their [additional fields](../administration/additional-fields.md). |
| **Processes** | The answers given in this process's form fields, listed by step. |
| **API Functions** | A value returned by an [integration](integrations.md). Choose the function, enter the **Property Schema** of the value you want, for example `data.name`, and copy the variable. |

Until a process has a template, its requests can't be printed with one.

## Update the template

A process has one print template. Once it exists, the tab shows it in the editor.

1. Change the document.
2. Select **Update**.

> ⚠️ **Every request of the process prints with the current template.** That includes requests completed long ago, so a change to the layout also changes how older requests print.

Cloning or exporting a process copies its template. See [Hold, release, move or copy a process](process-lifecycle.md).

## Related topics

- [Print or export a request](../requests/print-and-export.md)
- [Create a process](process-basic.md)
- [Form builder](step-form-builder.md)
- [Integration factories](integrations.md)
