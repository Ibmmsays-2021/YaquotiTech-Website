# Organization structure

> 📷 Screenshot needed: **Configuration** > **Organization** > **Sites**, with the **Assign Departments to** panel open for one site

The organization structure tells Yaquoti Workflow where each person works. Every user belongs to a site and a department, and groups, approvers and deadlines can depend on them. The structure has three levels:

| Level | Example |
|---|---|
| **Region** | Western Region |
| **Site** | Jeddah Head Office |
| **Department** | Finance |

A region holds sites. Departments are defined once and then assigned to the sites that have them.

To manage the structure, your system role needs the **Organizations**, **Regions**, **Sites** and **Departments** permissions. See [System roles](system-roles.md).

Everything is under **Configuration** > **Organization**.

## Edit the organization details

The organization's name, logos and contact details appear on the sign-in page and across the system.

1. Open **Organization Details** and select **Edit**.
2. Change the **Name**, **About** text, logos, address or contact information.
3. Select **Save**.

| Field | Details |
|---|---|
| **Name** | Required. 2 to 100 characters. |
| **Main Logo** | PNG or JPG, 1 MB at most. Best at 962 × 263 pixels. |
| **Fav Icon** | ICO, PNG or JPG, 1 MB at most. Best at 16 × 16 pixels. The small icon in the browser tab. |

## Create a region

1. Open **Regions** and select **New**.
2. Enter a **Region Name** and choose its **Time Zone**.
3. Optionally, add a **Region Description** and the people who hold its **Regional Roles**.
4. Select **Submit**.

| Field | Details |
|---|---|
| **Region Name** | Required. 2 to 50 characters. Must be unique, ignoring capitals, including inactive regions. |
| **Time Zone** | Required. Working hours and holidays of the region's sites are counted on this clock. |

> ℹ️ **A new region starts inactive.** Turn on its switch in the list before you add sites to it or use it elsewhere.

## Create a site

1. Open **Sites** and select **New**.
2. Enter a **Site Name** and choose its **Region Name**, **Time Zone** and **Country**.
3. Optionally, add a description, an address, contact details and the people who hold its **Site Roles**.
4. Select **Submit**.

| Field | Details |
|---|---|
| **Site Name** | Required. 2 to 50 characters. Must be unique within its region. |
| **Email** | Required. 5 to 50 characters. |

## Create a department

1. Open **Departments** and select **New**.
2. Enter a **Department Name**, and optionally a **Department Description**.
3. Select **Submit**.

The **Department Name** is required, 2 to 50 characters, and must be unique across the organization.

> ℹ️ **A new department starts inactive.** Turn on its switch in the list, then assign it to sites.

## Assign departments to a site

1. In **Sites**, open the site's **Options** menu and select **Assign Department**.
2. Select the departments the site has.
3. For each one, optionally choose its **Department Head** at this site.
4. Select **Submit**.

Clearing a department removes it from that site only.

## Edit, deactivate or activate a region, site or department

To edit one, open its **Options** menu and select **Edit**. Inactive items can't be edited. To deactivate or activate one, use the switch in its row.

You can't deactivate:

- a region that still has sites,
- a site or a department that still has users. Move the users first; see [Users](users.md).

> ⚠️ **Deactivating takes the item out of groups and organization roles.** Group rules that select users by this region, site or department stop matching. For a region or site, so do the people holding its organization roles. Activating it turns them back on. See [User groups](../process-design/user-groups.md).

> ℹ️ **Deactivating a department also removes it from every site.** Activating it again doesn't restore those links. Assign it to its sites again.

## Related topics

- [Organization roles](organization-roles.md)
- [Holidays and working hours](working-time.md)
- [Users](users.md)
- [User groups](../process-design/user-groups.md)
