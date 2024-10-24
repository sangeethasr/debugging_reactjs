import React, { useState, useEffect } from "react";
import User from "./User";

const UserList = ({ searchTerm }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Changed values of setloading
    setLoading(true)
    const fetchUsers = async () => {
      const response = await fetch("https://api.example.com/users");
      const data = await response.json();
      setUsers(data);
      setLoading(false)
    };
    fetchUsers();
  }, [searchTerm]);

 

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
            {/* Onclick function doesn't work here. Created another component for user */}
          <User user={user} />
        </div>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("wss://api.example.com/notifications");
    ws.onmessage = (event) => {
      setNotifications((prev) => [...prev, event.data]);
    };
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <input type="text" onChange={handleSearch} value={search} />
      <UserList searchTerm={search} />
      <div>
        {notifications.map((note, index) => (
          // Add key value into div tag
          <div>{note}</div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
