# Cancel or reopen a request

> 📷 Screenshot needed: a request's details page with the **Actions** menu open, showing **Cancel**

A request can be cancelled by its requester or by the approver working on it. A requester who cancels their own request can change their mind and reopen it.

## Cancel your request

As the requester, you can cancel a request while it's in progress, when its current step allows it.

1. Open the request.
2. Select **Actions** > **Cancel**.
3. Confirm.

The request's status becomes **Cancelled | Requester**, and it moves to **Closed** in your [requests list](requests-list.md). Any sub-requests raised from it are cancelled too.

If **Cancel** isn't in the menu, the current step doesn't let requesters cancel. Contact the request admin. See [Requester actions](../process-design/step-requester-actions.md).

You can't cancel a sub-request that you raised from your own request. See [Sub-requests](sub-requests.md).

## Cancel a request as an approver

An approver cancels from the step they've picked, with a reason. See [Approve or decline a step](decide-on-a-step.md).

The request's status becomes **Cancelled | Approver**, and its sub-requests are cancelled too.

## Reopen a request

You can reopen a request that you cancelled yourself.

1. Open the request.
2. Select **Actions** > **Reopen**.

The request starts again from its first approval step, and its status returns to **Processing**. Its due date is recalculated: it gets the same working time it had at the start, counted from now.

> ℹ️ **A reopened request goes through every step again.** Approvals given before you cancelled don't count. Each step's approver decides again.

A request cancelled by an approver can't be reopened. Raise a new request instead. See [Submit a request](new-request-submit.md).

## Related topics

- [Approve or decline a step](decide-on-a-step.md)
- [Request and step statuses](../concepts/statuses.md)
- [Requester actions](../process-design/step-requester-actions.md)
- [Request history](request-history.md)
