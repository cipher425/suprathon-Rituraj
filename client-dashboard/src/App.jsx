import React, { useState } from 'react';
import ClientList from './components/ClientList';
import ClientForm from './components/ClientForm';

const initialClients = [
  { id: 1, name: 'John Doe', company: 'Acme Corp', contact: 'john@acme.com' },
  { id: 2, name: 'Jane Smith', company: 'Beta LLC', contact: 'jane@beta.com' },
];

function App() {
  const [clients, setClients] = useState(initialClients);
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const handleAdd = () => {
    setEditingClient(null);
    setShowForm(true);
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setShowForm(true);
  };

  const handleDelete = (client) => {
    if (window.confirm(`Delete client ${client.name}?`)) {
      setClients(clients.filter(c => c.id !== client.id));
    }
  };

  const handleSave = (form) => {
    if (editingClient) {
      setClients(clients.map(c => c.id === editingClient.id ? { ...editingClient, ...form } : c));
    } else {
      setClients([
        ...clients,
        { ...form, id: Date.now() },
      ]);
    }
    setShowForm(false);
  };

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
                <a href="#" className="block px-2 py-1 rounded hover:bg-blue-100 font-semibold">Clients</a>
              </li>
              <li>
                <span className="block px-2 py-1 rounded text-gray-400 cursor-not-allowed">Projects</span>
              </li>
              <li>
                <span className="block px-2 py-1 rounded text-gray-400 cursor-not-allowed">Notes</span>
              </li>
            </ul>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-6">
          <ClientList
            clients={clients}
            onSelect={() => {}}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </main>
      </div>
      <ClientForm
        open={showForm}
        onClose={() => setShowForm(false)}
        onSave={handleSave}
        initialData={editingClient}
      />
    </div>
  );
}

export default App;
