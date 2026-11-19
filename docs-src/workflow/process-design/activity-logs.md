# Activity logs

> 📷 Screenshot needed: **Configuration** > **Activity Center** > **Activity Logs**, showing the summary cards for **Last 7 days** and the **Notifications** list with one **Failed** and one **Held** row

The activity log records every email, SMS and in-app notification the system sends: what triggered it, who received it and whether it arrived. Use it to answer "did they get the message?", to send failed messages again, and to see when sending was paused.

Your system role needs the **Activity Logs** permissions: viewing to open the log, resending to send messages again, and pausing to pause or resume sending. See [System roles](../administration/system-roles.md).

To open it, go to **Configuration** > **Activity Center** > **Activity Logs**.

## Check whether a message was delivered

1. Choose a period: **Last 24 hours**, **Last 7 days**, **Last 30 days** or **All time**.
2. Select a summary card, such as **Failed**, to list only those messages, or select **Filter** to search by recipient, **Event**, **Channel**, **Status** or **Request ID**.
3. Select a message to open its **Notification details**.

| Status | What it means |
|---|---|
| **Delivered** | The email or SMS provider accepted the message, or the in-app notification was stored for the user. |
| **Failed** | The provider refused the message or couldn't be reached. Point at the status to see why and how many times it was tried. |
| **Held** | The message wasn't sent because its channel was paused. |

The details show the message content, the template, what triggered it, the provider and any attachments. For an in-app notification they also show whether the recipient has read it. The list refreshes by itself.

> ℹ️ **One-time codes aren't stored.** The content of a sign-in or password reset code is never kept, and the code can't be resent. Ask the user to request a new code.

Entries are deleted automatically after a number of days, shown in the tip next to the period buttons.

## Resend a failed or held message

Only failed or held emails and text messages can be sent again. In-app notifications don't need it, and one-time codes can't be resent.

To resend one message, open it and select **Send again**. To resend several at once:

1. Tick the messages in the list.
2. Select **Resend selected**.
3. In the dialog, untick anyone who shouldn't receive it.
4. Select **Send to** to send.

From a message's details, **See the other recipients of this activity** opens the same dialog for everyone the activity was sent to.

The same message can be tried again only after 20 seconds. While a channel is paused, its messages can't be resent; resume sending first.

## Pause or resume email or SMS sending

Pause a channel to stop all its messages for a while, for example while the mail server is being changed or after a template was sent by mistake. The switches are on the email and SMS settings pages; see [Email and SMS settings](../administration/email-and-sms.md).

1. Go to **Configuration** > **Notifications** > **Email Settings** or **SMS Settings**.
2. On the **Email sending** or **SMS sending** card, select **Pause sending**.
3. Enter a **Reason**. Everyone who sees the card sees it.
4. Under **Pause for**, choose **15 minutes**, **1 hour**, **4 hours**, **1 day** or **Until I resume it**.
5. Select **Pause sending**.

While a channel is paused, its messages are recorded as **Held**. While SMS is paused, one-time codes are still sent, so users can still sign in.

To end the pause early, select **Resume sending**. If messages were held, a dialog then offers to send them, with the recipients to choose.

> ⚠️ **Held messages are never sent automatically.** When a pause ends on its own, or you close the dialog without sending, the held messages stay held. Send them from **Pause history**.

## Review pause history

The **Pause history** tab lists every pause: the channel, who paused it and why, when it started and ended, how long it lasted and how many messages were held. On a pause that has ended, select **Send the held ones** to send the messages still waiting.

## Related topics

- [Email and SMS settings](../administration/email-and-sms.md)
- [Activity templates](activity-templates.md)
- [Step activities](step-activities.md)
- [Notifications](../requests/notifications.md)
