# Request admin groups

> 📷 Screenshot needed: **Configuration** > **Process Groups** > **Request Admin Groups**, showing the list with the built-in *AllSystemUsers* group and its locked switch

A request admin group decides who administers a process's requests. Its members are the process's request admins, who can follow and manage every request raised for it; see [Roles](../concepts/roles.md) for what they can do. Vendor categories also use request admin groups to name their admins.

Request admin groups are created, edited and deactivated like every kind of group, with the same **Group** permission; see [User groups](user-groups.md). This page covers what is different.

To open them, go to **Configuration** > **Process Groups** > **Request Admin Groups**.

## Build rules around the requester

Besides **Is**, **Is Not**, **Contains** and **Does Not Contain**, a request admin group can use:

| Operator | Who it matches |
|---|---|
| **Same As Requester** | With **Department**, **Site**, **Region**, **Position**, **Position Level** or **Vendor Category**: people who share the requester's department, site or other item. |
| **All** | With **User**: every employee and vendor. |

For example, *Department Same As Requester* **And** *Position Is HR Officer* makes the HR officers of each requester's department its admins. The **User** list offers only employees and vendors.

A request's admins are worked out when it's submitted, so changing the group affects requests submitted afterwards. [TO VERIFY: whether any action recalculates the admins of requests already submitted]

## Give a process its request admins

Assign your group to the process on its **Groups** tab, under **Admin Groups**. See [Assign groups to a process](process-groups-tab.md).

> ℹ️ **New processes start with everyone as request admin.** Every new process has the built-in *AllSystemUsers* request admin group, which matches every employee and vendor. Assign your own group and remove that one to limit who administers the process.

> ⚠️ **A process needs at least one request admin group.** Without one, it shows **Process Invalid** and requesters can't raise requests for it. See [Create a process](process-basic.md).

## Deactivate a request admin group

Deactivating removes the group from every process that uses it. If that leaves a process with no request admin group, the process becomes invalid until you assign another.

A group that a vendor category uses can't be deactivated, and **Used In System** shows **True** for it. Choose another admin group for the category first. See [Vendors](../administration/vendors.md).

The built-in *AllSystemUsers* request admin group can't be deactivated.

## Related topics

- [User groups](user-groups.md)
- [Assign groups to a process](process-groups-tab.md)
- [Roles](../concepts/roles.md)
- [Vendors](../administration/vendors.md)
