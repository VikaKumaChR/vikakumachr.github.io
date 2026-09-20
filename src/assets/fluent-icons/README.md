# Named Fluent vectors

The five symbols in `src/FluentNamedIcon.tsx` are SVG paths, not bitmap masks.
Their original vector outlines come from Microsoft's Segoe Fluent Icons (`SegoeIcons.ttf` on the development machine); the site ships only these five symbol outlines and does not download or bundle the font. Outlines are uniformly scaled and centered inside a 24px view box with a 20px optical extent.

Official name/Unicode reference: https://learn.microsoft.com/en-us/windows/apps/design/iconography/segoe-fluent-icons-font

| Name | Code point |
| --- | --- |
| ChineseBoPoMoFo | E989 |
| ChinesePinyin | E98A |
| PhotoCollection | E7AA |
| Library | E8F1 |
| Relationship | F003 |

Symbol designs: Microsoft Corporation. Other functional icons are SVG components from `@fluentui/react-icons`. All symbols follow `currentColor`; no PNG files remain in the icon pipeline.
