# Hold, release, move or copy a process

> 📷 Screenshot needed: a sub category's process list with one card marked **Held** and showing its **From** and **To** dates, and another card's menu open at **Actions**

Once a process is built, you manage it from its card in the process list: hold it to stop new requests for a while, move it, copy it, export it to another system, or delete it.

Each action needs its own **Process** permission in your system role: **Hold**, **Move**, **Clone**, **Export**, **Import**, **Delete** or **Generate Google Form Link**. See [System roles](../administration/system-roles.md).

To open the process list, go to **Configuration** > **Process Management** > **Service Catalog**, then open the category and the sub category. Most actions are on a card's menu, under **Actions**.

## Check that requesters can use a process

A requester can raise a request for a process only when all of these are true:

- The card shows **Valid**: each step has an [approver](step-approver.md), and the process has a [request admin group](request-admin-groups.md).
- The process isn't held, and its category is active. See [Service catalog](service-catalog.md).
- The process isn't **Used as SubRequest Only**. Such a process runs only as a [sub-request](../requests/sub-requests.md).
- The requester belongs to one of the process's [user groups](user-groups.md).

A category or sub category appears to requesters only when it holds at least one such process. A held process still shows in its sub category, dimmed, but can't be opened. Customers see a process on the [customer portal](../requests/customer-portal-new-request.md) only when it is also **Public**; see [Create a process](process-basic.md).

## Hold or release a process

Hold a process to stop new requests while you change it, or for a fixed period such as a year-end freeze.

1. Open the card's menu and select **Actions** > **Hold**.
2. To hold it until you release it, select **Hold without Time**.
3. To hold it for a period, enter the **From** and **To** dates and select **Hold with Time**.

To release a held process, select **Actions** > **UnHold**.

With a period, the process is held from the start of the **From** date and released automatically at the start of the **To** date. The card shows both dates. Requests already raised carry on through their steps; users who have the request form open are told the process is no longer available. See [Submit a request](../requests/new-request-submit.md).

> ⚠️ **Holding a process deletes its Google Form for good.** Anyone with the link can no longer submit through it. Generate a new link after you release the process.

When you release a process, or its period ends, your licence's limit on active processes is checked. If the limit has been reached, the process stays held. See [Licence and version](../administration/system-information.md).

## Move a process to another sub category

1. Open the card's menu and select **Actions** > **Move To**.
2. Choose the target in **Categories** and **SubCategories**.
3. Select **Confirm**.

The process keeps its requests, groups and steps. If the target sub category already has a process with the same title, a number is added to the title, for example *Laptop Request (1)*.

## Clone a process

Clone a process to build a similar one without starting from scratch.

1. Open the card's menu and select **Actions** > **Clone**.
2. Optionally, change **Used as SubRequest Only**.
3. Select **Confirm**.

The copy is created in the same sub category with a number added to its title. It has the same steps, forms, approvers, groups, rules, template and settings, but no requests and no Google Form. A copy of a held process is also held, with no end date. If your licence's limit on processes has been reached, no copy is made.

## Export a process

Open the card's menu and select **Actions** > **Export**. Your browser downloads a JSON file named after the process. Use it to copy the process to another Yaquoti system, or to keep a copy before a big change. The file holds the process's settings, steps, forms and template, but not its groups.

## Import processes

1. Open the sub category that should receive the processes and select **Import**.
2. Drop one or more exported JSON files on the dialog, or select it to choose them.
3. Select **Confirm**.

A report lists each file with its result; you also get a [notification](../requests/notifications.md) when the import finishes. An imported process keeps its settings, including **Used as SubRequest Only** and whether it was held, and uses the default site. A number is added to its title if the sub category already has one with the same title. A file is refused if your licence's limit on processes has been reached.

> ⚠️ **An imported process has no groups, so it shows Invalid.** No one can request it until you assign its groups on the [Groups tab](process-groups-tab.md) and check that each step has an approver.

Steps keep the approvers named in the file. [TO VERIFY: whether step approvers stay correct when the file comes from a different system]

## Work on several processes at once

1. Select **Select**.
2. Select the check box on up to four process cards.
3. Open **Actions** and select **Export**, **Clone**, **Delete** or **Move To**.
4. Confirm if asked.

A report then lists each process as **Succeeded** or **Failed**, with the reason; a failure doesn't stop the others. Each cloned process keeps its own **Used as SubRequest Only** setting. **New** and **Import** are unavailable until you select **Select** again to leave.

## Generate a Google Form link

A Google Form link lets anyone with a Google account raise a request for the process without signing in to Yaquoti. Google Forms must be set up first; see [Vaults, keys and Google Forms](vaults-keys-and-google-forms.md).

1. Open the card's menu and select **Actions** > **Generate Google Form Link**.
2. Choose the **Expiration Date**, **Hour** and **Minute**. The date can be up to one month ahead.
3. Select **Generate Link**.
4. Copy the link and share it.

The action is unavailable while the process is invalid or held. A process can have only one working link at a time, and the link stops accepting submissions when it expires. If the form has file fields, open the link as the form owner and restore the upload folder before you share it; the dialog lists the steps.

## Delete a process

1. Open the card's menu and select **Actions** > **Delete**.
2. Confirm.

> ⚠️ **Deleting a process can't be undone.** A process with requests still in progress can't be deleted; hold it instead. Deleting also deletes its Google Form.

## Related topics

- [Create a process](process-basic.md)
- [Service catalog](service-catalog.md)
- [Assign groups to a process](process-groups-tab.md)
- [Step approver](step-approver.md)
- [User groups](user-groups.md)
- [Vaults, keys and Google Forms](vaults-keys-and-google-forms.md)
- [Choose a service](../requests/new-request-choose.md)
