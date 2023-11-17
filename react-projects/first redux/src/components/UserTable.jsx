import React from "react";
import { useSelector } from "react-redux";

function UserTable() {
  const users = useSelector((state) => state.usersAPI);
  return (
    <div className="container">
      <h1 className="text-center text-light">Users</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">email</th>
          </tr>
        </thead>
        <tbody>
          {users.data.map((e) => (
            <tr key={e.id}>
              <th scope="row">{e.id}</th>
              <td>{e.name}</td>
              <td>{e.username}</td>
              <td>{e.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
