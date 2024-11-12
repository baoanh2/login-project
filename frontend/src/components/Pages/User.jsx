import React from "react";

export default function User(props) {
  const { handleDelete } = props;
  return (
    <>
      <div>User</div>
      <button onClick={handleDelete}>Logout</button>
    </>
  );
}
