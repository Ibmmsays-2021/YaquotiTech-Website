# Organization roles

> 📷 Screenshot needed: **Configuration** > **Organization** > **Organization Roles**, **Regional Roles** tab, showing a role with the users associated to it

Organization roles name the positions of responsibility in your organization, such as a regional manager or a site HR officer, and who holds each one. Groups can then select their members by role instead of by name, so when someone new takes on a role, you change it in one place.

Each role has a scope:

| Tab | The role is held | Example |
|---|---|---|
| **Organization Roles** | Once, for the whole organization | Chief Executive |
| **Regional Roles** | Once in each region | Regional Manager |
| **Site Roles** | Once at each site | Site Administrator |
| **Department Roles** | Once in each department of each site | HR Officer |

To manage organization roles, your system role needs the **Organization Roles** permissions. See [System roles](system-roles.md).

To open them, go to **Configuration** > **Organization** > **Organization Roles**.

## Create an organization role

1. Select **New**.
2. Under **Select Role**, choose the scope.
3. Enter a **Role Name**, and optionally a **Role Description**.
4. Select **Submit**.

| Field | Details |
|---|---|
| **Role Name** | Required. 2 to 30 characters. Must be unique within its scope. |
| **Role Description** | Optional. Up to 80 characters. |

## Associate users with a role

1. Open the role's tab and select **Associate** on the role.
2. Choose the user who holds the role. For a regional, site or department role, choose one user for each region, site or site department listed.
3. Select **Submit**.

You can also choose the holders of regional, site and department roles when you create or edit a region, site or department. See [Organization structure](organization-structure.md).

## Edit an organization role

Select **Edit** on the role and change its name or description.

## Delete an organization role

1. Select **Delete** on the role.
2. Confirm.

> ⚠️ **Deleting a role can't be undone.** It removes every user associated with it, and group rules based on the role stop matching anyone. The confirmation lists the groups that use the role; update them first. See [User groups](../process-design/user-groups.md).

## Related topics

- [Organization structure](organization-structure.md)
- [Approval groups](../process-design/approval-groups.md)
- [User groups](../process-design/user-groups.md)
