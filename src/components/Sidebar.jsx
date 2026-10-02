const WORK = [["analysis", "Skin Analysis"], ["profile", "Health Profile"], ["nutrition", "Nutrition Guide"], ["recent", "Recent Analyses"]];
const MORE = [["dataset", "Reference Dataset"], ["about", "About Prototype"]];

export default function Sidebar({ page, onNavigate, theme, onToggleTheme, user, onLogout }) {
  const link = ([id, label]) => (
    <button key={id} onClick={() => onNavigate(id)} aria-current={page === id ? "page" : undefined}
      className={`block w-full text-left px-3 py-2 border-l-2 ${page === id ? "border-brand bg-sage font-medium" : "border-transparent text-mute hover:bg-sage"}`}>
      {label}
    </button>
  );
  return (
    <nav className="flex h-full flex-col gap-6 p-5" aria-label="Main">
      <div>
        <div className="serif text-2xl font-semibold text-brand">PredictSkin</div>
        <div className="text-xs text-mute">Educational prototype</div>
      </div>
      <div><div className="mb-1 px-3 text-xs text-mute">Workspace</div>{WORK.map(link)}</div>
      <div><div className="mb-1 px-3 text-xs text-mute">Project</div>{MORE.map(link)}</div>
      <div className="mt-auto space-y-3 text-xs text-mute">
        <p>Signed in as <span className="text-ink">{user.name}</span></p>
        <button className="btn-ghost w-full text-ink" onClick={onLogout}>Log out</button>
        <p>No server image history</p>
        <button className="btn-ghost w-full text-ink" onClick={onToggleTheme}>{theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}</button>
      </div>
    </nav>
  );
}
