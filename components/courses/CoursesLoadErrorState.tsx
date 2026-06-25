/**
 * CoursesLoadErrorState — shown when the course fetch fails.
 * Single Responsibility: this one error state.
 */
export default function CoursesLoadErrorState() {
  return (
    <div className="py-20 text-center border border-danger/20 bg-danger/10 rounded-xl">
      <p className="text-danger">Unable to load courses. Please refresh the page.</p>
    </div>
  );
}
