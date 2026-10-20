# SENTRA Digital Office --- Prototype PRD & Generation Prompt

## 1. Purpose

Build a clickable, stakeholder-ready prototype of SENTRA, an enterprise
Digital Office platform for Pupuk Indonesia and its subsidiaries.

The prototype should demonstrate role-based navigation, document
workflows, role-specific actions, and administrative configuration. Use
realistic mock data and working front-end interactions. This is a
prototype, not a production system.

## 2. Core product model

-   All personas are users of SENTRA.
-   **RBAC determines which menus, records, and actions a user can
    access.**
-   For document creation, the Drafter selects the actual people who
    will act as Reviewer, Approver, and Tujuan/Penerima. The system must
    only offer eligible people based on RBAC and the applicable
    organizational rules.
-   Example eligibility rules: Reviewers are peers; Approvers must meet
    the required role or organizational level, such as Manager. Treat
    these as configurable business rules, not hard-coded assumptions
    beyond the prototype data.
-   Admin roles are also users. They share the common workspace but see
    additional features based on their permissions.
-   Add a **role switcher in the top-right header for prototype
    testing**. It simulates signing in as different test personas; it is
    not a production permission-escalation feature.

## 3. Prototype role switcher

Place a clearly visible `Testing as: [Role]` dropdown in the top-right
header, near the user avatar.

Options: - Drafter - Reviewer - Approver - Tujuan / Penerima - Admin
DOF - Admin Penerima Dokumen - Admin Stempel

Behavior: - Switching roles updates the sidebar, dashboard summary,
inbox records, available actions, and accessible pages immediately. -
Keep the selected role visible so presenters always know which persona
is being demonstrated. - Use mock personas and role-appropriate sample
data. - The switcher is for prototype/demo only. In production, actual
access must be enforced by RBAC and authenticated user permissions. - Do
not show admin-only menus or actions when testing as a non-authorized
persona.

## 4. Information architecture

### Shared pages for all users

1.  **Beranda** --- relevant summary of documents and pending tasks for
    the selected persona.
2.  **Pesan Masuk** --- incoming documents/tasks requiring attention,
    review, approval, follow-up, or a role-specific action.
3.  **Surat Keluar** --- documents created or sent by the user. This
    replaces the previous `Daftar Surat` label.

### Permission-gated supporting pages

The existing UI references also show these pages. Display them only for
personas granted access; do not assume that every role has permission: -
Permintaan Akses Surat - Daftar Referensi - Kontak Eksternal

### Admin DOF

Show these menus only for Admin DOF or a persona explicitly granted the
corresponding permissions: - **Utility:** Konfigurasi Provider -
**Management:** Tipe Surat, Klasifikasi Surat, Template Surat, User
Legacy, Manajemen Group, RBAC

### Admin Penerima Dokumen

Additional page: - Registrasi Surat

### Admin Stempel

Do **not** create a separate `Approval Stempel` or `Verifikasi Stempel`
sidebar page for this prototype. Admin Stempel works from **Pesan
Masuk**. Documents that need this role's action should have a clear task
tag, such as `Perlu Verifikasi Stempel`, plus a filter or quick view to
find them.

The documented workflow indicates that Admin Stempel performs
verification of the digital stamp. Do not model Admin Stempel as the
provider or claim that the admin personally executes the provider-side
stamping process.

## 5. Key screens and expected behavior

### A. Global application shell

-   Follow the supplied SENTRA references: persistent left sidebar,
    white content area, restrained green accent, muted gray-blue text,
    subtle borders, and compact enterprise tables.
-   Keep the top-right notification, settings, profile, and prototype
    role switcher consistent across pages.
-   Active navigation uses a pale mint background and green accent.
-   Use Indonesian UI copy by default.
-   Use responsive layouts that prioritize desktop stakeholder demos.

### B. Beranda

Show a compact summary relevant to the selected persona, for example: -
Documents awaiting the current user's action - Documents in progress -
Recently updated documents - Recent activity or workflow updates

The numbers and lists must change when the prototype role changes. Avoid
generic dashboard metrics that do not help the selected persona decide
what to do next.

### C. Pesan Masuk

Provide: - Search by document number, title, sender, or other relevant
visible fields. - Filters for task/status and relevant organization
fields where appropriate. - A table with document number, title, sender,
unit/organization, created date, priority, current status/task, and
available actions. - Actions should depend on the selected persona and
the document's current state. - A document detail view with document
metadata, content/attachment preview where feasible, current status,
activity history, and only the actions available to the current persona.

Persona-specific examples: - **Reviewer:** review and edit the document
when permitted, then submit a review decision. - **Approver:** approve
or reject; do not expose content-editing controls. - **Tujuan /
Penerima:** read the document and submit follow-up when the document
requires it. - **Admin Stempel:** find documents tagged
`Perlu Verifikasi Stempel`, open the document detail, review the
relevant context, and perform the verification action. Show the result
clearly. - **Other personas:** see only records and actions granted to
them.

