/**
 * lib/interactive/gradingStrategy.ts
 * ────────────────────────────────────────────────────────────────────────
 * THE SINGLE SWAP-IN POINT between client-side and server-side grading.
 *
 * Today: GRADING_STRATEGY = 'client-execution'
 *   - The browser's WASM runtime (Pyodide/Emscripten/CheerpJ/iframe)
 *     runs the student's code against every test case, including
 *     hidden ones, because it needs each case's `input` to run.
 *   - The browser sends { testCaseId, actualOutput } pairs to
 *     app/api/interactive/submit.
 *   - The server ONLY compares actualOutput against the stored
 *     expected_output column (read via the
 *     get_interactive_test_cases_for_lesson SQL function from migration
 *     0006, which strips expected_output for hidden cases from the
 *     CLIENT-facing read, but the grading API route reads the raw table
 *     directly via the service-role key, where expected_output is
 *     always visible for comparison).
 *   - Server compute cost: ~0. No code execution happens server-side.
 *   - Known limitation: a person willing to forge the network request
 *     reporting case results could fake a "pass." Acceptable for a
 *     free-tier launch; still defeats simple hardcoded-output cheating
 *     since the student's code must produce correct output for cases
 *     whose expected values it never received.
 *
 * Later: GRADING_STRATEGY = 'server-execution'
 *   - app/api/interactive/submit instead sends submittedCode + each
 *     test case's `input` to a real sandboxed code-execution backend
 *     (e.g. a containerized runner, Judge0-style API, or a dedicated
 *     execution microservice — NOT decided yet, intentionally pluggable).
 *   - expected_output never needs to leave the database at all under
 *     this strategy.
 *   - Requires paid compute (a sandboxed execution backend is not free).
 *
 * To switch: change GRADING_STRATEGY below, then implement
 * runServerExecutionGrading() in this file using whatever execution
 * backend has been chosen at that time. No schema migration, no client
 * UI changes, no changes to gradingTypes.ts are required — the contract
 * (GradeSubmissionRequest -> GradeSubmissionResponse) stays identical.
 */
export type GradingStrategyName = 'client-execution' | 'server-execution';

export const GRADING_STRATEGY: GradingStrategyName = 'client-execution';

/**
 * Throws if called while GRADING_STRATEGY is still 'client-execution' —
 * this is intentionally a hard stop, not a silent no-op, so switching
 * the constant above without implementing this function fails loudly
 * during development rather than silently grading nothing.
 */
export async function runServerExecutionGrading(): Promise<never> {
  throw new Error(
    'Server-execution grading is not implemented yet. ' +
      'Set GRADING_STRATEGY back to "client-execution", or implement ' +
      'runServerExecutionGrading() in lib/interactive/gradingStrategy.ts ' +
      'against your chosen sandboxed code-execution backend.'
  );
}
