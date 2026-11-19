# Localization

> 📷 Screenshot needed: **Configuration** > **Localization** > **Translations**, with **Arabic** chosen, the **Missing** filter on and one label being edited

Localization lets you change the words Yaquoti Workflow shows on screen, in English and Arabic, without waiting for a new version. Use it to match your organization's own terms, or to fill in an Arabic label that is missing.

To view translations, your system role needs **Translations** > **View**; to change them, **Update**; to make changes live, **Publish**. See [System roles](system-roles.md).

Both pages are under **Configuration** > **Localization**: **Translations** and **Publish History**.

## Change a label

1. Open **Translations** and choose the **Language**.
2. Find the label: pick one of the **Modules**, or search all of them. Use the **Missing** or **Changed** filter to narrow the list.
3. Type the new text in the editable column.

Your change is saved as a draft straight away. Nobody sees it until it is published.

A label can be up to 4,000 characters. Keep every placeholder in double curly braces, such as `{{count}}`, exactly as in the English text; a label without them is refused. To undo your change, revert the label to its built-in text.

## Find and replace text

Use **Replace** to change a word everywhere, for example *Request* to *Ticket*.

1. Select **Replace**.
2. Enter the text to **Find** and what to **Replace with**.
3. Choose **Where**: one module or **All modules**. Optionally, tick **Match case**, **Whole word** or **Preserve case**.
4. Untick any labels you want to leave alone.
5. Select **Replace in** … **labels**.

Placeholders are never changed, and a label the replacement would leave empty is skipped. Every replacement is a draft.

## Publish changes

Select **Publish** with the number of changes, then confirm.

> ⚠️ **Publishing applies every waiting draft in every language, for every user.** That includes drafts other people made. Check the list first, or select **Discard drafts** to drop the drafts in the language you're viewing.

If you can edit but not publish, the page shows how many changes are waiting for someone who can.

## Review what was published

**Publish History** lists every publish, newest first, with who published it and how many changes it held. Open one to see each label **Before** and **After**.

## Related topics

- [Profile and settings](profile-and-settings.md)
- [System roles](system-roles.md)
