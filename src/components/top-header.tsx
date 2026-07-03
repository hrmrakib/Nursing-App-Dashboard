/**
 * Top Header Bar
 * Shows "Welcome, Sharon" greeting with user avatar on the right.
 * Renders as a rounded card with subtle border.
 */
export default function TopHeader() {
  return (
    <header className="bg-surface rounded-xl border border-border shadow-card px-6 py-4 flex items-center justify-between">
      {/* Greeting */}
      <div>
        <h1 className="text-lg font-semibold text-text-primary">
          Welcome, Sharon
        </h1>
        <p className="text-sm text-text-secondary">Have a nice day</p>
      </div>

      {/* User avatar + name */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden border-2 border-blue-100">
          {/* Placeholder avatar with initials */}
          <span className="text-sm font-semibold text-primary">SH</span>
        </div>
        <span className="text-sm font-medium text-text-primary hidden sm:block">
          Sharon
        </span>
      </div>
    </header>
  );
}
