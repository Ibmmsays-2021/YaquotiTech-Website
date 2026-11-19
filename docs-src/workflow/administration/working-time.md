# Holidays and working hours

> 📷 Screenshot needed: **Configuration** > **Time** > **Working Hours**, with the **New Working Hours** panel open showing the days ticked

Holidays and working hours tell Yaquoti Workflow when each site is at work. Step deadlines count only working time, so a request that arrives on a Friday evening isn't late on Saturday morning. See [Step SLA](../process-design/step-sla.md).

Both are set per site, on the time zone of the site's region. See [Organization structure](organization-structure.md).

To manage them, your system role needs the **Holidays** and **Working Hours** permissions. See [System roles](system-roles.md).

Both are under **Configuration** > **Time**.

## Add a holiday or vacation

1. Open **Holidays & Vacations** and select **New**.
2. Enter a **Name**.
3. Choose **Single Day** and its **Vacation Date**, or **Date Range** and its **Start Date** and **End Date**.
4. Choose the **Region** and one or more of its sites.
5. Optionally, add a **Description**.
6. Select **Submit**.

| Field | Details |
|---|---|
| **Name** | Required. 2 to 50 characters. Must be unique within the region. |
| **End Date** | Can't be before the **Start Date**. |
| **Description** | Optional. Up to 80 characters. |

## Edit or turn off a holiday

To edit a holiday, open its **Options** menu and select **Edit**. To turn it off, use the switch in its row.

You can change or turn off a holiday that hasn't ended yet, for example to end it early. A holiday whose last day has passed can't be changed, and its new last day can't be in the past.

## Set a site's working hours

1. Open **Working Hours** and select **New**.
2. Optionally, enter a **Shift name**, such as *Morning shift*.
3. Choose the **Start Time** and **End Time**.
4. Tick the working days.
5. Choose the **Region** and one or more of its sites.
6. Select **Submit**.

The start and end times can't be the same. A record holds one shift.

> ℹ️ **A site has one set of working hours at a time.** You can't add or activate working hours for a site that already has active ones. Deactivate the old record first, or edit it.

## Edit, deactivate or activate working hours

To edit, open the record's **Options** menu and select **Edit**. To deactivate or activate it, use the switch in its row.

## Related topics

- [Organization structure](organization-structure.md)
- [Step SLA](../process-design/step-sla.md)
