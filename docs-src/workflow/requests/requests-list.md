# Requests list

> 📷 Screenshot needed: **Requests**, the filter list on the left with counts, and the table showing **Request ID**, **Process Name**, **Requester**, **Current Step** and **Request Status**

The requests list is where you find every request you're involved in: the ones you raised, the steps waiting for you, and the requests you administer. Each request appears once, at its current step.

To open it, select **Requests** in the top menu. Select a row to open the request. See [Request details](request-details.md).

## Filters

The list on the left sorts requests by what you need to do with them. Each filter shows how many requests it holds. Empty filters are hidden; turn on **Show All Filters** to see them.

| Filter | Shows requests where |
|---|---|
| **All** | You're involved in any of the ways below. |
| **Pick** | A step is waiting in the queue of an approval group you're in. Pick it to work on it. See [Pick up and assign requests](pick-up-and-assign.md). |
| **Assign** | A step of a request you administer is waiting in the queue, ready for you to assign. |
| **Assigned To You** | A request admin assigned a step to you, and you haven't accepted or declined it yet. |
| **Make An Action** | You've picked or accepted a step and it's waiting for your decision. See [Approve or decline a step](decide-on-a-step.md). |
| **Make An Update** | An approver held a request for correction and is waiting for you to update it. See [Hold a request for correction](hold-for-correction.md). |
| **Held By You** | You held a request for correction and it hasn't been updated yet. Once it's updated, it's back under **Make An Action**. |
| **Stopped SLA** | The deadline of a step you approve has been stopped. See [Request deadlines and escalation](request-sla.md). |
| **From Escalation** | A step you approve or administer is past its deadline and has been escalated. |
| **Waiting Sub Request** | A step you approve is waiting for its required sub-requests to finish. See [Sub-requests](sub-requests.md). |
| **Managed By You** | You're a request admin of the request. |
| **Assigned By You** | You assigned one of its steps to someone. |
| **My Requests** | You raised the request. |
| **On My Behalf** | Someone raised the request in your name. |
| **Closed** | A request you raised has finished: completed, rejected or cancelled. |
| **Archive** | You took a decision on one of its steps. |

> ℹ️ **Counts can lag behind by up to two minutes.** The list itself reloads within seconds when a request changes, and shows **Updates automatically** at the top. To reload now, select the refresh button.

A step whose approver or approval group no longer exists doesn't appear in **Pick**. A request admin has to give it a new approver. See [Steps without an approver](incidents.md).

## Columns

| Column | What it shows |
|---|---|
| **Request ID** and **Request Code** | The request's number and code. Quote either when you contact someone about a request. |
| **Process Name** | The service that was requested. |
| **Requester** | The person the request is for. For a request raised on someone's behalf, this is that person. |
| **Current Step** | The step the request is at now. |
| **Request Status** | Where the request stands, for example **Processing** or **Completed**. See [Request and step statuses](../concepts/statuses.md). |
| **Request Type** | **Manual** for a request raised on the form, **Bulk** for one imported from Excel, **Google Form** for one received from a Google Form. |
| **Priority** | The process's priority: **Low**, **Normal**, **High** or **Emergency**. |
| **Due Date** | When the whole request should be finished. |
| **Conclusion** | The conclusion recorded on the request, if any. |
| **Tags** | Your own tags on the request. Other people don't see your tags. |

To change which columns you see, use **Choose Columns** above the table.

## Search for a request

1. Type or pick a value in the filter under a column heading, for example **Request ID** or **Request Status**.
2. Press Enter.

To search the content of requests, select **Filter** and use these fields:

| Field | Details |
|---|---|
| **Request Content** | Finds requests whose form values or notes contain the text. At least 3 characters. Fields you're not allowed to see aren't searched. |
| **From** and **To** | Limit the list to requests created between these dates. |

The search applies to the filter you have selected on the left. To search all your requests, select **All** first.

## Related topics

- [Request details](request-details.md)
- [Request and step statuses](../concepts/statuses.md)
- [Pick up and assign requests](pick-up-and-assign.md)
- [Submit a request](new-request-submit.md)
- [Home page](home.md)
