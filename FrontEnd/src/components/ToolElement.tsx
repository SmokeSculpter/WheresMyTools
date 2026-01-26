import type { Tool } from "../Utilities/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

import { checkToolOut } from "../Utilities/fetchData";

const ToolElement = ({toolId, toolName, category, toolStatus}: Tool) => {
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
                <button onClick={() => checkToolOut(1, 2)} className={`w-full py-2 ${toolStatus ? "bg-blue-500" : "bg-red-300"} text-white font-medium rounded-md cursor-pointer hover:bg-green-500`}>
                    {toolStatus ? "Check Out" : "Check In "}
                </button>
            </div>
        </>
     );
}
 
export default ToolElement;