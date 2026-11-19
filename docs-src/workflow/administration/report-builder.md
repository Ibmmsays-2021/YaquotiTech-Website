# Report builder

> 📷 Screenshot needed: **Configuration** > **Reporting** > **Report Builder**, with columns added, a filter set and a chart under the results

The report builder lets you answer your own questions about requests, processes and users, such as *how many leave requests each department raised this month*, without waiting for a built-in report. You pick the columns and filters, run the report, and save it to run again later.

For people who know SQL, the **Query Builder** does the same from a written query.

To build reports, your system role needs the **Reports** permissions. See [System roles](system-roles.md).

Both are under **Configuration** > **Reporting**.

## Build a report

1. Open **Report Builder**.
2. Choose the **Module type**: **Request**, **Process** or **User**. For users, also choose the **User type**.
3. Select **Add Columns**, tick the properties you want and select **Confirm**.
4. Optionally, add filter conditions: a property and its **Criteria**.
5. Select **Run Query**.

The results show the **Total records** found. Only the **Tabular** report type is available today.

## Add a chart

1. Under the results, select **Add Chart**.
2. Choose the **Chart Type**, the column to **Group by** and the **Display Format**.

## Export a report

Choose a format under **Export as**: **Excel** or **PDF**.

The export runs in the background. Follow its progress and download the file from your notifications. See [Notifications](../requests/notifications.md).

## Save a report

1. Select **Save**.
2. Choose a folder, or create a **New folder**.
3. Choose whether the report is **Public** or **Private**, and optionally add a **Description**.
4. Select **Confirm**.

A folder name is 3 to 50 characters. A private report is visible only to you. To run or schedule saved reports, see [Saved and scheduled reports](saved-and-scheduled-reports.md).

## Write a query

1. Open **Query Builder**.
2. Type a query that reads data.
3. Select **Run Query**, then **Save** or **Export as** as in the report builder.

A query must contain `SELECT` and can't change data: words such as `INSERT`, `UPDATE`, `DELETE` or `DROP` are refused. If the query has a mistake, the error is shown so you can correct it.

## Related topics

- [Saved and scheduled reports](saved-and-scheduled-reports.md)
- [Built-in reports](built-in-reports.md)
- [Notifications](../requests/notifications.md)
