# context/ — Global React Contexts

## Purpose
Three focused contexts, split by responsibility (originally one mixed
AuthContext in the source codebase):

| Context | Owns |
|---|---|
| `AuthContext.tsx` | Session, profile, login/register/logout, profile mutations |
| `CoursesContext.tsx` | Course catalog, enrollments, lesson completion, progress |
| `ProgressToastContext.tsx` | The bottom-right save-error toast shown when a progress write fails |

## Why split
The original codebase's single AuthContext caused unrelated re-renders
(e.g. a course catalog refetch re-rendering every component that only
cares about login state) and made each concern harder to test in
isolation. Splitting also satisfies the single-responsibility rule for
this rewrite.

## Provider order
`AuthProvider` must wrap `CoursesProvider` (courses fetching depends on
knowing the current user ID). `ProgressToastProvider` has no
dependencies on the other two and can wrap at any level, but is placed
outermost for simplicity. See `app/layout.tsx` for the actual nesting.

## Related Files
`lib/supabase/client.ts`, `lib/courses/*`
