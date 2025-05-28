import React from 'react';
import { useJobPortal } from '../context/JobPortalContext.jsx';

function UserCard({ user }) {
  const { users, setUsers } = useJobPortal();

  const handleDelete = () => {
    setUsers(users.filter(u => u.id !== user.id));
    alert(`Deleted user: ${user.name}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-600">Role: {user.role}</p>
      </div>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
}

export default UserCard;    