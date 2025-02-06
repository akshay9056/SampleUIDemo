import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const Talkdesktable = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    // Fetch and parse the CSV file
    const fetchCSV = async () => {
      try {
        const response = await fetch("/public/talkdeskdata.csv"); // Path to your CSV file
        const csvText = await response.text();

        // Parse the CSV file using PapaParse
        Papa.parse(csvText, {
          header: true, // Treat the first row as headers
          skipEmptyLines: true,
          complete: (result) => {
            const rows = result.data;
            if (rows.length > 0) {
              setColumns(Object.keys(rows[0])); // Extract column names
              setData(rows); // Set row data
            }
          },
        });
      } catch (error) {
        console.error("Error fetching or parsing the CSV file:", error);
      }
    };

    fetchCSV();
  }, []);

  return (
    <div className="p-4 overflow-x-auto max-w-full table-container">
      {data.length > 0 ? (
        <table border="1" className="table min-w-max w-full border border-gray-300 custom-table">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  // className="boder border-gray-300 px-4 py-2 bg-gray-100"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    // className="border border-gray-300 px-4 py-2"
                  >
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Talkdesktable;
