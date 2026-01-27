import { useEffect, useState, useContext } from "react";
import { DataContext } from "../App";

import { fetchEmployeeTools, fetchDbData } from "../Utilities/fetchData";

import type { EmployeeTools, Tool } from "../Utilities/interfaces";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson, faGear } from "@fortawesome/free-solid-svg-icons";

import { checkIn } from "../Utilities/fetchData";

const EmployeeToolsView = () => {
    const [employeesTools, setEmployeesTools] = useState<EmployeeTools[]>();
    const { allData, setAllData } = useContext(DataContext);

    useEffect(() => {
        fetchEmployeeTools(setEmployeesTools);
        fetchDbData(allData, setAllData, "Employee Tools");
    }, []);

    return (
        <div>
            {employeesTools?.map((employee: EmployeeTools) => (
                <div key={employee.employeeId} className="w-full bg-white border-gray-500 border p-4 rounded-md mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <FontAwesomeIcon size="lg" icon={faPerson}/>
                            <p className="px-2 font-medium text-lg">{employee.name}</p>
                        </div>
                        <p className="text-gray-500 text-small">{employee.position}</p>
                    </div>
                    {employee.tools.map((tool: Tool) => (
                        <div key={tool.toolId} onClick={() => console.log(employeesTools)} className="w-full border-gray-500 border p-4 rounded-md mb-4">
                            <div key={tool.toolId} className="flex items-center">
                                <FontAwesomeIcon className="border-gray-300 border p-3 rounded-md text-blue" icon={faGear}/>
                                <div className="p-3">
                                    <p className="text-lg font-medium">{tool.toolName}</p>
                                    <p className="text-sm">{tool.category}</p>
                                </div>
                            </div>
                            <div className="w-full flex justify-between items-center">
                                <p className="text-gray-500 text-sm">Tool Id</p>
                                <p>{tool.toolId}</p>
                            </div>
                            <div className="w-full flex justify-between items-center py-2">
                                <p className="text-gray-500 text-sm">Status</p>
                                <div className={`py-1 px-2 ${tool.toolStatus ? "bg-green-300/50 text-green-600" : "bg-amber-300/50 text-amber-600"} rounded-md text-sm`}>
                                    <p>{tool.toolStatus ? "Available" : "Checked Out"}</p>
                                </div>
                            </div>
                            <div className="w-full flex justify-between items-center mb-4">
                                <p className="text-gray-500 text-sm">Date Checked Out</p>
                                <p>{tool.checkedOut}</p>
                            </div>
                            <button onClick={() => checkIn(tool.toolId)} className={`w-2/10 py-2 bg-blue-500 cursor-pointer hover:bg-green-500 text-white font-medium rounded-md`}>
                                Check In
                            </button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
 
export default EmployeeToolsView;