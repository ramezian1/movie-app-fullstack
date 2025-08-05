import { useState } from "react";
import LoginForm from "./loginform";
import AddMovieForm from "./AddMovieForm";
import axios from "axios";

function App() {
  const [token, setToken] = useState("");
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = async () => {
    const res = await axios.get("http://127.0.0.1:8000/movies/");
    setMovies(res.data);
  };

  const addMovie = async newMovie => {
    if (!token) return alert("You must log in first!");
    try {
      await axios.post("http://127.0.0.1:8000/movies/", newMovie, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMovies(); // refresh list
    } catch {
      alert("Failed to add movie (check fields or login status).");
    }
  };

  const searchMovies = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/movies/search", {
        params: { title: search }
      });
      setMovies(res.data);
    } catch {
      alert("Search failed.");
    }
  };

  const handleLogout = () => {
    setToken("");
    // Uncomment next line if using localStorage for token:
    // localStorage.removeItem("jwt");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-xl mt-12 p-8 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-2 tracking-tight text-center">
          🎬 Movie App
        </h1>

        {!token && <LoginForm onLogin={setToken} />}

        {token && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 mb-2">
            <div className="text-green-800 font-medium">
              Logged in! <span className="text-xs break-all">(JWT: {token.slice(0, 12)}...)</span>
            </div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 py-2 rounded transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}

        {token && (
          <div className="bg-gray-50 rounded-lg shadow p-4">
            <AddMovieForm onAdd={addMovie} />
          </div>
        )}

        {/* --- Search bar --- */}
        <div className="flex items-center gap-2">
          <input
            className="border border-gray-400 rounded p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Search by title"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={searchMovies}
          >
            Search
          </button>
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
            onClick={fetchMovies}
          >
            Load All
          </button>
        </div>

        <div>
          <ul className="divide-y divide-gray-200 mt-4">
            {movies.map(m => (
              <li
                key={m.id}
                className={`py-3 px-2 cursor-pointer transition ${
                  selectedMovie && selectedMovie.id === m.id
                    ? "bg-blue-100 text-blue-900 font-semibold"
                    : "hover:bg-slate-50"
                }`}
                onClick={() => setSelectedMovie(m)}
              >
                <span className="text-lg">{m.title}</span>
                <span className="ml-2 text-gray-600">({m.year})</span>
              </li>
            ))}
          </ul>
        </div>

        {selectedMovie && (
          <div className="border-t pt-5 mt-8">
            <div className="bg-blue-50 rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-blue-800 mb-2">
                {selectedMovie.title} <span className="text-base text-blue-500">({selectedMovie.year})</span>
              </h2>
              <div className="mb-2"><b>Genre:</b> {selectedMovie.genre}</div>
              <div className="mb-2"><b>Description:</b> {selectedMovie.description || "N/A"}</div>
              <button
                className="mt-3 bg-blue-300 hover:bg-blue-400 px-4 py-2 rounded text-blue-900"
                onClick={() => setSelectedMovie(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;