/**
 * lib/interactive/gradingTypes.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: the shared types that BOTH grading strategies
 * (client-execution today, server-execution later) must produce and
 * consume. Keeping this contract in its own file means neither strategy
 * implementation needs to know about the other.
 */

/** One test case as delivered to the browser for client-side execution.
 *  `expectedOutput` is null for hidden cases (see migration 0006) —
 *  the client can run against `input` but cannot see what "correct"
 *  looks like for hidden cases. */
export interface ClientTestCase {
  id: string;
  label: string;
  input: string;
  isHidden: boolean;
  expectedOutput: string | null;
}

/** What the client reports back to the server after running the
 *  student's code against one test case. */
export interface ClientCaseResult {
  testCaseId: string;
  actualOutput: string;
  /** Set if the student's code threw/failed to compile for this case. */
  executionError?: string;
}

/** The grading API route's request body. */
export interface GradeSubmissionRequest {
  lessonId: string;
  submittedCode: string;
  /** Required under client-execution strategy; ignored under
   *  server-execution strategy (server re-derives this itself). */
  caseResults: ClientCaseResult[];
}

/** The grading API route's response body — identical shape regardless
 *  of which strategy graded it, so the UI never needs to know which
 *  strategy is active. */
export interface GradeSubmissionResponse {
  totalCases: number;
  passedCases: number;
  isFullyPassed: boolean;
  caseResults: Array<{
    testCaseId: string;
    label: string;
    passed: boolean;
  }>;
  executionError?: string;
}
