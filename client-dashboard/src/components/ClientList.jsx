import React from 'react';

const ClientList = ({ clients, onSelect, onAdd, onEdit, onDelete }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Clients</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={onAdd}
        >
          + Add Client
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Company</th>
              <th className="px-4 py-2 text-left">Contact</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">No clients found.</td>
              </tr>
            ) : (
              clients.map((client) => (
                <tr key={client.id} className="border-t hover:bg-blue-50 cursor-pointer">
                  <td className="px-4 py-2" onClick={() => onSelect(client)}>{client.name}</td>
                  <td className="px-4 py-2" onClick={() => onSelect(client)}>{client.company}</td>
                  <td className="px-4 py-2" onClick={() => onSelect(client)}>{client.contact}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button className="text-blue-600 hover:underline" onClick={e => { e.stopPropagation(); onEdit(client); }}>Edit</button>
                    <button className="text-red-600 hover:underline" onClick={e => { e.stopPropagation(); onDelete(client); }}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList;