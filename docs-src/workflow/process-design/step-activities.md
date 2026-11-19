# Step activities

> 📷 Screenshot needed: an approval step's **Activities** tab, scrolled to **Step Activities**, with one Email row under **Activities At Start** (template chosen, one saved report, two activity groups) and its template preview open

Step activities send an email, an SMS or a system notification to chosen people when something happens on a step: when a request reaches the step, when someone sends it by hand during the step, or when the request is held for correction back to the step. The message is an [activity template](activity-templates.md), and the recipients are the members of the [activity groups](activity-groups.md) you choose.

To change activities, your system role needs the **Update Process** permission. See [System roles](../administration/system-roles.md).

To open them, go to **Configuration** > **Process Management** > **Service Catalog**, open the category, the sub category and the process, select the **Steps** tab, select the step and open **Activities**. Which sections the tab shows depends on the step:

| Section | When it's sent | Steps that have it |
|---|---|---|
| **Activities At Start** | As soon as a request reaches the step | Approval steps, **Complete**, **Cancel** |
| **Activities During** | When it is sent by hand from the request, once per request | Approval steps |
| **Step Holding** | When a request is held for correction back to this step | **Submit**, approval steps |
| **SLA Activities** | At a share of the step's SLA; see [Step SLA](step-sla.md) | Approval steps |

## Add an activity at start or during the step

1. On the step's **Activities** tab, select **Add** under **Activities At Start** or **Activities During**.
2. Choose the **Activity Type**: **Email**, **SMS** or **System Notification**.
3. Choose the **Activity Template**. The list shows only templates of that type.
4. For an email, optionally choose **Saved Reports** to attach.
5. Choose one or more groups in **Send Activity Group/s**.
6. Select **Update**.

| Field | Details |
|---|---|
| **Activity Template** | Required. Select the eye icon to preview the template's text. |
| **Saved Reports** | Email only. Each report is produced when the email is sent and attached as an Excel file. The list shows shared saved reports and your own. See [Saved and scheduled reports](../administration/saved-and-scheduled-reports.md). |
| **Send Activity Group/s** | Required. Lists only the activity groups assigned to the process. See [Assign groups to a process](process-groups-tab.md). |

**Update** saves every section of the tab at once. To remove an activity, select its **Remove Activity** icon, then **Update**.

An activity during the step isn't sent on its own: someone working on the request sends it from the request's activities. See [Conversations and activities](../requests/conversations-and-activities.md).

> ℹ️ **Changes reach new requests only.** A request takes a copy of the step's activities when it's submitted. Requests already in progress keep the activities they started with.

## Set the hold activity

When an approver [holds a request for correction](../requests/hold-for-correction.md) back to this step, a standard email tells the person who must correct it. Set a hold activity to send your own email instead.

1. On the step's **Activities** tab, go to **Step Holding** > **Hold Activity**.
2. Choose an **Activity Template**. Only email templates are offered.
3. Choose one or more groups in **Send to Activity Group**.
4. Select **Update**.

Choose both a template and a group, or neither. To go back to the standard email, select **Clear**, then **Update**.

> ⚠️ **The hold activity replaces the standard email.** Only the members of the chosen activity groups receive it. Include the person who corrects the request in one of those groups, or they aren't told that the request is waiting for them.

## Related topics

- [Activity templates](activity-templates.md)
- [Activity groups](activity-groups.md)
- [Step SLA](step-sla.md)
- [Assign groups to a process](process-groups-tab.md)
- [Conversations and activities](../requests/conversations-and-activities.md)
- [Hold a request for correction](../requests/hold-for-correction.md)
- [Activity logs](activity-logs.md)
