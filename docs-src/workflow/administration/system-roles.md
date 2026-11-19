# System roles

> 📷 Screenshot needed: **Configuration** > **User Management** > **System Roles**, with the **New System Role** panel open and one permission group expanded

A system role decides which screens and actions a user can use. Each user has one system role, and a role is a set of permissions. Each permission pairs a feature with an action:

| Feature | Action | Lets the user |
|---|---|---|
| **Process** | **Create** | Create processes |
| **Users** | **Assign** | Give a user a system role |
| **Reports** | **Export** | Export reports |

To manage system roles, your system role needs the **Roles** permissions. To give a role to a user, it needs **Users** > **Assign**.

To open the list, go to **Configuration** > **User Management** > **System Roles**.

## Create a system role

1. Select **New**.
2. Enter a **Role Name**.
3. In the permissions list, select the actions the role allows. Select a group's checkbox to grant all its actions, or **Select All** to grant everything.
4. Select **Submit**.

| Field | Details |
|---|---|
| **Role Name** | Required. 3 to 30 characters, with no spaces at the start or end. Must be unique, ignoring capitals, including inactive roles. Can't be *Administrator*, *Guest* or *SuperAdmin*. |

## Edit a system role

Open the role's **Options** menu and select **Edit**. You can rename the role and change its permissions. The change applies to every user who has the role.

The built-in **Administrator** and **Guest** roles can't be edited. An inactive role can't be edited until you activate it.

## See a role's permissions or users

From the role's **Options** menu:

- **Details** lists the role's permissions. Select **Show granted only** to hide the ones it doesn't have.
- **Preview Users** lists the users who have the role.

## Assign a role to a user

1. Go to **Configuration** > **User Management** > **Users**.
2. Open the user's **Options** menu and select **Assign Role**.
3. Choose the **Role Name**.
4. Select **Submit**.

The new role replaces the user's current one. Only active roles are offered, and an inactive user can't be given a role. Only the super administrator can change the role of a user who has the **Administrator** role, and the built-in administrator account's role can't be changed.

## Deactivate or activate a system role

Use the switch in the role's row. The built-in roles have no switch.

> ⚠️ **Deactivating a role moves all its users to the Guest role.** They lose the role's permissions straight away. Group rules that select members by this role stop matching anyone. See [User groups](../process-design/user-groups.md).

> ℹ️ **Activating a role doesn't give it back to its users.** They stay on **Guest** until you assign the role to each of them again.

Group rules based on the role also stay off after you activate it. [TO VERIFY: whether those group rules can be turned back on, and how]

## Related topics

- [Users](users.md)
- [Roles](../concepts/roles.md)
- [User groups](../process-design/user-groups.md)
