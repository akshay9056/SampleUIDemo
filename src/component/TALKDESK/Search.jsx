import { useState } from "react";

export default function SearchBar() {
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [filters, setFilters] = useState({
    interactionId: [],
    ringGroups: [],
    talkdeskTFN: [],
    customerNumber: [],
    agentName: [],
    duration: [],
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key, value) => {
    if (value.length <= 20) {
      setFilters((prev) => ({ ...prev, [key]: value.split(",") }));
    }
  };

  return (
    <div className="relative">
      <button 
        className="w-full bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
      Search Options
      </button>
      {isOpen && (
        <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md space-y-4 mt-2">
          {/* Date Range */}
          <div className="flex space-x-4">
            <div>
              <label className="font-semibold border-4 border-transparent p-4 text-gray-700">From Date *</label>
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange((prev) => ({ ...prev, from: e.target.value }))}
                className="startdate mt-1 p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="font-semibold border-4 border-transparent p-4 text-gray-700">To Date *</label>
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange((prev) => ({ ...prev, to: e.target.value }))}
                className="enddate mt-1 p-2 border rounded-md"
              />
            </div>
          </div>
          
          {/* Input Fields */}
          {Object.keys(filters).map((key) => (
            <div key={key} className="flex items-center space-x-4">
              <label className="font-semibold text-gray-700 capitalize w-1/3 text-center">{key} </label>
              <input
                type="text"
                placeholder={`Enter ${key} `}
                onChange={(e) => handleChange(key, e.target.value)}
                className="mt-1 p-2 border rounded-md w-2/3"
              />
            </div>
          ))}

          {/* Search Button */}
          <button className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
            Search
          </button>
        </div>
      )}
    </div>
  );
}
