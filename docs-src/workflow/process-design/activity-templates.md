# Activity templates

> 📷 Screenshot needed: **Configuration** > **Activity Center** > **Activity Templates**, **Email** tab, showing several templates with one switched off

Activity templates are the ready-written emails, text messages and in-app notifications that the system sends during a request. You write a message once, with variables for the request's details, and then use it in [step activities](step-activities.md) and in [logic rules](step-logic-and-automation.md).

To manage templates, your system role needs the **Activities** permissions. See [System roles](../administration/system-roles.md).

To open them, go to **Configuration** > **Activity Center** > **Activity Templates**. Templates are listed on three tabs: **Email**, **SMS** and **Notification**.

## Create a template

1. Select **New**.
2. Choose **Email**, **SMS** or **Notification**.
3. Enter an **Activity Name**. For an email, also enter a **Title** and a **Subject**.
4. Write the message.
5. To add a request's details, select a variable in the variables panel to copy it, and paste it into the message.
6. Select **Submit**.

| Field | Details |
|---|---|
| **Activity Name** | Required. 3 to 50 characters, with no space at the start or end. Must be unique among the active templates of the same type. |
| **Title**, **Subject** | Email only. Required. 3 to 50 characters each. |
| Message | Required. At least 3 characters. |

The variables panel offers details of the request (such as its number, code, status and link) and of the requester (such as name, email, position, site, department and [additional fields](../administration/additional-fields.md)). Choose a process to see the variables for its form fields, or an integration to use a value from its response; see [Integration factories](integrations.md). Each variable is replaced with the request's value when the message is sent.

The type can't be changed after the template is created. To send the same message by another channel, create a second template.

## Edit a template

Open the template's options menu and select **Edit**. To read it without changing it, select **Details**.

> ℹ️ **Changes don't reach requests already in progress.** A request copies its step activities' messages when it's raised, so a change applies to requests raised afterwards. A logic rule's **Send Notification** action is the exception: it always sends the template's current text.

## Deactivate or activate a template

Use the switch on the template's row. A deactivated template can't be opened or chosen for new step activities and rules.

> ⚠️ **Rules that use a deactivated template stop sending it.** A **Send Notification** action with a deactivated template sends nothing. Check the processes that use a template before you deactivate it.

Replace it in the steps' activities as well. [TO VERIFY: what a step activity still set to a deactivated template sends on requests raised afterwards]

If another active template of the same type has the same name, you can't activate the template. Rename one of them first.

## Related topics

- [Step activities](step-activities.md)
- [Logic and automation](step-logic-and-automation.md)
- [Activity groups](activity-groups.md)
- [Activity logs](activity-logs.md)
