import { Link, Outlet, useLocation } from 'react-router-dom'

export function Layout() {
  const location = useLocation()
  const navLink = (to: string, label: string) => (
    <Link
      to={to}
      className={`px-3 py-2 rounded ${location.pathname === to ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-50'}`}
    >
      {label}
    </Link>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Rockfall Risk Dashboard</h1>
          <nav className="space-x-2">
            {navLink('/', 'Overview')}
            {navLink('/map', 'Risk Map')}
            {navLink('/alerts', 'Alerts')}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}

