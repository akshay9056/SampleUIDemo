import React, { useEffect, useState } from "react";
import * as cheerio from "cheerio";

const HTMLMetadataDisplay = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchHTML = async () => {
      try {
        // Fetch the HTML file
        const response = await fetch("../src/assets/external.html");
        const htmlText = await response.text();

        // Parse the HTML using Cheerio
        const $ = cheerio.load(htmlText);

        // Select rows from the table
        const tableRows = [];
        $("table tr").each((i, row) => {
          const cells = $(row)
            .find("td, th")
            .map((j, cell) => $(cell).text().trim())
            .get();
          if (cells.length > 0) {
            tableRows.push(cells);
          }
        });

        setRows(tableRows);
      } catch (error) {
        console.error("Error fetching or parsing HTML:", error);
      }
    };

    fetchHTML();
  }, []);

  return (
    <div className="p-4 overflow-x-auto max-w-full table-container">
      {rows.length > 0 ? (
        <table border="1" className="table min-w-max w-full border border-gray-300 custom-table">
          <thead>
            <tr>
              {rows[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(1).map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
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

export default HTMLMetadataDisplay;
