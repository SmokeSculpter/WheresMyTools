import axios from "axios"
import type { ToolsAndEmployees, EmployeeTools, Record } from "./interfaces"
import { DataList } from "./interfaces"
import { RecordDTO } from "./interfaces";

const baseUrl = "https://localhost:7014/api/view";


/**
 * Utility function used to fetch data from a specified endpoint.
 *
 * @param {"loadData" | "employeeTools" | "records"} endPoint - State setter data object.
 * @returns {Promise<void>}
 */
const getData = async <Type>(endPoint: "loadData" | "employeeTools" | "records"): Promise<Type | undefined> => {
    let data: Type | undefined = undefined;
    await axios.get<Type>(`${baseUrl}/${endPoint}`).then(response => {
        data = response.data;

    }).catch(() => alert("Failed to fetch data"));

    return data;
};

/**
 * Used to initally fetch all records from the database.
 *
 * @param {React.Dispatch<React.SetStateAction<DataList | undefined>> | undefined} setAllData - State setter data object.
 * @returns {Promise<void>}
 */
export const fetchToolsAndEmployees = async (setAllData: React.Dispatch<React.SetStateAction<DataList | undefined>> | undefined): Promise<void> => {
    let toolAndEmployees:ToolsAndEmployees | undefined = await getData<ToolsAndEmployees | undefined>("loadData");

    setAllData?.((prev: DataList | undefined) => new DataList(
        toolAndEmployees,
        prev?.employeeTools,
        prev?.records
    ));
}

/**
 * Used to initally fetch all tools and employees from the database.
 *
 * @param {React.Dispatch<React.SetStateAction<DataList | undefined>> | undefined} setAllData - State setter data object.
 * @returns {Promise<void>}
 */
export const fetchEmployeeTools = async (setAllData: React.Dispatch<React.SetStateAction<DataList | undefined>> | undefined): Promise<void> => {
    let employeeTools:EmployeeTools[] | undefined = await getData<EmployeeTools[] | undefined>("employeeTools");

    setAllData?.((prev: DataList | undefined) => new DataList(
        prev?.toolsAndEmployees,
        employeeTools,
        prev?.records
    ));
}

/**
 * Used to initally fetch all data records from the database.
 *
 * @param {React.Dispatch<React.SetStateAction<DataList | undefined>> | undefined} setAllData - State setter data object.
 * @returns {Promise<void>}
 */
export const fetchAllRecords = async (setAllData: React.Dispatch<React.SetStateAction<DataList | undefined>> | undefined): Promise<void> => {
    let records:Record[] | undefined = await getData<Record[] | undefined>("records");

    setAllData?.((prev: DataList | undefined) => new DataList(
        prev?.toolsAndEmployees,
        prev?.employeeTools,
        records
    ));
}

/**
 * This function is used to update client side data after changes have been made in the database.
 * It checks what sets of data have already been loaded and refetches data if they have.
 *
 * @param {DataList | undefined} allData - object containing all data.
 * @param {React.Dispatch<React.SetStateAction<DataList | undefined>> | undefined} setAllData - State setter data object.
 * @returns {Promise<void>}
 */
export const updateData = async (
    allData: DataList | undefined, 
    setAllData: React.Dispatch<React.SetStateAction<DataList | undefined>> | undefined
) => {
    let toolAndEmployees: ToolsAndEmployees | undefined = allData?.toolsAndEmployees != undefined  ?
        await getData<ToolsAndEmployees | undefined>("loadData") : undefined;

    let employeeTools: EmployeeTools[] | undefined = allData?.employeeTools != undefined ?
        await getData<EmployeeTools[] | undefined>("employeeTools") : undefined;

    let records: Record[] | undefined = allData?.records != undefined ?
        await getData<Record[] | undefined>("records") : undefined;

    setAllData?.(new DataList(
        toolAndEmployees,
        employeeTools,
        records
    ));
}

/**
 * Post method to check tool out and create new record of tool check out.
 *
 * @param {number} toolId - toolId of tool to check out.
 * @param {number} employeeId - employeeId of employee checking out tool.
 * @returns {Promise<void>}
 */
export const checkToolOut = async (toolId: number, employeeId: number) => {
    const record: RecordDTO = new RecordDTO(toolId, employeeId);

    await axios.post(`https://localhost:7014/api/view/checkOut/${toolId}`, record).then(response => {
        if(response.status == 204){
            alert("Tool checked out!");
        }
    }).catch(err => console.error(err));
};

/**
 * Put method to update tool and record when tool is checked back in.
 *
 * @param {number} toolId - toolId of tool to check out.
 * @returns {Promise<void>}
 */
export const checkIn = async (toolId: number) => {
    await axios.put(`https://localhost:7014/api/view/checkIn/${toolId}`).then(response => {
        if(response.status == 204){
            alert("Tool checked in!");
        }
    }).catch(() => alert("Failed to check tool in"));
}