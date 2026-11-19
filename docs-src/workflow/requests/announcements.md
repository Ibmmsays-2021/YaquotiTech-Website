# Announcements

> 📷 Screenshot needed: **Configuration** > **Process Management** > **Announcements**, showing announcement cards marked **Active**, **Not Active** and **Expired**

Announcements promote a service to customers. Each one points to a category, a sub category or a process, and appears as a banner on the customer portal's home page during the period you set. See [Customer portal: submit a request](customer-portal-new-request.md).

Announcements are shown on the customer portal only. Employees don't see them in the main application.

To manage announcements, your system role needs the **Announcements** permissions. See [System roles](../administration/system-roles.md).

To open them, go to **Configuration** > **Process Management** > **Announcements**.

## Create an announcement

1. Select **New**.
2. Enter a **Title**, and optionally a **Description** and an image.
3. Under **Announcement Data**, choose the type, **Category**, **Sub Category** or **Process**, and select the item to announce.
4. Under **Timings**, choose **Date Range** or **Single Day** and set the dates. Optionally, select **Specify Time** to show it only between **From Time** and **To Time**.
5. Select **Save**.

| Field | Details |
|---|---|
| **Title** | Required. 3 to 50 characters. Must be unique. |
| **Description** | Optional. 3 to 800 characters. |
| Type and item | Required. For a sub category, choose its category first; for a process, its category and sub category. |
| Dates | Required. The announcement shows from the start to the end of the period. |

**Quick Presets** fill in common time ranges, such as **Work Hours** or **Morning Shift**.

## Announcement status

| Status | What it means |
|---|---|
| **Active** | Today is within its period, so customers see it. |
| **Not Active** | Its period hasn't started yet. |
| **Expired** | Its period has ended. Customers no longer see it. |

## Edit or delete an announcement

Open the card's menu and select **Edit** or **Delete**. Deleting can't be undone.

## Related topics

- [Customer portal: submit a request](customer-portal-new-request.md)
- [Service catalog](../process-design/service-catalog.md)
- [System roles](../administration/system-roles.md)
