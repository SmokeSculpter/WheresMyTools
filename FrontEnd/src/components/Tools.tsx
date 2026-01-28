import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState, useContext, useMemo, type ChangeEvent } from "react";
import { DataContext } from "../App";

import { checkToolOut, fetchToolsAndEmployees, updateData } from "../Utilities/fetchData";
import type { Employee, Tool, ToolsAndEmployees } from "../Utilities/interfaces";

import Feedback from "./Feedback";

const Tools = () => {
    const [employeeId, setEmployeeId] = useState<number>(0);
    const [feedback, setFeedback] = useState<[string, string] | null>(null);

    const { allData, setAllData } = useContext(DataContext);

    useEffect(() => {
        fetchToolsAndEmployees(setAllData);
    }, []);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All Categories");
    const [status, setStatus] = useState("All Statuses");


    const filteredTools: Tool[] | undefined = useMemo(() => {
        
        return allData?.toolsAndEmployees?.tools.filter(tool => {
        const matchesSearch = tool.toolName.toLowerCase().includes(search.toLowerCase());

        const matchesCategory = category === "All Categories" || tool.category === category;

        const matchesStatus = status === "All Statuses" || (!tool.toolStatus && status == "Checked Out") || (tool.toolStatus && status == "Available");

        return matchesSearch && matchesCategory && matchesStatus;
    });
    }, [allData, search, category, status]);


    const getCategories = (data: ToolsAndEmployees) => {
        let categories: string[] = ["All Categories"];

        for(let index = 0; index < data.tools.length; index++){
        if(!categories.includes(data.tools[index].category)){
            categories.push(data.tools[index].category);
        }
        }

        return categories;
    }

    return ( 
        <>
            <Feedback feedback={feedback} setter={setFeedback} />
            {/* Inventory Content */}
            <div className={`max-w-240 mx-auto my-0`}>
              <div className='w-full bg-white p-4 rounded-md border-gray-300 border'>

                {/* Filters */}
                <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder='Search for tools' className='border-gray-300 border rounded-md focus:outline-blue-500 p-1 lg:w-2/3 lg:mb-0 md:w-full md:mb-3 sm:w-full sm:mb-3' type="text"/>

                <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className='border-gray-300 border rounded-md p-1 lg:w-1/6 md:w-1/2 sm:w-full focus:outline-none lg:mb-0 md:mb-3 sm:mb-3' name="Category" id="">
                    {allData?.toolsAndEmployees != undefined ? getCategories(allData?.toolsAndEmployees).map((category: string) => {
                      return (
                        <option key={category} value={category}>{category}</option>
                      )
                    }): <option>Loading...</option>}
                </select>

                <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className='border-gray-300 border rounded-md p-1 lg:w-1/6 md:w-1/2 sm:w-full focus:outline-none' name="Category" id="">
                  <option value="All Statuses">All Statuses</option>
                  <option value="Available">Available</option>
                  <option value="Checked Out">Checked Out</option>
                </select>
              </div>

              {/* Tools */}
              <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-4'>
                {allData != undefined && allData.toolsAndEmployees && filteredTools != undefined ? 
                    filteredTools.map((tool: Tool) =>(
                        <div key={tool.toolId} className="basis-1/3 bg-white border-gray-300 border p-4 box-border rounded-md">
                            <div className="flex items-center">
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

                            <select onChange={(ev: ChangeEvent<HTMLSelectElement>) => {setEmployeeId(Number(ev.target.value))}} disabled={tool.toolStatus ? false : true} className={`border-gray-300 border focus:outline-none rounded-md p-1 mb-2 w-full ${!tool.toolStatus ? "bg-gray-500 text-gray-400" : ""}`} name="" id="">
                                <option value="">Select An Employee</option>
                                {allData.toolsAndEmployees?.employees.map((employee: Employee) => {
                                    return(
                                        <option key={employee.employeeId} value={employee.employeeId}>{employee.fullName}</option>
                                    )
                                })}
                            </select>
                        
                        
                            <button onClick={async () => {
                                await checkToolOut(tool.toolId, employeeId, setFeedback);
                                await updateData(allData, setAllData);
                            }} className={`w-full py-2 ${tool.toolStatus ? "bg-blue-500 cursor-pointer hover:bg-green-500 text-white" : "bg-gray-500 text-gray-400"} font-medium rounded-md`}>
                                {tool.toolStatus ? "Check Out" : "Currently Checked Out "}
                            </button>
                        </div>
                    )) : <p className="text-lg font-bold">Loading</p>}
              </div>
            </div>
        </>
     );
}
 
export default Tools;