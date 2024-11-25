import React from "react";

export default function Profile() {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  return (
    <>
      <div className="profile-container">
        <div className="profile-box">
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              borderBottom: "1px solid black",
            }}
          >
            Profile
          </h2>
          <p>
            <span style={{ fontWeight: "600" }}>Name:</span> {name}
          </p>
          <p>
            <span style={{ fontWeight: "600" }}>Email:</span> {email}
          </p>
          <p>
            <span style={{ fontWeight: "600" }}>Admin Access: </span>
            {role == "user" ? "None" : "Yes"}
          </p>
        </div>
      </div>
    </>
  );
}
