# Approval groups

> 📷 Screenshot needed: **Configuration** > **Process Groups** > **Approval Groups**, with a group open showing the rules *Department Same As Requester* **And** *Position Level Is Manager*, and the **Select User** list under **Preview**

An approval group decides who approves a step. When a request reaches a step, everyone the step's approval group matches becomes one of its approvers, and any of them can act on it. Rules can depend on the request, so one group such as *the requester's department manager* works for every requester.

Approval groups are created, edited and deactivated like every kind of group, with the same **Group** permission; see [User groups](user-groups.md). This page covers what is different.

To open them, go to **Configuration** > **Process Groups** > **Approval Groups**.

## Build rules around the requester

Besides **Is**, **Is Not**, **Contains** and **Does Not Contain**, an approval group can use these operators. They're worked out for each request.

| Operator | Who it matches |
|---|---|
| **Same As Requester** | With **Department**, **Site**, **Region**, **Position**, **Position Level** or **Vendor Category**: people who share the requester's department, site or other item. |
| **Requester** | With **User**: the requester. |
| **Requester Direct Manager** | With **User**: the requester's manager. |
| **Requester Department Head** | With **User**: the head of the requester's department at their site. |
| **Previous Approver** | With **User**: the person who approved the step before. |

For example, *Department Same As Requester* **And** *Position Level Is Manager* matches the managers in the requester's department. To check it, select **Preview** and pick a sample requester under **Select User**.

The **User** list offers only employees and vendors, and there's no **All** operator.

## Create an approval group

Create it as described in [User groups](user-groups.md). To use it, assign it to the process on the **Groups** tab, then choose it as the approver of a step. See [Assign groups to a process](process-groups-tab.md) and [Step approver](step-approver.md).

Your licence limits how many approval groups can be active at a time. When the limit is reached, you can't create or activate another; contact your system administrator. See [Licence and version](../administration/system-information.md).

## Change an approval group's members

Edit the group's rules as described in [User groups](user-groups.md).

> ℹ️ **Steps already waiting keep their approvers.** A step's approvers are worked out when the request reaches it, so a change applies to steps reached afterwards. A request admin can bring a waiting step up to date with **Refresh Current Approver Group**. See [Dynamic actions](../requests/dynamic-actions.md).

## Deactivate an approval group

> ⚠️ **Steps that use the group lose their approver.** Deactivating an approval group removes it from every process, and each step that had it as its approver is left with none. Those processes show **Process Invalid** until you choose a new approver for the steps. See [Step approver](step-approver.md).

If your licence is reduced, the most recently created approval groups are deactivated to fit the new limit; when it expires, every approval group except the built-in one is deactivated.

The built-in *RequesterUser* group matches the requester. Every new process uses it as the approver of its first step after submission, and it can't be deactivated.

## Related topics

- [User groups](user-groups.md)
- [Step approver](step-approver.md)
- [Assign groups to a process](process-groups-tab.md)
- [Dynamic actions](../requests/dynamic-actions.md)
- [Roles](../concepts/roles.md)
