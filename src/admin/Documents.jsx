import React from "react";

const Documents = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Documents</h1>
      <button>Upload Document</button>
      <div>
        <h3>Uploaded Documents</h3>
        {/* Here you could list documents */}
        <ul>
          <li>
            <a href="#">Document 1</a> <button>Delete</button>
          </li>
          <li>
            <a href="#">Document 2</a> <button>Delete</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Documents;
