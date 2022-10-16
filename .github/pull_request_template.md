# Description

📝 Detail the reason for this change or link to an existing task/bug/story.

## Developer Checklist

Before requesting review for this PR, make sure the following is true:

- [ ] If a component has a query or mutation it's a container, should live in the /containers folder and should be suffixed with Cont.
- [ ] Container components should not contain any styles.
- [ ] Strings should be defined in en-EN.ts, unless they are Admin specific.
- [ ] Check that spacing, color and text matches the Figma designs.
- [ ] Use `formState` to check if the form has been submitted or is dirty.
- [ ] Import order should be the following:

```
  ├─ GQL (queries or mutations)
  ├─ Typescript types
  ├─ Hooks and utils
  ├─ UI atoms
  ├─ UI molecules
  ├─ UI icons
  ├─ APP components
  ├─ APP components
```
