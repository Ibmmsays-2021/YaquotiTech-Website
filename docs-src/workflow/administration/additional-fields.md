# Additional fields

> 📷 Screenshot needed: **Configuration** > **User Management** > **Additional Fields**, with the field form open showing the **Live Demo**

Additional fields let you keep information about employees that Yaquoti Workflow doesn't ask for by default, such as an employee number or a hiring date. They appear on the user form and as columns in the user import template.

To manage additional fields, your system role needs the **Additional Fields** permissions. See [System roles](system-roles.md).

To open them, go to **Configuration** > **User Management** > **Additional Fields**.

## Create an additional field

1. Select **New**.
2. Choose the field type.
3. Enter a **Name**, and optionally a **Placeholder** and a **Default Value**.
4. Choose whether the field is **Required** or **Optional**, and its **Field Order**.
5. Optionally, add a **Validation Expression** and the **Validation Expression Message** users see when a value doesn't match.
6. Select **Create**.

The **Live Demo** shows the field as it will look on the user form.

| Field | Details |
|---|---|
| Field type | **Text**, **Multiple Text**, **Number**, **Date Picker**, **Boolean** or **Multi Select**. For **Multi Select**, list the values users choose from. |
| **Name** | Required. 2 to 70 characters, with no spaces at the start or end. Must be unique. |
| **Field Order** | The field's position on the user form. |
| **Validation Expression** | Optional. A pattern each value must match. |

A required field must be filled in on the user form and in the import template.

## Edit an additional field

Open the field's menu and select **Edit**.

## Delete an additional field

1. Open the field's menu and select **Delete**.
2. Confirm.

> ⚠️ **Deleting a field can't be undone.** It disappears from the user form and from new import templates.

Users' existing values for the field may be lost. [TO VERIFY: whether the values already stored for users are deleted too]

## Related topics

- [Users](users.md)
- [Import users from Excel](import-users.md)
