import React, { useEffect, useState } from 'react'
import VPI_PART_ONE from './VPI_PART_ONE'
import TABLE from './VPI_TABLE'
import Audio from "./Audio";
import data from "../../Json/data";
import * as XLSX from "xlsx";


function VPI_PARENT() {
    const [audio, setAudio] = useState(null);
    const [tableData, setTableData] = useState([...data]);
    const [dataFilter, setDateFilter] = useState({ start: '', end: '' });
// Function to remove time and compare only date (year, month, day)
function getDateWithoutTime(dateString) {
    const date = new Date(dateString);
    // Set time to midnight to remove time information
    date.setHours(0, 0, 0, 0);
    return date;
  }
  
  // Function to check if startTime is greater than the target date (ignoring time)
  function isGreaterThanTargetDate(startTime, targetDate) {
    const startDate = getDateWithoutTime(startTime);
    const target = getDateWithoutTime(targetDate);
    console.log("DATE");
    console.log(startDate);
    console.log(target);
    return startDate < target;
  }
  
  // Function to check if startTime is lesser than the target date (ignoring time)
  function isLesserThanTargetDate(startTime, targetDate) {
    const startDate = getDateWithoutTime(startTime);
    const target = getDateWithoutTime(targetDate);
    return startDate > target;
  }


    function Search(){
        console.log("SEARCH");
        console.log(dataFilter["end"]);
        if (dataFilter["start"].length > 0 && dataFilter["end"].length > 0) {
            const arr=tableData.filter((vl) => {
                
                if (isGreaterThanTargetDate(dataFilter["start"],vl["startTime"]) && isLesserThanTargetDate( dataFilter["end"],vl["startTime"]) ) {
                    return true
                }
                return false
            })
            setTableData([...arr]);


        }
        else{
            setTableData([]);
        }
    }


    return (
        <div className='container  p-5 flex flex-col gap-4'>
            <VPI_PART_ONE
                setDateFilter={setDateFilter}
                dataFilter={dataFilter}
                Search={Search}

            />
            <TABLE
                setAudio={setAudio}
                data={tableData}

            />
            <div className='grid grid-cols-[80%_20%]  gap-3 item-center w-[80%] mx-auto'>
                {audio != null && <Audio
                    id={audio}
                />}

                {audio != null && <button className='btn btn-success text-white text-lg w-[50%] ml-[auto]'
                    onClick={() => {

                        if (audio != null) {
                            // Create a worksheet from the JSON data
                            const worksheet = XLSX.utils.json_to_sheet([data[audio]]);

                            // Create a new workbook and append the worksheet
                            const workbook = XLSX.utils.book_new();
                            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

                            // Write the workbook to a file
                            XLSX.writeFile(workbook, `${"MetaData"}.xlsx`);
                        }
                    }}
                >Download</button>
                }       </div>

        </div>
    )
}

export default VPI_PARENT