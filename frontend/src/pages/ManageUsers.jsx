import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUserRole } from '../redux/slices/userSlice';
import UserCard from '../components/UserCard';

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUpdateRole = (userId, role) => {
    dispatch(updateUserRole({ userId, role }));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Manage Users</h1>
      <div className="grid grid-cols-3 gap-6 mt-8">
        {users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            onUpdateRole={(role) => handleUpdateRole(user._id, role)}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;

