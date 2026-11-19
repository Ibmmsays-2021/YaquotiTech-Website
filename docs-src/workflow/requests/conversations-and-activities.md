# Conversations and activities

> 📷 Screenshot needed: the **Conversations** tab of a request, listing emails, SMS and notifications with their **Step**, **Recipient** and **Status**

Activities are the emails, SMS messages and in-app notifications that a process sends as a request moves through its steps. Some run on their own, for example when a step starts. Others are sent by the approver while working on a step. The **Conversations** tab is the record of everything that was sent for a request.

Which activities a step has is set by the administrator. See [Step activities](../process-design/step-activities.md).

## Conversations tab

Request admins see the **Conversations** tab on the request. It lists every activity sent for the request:

| Column | What it shows |
|---|---|
| **Created At** | When it was sent. |
| **Step** | The step it belongs to. |
| **Activity Type** | When it ran, for example **OnStart Activity** when a step started, **During Activity** when an approver sent it, **SLA Activity** for a deadline, or **Step Holding** for a hold. |
| **Subject / Template** | The email subject or the template used. |
| **Recipient** | Who it went to. |
| **Status** | Whether it was delivered. |

Filter by step with **All Steps**, or by kind with **All Activity Types**. Select **View Details** to read the full message and its channel: **Email**, **SMS** or **Notification**.

## Resend a message

If a message wasn't received, a request admin can send it again.

1. Find the message in the **Conversations** tab.
2. Select **Resend**.

To resend several at once, select them first. For delivery problems across all requests, see [Activity logs](../process-design/activity-logs.md).

## Send an activity from a step

Some steps have activities the approver sends by hand, for example an email to a supplier. They're in the **Activities** tab of the current step, in the **Details** tab. See [Request details](request-details.md).

1. Pick up the step. See [Pick up and assign requests](pick-up-and-assign.md).
2. In the step's **Activities** tab, select the activity.
3. Check the message in the preview. To change it, select **Edit Message**.
4. Check who it goes to under **Send To**.
5. Select **Send**.

Each activity can be sent once. After that it shows **Already Sent**.

Request admins can open the tab too, in preview mode: only the approver who picked the step can send.

## Related topics

- [Request details](request-details.md)
- [Request history](request-history.md)
- [Step activities](../process-design/step-activities.md)
- [Activity logs](../process-design/activity-logs.md)
- [Notifications](notifications.md)
