# Activity groups

> 📷 Screenshot needed: **Configuration** > **Process Groups** > **Activity Groups**, with a group open showing a rule using the **Current Step Approvers** operator

An activity group is the set of people a step activity is for, for example who receives the email or notification a step sends. Its rules can point at people in the request, such as the requester or the step's approvers, so one group serves every request. See [Step activities](step-activities.md).

Activity groups are created, edited and deactivated like every kind of group, with the same **Group** permission; see [User groups](user-groups.md). This page covers what is different.

To open them, go to **Configuration** > **Process Groups** > **Activity Groups**.

## Build rules around the request

Besides **Is**, **Is Not**, **Contains** and **Does Not Contain**, an activity group can use these operators with the **User** filter. They're worked out for each request.

| Operator | Who it matches |
|---|---|
| **Requester** | The requester. |
| **Requester Direct Manager** | The requester's manager. |
| **Requester Department Head** | The head of the requester's department at their site. |
| **Current Step Approvers** | The approvers of the step the activity belongs to. |
| **Previous Approver** | The person who approved the step before. |
| **Request Admin** | The request's request admins. See [Request admin groups](request-admin-groups.md). |

For example, *User Requester* **OR** *User Requester Direct Manager* reaches both the requester and their manager.

Unlike approval and request admin groups, the **User** list here also includes customers. Activity groups have no **Same As Requester** or **All** operator.

## Use an activity group in a step

1. Assign the group to the process on its **Groups** tab. See [Assign groups to a process](process-groups-tab.md).
2. Choose it in the step's activities. See [Step activities](step-activities.md).

There is no built-in activity group, so a new process has none until you assign one.

## Deactivate an activity group

> ⚠️ **Step activities lose their group.** Deactivating an activity group removes it from every process, and the step activities that used it are left without one. Choose another group in each of those activities.

## Related topics

- [User groups](user-groups.md)
- [Step activities](step-activities.md)
- [Assign groups to a process](process-groups-tab.md)
- [Activity templates](activity-templates.md)
