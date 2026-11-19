# Vaults, keys and Google Forms

> 📷 Screenshot needed: **Configuration** > **Developer Space** > **Integration Vaults**, the **Create Integration Vault** form with two variables, one of them masked

Three settings connect Yaquoti to other systems. Integration vaults keep the passwords and keys your integrations sign in with. Integration keys let another system work in Yaquoti. Google Forms lets people raise a request by filling in a Google form.

Vaults and keys need the **Developer Space** permissions; Google Forms needs the **Google Forms Settings** permissions. See [System roles](../administration/system-roles.md).

To open them, go to **Configuration** > **Developer Space** > **Integration Vaults**, **Integration Keys** or **Google Forms**.

## Store credentials in a vault

Keep passwords and keys in a vault so that they're entered once and don't appear in the integrations that use them.

1. On **Integration Vaults**, select **New**.
2. Enter a **Credential Name** and, optionally, a **Description**.
3. For each value, select **Add** and enter its **Name** and **Value**. Turn on **Mask value** for anything secret.
4. Select **Save Credential**.

| Field | Details |
|---|---|
| **Credential Name** | Required. 3 to 50 characters. Must be unique. |
| **Description** | Optional. 2 to 100 characters. |
| Variable **Name** | Required. 3 to 50 characters. Must be unique within the credential. |
| **Value** | Up to 500 characters. |
| **Mask value** | Hides the value on screen. People who can open the vault can still show and copy it in **Details**. |

To use a value, open an integration and select the plus sign next to a header or param value, then choose the credential and the variable. See [Integration factories](integrations.md).

> ⚠️ **Integrations find a vault value by its names.** If you rename or delete a credential or one of its variables, the integrations that use it stop receiving the value. Deleting a credential can't be undone.

## Create an integration key

An integration key lets another system, such as a company portal, work in Yaquoti through its own account. The system role you assign decides what the key may do.

1. On **Integration Keys**, select **New**.
2. Enter a **Key Name** and, optionally, a **Description**.
3. Choose the **Assigned Role**.
4. Choose **Never Expires** or **Set Expiration Date**.
5. Select **Generate Key**.

| Field | Details |
|---|---|
| **Key Name** | Required. 2 to 50 characters, in English. Must be unique. Can't be changed later. |
| **Description** | Optional. 2 to 100 characters. |
| **Assigned Role** | Required. |
| **Expiration Date** | Required with **Set Expiration Date**. After this date the key is refused. |

Give the key to the other system's administrator. To see or copy it later, open the key's options menu and select **Details**. **Edit** changes the role, description and expiry.

> ⚠️ **Deleting a key can't be undone.** If the other system still needs access, create a new key and give it to them.

A deleted key is refused from then on. [TO VERIFY: a deleted key is refused straight away]

## Connect Google Forms

Your IT team first creates a Google sign-in client for Yaquoti in Google Cloud Console and a Google form to act as the template.

1. On **Google Forms**, **Configuration** tab, copy the **Redirect URI** and add it to the sign-in client in Google Cloud Console.
2. Enter the **Client ID**, the **Client Secret** and the **Template FormId**.
3. Select **Save Configuration**.
4. Select **Authenticate with Google** and sign in with the Google account that will own the forms.

| Field | Details |
|---|---|
| **Client ID**, **Client Secret** | Required. 10 to 500 characters. From Google Cloud Console. |
| **Template FormId** | Required. 10 to 500 characters. The Google form copied for every process. To accept files, add file-upload questions to it with the same titles as the process's file fields; otherwise its file questions are removed. |

**Authenticate with Google** is available only once the configuration is saved with no unsaved changes. **Need help?** downloads a step-by-step configuration guide.

Then generate a form link for each process; see [Hold, release, move or copy a process](process-lifecycle.md).

## Track or stop a Google form link

The **Status** tab lists every form link with its process, the link to copy, its expiration and its status: **Active**, **Stopped** or **Expired**. A process can have only one valid link at a time.

Responses are collected every few minutes. Each one becomes a request raised in the name of the email address the respondent gave; a new address is added as a Google Forms user. A response from the address of a deactivated user doesn't become a request.

To end a link before it expires, open its menu and select **Stop**.

> ⚠️ **Stopping a link deletes the Google form at once.** There is no confirmation, and a stopped link can't be started again. Generate a new link for the process instead.

## Related topics

- [Integration factories](integrations.md)
- [Hold, release, move or copy a process](process-lifecycle.md)
- [System roles](../administration/system-roles.md)
