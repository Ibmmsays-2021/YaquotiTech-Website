# Vendors

> 📷 Screenshot needed: **Configuration** > **Vendors** > **Vendor Categories**, showing category cards with their vendor counts

Vendors are the suppliers your organization works with. They register themselves from the sign-in page into a vendor category, a group of administrators reviews each registration, and accepted vendors get an account. See [Create an account](sign-up.md).

To manage vendors, your system role needs the **Vendors** permissions. See [System roles](system-roles.md).

Both lists are under **Configuration** > **Vendors**: **Vendor Categories** and **Vendors List**.

## Create a vendor category

A vendor category groups vendors who supply the same kind of thing, such as *IT equipment*, and decides what they must tell you when they register.

1. Open **Vendor Categories** and select **New**.
2. Enter a **Name**, and choose the **Administration Group** whose members review registrations.
3. Optionally, add a **Description** and an image.
4. Under **Registration Form**, build the form vendors fill in when they choose this category. See [Form builder](../process-design/step-form-builder.md).
5. Select **Save**.

| Field | Details |
|---|---|
| **Name** | Required. 3 to 50 characters. Must be unique. |
| **Administration Group** | Required. |
| **Description** | Optional. 3 to 200 characters. |
| Image | Optional. PNG or JPG. |

## Edit or delete a vendor category

Open the category and select **Edit** or **Delete**.

A category that still has active vendors can't be deleted. Deactivate them first.

## Review a vendor registration

Members of the category's **Administration Group** see new registrations on their [Home page](../requests/home.md). Only they can accept or reject them.

- **Accept**: the vendor receives a temporary password by email and sets their own at first sign-in.
- **Reject**: you give a reason, which the vendor receives by email.

> ⚠️ **Rejecting a registration deletes it.** The vendor has to register again from the start if they want to try again.

## Deactivate or activate a vendor

In **Vendors List**, use the switch in the vendor's row. A deactivated vendor can't sign in.

## Related topics

- [Create an account](sign-up.md)
- [Home page](../requests/home.md)
- [Users](users.md)
