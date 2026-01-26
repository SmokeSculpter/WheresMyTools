import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

import { useState, type ChangeEvent } from "react";

import type { Employee } from "../Utilities/interfaces";

import { checkToolOut } from "../Utilities/fetchData";

const ToolElement = ({toolId, toolName, category, toolStatus, employees}: any) => {
    const [employeeId, setEmployeeId] = useState<number>(0);

    const handleSelect = (ev: ChangeEvent<HTMLSelectElement>) => {
        setEmployeeId(Number(ev.target.value));
    }

    return ( 
        <>
            <div className="basis-1/3 bg-white border-gray-300 border p-4 box-border rounded-md">
                <div className="flex items-center">
                    <FontAwesomeIcon className="border-gray-300 border p-3 rounded-md text-blue" icon={faGear}/>
                    <div className="p-3">
                        <p className="text-lg font-medium">{toolName}</p>
                        <p className="text-sm">{category}</p>
                    </div>
                </div>
                <div className="w-full flex justify-between items-center">
                    <p className="text-gray-500 text-sm">Tool Id</p>
                    <p>{toolId}</p>
                </div>
                <div className="w-full flex justify-between items-center py-2">
                    <p className="text-gray-500 text-sm">Status</p>
                    <div className={`py-1 px-2 ${toolStatus ? "bg-green-300/50 text-green-600" : "bg-amber-300/50 text-amber-600"} rounded-md text-sm`}>
                        <p>{toolStatus ? "Available" : "Checked Out"}</p>
                    </div>
                </div>

                <select onChange={handleSelect} disabled={toolStatus ? false : true} className={`border-gray-300 border focus:outline-none rounded-md p-1 mb-2 w-full ${!toolStatus ? "bg-gray-500 text-gray-400" : ""}`} name="" id="">
                    <option value="">Select An Employee</option>
                    {employees.map((employee: Employee) => {
                        return(
                            <option key={employee.employeeId} value={employee.employeeId}>{employee.fullName}</option>
                        )
                    })}
                </select>
                <button onClick={() => checkToolOut(toolId, employeeId)} className={`w-full py-2 ${toolStatus ? "bg-blue-500 cursor-pointer hover:bg-green-500 text-white" : "bg-gray-500 text-gray-400"} font-medium rounded-md`}>
                    {toolStatus ? "Check Out" : "Currently Checked Out "}
                </button>
            </div>
        </>
     );
}
 
export default ToolElement;