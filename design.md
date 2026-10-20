# SENTRA Design Guidelines

**Product:** SENTRA --- Digital Office (DoF)\
**Purpose:** Visual and UX guidance for consistent screen design and AI
prototyping.

## 1. Product principles

SENTRA is an enterprise document-management platform for employees and
administrators across Pupuk Indonesia and its subsidiaries.

-   **Clarity over decoration:** prioritize hierarchy and readability.
-   **Operational efficiency:** make search, statuses, and next actions
    easy to understand.
-   **Consistency across roles:** reuse shared components; show
    role-specific features only when permitted.
-   **Traceability:** make document status, responsibility, and activity
    history clear when relevant.
-   **No invented business rules:** flag unknown permissions, statuses,
    quota rules, or transitions for stakeholder confirmation.

## 2. Visual direction

Follow the supplied SENTRA references: clean enterprise SaaS, white
surfaces, restrained green accents, subtle borders, cool gray-blue
secondary text, and minimal shadows. Avoid decorative gradients,
oversized illustrations, excessive cards, and unnecessary visual
complexity.

### Suggested tokens

Use official Figma tokens if available; these values are starting
points.

  Token             Value       Usage
  ----------------- ----------- ------------------------------------
  Primary green     `#00AD78`   Primary actions, active navigation
  Dark green        `#008F68`   Hover/pressed emphasis
  Pale mint         `#E8F7F1`   Selected navigation/background
  Main text         `#26323F`   Titles and important values
  Secondary text    `#647789`   Labels and supporting text
  Muted text        `#94A3B3`   Placeholder and metadata
  Page background   `#FFFFFF`   Main canvas
  Subtle surface    `#F7F9FA`   Table headers and secondary areas
  Border            `#E5EAEE`   Inputs, dividers, table boundaries
  Success           `#16A765`   Successful/completed states
  Warning           `#E99A17`   Needs attention
  Danger            `#F04438`   Failure or destructive actions
  Information       `#2F80C9`   Informational states

Do not communicate status by color alone; always include a text label or
another clear cue.

## 3. Typography, spacing, and shape

-   Use the existing SENTRA font if defined in Figma. Otherwise, use
    Inter or a similar sans-serif.
-   Page title: 24--28 px semibold; section title: 16--18 px semibold.
-   Body/table text: 13--14 px; supporting text: 12--13 px.
-   Use sentence case and concise labels.
-   Use a 4 px spacing scale: 4, 8, 12, 16, 24, 32 px.
-   Main content padding: around 24--32 px.
-   Inputs and buttons: around 40--44 px high.
-   Use consistent 8--12 px radii and subtle 1 px borders.
-   Keep contrast readable; do not use muted text for essential
    information.

## 4. Application layout

### Sidebar

-   Keep the SENTRA logo at the top and navigation groups consistent.
-   Use a consistent icon family and size.
-   Highlight the active page with pale mint, a green icon, and a green
    label.
-   Keep inactive items gray-blue.
-   Show only navigation items the current role is authorized to access.
-   Keep version/footer information subtle.

### Page header

-   Use a clear, task-oriented title.
-   Add breadcrumbs or a short context label when useful.
-   Place the primary action consistently, usually at the top-right.
-   Avoid repeating the same title without adding context.

### Content

-   Prefer one clear content hierarchy and one main content surface.
-   Use cards only to group genuinely distinct information.
-   Avoid nested cards and decorative dashboard cards without a clear
    purpose.

## 5. Tables and data management

Tables are a core pattern for SENTRA's operational and administrative
screens.

-   Put search and filters above the table.
-   Use concise column labels, subtle gray header surfaces, and thin row
    dividers.
-   Align numeric values consistently.
-   Truncate long content only when the full value can still be
    inspected.
-   Keep pagination and page-size controls consistent.
-   Provide a useful empty state.
-   Use search placeholders that say what can be searched,
    e.g. `Cari nomor surat, judul, atau pengirim...`.
-   Show active filters and make them easy to clear.
-   Provide tooltips/accessibility labels for icon-only actions.
-   Separate destructive actions from common actions and confirm
    irreversible deletion.
-   Do not show actions the current user cannot perform.

### Hierarchical tables

For Provider Configuration, preserve this hierarchy: 1. **Provider:**
provider-level status and quota summary. 2. **Company:** company-level
status and remaining quota. 3. **Contract:** contract number,
allocated/used/remaining quota, value, validity dates, and status.

Use expandable rows or drill-down to reveal the next level. Keep parent
rows compact; do not show every field from all three levels at once.
Clearly indicate expanded/collapsed state and preserve parent-child
alignment.

## 6. Quota and status patterns

The goal of Provider Configuration is to help admins understand
remaining digital signature and digital stamp quota and identify items
that need attention.

-   Use explicit labels: **Kuota Tanda Tangan Digital** and **Kuota
    Stempel Digital**.
-   Distinguish total/allocated, used, and remaining quota. Do not show
    values like `990/1000` without clarifying their meaning.
-   Do not silently reinterpret negative or unclear source values;
    request business clarification.
-   Highlight low/exhausted quota only if a threshold or business rule
    is defined.
-   Show contract validity dates when they help explain quota
    availability.
-   Use small, consistent text badges for statuses.
-   Example statuses such as **Aktif**, **Tidak Aktif**, **Menunggu
    Verifikasi**, **Berhasil**, and **Gagal** should only be used if
    supported by the actual system.
-   Use green for success/active where appropriate, amber for
    pending/warning, red for failure/critical, gray for
    neutral/inactive, and blue for information. Always pair color with
    text.

