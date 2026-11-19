# Create a process

> 📷 Screenshot needed: a sub category's process list with the **New Process** panel open on the right, **Process Title**, **Initials** and **Priority** filled in

A process is one service that requesters can ask for, such as *Annual Leave Request*. You create it inside a sub category of the [service catalog](service-catalog.md), then give it its groups, steps and forms.

To create and change processes, your system role needs the **Process** permissions **Explore**, **View**, **Create** and **Update**. See [System roles](../administration/system-roles.md).

To open a sub category's processes, go to **Configuration** > **Process Management** > **Service Catalog**, then open the category and the sub category.

## Create a process

1. Select **New**.
2. Enter a **Process Title**. The **Initials** fill in automatically.
3. Optionally, add a **Description** and change the **Priority**.
4. Select **Used as SubRequest Only** if the process should only ever run as a sub-request.
5. Select **Submit**.

| Field | Details |
|---|---|
| **Process Title** | Required. 2 to 50 characters, with no space at the start or end. If the sub category already has a process with this title, a number is added, for example *Laptop Request (1)*. |
| **Initials** | Required. 1 to 3 characters. They form part of the code of every request raised for the process, after the category and sub category initials. |
| **Description** | Optional. Up to 150 characters. |
| **Priority** | **Emergency**, **High**, **Normal** (the default) or **Low**. |
| **Used as SubRequest Only** | Requesters can't choose the process themselves; it runs only as a [sub-request](../requests/sub-requests.md) of another request. |

If your licence's limit on processes has been reached, you can't create another one, unless it's used as a sub-request only. See [Licence and version](../administration/system-information.md).

> ℹ️ **A new process can be requested by everyone straight away.** It starts with four steps (**Submit**, **First Step**, **Complete** and **Cancel**) and with default groups: every user may submit it and administer its requests, and the requester approves **First Step**. To keep it out of use while you build it, [hold it](process-lifecycle.md) first, then change its [groups](process-groups-tab.md) and [steps](steps-and-flow.md).

## Edit the basic information

1. Select the process card. The process opens on its **Basic** tab.
2. Change the fields you need.
3. Select **Update**.

| Field | Details |
|---|---|
| **Process Title** | Same rules as when you create it, but here a title already used in the sub category is refused rather than numbered. Changing the title fills in the **Initials** again; correct them afterwards if needed. |
| **Can Make Request OnBehalf** | Lets the process's [request admins](../concepts/roles.md) raise a request on behalf of anyone in the process's user groups. |
| **Public** | Offers the process to customers on the [customer portal](../requests/customer-portal-new-request.md). |
| **Used as Bulk Request** | Adds **Bulk Requests** to the request form, so a requester can raise several requests at once. |
| **Site** | Optional. Deadlines for the process's requests are counted on this site's working hours and holidays. Leave it empty to use the default site. See [Holidays and working hours](../administration/working-time.md). |

The category and sub category can't be changed here. To put a process in another sub category, [move it](process-lifecycle.md). To see a summary of a process without opening it, open its card's menu and select **Info**.

## Limit how often a user can request it

Limit requests to stop one user raising the same request too often, for example one equipment request a month.

1. On the **Basic** tab, select **Can Make Limited Requests By User**.
2. Enter **Requests Limitation Count / User** and **Period / Day**, and choose a **Request Status**.
3. Optionally, select **Can Make Request Time Limitation** and enter **Time To Next Request by (minutes)**.
4. Select **Update**.

| Field | Details |
|---|---|
| **Requests Limitation Count / User** | Required. 1 to 10. The number of requests one user may raise in the period. |
| **Period / Day** | Required. The number of days counted back from today, today included. |
| **Request Status** | Required. Which of the user's requests count: **All**, **Processing** (still in progress) or **Completed**. |
| **Time To Next Request by (minutes)** | How long a user must wait after their last request before raising another. |

Changing **Period / Day** or **Request Status** starts the count again from that moment, so requests raised before the change no longer count. Limits don't apply to requests raised with **Bulk Requests**. To remove a limit, clear its check box and select **Update**.

## Related topics

- [Service catalog](service-catalog.md)
- [Hold, release, move or copy a process](process-lifecycle.md)
- [Assign groups to a process](process-groups-tab.md)
- [Process steps](steps-and-flow.md)
- [Print templates](process-templates.md)
- [Submit a request](../requests/new-request-submit.md)
