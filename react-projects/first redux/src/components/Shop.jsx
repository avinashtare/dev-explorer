import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, clear } from "../redux/slices/counter/index";
import { fetchUsers } from "../redux/slices/usersAPI";
import UserTable from "./UserTable";

export default function Shop() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersAPI);

  const handleLoadUser = () => {
    if (!users.isLoading) {
      dispatch(fetchUsers());
    }
  };

  return (
    <>
      <h1 className="text-light my-2 mx-2">Buy iPhone 17 Pro Max</h1>
      <button className="btn btn-primary" onClick={() => dispatch(increment())}>
        +
      </button>
      <span className="text-light mx-2">Add To Cart</span>
      <button className="btn btn-primary" onClick={() => dispatch(decrement())}>
        -
      </button>
      <button className="btn btn-primary my-2 mx-2" onClick={() => dispatch(clear())}>
        clear
      </button>

      {/* users  */}
      <br />
      <button className="btn btn-primary my-2" onClick={handleLoadUser}>
        Load a user
      </button>

      {/* user table  */}
      <UserTable></UserTable>
    </>
  );
}
