import { useState } from "react";

const SearchBar = ({ onSearch }: { onSearch: (query: string, platform: string) => void }) => {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("YouTube");

  return (
    <div className="flex gap-4 mb-6">
      <input
        type="text"
        className="p-2 border rounded"
        placeholder="Search for videos or music..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select
        className="p-2 border rounded"
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option value="YouTube">YouTube</option>
        <option value="Spotify">Spotify</option>
      </select>
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={() => onSearch(query, platform)}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
