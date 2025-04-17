import React from "react";

const Inbox = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Inbox</h1>
      <ul>
        <li>
          <p><strong>Message from User1</strong></p>
          <p>Subject: Inquiry about services</p>
          <button>View</button>
          <button>Delete</button>
        </li>
        <li>
          <p><strong>Message from User2</strong></p>
          <p>Subject: Question on availability</p>
          <button>View</button>
          <button>Delete</button>
        </li>
      </ul>
    </div>
  );
};

export default Inbox;
