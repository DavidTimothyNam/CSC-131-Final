import React from 'react';

const mockFiles = ['Report.pdf', 'Budget.xlsx', 'Presentation.pptx'];

const Files = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Files</h2>
      <ul className="list-disc pl-6">
        {mockFiles.map((file, index) => (
          <li key={index}>{file}</li>
        ))}
      </ul>
    </div>
  );
};

export default Files;