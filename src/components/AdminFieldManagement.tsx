import React, { useState, useEffect } from 'react';
import { getFields, updateField, addField, removeField } from '../services/api';

interface Field {
  id: string;
  name: string;
  isRequired: boolean;
  isVisible: boolean;
}

const AdminFieldManagement: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [newFieldName, setNewFieldName] = useState('');

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    const fetchedFields = await getFields();
    setFields(fetchedFields);
  };

  const handleToggleRequired = async (id: string) => {
    const field = fields.find(f => f.id === id);
    if (field) {
      await updateField(id, { isRequired: !field.isRequired });
      fetchFields();
    }
  };

  const handleToggleVisible = async (id: string) => {
    const field = fields.find(f => f.id === id);
    if (field) {
      await updateField(id, { isVisible: !field.isVisible });
      fetchFields();
    }
  };

  const handleAddField = async () => {
    if (newFieldName.trim()) {
      await addField({ name: newFieldName.trim(), isRequired: false, isVisible: true });
      setNewFieldName('');
      fetchFields();
    }
  };

  const handleRemoveField = async (id: string) => {
    await removeField(id);
    fetchFields();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Veldbeheer</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          value={newFieldName}
          onChange={(e) => setNewFieldName(e.target.value)}
          placeholder="Nieuw veldnaam"
          className="border p-2 rounded"
        />
        <button onClick={handleAddField} className="bg-blue-500 text-white px-4 py-2 rounded">
          Veld toevoegen
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Veldnaam</th>
            <th className="p-2 text-center">Verplicht</th>
            <th className="p-2 text-center">Zichtbaar</th>
            <th className="p-2 text-center">Acties</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field.id} className="border-b">
              <td className="p-2">{field.name}</td>
              <td className="p-2 text-center">
                <input
                  type="checkbox"
                  checked={field.isRequired}
                  onChange={() => handleToggleRequired(field.id)}
                />
              </td>
              <td className="p-2 text-center">
                <input
                  type="checkbox"
                  checked={field.isVisible}
                  onChange={() => handleToggleVisible(field.id)}
                />
              </td>
              <td className="p-2 text-center">
                <button
                  onClick={() => handleRemoveField(field.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Verwijderen
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFieldManagement;