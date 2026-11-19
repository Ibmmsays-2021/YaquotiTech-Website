# User groups

> 📷 Screenshot needed: **Configuration** > **Process Groups** > **User Groups**, with the **New User Group** panel open showing a group name and two rules joined by **And**

A user group decides who may raise requests for a process. A requester sees a process in the catalog, and can submit it, only if they belong to at least one of the process's user groups. Groups are defined by rules rather than member lists, so when someone joins a department or changes position, their groups follow automatically.

All four kinds of group are created and managed the same way, as described on this page: user groups, [approval groups](approval-groups.md), [activity groups](activity-groups.md) and [request admin groups](request-admin-groups.md). To manage groups, your system role needs the **Group** permission. See [System roles](../administration/system-roles.md).

To open them, go to **Configuration** > **Process Groups**, then select **User Groups** (or another kind of group).

## Create a group

1. Select **New**.
2. Enter a **Group Name**, and optionally a **Description**.
3. Under **Set Filter**, choose a **Filter Group** and an **Operator**, then a **Value** if one is asked for.
4. To add another rule, select the plus icon next to a rule. Select **And** or **OR** to choose whether people must match every rule or any one of them.
5. Optionally, select **Preview** to see who the rules match.
6. Select **Submit**.

| Field | Details |
|---|---|
| **Group Name** | Required. 2 to 30 characters, with no space at the start or end. Must be unique among groups of the same kind, ignoring capitals. |
| **Description** | Optional. 3 to 80 characters. |
| Rules | At least one, up to 14. No two rules can be the same. |
| **Value** for **Contains** | 1 to 50 characters, with no Arabic letters. |

The **Filter Group** says what a rule looks at: **Department**, **Site**, **Region**, **Position**, **Position Level** or **Vendor Category**; a role (**Department Role**, **Site Role**, **Regional Role**, **Organizational Role** or **System Role**); or a single **User**. These come from your [organization structure](../administration/organization-structure.md), [positions](../administration/positions.md), [vendors](../administration/vendors.md) and [users](../administration/users.md). Role filters offer only **Is**. A user group can use these operators:

| Operator | Who it matches |
|---|---|
| **Is** / **Is Not** | People in, or not in, the item you choose, for example *Department Is Finance*. |
| **Contains** / **Does Not Contain** | People whose department, site or other item has a name that contains, or doesn't contain, the text you type. |
| **All** | With **User**: every employee and vendor. |

Approval, activity and request admin groups add operators that depend on the request, such as the requester's manager; their pages list them. When a group has one of those rules, **Preview** shows a **Select User** list: pick someone to see who would match if they raised the request.

A group must match at least one person through the rules that don't depend on the request. You also can't save a group whose rules and **And** / **OR** choice are the same as another group of the same kind.

> ℹ️ **Rules follow your organization data.** If a department, site, region, position, position level or role that a rule names is deactivated or removed, that rule stops counting, so the group's members can change.

## Edit a group

Open the group's **Options** menu and select **Edit**, change the name, description or rules, and select **Submit**. To see a group without changing it, select **Details** instead.

Changes apply from then on wherever the group is used. Requests already under way can keep the people worked out earlier; the [approval groups](approval-groups.md) and [request admin groups](request-admin-groups.md) pages say when. An inactive group can't be edited; activate it first.

## Deactivate or activate a group

Use the switch on the group's row. **Used In System** shows **True** when at least one process uses the group; deactivating it then asks you to confirm and lists those processes.

> ⚠️ **Deactivating a group removes it from every process and step that uses it.** Activating it again doesn't put it back: reassign it on each process's **Groups** tab. See [Assign groups to a process](process-groups-tab.md).

You can't activate a group while an active group of the same kind has the same name or the same rules. Groups can't be deleted, only deactivated.

Every system has three built-in groups that every new process starts with: the *AllSystemUsers* user group, the *RequesterUser* approval group and the *AllSystemUsers* request admin group. Their switch is locked, because they can't be deactivated.

## Restrict who can submit a process

A new process starts with the built-in *AllSystemUsers* user group, so every employee and vendor can submit it. To limit it, assign your own user group on the process's **Groups** tab and remove *AllSystemUsers*. See [Assign groups to a process](process-groups-tab.md).

> ℹ️ **Some requests don't check user groups.** Customers submitting a public process through the [customer portal](../requests/customer-portal-new-request.md) don't need to be in one, and neither do [sub-requests](../requests/sub-requests.md) raised from another request.

## Related topics

- [Assign groups to a process](process-groups-tab.md)
- [Approval groups](approval-groups.md)
- [Activity groups](activity-groups.md)
- [Request admin groups](request-admin-groups.md)
- [Choose a service](../requests/new-request-choose.md)
