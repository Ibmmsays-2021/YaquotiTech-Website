# Request details

> 📷 Screenshot needed: a request's details page, showing the top cards, the **Actions** button, the **Details** tab with **Request Steps** and one step expanded

The request details page shows everything about one request: who raised it, where it stands, every step it has passed through, and the data entered at each step. It's also where you act on a request.

To open it, select a request in the [requests list](requests-list.md). To move through the requests of the filter you came from without going back, use **Previous Request** and **Next Request**.

## Top cards

| Card | What it shows |
|---|---|
| **Requester Information** | The person the request is for, with **Email**, **Phone** and **User Type**. For a request raised on someone's behalf, **Requested By** shows who raised it. |
| **Request Information** | **Request ID**, **Request Code**, **Process Name**, **Request Status**, **Request Priority** and **Request Type**. A sub-request also shows its **Parent Request**. |
| **Request Timing** | When the request was created and last changed, its **Request Due Date**, and whether it is on track, due soon or overdue. See [Request deadlines and escalation](request-sla.md). |
| **Request Participants** | **You Joined As** shows your role on this request. Also shows the **Request Admins** and the current approval group or approver. Select **View members** to see who is in the group. |

For the meaning of each status, see [Request and step statuses](../concepts/statuses.md).

## Actions

The **Actions** button lists what you can do on the request now. It changes with your role and the request's state, and is hidden when there's nothing for you to do.

| Action | Who sees it | See |
|---|---|---|
| **Cancel** | The requester | [Cancel or reopen a request](cancel-and-reopen.md) |
| **Reopen** | The requester, on a request they cancelled | [Cancel or reopen a request](cancel-and-reopen.md) |
| **Assign Approver** | The requester, on a step that lets them choose its approver | [Pick up and assign requests](pick-up-and-assign.md) |
| **Assign** | A request admin, while the step waits in the queue | [Pick up and assign requests](pick-up-and-assign.md) |
| **Refresh Current Approver Group** | A request admin, while the step waits in the queue | [Pick up and assign requests](pick-up-and-assign.md) |
| **Stop SLA** and **Run SLA** | A request admin | [Request deadlines and escalation](request-sla.md) |
| **Solve Incident** | A request admin, on a step with no approver | [Steps without an approver](incidents.md) |

Actions on the current step itself, such as **Pickup** or **Approve**, are on the step in the **Details** tab.

To print the request or export it to a file, select **Print / Export**. See [Print or export a request](print-and-export.md).

## Details tab

**Request Steps** lists the steps in order. Select a step to jump to it. **Submitted Data** is the form the requester filled in. Each later step shows:

| Part | What it shows |
|---|---|
| **Step Details** | The step's approver, **Step Due Date** and **Step Description**. |
| **Fields** | The data entered at this step. On the current step, this is the form the approver fills in. |
| **Activities** | Emails, notifications and other activities that ran on this step. See [Conversations and activities](conversations-and-activities.md). |
| **Sub Requests** | Sub-requests raised from this step. See [Sub-requests](sub-requests.md). |
| **Check-list** | Tasks the approver ticks before deciding. Required tasks must be ticked. |
| **Step Notes** | Notes the approver added on the step, with who wrote them and when. |

A step that was held for correction is marked **Held**. See [Hold a request for correction](hold-for-correction.md).

Some processes show requesters only the steps and the fields, without the other details.

## Other tabs

| Tab | Who sees it | See |
|---|---|---|
| **History** | Everyone on the request | [Request history](request-history.md) |
| **Conversations** | Request admins | [Conversations and activities](conversations-and-activities.md) |
| **OLA** | Request admins | [Request deadlines and escalation](request-sla.md) |
| **Sub Requests** | The requester and request admins | [Sub-requests](sub-requests.md) |
| **Sub Requests Report** | Request admins | [Sub-requests](sub-requests.md) |

## Add tags or a conclusion

Under **Additional Info**, you can label the request and record its outcome.

- **Request Tags** are your own labels, for example *urgent* or *follow up*. Only you see them, and you can search for them in the **Tags** column of the [requests list](requests-list.md). Select **Add Tag**, enter the tags and select **Save Tags**.
- **Request Conclusion** is one shared summary of the request's outcome. Select **Add Conclusion**, write it and select **Save Conclusion**.

> ℹ️ **Everyone on the request shares the same conclusion.** Anyone who can open the request can edit it, and the last change replaces the previous text. It shows in the **Conclusion** column of the requests list.

## Related topics

- [Requests list](requests-list.md)
- [Approve or decline a step](decide-on-a-step.md)
- [Request history](request-history.md)
- [Request and step statuses](../concepts/statuses.md)
- [Roles](../concepts/roles.md)
