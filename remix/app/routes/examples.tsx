import { useState } from "react";
import { Link, useNavigate } from "@remix-run/react";

export default function ExamplePage() {
  const [bgColor, setBgColor] = useState("white");
  const [labelText, setLabelText] = useState("Original Label");
  const [showLabel, setShowLabel] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const countries = {
    USA: ["New York", "Los Angeles", "Chicago"],
    Canada: ["Toronto", "Vancouver", "Montreal"],
  };

  function addNumbers(a, b) {
    return a + b;
  }

  function getRandomNumber() {
    return Math.floor(Math.random() * 100);
  }

  function reverseString(str) {
    return str.split("").reverse().join("");
  }

  function shareData() {
    navigate("/shared-data-page?info=" + encodeURIComponent("Shared info from main page"));
  }

  return (
    <div className="p-6 space-y-6" style={{ backgroundColor: bgColor }}>
      <h1 className="text-2xl font-bold">Remix React Examples</h1>

      <div className="space-x-4">
        <button
          onClick={() => setBgColor(bgColor === "white" ? "lightblue" : "white")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Toggle Background Color
        </button>

        <button
          onClick={() => setLabelText("Updated Label")}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Change Label Text
        </button>

        <button
          onClick={() => window.location.href = "https://example.com"}
          className="px-4 py-2 bg-purple-500 text-white rounded"
        >
          Go to External Page
        </button>

        <Link to="/internal-page" className="px-4 py-2 bg-yellow-500 text-white rounded inline-block">
          Go to Internal Page
        </Link>

        <button
          onClick={() => setShowLabel(!showLabel)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Toggle Label Visibility
        </button>
      </div>

      {showLabel && <p className="text-lg mt-4">{labelText}</p>}

      <div className="mt-6">
        <label className="block">Select Country:</label>
        <select
          value={selectedCountry}
          onChange={(e) => {
            setSelectedCountry(e.target.value);
            setSelectedCity("");
          }}
          className="border rounded p-2"
        >
          <option value="">-- Select Country --</option>
          {Object.keys(countries).map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        {selectedCountry && (
          <div className="mt-2">
            <label className="block">Select City:</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="border rounded p-2"
            >
              <option value="">-- Select City --</option>
              {countries[selectedCountry].map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {selectedCity && (
        <p className="mt-4">You selected: {selectedCountry} - {selectedCity}</p>
      )}

      <div className="mt-6">
        <button
          onClick={() => alert("Simple Alert Button")}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Show Alert
        </button>

        <button
          onClick={() => console.log("Console log message")}
          className="ml-4 px-4 py-2 bg-black text-white rounded"
        >
          Log to Console
        </button>
      </div>

      <div className="mt-6 space-x-4">
        <button
          onClick={() => setResult(`Addition Result: ${addNumbers(5, 7)}`)}
          className="px-4 py-2 bg-indigo-500 text-white rounded"
        >
          Add Numbers
        </button>

        <button
          onClick={() => setResult(`Random Number: ${getRandomNumber()}`)}
          className="px-4 py-2 bg-pink-500 text-white rounded"
        >
          Generate Random Number
        </button>

        <button
          onClick={() => setResult(`Reversed String: ${reverseString("Remix")}`)}
          className="px-4 py-2 bg-teal-500 text-white rounded"
        >
          Reverse String
        </button>
      </div>

      {result && (
        <p className="mt-4 text-lg font-medium">{result}</p>
      )}

      <div className="mt-6">
        <button
          onClick={shareData}
          className="px-4 py-2 bg-orange-500 text-white rounded"
        >
          Share Data with Other Page
        </button>
      </div>
    </div>
  );
}