## 7. Forms, dialogs, and feedback

### Forms

-   Group related fields under clear headings.
-   Put labels above inputs and mark required fields.
-   Do not use placeholders instead of labels.
-   Explain important constraints and show errors beside the relevant
    field.
-   Preserve entered data when validation fails.

### Confirmation dialogs

Use dialogs for destructive or consequential actions, not every
interaction. Include a specific title, concise explanation, a secondary
action such as **Batal**, and a primary action that names the outcome,
such as **Hapus** or **Batalkan pembuatan**. Avoid vague labels such as
**OK** when a specific label is possible.

### Feedback

Design loading, empty, success, validation-error, permission-denied,
provider-failure, and pending-processing states when relevant. Use
concise, actionable Indonesian copy.

## 8. Role-based experience

All roles are users of the platform. Differences should be handled
through permissions and relevant navigation, not completely different
visual systems.

-   Shared pages such as **Beranda**, **Pesan Masuk**, and **Surat
    Keluar** should remain consistent, subject to confirmed permission
    rules.
-   Admin-specific pages should appear only for authorized roles.
-   Keep terminology consistent across navigation, titles, buttons, and
    statuses.
-   Do not assume every admin can access every administrative feature.

### Admin DoF

Known administrative areas include Konfigurasi Provider, Tipe Surat,
Klasifikasi Surat, Template Surat, User Legacy, Manajemen Group, and
RBAC, subject to approved scope and permissions.

### Admin Penerima Dokumen

The known role-specific feature is **Registrasi Surat**. Do not add
other responsibilities unless confirmed.

### Admin Stempel

The supplied workflow indicates that Admin Stempel performs **Approval
Stempel** and **Verifikasi Stempel Digital**. The workflow then connects
to provider-side digital processing.

Design implications: - Make items awaiting approval or verification easy
to identify. - Show sufficient document/transaction context to verify
the correct item. - Keep approval and verification as distinct
actions. - Show processing outcomes and errors where supported. - Do not
describe Admin Stempel as personally applying the stamp unless the
client confirms that responsibility. - Do not invent rejection, retry,
or escalation rules.

## 9. Document workflow UX

-   Make current status and next responsible role easy to understand.
-   Use an activity timeline when users need to trace what happened.
-   Separate actions available to the current user from read-only
    workflow information.
-   Confirm consequential actions and explain what happens next.
-   Distinguish failed processing from work that is merely pending.
-   Do not expose actions owned by another role.
-   Preserve an audit trail where supported.
-   If a status or transition is undocumented, label it **Needs
    confirmation** instead of inventing a rule.

## 10. Icons, accessibility, and responsive behavior

-   Use one consistent outline icon family, such as Lucide, unless Figma
    defines another.
-   Pair important icons with labels where possible; add
    tooltips/accessibility labels for icon-only actions.
-   Provide visible hover, focus, pressed, and disabled states.
-   Do not rely on hover alone for essential information.
-   Prioritize desktop use but keep forms and tables usable at narrower
    widths.
-   Allow horizontal table scrolling rather than compressing content
    until unreadable.
-   Maintain sufficient contrast and predictable keyboard navigation.

## 11. Content style

Use Bahasa Indonesia unless a screen is explicitly intended to be in
English.

-   Be concise, professional, direct, and consistent.
-   Prefer familiar business language.
-   Explain technical terms when needed for a decision.
-   Avoid vague messages such as `Terjadi kesalahan` if a more specific
    explanation is available.

Examples: - `Cari nomor surat, judul, atau pengirim...` -
`Belum ada data` - `Perubahan berhasil disimpan.` -
`Verifikasi stempel digital gagal. Periksa detail transaksi sebelum melanjutkan.`

Only show retry instructions if the system supports retrying.

## 12. AI prototyping prompt

Use this prompt when generating or extending SENTRA screens:

> Design this screen as part of SENTRA, Pupuk Indonesia's enterprise
> Digital Office platform. Follow `design.md` and the supplied SENTRA
> reference screens. Use a clean white canvas, a consistent left
> sidebar, dark blue-gray typography, subtle gray borders, pale mint
> active states, and SENTRA green for primary actions. Favor clear
> hierarchy, practical tables, concise Indonesian labels, and
> predictable interactions over decoration.
>
> Reuse existing SENTRA patterns before adding new components. Show only
> features and actions permitted for the current role. Include relevant
> loading, empty, success, error, and confirmation states. Make statuses
> and quota values unambiguous.
>
> Follow documented business workflows only. Do not invent permissions,
> status transitions, quota rules, or role responsibilities. In the
> documented stamping workflow, Admin Stempel performs Approval Stempel
> and Verifikasi Stempel Digital, followed by provider-side digital
> processing. Keep approval, verification, and provider processing
> distinct. Flag unresolved behavior for stakeholder confirmation.
>
> Keep the interface simple, traceable, accessible, and ready for
> stakeholder review.

## 13. Final checklist

-   [ ] The screen follows SENTRA's existing visual language.
-   [ ] The page title and primary task are immediately clear.
-   [ ] Information hierarchy supports the user's goal.
-   [ ] Search, filters, columns, and row actions are useful and
    consistent.
-   [ ] Status labels and quota values are unambiguous.
-   [ ] Role permissions and workflow transitions match documented
    requirements.
-   [ ] Important actions have clear outcomes and appropriate
    confirmation.
-   [ ] Loading, empty, error, and success states have been considered.
-   [ ] UI copy is concise, consistent Indonesian.
-   [ ] Unresolved business logic is explicitly marked for confirmation.
