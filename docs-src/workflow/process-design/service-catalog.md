# Service catalog

> 📷 Screenshot needed: **Configuration** > **Process Management** > **Service Catalog**, showing several category cards, one of them **Inactive**

The service catalog is the list of services that requesters choose from when they [raise a request](../requests/new-request-choose.md). You organize it in three levels:

| Level | Example |
|---|---|
| **Category** | Human Resources |
| **Sub category** | Leave |
| **Process** | Annual Leave Request |

To manage the catalog, your system role needs the **Categories** and **Sub Categories** permissions. See [System roles](../administration/system-roles.md).

To open it, go to **Configuration** > **Process Management** > **Service Catalog**.

## Create a category

1. Select **New**.
2. Enter a **Category Name**. The **Initials** fill in automatically.
3. Optionally, add a **Description** and an image.
4. Select **Submit**.

| Field | Details |
|---|---|
| **Category Name** | Required. 2 to 50 characters. Must be unique in the catalog. |
| **Initials** | Required. Up to 3 characters, shown on the card when there is no image. |
| **Description** | Optional. Up to 100 characters. |
| Image | Optional. PNG or JPG, 1 MB at most. |

## Create a sub category

1. Open the category.
2. Select **New**.
3. Enter a **Sub Category Name**, and optionally a description and an image.
4. Select **Submit**.

The fields follow the same rules as a category's. A sub category name only needs to be unique within its category, so two categories can each have a *General* sub category.

Next, [create the processes](process-basic.md) inside the sub category.

## Edit a category or sub category

Open the card's menu and select **Edit**. To see who created or last changed it, select **Details** instead.

## Deactivate or activate a category

Deactivate a category to take all its services out of use for a while, for example during a reorganization.

1. Open the category card's menu.
2. Select **Deactivate** or **Activate**.
3. Confirm.

> ⚠️ **Deactivating a category puts every process in it on hold.** Requesters can't raise requests for any of them until they're released. The card shows **Inactive** and can't be opened.

> ℹ️ **Activating a category doesn't release all its processes.** It releases only one static and one dynamic process from its first sub category. Release the others one by one. See [Hold or release a process](process-lifecycle.md).

If your licence's limit on active categories has been reached, you can't activate another one. Contact your system administrator. See [Licence and version](../administration/system-information.md).

Sub categories can't be deactivated. To stop a sub category's services, hold its processes.

## Delete a category or sub category

1. Open the card's menu and select **Delete**.
2. Confirm.

> ⚠️ **Deleting removes everything under it, and can't be undone.** Deleting a category also deletes all its sub categories and their processes. If any of those processes has a request still in progress, nothing is deleted. Deactivate the category or hold the processes instead.

## Related topics

- [Create a process](process-basic.md)
- [Hold, release, move or copy a process](process-lifecycle.md)
- [Choose a service](../requests/new-request-choose.md)
