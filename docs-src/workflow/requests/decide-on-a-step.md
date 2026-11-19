# Approve or decline a step

> 📷 Screenshot needed: the **Details** tab of a picked request, with an earlier step marked as reviewed and the current step's form showing **Approve** and **Not Approve**

When a request reaches a step you approve, you review what earlier steps entered, fill in your step's fields, and record your decision. The request then moves to the next step.

Before you can decide, the step must be yours: pick it up from the queue, or accept it when a request admin assigns it to you. See [Pick up and assign requests](pick-up-and-assign.md). Steps waiting for your decision are under **Make An Action** in the [requests list](requests-list.md).

Open the request and go to the **Details** tab.

## Review the earlier steps

1. Read the fields of each earlier step.
2. Select **Mark As Reviewed** on each step you've checked.

The step turns blue so you can keep track of what you've read. To undo, select **Back To Review**. Marking is only a reading aid: it isn't saved and isn't required to decide.

If something in an earlier step needs correcting, select **Hold For Correction** on that step instead. See [Hold a request for correction](hold-for-correction.md).

## Approve a step

1. Fill in the fields of your step.
2. In **Check-list**, tick the tasks you've done. Required tasks must be ticked.
3. Optionally, select **Add Note** and write a note for the step.
4. Select **Approve**.

The request moves to the next step, or completes if this was the last one.

You can't approve while a required sub-request of this step is still open. See [Sub-requests](sub-requests.md).

> ℹ️ **Button names can differ.** Administrators can rename **Approve**, **Not Approve** and **Cancel Request** for each step, for example to *Accept* or *Reject*. See [Approver actions](../process-design/step-approver-actions.md).

To keep your entries and finish later, select **Save as draft**. The draft is visible only to you.

## Not approve a step

1. Select **Not Approve**.
2. Enter the **Reason for Not Approving**.
3. Select **Submit**.

> ℹ️ **Not approving doesn't end the request.** The step closes as not approved and the request moves on, like an approval. What happens next depends on how the process is built: a rule can, for example, send the request back or cancel it. See [Logic and automation](../process-design/step-logic-and-automation.md). To stop the request completely, cancel it instead.

## Cancel the request

Steps that don't offer **Not Approve** offer **Cancel Request** instead.

1. Select **Cancel Request**.
2. Enter the **Reason for Cancel**.
3. Select **Submit Cancel**.

> ⚠️ **Cancelling ends the request and all its sub-requests.** The request's status becomes **Cancelled | Approver**. Unlike a request the requester cancels, the requester can't reopen it. See [Cancel or reopen a request](cancel-and-reopen.md).

## Decide on a customer's request

When the requester is a customer, your note reaches them on the customer portal:

- When you approve, you can add an optional customer note.
- When you cancel, you enter the reason, then a **Customer Cancellation Note**, which is required.

See [Customer portal: track a request](customer-portal-inquiry.md).

## Confirm with a one-time code

Some steps ask you to confirm your decision with a one-time code (OTP).

1. Take your decision as usual. The **Verify OTP** window opens and a 6-digit code is sent by SMS to your mobile number.
2. Enter the code in **OTP**.
3. Select **Submit**.

The code is valid for 10 minutes. If it doesn't arrive or expires, wait for the timer and select **Resend**.

You need a mobile number on your profile to receive the code. See [Profile and settings](../administration/profile-and-settings.md). Required check-list tasks must be ticked before a code is sent.

## Related topics

- [Pick up and assign requests](pick-up-and-assign.md)
- [Hold a request for correction](hold-for-correction.md)
- [Request details](request-details.md)
- [Approver actions](../process-design/step-approver-actions.md)
- [Request and step statuses](../concepts/statuses.md)
