import React from 'react';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white px-6 py-4 shadow flex items-center justify-between">
        <h1 className="text-2xl font-bold">Client Dashboard</h1>
        <span className="text-sm">IT Company</span>
      </header>
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r p-4 hidden md:block">
          <nav>
            <ul className="space-y-2">
              <li>
                <a href="#" className="block px-2 py-1 rounded hover:bg-blue-100">Clients</a>
              </li>
              <li>
                <a href="#" className="block px-2 py-1 rounded hover:bg-blue-100">Projects</a>
              </li>
              <li>
                <a href="#" className="block px-2 py-1 rounded hover:bg-blue-100">Notes</a>
              </li>
            </ul>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome to the Client Dashboard</h2>
          <p className="text-gray-600">Select a section from the sidebar to get started.</p>
        </main>
      </div>
    </div>
  );
}

export default App;