Do not invent undocumented rejection, retry, escalation, or return
rules. Use only the transitions explicitly represented in the supplied
workflow or mark unresolved behavior for confirmation.

### D. Surat Keluar and create document flow

The `Surat Keluar` page lists documents created or sent by the current
user. Include search, filters, status, and a link to document detail.

The `Buat Surat Baru` flow should follow the supplied design reference
and group fields into clear sections:

**Informasi Surat** - Judul - Jenis Surat - Template - Klasifikasi -
Sifat

**Penerima & Approval** - Reviewer - Approver - Tujuan / Penerima - CC
internal - Perlu Tindak Lanjut toggle - Kecepatan Tanggapan

**Isi Surat** - Document/template preview or editable content area,
appropriate to the selected template.

**Lampiran** - Upload control and attachment list.

**Actions** - Cancel - Save as Draft - Submit

Selection rules: - The Drafter chooses actual people for Reviewer,
Approver, and Tujuan/Penerima. - Each selector only lists eligible users
based on RBAC and relevant organizational rules. - Reviewer eligibility
should reflect the peer rule in the supplied brief. - Approver
eligibility should reflect the required role/level, such as Manager, in
the supplied brief. - Do not allow the Drafter to assign an ineligible
person or redefine the person's RBAC role. - If no eligible users are
available, show a clear empty state instead of silently offering
everyone. - When `Perlu Tindak Lanjut` is enabled, explain that the
recipient will be asked to provide follow-up, consistent with the
supplied UI reference.

### E. Admin DOF management pages

Create a consistent admin list-page pattern for: - Tipe Surat -
Klasifikasi Surat - Template Surat - User Legacy - Manajemen Group -
RBAC

Each page should have a title, search/filter area, data table, status
where relevant, and row actions that match the page. Use add/edit forms
or dialogs for basic prototype interactions where appropriate. Do not
invent complex business rules or detailed fields not supported by the
supplied brief; use plausible mock data and keep unsupported fields
minimal.

**RBAC** should communicate which roles/permissions can access features.
For prototype purposes, it can use a simple role-permission table. The
top-right role switcher must remain a demo control, not a replacement
for the RBAC concept.

### F. Konfigurasi Provider

Goal: help Admin DOF understand available digital-signature and
digital-stamp quota, identify active/inactive contracts, and inspect
which company or contract the quota belongs to.

Use a progressive, expandable hierarchy: 1. **Provider row:** provider
name, total quota summary for digital signature and stamp, active
company count, active contract count, and provider status. 2. **Company
row:** company name, status, remaining quota for both services, and
last-updated metadata. 3. **Contract row:** contract number, quota
information, contract value if available, start/end dates, status, and
last-updated metadata.

Interaction: - Expand/collapse provider rows to show companies, then
expand a company to inspect its contracts. - Keep parent rows compact
and reveal detail only when expanded. - Label quota values clearly. Do
not use an ambiguous `990/1000` without clarifying whether it means
used, allocated, or remaining. - Preserve the source data meaning; do
not reinterpret negative or unclear quota values. Flag them for
stakeholder confirmation. - Include search and useful filters, such as
provider, company, and status. - Use clear empty states when a provider
has no companies or contracts. - Add/edit/delete controls may be
demonstrated with mock interactions only. Confirm destructive actions
before deletion.

### G. Admin Penerima Dokumen --- Registrasi Surat

Create a dedicated list and basic registration form for registering
incoming documents, using only fields confirmed by the supplied project
brief. If the exact registration fields are not documented, use a
minimal prototype form and mark the field list as requiring stakeholder
confirmation.

### H. Admin Stempel verification

Keep the task within `Pesan Masuk`.

For a document requiring stamp verification: - Show a visible tag
`Perlu Verifikasi Stempel`. - Provide a filter/quick view for tasks
awaiting verification. - On the detail page, show enough document and
workflow context to verify the correct item. - Provide a clear
verification action and result state. - Show provider-side processing
status/result only as a simulated outcome in the prototype. - Do not
invent a separate stamp-approval stage, because the current
understanding is that approval and verification are one task. - Do not
invent retry or failure-resolution rules unless they are confirmed.

## 6. Workflow and status principles

-   Make the current status, next responsible role, and available next
    action clear.
-   Use activity history to make document progress traceable.
-   Separate pending work from failed processing.
-   Show only actions allowed for the current persona and current
    document state.
-   Use consistent status labels across the app.
-   Do not invent business rules or transitions when the source brief is
    silent.
-   Use realistic sample records to demonstrate the main paths: draft,
    review, approval, recipient follow-up when enabled, and stamp
    verification when required. Do not imply that every document must
    pass through every step.

## 7. Visual and interaction guidelines

