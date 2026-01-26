import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faGear } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import type { Record } from "../Utilities/interfaces";
import { fetchRecords } from "../Utilities/fetchData";

const RecordsView = () => {
    const [records, setRecords] = useState<Record[]>();

    useEffect(() => {
        fetchRecords(setRecords);
    }, []);

    return ( 
        <>
            {records?.map((record: Record) => {
                return(
                        <div key={record.recordId} className="w-full bg-white border-gray-500 border p-4 rounded-md mb-4">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center">
                                    <FontAwesomeIcon size="lg" icon={faBook}/>
                                    <p className="px-2 font-medium text-lg">RecordId</p>
                                </div>
                                <p>{record.recordId}</p>
                            </div>
                            <div className="w-full h-px bg-gray-500 mb-3"/>
                            <div key={record.toolId} className="flex items-center">
                                <FontAwesomeIcon className="border-gray-300 border p-3 rounded-md text-blue" icon={faGear}/>
                                <div className="p-3">
                                    <p className="text-lg font-medium">{record.toolName}</p>
                                    <p className="text-sm">{record.toolCategory}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-500 py-2">
                                <p>ToolId</p>
                                <p>{record.toolId}</p>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-500 py-2">
                                <p>Employee</p>
                                <p>{record.employeeName}</p>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-500 py-2">
                                <p>Postion</p>
                                <p>{record.employeePosition}</p>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-500 py-2">
                                <p>EmployeeId</p>
                                <p>{record.employeeId}</p>
                            </div>
                            <div className="w-full flex justify-between items-center pb-2">
                                <p className="text-gray-500 text-sm">Checked In</p>
                                <div className={`py-1 px-2 ${record.dateCheckedIn ? "bg-green-300/50 text-green-600" : "bg-amber-300/50 text-amber-600"} rounded-md text-sm`}>
                                    <p>{record.dateCheckedIn ? `${record.dateCheckedIn}` : "Checked Out"}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                                <p>Checked Out</p>
                                <p>{record.dateCheckedOut}</p>
                            </div>
                        </div>
                )
            })}
        </>
     );
}
 
export default RecordsView;