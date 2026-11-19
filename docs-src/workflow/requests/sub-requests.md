# Sub-requests

> 📷 Screenshot needed: the **Create Sub-Request** window, with a process chosen in **Choose From Sub Process**, **Requested By** set to **Requester** and **Required** ticked

A sub-request is a request raised from a step of another request, for a related service. For example, a new-employee request can raise a laptop request from its IT step. The parent request can wait until the sub-request is finished.

An approver can create sub-requests on a step that allows it, from the processes the step offers. See [Approver actions](../process-design/step-approver-actions.md).

## Create a sub-request

You need to have picked the step. See [Pick up and assign requests](pick-up-and-assign.md).

1. Open the request. On the current step, open the **Sub Requests** tab and select **Create**.
2. In **Choose From Sub Process**, select the process.
3. Under **Requested By**, choose who fills in the sub-request: **Approver** (you) or **Requester**.
4. If the requester fills it in, tick **Required** if the parent request must wait for it.
5. Select **Create**.

| Requested By | What happens |
|---|---|
| **Approver** | The sub-request form opens for you to fill in now. It's always required. |
| **Requester** | The requester receives an email with a link to the sub-request form. The sub-request shows as **Waiting For Requester** until they submit it. |

You can't create a sub-request while the step's deadline is stopped, or from a process that is held or incomplete. You can't create a second sub-request of the same process while the first is unfinished.

## Fill in a sub-request

When an approver asks you for a sub-request, open the link in the email. The sub-request's form opens like a new request. See [Submit a request](new-request-submit.md).

You can submit each link once. The link works only for you, and stops working if the sub-request is cancelled.

You can also find sub-requests in the **Sub Requests** tab of your request.

## Required sub-requests

> ℹ️ **A required sub-request pauses its parent step.** The step's deadline stops, and the approver can't approve until every required sub-request is completed or cancelled. The step shows under **Waiting Sub Request** in the approver's [requests list](requests-list.md). Once the last one closes, the deadline starts again.

An optional sub-request doesn't hold the parent request, which can move on before the sub-request is finished.

## Cancel a sub-request

The approver can cancel a sub-request from the **Sub Requests** tab of the current step: select **Cancel** on its row.

Cancelling or completing the parent request affects its sub-requests:

- When the parent request is cancelled, every open sub-request is cancelled too, including their own sub-requests.
- A requester can't cancel a sub-request they raised from their own request.

## Sub Requests and Sub Requests Report tabs

| Tab | What it shows |
|---|---|
| **Sub Requests** | Every sub-request of this request, with its process, requester, step, status and due date. Select **View** to open one. The requester and request admins see it. |
| **Sub Requests Report** | Counts of sub-requests: **Total Sub Requests**, **Created For CurrentStep**, **Created By You**, and for the **Whole Request**. Request admins see it. |

A sub-request's own details page shows its **Parent Request** in the top cards. See [Request details](request-details.md).

## Related topics

- [Request details](request-details.md)
- [Approve or decline a step](decide-on-a-step.md)
- [Submit a request](new-request-submit.md)
- [Approver actions](../process-design/step-approver-actions.md)
- [Request deadlines and escalation](request-sla.md)
