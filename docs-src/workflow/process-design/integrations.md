# Integration factories

> 📷 Screenshot needed: **Configuration** > **Developer Space** > **Integration Factories**, **Integration Factory** tab, showing a POST call with its URL, the **Headers** tab open and the variables panel above

An integration is a saved call to another system, such as looking up an employee in the HR system or creating an order in the ERP. Once saved, a logic rule can run it, its answer can decide a rule's conditions, and values from its answer can appear in messages. The details of the call (address, method, sign-in and fields) come from the other system's documentation or its administrator.

To manage integrations, your system role needs the **Developer Space** permissions. See [System roles](../administration/system-roles.md).

To open them, go to **Configuration** > **Developer Space** > **Integration Factories**. The **Integration Factory** tab builds a call; **Saved Functions** holds the saved ones, in folders.

## Create an integration

1. On the **Integration Factory** tab, choose the method and enter the address in **Enter URL**.
2. Fill in **Params**, **Authorization**, **Headers** and **Body** as the other system requires.
3. In **Response Schema**, list the values the other system sends back.
4. Optionally, select **Send** to try the call and see the answer.
5. Select **Save**, enter a **Name**, choose or create a folder, and confirm.

| Field | Details |
|---|---|
| Method | **GET**, **POST**, **PUT**, **Patch** or **DELETE**, as the other system expects. |
| **Params**, **Headers** | Up to 10 rows each. Values typed into the URL after `?` appear in **Params**. Select the plus sign next to a value to insert a password or key from an [integration vault](vaults-keys-and-google-forms.md) instead of typing it. |
| **Authorization** | **No Auth**, **Basic Auth**, **Bearer Token** or **Api-Key**. |
| **Body** | The data sent with the call, usually for **POST** and **PUT**. |
| **Response Schema** | A sample of the answer. Its value names are what rule conditions and message variables can read. |
| **Name** | Required. 3 to 50 characters. |
| **Select Folder** | Required. |
| **Description** | Optional. 3 to 250 characters. |

To send a request's details, such as the request number or a form field, copy a variable from the variables panel into the URL, a param, a header or the body. It's replaced with the request's value each time the integration runs.

> ℹ️ **A call with request variables can't be tried here.** **Send** works only when the URL and headers hold no request variables, because there is no request to take the values from. Values from a vault are fine. Save the integration and try it through a rule.

## Organize integrations in folders

On **Saved Functions**, select **New** to create a folder. The **Folder Name** is required, 3 to 100 characters; the description is optional. To rename a folder, open its card's menu and select **Edit**. Open a folder to see its integrations.

> ⚠️ **Deleting a folder deletes every integration in it.** Rules that use them stop working, and an integration can't be moved to another folder first. Check what the folder holds before you delete it.

## Edit, run or delete an integration

Open the folder and use the integration's options menu:

- **Details** shows the call without changing it; select **Switch To Edit Mode** to change it.
- **Edit** opens the call. Change it and select **Update**. The name, description and folder stay as they are.
- **Run** sends the call now and shows the answer.
- **Delete** removes it after you confirm.

> ℹ️ **Changes apply everywhere at once.** Rules and messages use the integration as it is when they run, including on requests already in progress.

> ⚠️ **Deleting an integration doesn't remove it from rules.** An **Api Execution** action that calls it fails, and conditions and messages that read its values get empty values. Change those rules first. See [Logic and automation](step-logic-and-automation.md).

## Related topics

- [Logic and automation](step-logic-and-automation.md)
- [Vaults, keys and Google Forms](vaults-keys-and-google-forms.md)
- [Activity templates](activity-templates.md)
