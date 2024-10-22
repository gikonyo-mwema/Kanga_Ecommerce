const UserCard = ({ user }) => {
  return (
    <div className="border p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-gray-600">Email: {user.email}</p>
      <p className="text-gray-600">Role: {user.role}</p>
      <button className="mt-2 bg-blue-500 text-white py-1 px-4 rounded">View Profile</button>
    </div>
  );
};

export default UserCard;

