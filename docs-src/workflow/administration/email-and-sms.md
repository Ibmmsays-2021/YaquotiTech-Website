# Email and SMS settings

> 📷 Screenshot needed: **Configuration** > **Notifications** > **Email Settings**, with the form filled in and **Test Connection** visible

Yaquoti Workflow sends emails and text messages when something needs a person's attention: a new account, a request waiting for approval, a one-time code. These settings tell it which mail server and SMS provider to send through.

To manage these settings, your system role needs the **Email** and **SMS** permissions. See [System roles](system-roles.md).

Both are under **Configuration** > **Notifications**.

## Set up email

1. Open **Email Settings**.
2. Enter the **Mail Server** and its port, and choose whether to **Enable SSL**.
3. Enter the **Sender** address, the sender name and the **Password** of the sending account.
4. Select **Test Connection** to check that the server accepts the details.
5. Select **Update**.

| Field | Details |
|---|---|
| **Mail Server** | Required. 5 to 50 characters. |
| Port | Required. Usually 465 with SSL, or 587 or 25. |
| **Sender** | Required. The address messages come from, and the account that signs in to the server. |
| Sender name | Required. 2 to 15 characters. The name recipients see. |
| **Password** | Required. 6 to 50 characters, with at least one letter, one digit and one of `@ $ ! % * ? &`. |

**Update** saves the settings without testing them, so test first.

> ⚠️ **Without email settings, nobody new gets an account by email.** Creating users, importing them from Excel and vendor sign-up all need working email settings. Only fast users can be created without them. See [Users](users.md).

## Set up SMS

1. Open **SMS Settings**.
2. Under **Providers**, choose the provider.
3. Enter the **Account SID**, the **AuthToken** and the number messages are sent from.
4. Turn on **Active**.
5. Select **Update**.

Each value is required: 3 to 100 characters for the account details, and 3 to 50 for the number.

To see what was sent and to whom, and to resend a message, see [Activity logs](../process-design/activity-logs.md).

## Related topics

- [Users](users.md)
- [Activity logs](../process-design/activity-logs.md)
- [Profile and settings](profile-and-settings.md)
