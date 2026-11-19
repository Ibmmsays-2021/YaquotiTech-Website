# Positions and position levels

> 📷 Screenshot needed: **Configuration** > **User Management** > **Positions**, with the **Users with Position** panel open

A position is a job title, such as *Accountant*. A position level is a grade, such as *Senior*. Every employee has one of each, and groups can select their members by them. See [User groups](../process-design/user-groups.md).

To manage them, your system role needs the **Position** and **Position Level** permissions. See [System roles](system-roles.md).

Both are under **Configuration** > **User Management**: **Positions** and **Position Levels**.

## Create a position or position level

1. Open **Positions** or **Position Levels** and select **New**.
2. Enter the **Position Name** or **Position Level Name**.
3. Select **Submit**.

The name is required, 2 to 20 characters, and must be unique.

## Edit a position or position level

Open its **Options** menu and select **Edit**. Inactive ones can't be edited.

## See who has a position or level

Open its **Options** menu and select **Preview Users**.

## Deactivate or activate a position or position level

Use the switch in its row. Group rules based on it stop matching while it is inactive, and match again when you activate it.

> ⚠️ **Deactivating a position removes it from every user who has it.** Those users have no position until you give them one again; activating the position doesn't restore it. See [Users](users.md).

A position level can't be deactivated while any user has it. Move those users to another level first.

## Related topics

- [Users](users.md)
- [Organization structure](organization-structure.md)
- [User groups](../process-design/user-groups.md)
