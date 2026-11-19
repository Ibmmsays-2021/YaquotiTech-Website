# Dynamic actions

> 📷 Screenshot needed: the **Task Management** window, with two sub steps added and **Type** set to **Parallel**

In a dynamic process, the approver of a step can change the request's path while working on it: hand the step to another group, replace the next step, or split the work into smaller tasks for other people. Static processes always follow the steps the administrator built. See [Create a process](../process-design/process-basic.md).

You need to have picked the step. A request admin can also change the approver group. Where to open these actions on the request page: [TO VERIFY: entry point for Change Approver Group, Change The Step and Task Management on the request details page]

## Change the approver group or approver

Use this when the step belongs with another team or person.

1. Open **Change Approver Group**.
2. Select an **Approver Group** or an **Approver**.
3. Optionally, add **Notes**.
4. Select **Submit**.

The step now belongs to the group or person you chose.

## Change the step

Use this to replace what happens after your step with a step you define.

1. Open **Change The Step**.
2. Enter a **Name** and **Description**.
3. Select an **Approver Group** or an **Approver**.
4. Under **Action**, choose whether the approver can cancel or decline.
5. Choose the fields the new approver can see in **Choose Allowed Fields For This Step**, and optionally build a form in **Add New Step Form**.
6. Select **Submit**.

To give the new approver your step's fields to work on, tick **Carry over current step's fields**.

## Add tasks to a step

Use **Task Management** to split your step into tasks for other people. Your step waits until the tasks are done.

1. Open **Task Management**.
2. Under **Type**, choose **Sequence** to have the tasks done one after another, or **Parallel** to have them done at the same time.
3. Select **Add Sub Step** for each task, and fill in its **Name**, **Description** and **Approval Group** or **Approver**.
4. Optionally, add **Assigner Notes** and choose whether the task's approver can cancel, decline or must approve.
5. Select **Submit**.

Each task needs a name and an approver group or approver, and you need at least one task. A task can't have tasks of its own.

The people you chose find their tasks in their [requests list](requests-list.md), like any other step. When every task is finished, the step returns to its approver: straight to them if the step has a named approver, or to its group's queue to be picked up again. See [Approve or decline a step](decide-on-a-step.md).

## Related topics

- [Approve or decline a step](decide-on-a-step.md)
- [Pick up and assign requests](pick-up-and-assign.md)
- [Process steps](../process-design/steps-and-flow.md)
- [Create a process](../process-design/process-basic.md)
