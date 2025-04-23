import React from 'react';

const mockInbox = [
  { subject: 'Meeting Reminder', sender: 'HR' },
  { subject: 'New Assignment', sender: 'Manager' },
  { subject: 'Team Outing', sender: 'Admin' },
];

const Inbox = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Inbox</h2>
      <ul className="space-y-2">
        {mockInbox.map((mail, index) => (
          <li key={index} className="p-3 border rounded">
            <strong>{mail.subject}</strong> from {mail.sender}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inbox;