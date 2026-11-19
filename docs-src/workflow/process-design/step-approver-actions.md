# Approver actions

> 📷 Screenshot needed: an approval step's **Approver Actions** tab, with **OTP Verification**, **Can Hold Previous Step**, **Can Decline** and **Approver can make another request** selected, and two processes chosen in **Sub-Processes**

Approver actions decide what the approver of a step can do besides approving: send the request back for correction, decline it without ending it, raise a sub-request, and whether they must first confirm with a one-time password. Each approval step has its own settings.

To change them, your system role needs the **Update Process** permission. See [System roles](../administration/system-roles.md).

To open them, go to **Configuration** > **Process Management** > **Service Catalog**, open the process, select the **Steps** tab, select an approval step and open **Approver Actions**. The same tab holds the step's approver; see [Step approver](step-approver.md). Like every step setting, these reach only requests submitted afterwards. See [Process steps](steps-and-flow.md).

## Choose what the approver can do

1. Select the options the approver needs.
2. If you selected **Approver can make another request**, choose one or more processes in **Sub-Processes**.
3. Select **Update**.

| Field | Details |
|---|---|
| **OTP Verification** | The approver must confirm with a one-time password before acting on the step. See [Approve or decline a step](../requests/decide-on-a-step.md). |
| **Can Hold Previous Step** | The approver can send the request back to the requester or an earlier step for correction. See [Hold a request for correction](../requests/hold-for-correction.md). |
| **Can Decline** | The approver gets a not-approve button instead of the cancel button. See below. |
| **Approver can make another request** | The approver can raise a sub-request from the step. See [Sub-requests](../requests/sub-requests.md). |
| **Sub-Processes** | Required when **Approver can make another request** is on. The processes the approver can raise a sub-request for. Lists the other processes that aren't on hold and are ready for requests. |

> ℹ️ **Can Decline replaces cancelling, it doesn't add to it.** Without it, the approver can cancel the request, which ends it. With it, the approver can only not approve: the outcome is recorded and the request moves on to the next step. See [Cancel or reopen a request](../requests/cancel-and-reopen.md).

The button names come from the labels on the step's **Basic** tab. See [Process steps](steps-and-flow.md).

The **Sub-Processes** list is the exception to new requests only: a change to it applies at once, also to requests already at the step. A process you chose that is later put on hold, or loses an approver, isn't offered to the approver. Turning off **Approver can make another request** clears the list.

## Related topics

- [Step approver](step-approver.md)
- [Requester actions](step-requester-actions.md)
- [Approve or decline a step](../requests/decide-on-a-step.md)
- [Hold a request for correction](../requests/hold-for-correction.md)
- [Sub-requests](../requests/sub-requests.md)
- [Cancel or reopen a request](../requests/cancel-and-reopen.md)
