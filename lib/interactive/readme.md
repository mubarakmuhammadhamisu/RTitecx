# lib/interactive — Code Playground & Grading Engine

## Purpose
Everything related to the interactive coding lesson type: language
runtimes (Pyodide/Emscripten/CheerpJ/iframe), the pluggable grading
strategy, and submission payload building.

## Type
Shared library code (not routes).

## Key file: gradingStrategy.ts

This is the single swap-in point between **client-execution** grading
(today, free-tier — browser runs all test cases, server only compares
reported outputs) and **server-execution** grading (future, paid tier —
server actually executes student code against hidden cases). See that
file's header comment for the full contract both strategies must
satisfy.

## Related Files
`supabase/migrations/0004_interactive_lessons.sql`,
`supabase/migrations/0006_grading_strategy_flexibility.sql`,
`lib/courses/content/fetchInteractiveContent.ts`