-   Match the supplied SENTRA screenshots: clean enterprise SaaS, white
    surfaces, restrained green accents, pale mint selected navigation,
    gray-blue secondary text, subtle borders, and minimal shadows.
-   Reuse components and layouts across pages.
-   Prefer readable tables over nested cards.
-   Use concise, professional Indonesian labels.
-   Include loading, empty, success, validation-error, and confirmation
    states where relevant.
-   Provide accessible labels/tooltips for icon-only actions.
-   Keep actions specific: `Simpan`, `Simpan sebagai Draft`,
    `Kirim untuk Review`, `Setujui`, `Tolak`, `Verifikasi Stempel`,
    `Batal`.
-   Do not use decorative visuals that distract from operational tasks.

## 8. Out of scope

Do not implement: - Real authentication or production-grade
authorization. - Real provider integrations, digital signatures, or
digital-stamp API calls. - Real email, push, or external
notifications. - A production database or backend. - Unconfirmed
workflow transitions, quota thresholds, or role permissions. - A
separate Admin Stempel sidebar page for approval/verification. - A
production feature allowing users to grant themselves permissions.

Use mock data and front-end state to make the prototype demonstrable.
Clearly simulate actions rather than claiming real external processing
has occurred.

## 9. Prototype acceptance checklist

-   [ ] Switching the role in the top-right updates navigation,
    dashboard, inbox, records, and actions.
-   [ ] Shared pages remain available to all defined personas.
-   [ ] Admin-only pages are permission-gated.
-   [ ] Drafter can save a draft and submit a document in the prototype.
-   [ ] Reviewer and Approver see different permitted actions.
-   [ ] The Drafter's people selectors only show eligible users.
-   [ ] Tujuan/Penerima can submit follow-up only when required by the
    document.
-   [ ] Admin Stempel can identify and verify tasks from Pesan Masuk.
-   [ ] Admin DOF can inspect provider, company, and contract quota
    hierarchically.
-   [ ] Quota values are clearly labeled and source ambiguity is not
    hidden.
-   [ ] Document status and activity history are traceable.
-   [ ] No real integrations or undocumented business rules are
    presented as implemented.

------------------------------------------------------------------------

# Copy-ready generation prompt

Build a clickable, stakeholder-ready prototype of **SENTRA Digital
Office for Pupuk Indonesia** based on this PRD and the supplied SENTRA
UI references.

Use a clean enterprise SaaS visual style: white content surfaces,
persistent left sidebar, restrained SENTRA green accents, pale mint
active navigation, gray-blue secondary text, subtle borders, compact
readable tables, and concise Indonesian UI copy.

Implement these personas: Drafter, Reviewer, Approver, Tujuan/Penerima,
Admin DOF, Admin Penerima Dokumen, and Admin Stempel. Add a visible
**`Testing as: [Role]` role switcher in the top-right header** for demo
purposes. Switching roles must update the sidebar, dashboard, inbox,
records, and available actions. Make it explicit that this is a
prototype testing control, not a production security feature.

All personas share Beranda, Pesan Masuk, and Surat Keluar. Supporting
pages such as Permintaan Akses Surat, Daftar Referensi, and Kontak
Eksternal are permission-gated. Admin DOF has Konfigurasi Provider, Tipe
Surat, Klasifikasi Surat, Template Surat, User Legacy, Manajemen Group,
and RBAC. Admin Penerima Dokumen has Registrasi Surat. Admin Stempel
performs digital-stamp verification through Pesan Masuk using a
`Perlu Verifikasi Stempel` tag/filter; do not create a separate
stamp-verification sidebar page.

Implement the create-document flow with Informasi Surat, Penerima &
Approval, Isi Surat, Lampiran, and actions to cancel, save as draft, or
submit. The Drafter chooses actual Reviewer, Approver, and
Tujuan/Penerima people from eligible lists. RBAC and organizational
rules determine eligibility: Reviewers are peers and Approvers must meet
the required level, such as Manager, according to the supplied brief.
Never allow arbitrary ineligible assignments.

Use role-specific actions: Reviewer can review, Approver can
approve/reject without editing the document, Tujuan/Penerima can submit
follow-up when required, and Admin Stempel can verify the stamp task
from Pesan Masuk. Show status and activity history so the workflow is
traceable.

For Konfigurasi Provider, use an expandable Provider → Company →
Contract table. Clearly distinguish quota meaning, show relevant
statuses and contract validity dates, and do not reinterpret ambiguous
quota values. Use mock data and front-end state only. Simulate
interactions; do not claim real digital signatures, stamps, or provider
calls have occurred.

Follow the PRD closely. Keep the scope limited to documented features,
avoid inventing permissions or workflow rules, and mark unknown business
behavior for stakeholder confirmation. Ensure the prototype is
navigable, visually consistent, and ready for a client walkthrough.
