import React from 'react';

const AdminDesign2 = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    // For now, accept any input as valid (replace with real auth later)
    if (credentials.username && credentials.password) {
      setLoggedIn(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className="flex h-screen">
      {loggedIn && (
        <aside className="w-64 bg-gray-800 text-white p-4">
          <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
          <nav className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="material-icons">folder</span>
              <a href="#" className="hover:text-gray-400">Files</a>
            </div>
            <div className="flex items-center space-x-2">
              <span className="material-icons">mail</span>
              <a href="#" className="hover:text-gray-400">Inbox</a>
            </div>
            <div className="flex items-center space-x-2">
              <span className="material-icons">calendar_today</span>
              <a href="#" className="hover:text-gray-400">Calendar</a>
            </div>
          </nav>
        </aside>
      )}

      <main className={`flex-1 flex items-center justify-center ${loggedIn ? 'bg-gray-100' : 'bg-white'}`}>
        {!loggedIn ? (
          <div className="w-full max-w-md p-8 bg-white shadow rounded">
            <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={credentials.username}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full p-3 border rounded focus:outline-none focus:ring"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
              >
                Login
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-4xl font-bold">Welcome to the Admin Panel</h1>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDesign2;
