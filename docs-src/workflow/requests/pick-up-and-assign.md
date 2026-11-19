# Pick up and assign requests

> 📷 Screenshot needed: the **Details** tab of a queued request, showing the **Pickup** button on the current step

When a request reaches a step approved by a group, it waits in the group's queue. One member picks it up and becomes its approver for that step. A request admin can also assign the step to a member directly, and some processes let the requester choose the approver.

## Pick up a step

Steps waiting in your groups' queues are under **Pick** in the [requests list](requests-list.md).

1. Open the request.
2. On the current step in the **Details** tab, select **Pickup**.

The step is now yours: it moves to **Make An Action** and the other members no longer see it under **Pick**. To decide on it, see [Approve or decline a step](decide-on-a-step.md).

If someone else picked the step a moment before you, your pickup fails. Refresh the list.

## Release a step you picked

If you can't handle a step you picked, release it so another member can.

1. Open the request.
2. Select **Unpick-Up** on the current step.
3. Confirm.

The step goes back to the group's queue.

You can't release a step on which you're the named approver, for example when the process or the requester chose you specifically.

## Assign a step to someone

As a request admin, you can give a waiting step to one member of its approval group. Steps you can assign are under **Assign** in the requests list.

1. Open the request.
2. Select **Actions** > **Assign**.
3. In **Select User From Approval Group**, select the person.
4. Select **Save**.

The step waits for that person to accept it, and shows under **Assigned By You** in your list. You can only assign a step while it waits in the queue, before anyone picks it up.

If people joined or left the approval group after the request reached the step, select **Actions** > **Refresh Current Approver Group** to update who can pick it up.

## Accept or decline an assignment

Steps assigned to you are under **Assigned To You** in the requests list.

1. Open the request.
2. On the current step, select **Accept** or **Decline**.

When you accept, the step is yours to decide on, as if you had picked it up. When you decline, it goes back to the group's queue.

## Choose the approver as the requester

Some steps let the requester choose their approver. You can do this when you [submit the request](new-request-submit.md), or later, while the step waits in the queue:

1. Open the request.
2. Select **Actions** > **Assign Approver**.
3. In **Choose Approver group**, select a group, and optionally in **Choose Approver**, select one person.
4. Save.

When you choose a person, the step goes straight to them. When you choose only a group, the step waits in that group's queue.

## Related topics

- [Approve or decline a step](decide-on-a-step.md)
- [Requests list](requests-list.md)
- [Approval groups](../process-design/approval-groups.md)
- [Request admin groups](../process-design/request-admin-groups.md)
- [Steps without an approver](incidents.md)
