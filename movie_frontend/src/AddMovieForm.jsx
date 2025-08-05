import { useState } from "react";

export default function AddMovieForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    setError("");
    if (!title || !genre || !year) {
      setError("Title, Genre, and Year are required.");
      return;
    }
    onAdd({ title, genre, year: Number(year), description });
    setTitle("");
    setGenre("");
    setYear("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "2em 0" }}>
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        placeholder="Genre"
        value={genre}
        onChange={e => setGenre(e.target.value)}
      />
      <input
        placeholder="Year"
        value={year}
        type="number"
        onChange={e => setYear(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button type="submit">Add Movie</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}