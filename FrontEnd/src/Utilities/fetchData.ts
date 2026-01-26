import axios, { all } from "axios"
import type { ToolsAndEmployees, EmployeeTools, Record, Tool } from "./interfaces"
import { DataList } from "./interfaces"
import { RecordDTO } from "./interfaces";

const baseUrl = "https://localhost:7014/api/view";

const getData = async <Type>(endPoint: string): Promise<Type | undefined> => {
    let data: Type | undefined = undefined;
    await axios.get<Type>(`${baseUrl}/${endPoint}`).then(response => {
        if(response.status == 200){
            data = response.data;
        }
    }).catch(() => alert("Failed to fetch data"));

    return data;
};

export const fetchDbData = async (
    allData: DataList | undefined,
    setAllData: React.Dispatch<React.SetStateAction<DataList | undefined>>,
    dataToFetch: "Tools And Employees" | "Employee Tools" | "Records"
) => {
    let dataToolsAndEmployees: ToolsAndEmployees | undefined = undefined;
    let dataEmployeeTools: EmployeeTools[] | undefined = undefined;
    let dataRecords: Record[] | undefined = undefined;

    switch (dataToFetch){
        case "Tools And Employees":
            dataToolsAndEmployees = await getData<ToolsAndEmployees | undefined>("loadData");

            allData?.employeeTools != undefined ? 
                dataEmployeeTools = await getData<EmployeeTools[] | undefined>("employeeTools") : 
                dataEmployeeTools = undefined
            
            allData?.records != undefined ? 
                dataRecords = await getData<Record[] | undefined>("records") :
                dataRecords = undefined;

            setAllData(prev => new DataList(
                dataToolsAndEmployees,
                prev?.employeeTools != undefined ? dataEmployeeTools : undefined,
                prev?.records != undefined ? dataRecords : undefined
            ));
            break;

        case "Employee Tools":
            dataEmployeeTools = await getData<EmployeeTools[] | undefined>("employeeTools");

            allData?.toolsAndEmployees != undefined ? 
                dataToolsAndEmployees = await getData<ToolsAndEmployees | undefined>("loadData") : 
                dataToolsAndEmployees = undefined
            
            allData?.records != undefined ? 
                dataRecords = await getData<Record[] | undefined>("records") :
                dataRecords = undefined;

            setAllData(prev => new DataList(
                prev?.toolsAndEmployees != undefined ? dataToolsAndEmployees : undefined,
                dataEmployeeTools,
                prev?.records != undefined ? dataRecords : undefined
            ));
            break;

        case "Records":
            break;
    }
};

/**
 * Loads inital tool and employee data from Rest Api.
 *
 * @param {React.Dispatch<React.SetStateAction<ToolsAndEmployees | undefined>>} setData - State setter for data..
 * @returns {Promise<void>}
 */
export const fetchToolsAndEmployees = async (setData: React.Dispatch<React.SetStateAction<ToolsAndEmployees | undefined>>) => {
    await axios.get<ToolsAndEmployees>("https://localhost:7014/api/view/loadData").then(response => {
        const parsedData: ToolsAndEmployees = response.data;

        setData(parsedData);
    }).catch(err => console.error(err));
};

/**
 * Loads tools for any employee that has tools checked out.
 *
 * @param {React.Dispatch<React.SetStateAction<EmployeeTools[] | undefined>>} setEmployeeTools - State setter for employeeTools..
 * @returns {Promise<void>}
 */
export const fetchEmployeeTools = async (setEmployeeTools: React.Dispatch<React.SetStateAction<EmployeeTools[] | undefined>>) => {
    axios.get("https://localhost:7014/api/view/employeeTools").then(response => {
        const parsedData: EmployeeTools[] = response.data;

        setEmployeeTools(parsedData);
    }).catch(() => alert("Could not fetch data"));
};

/**
 * Loads records.
 *
 * @param {React.Dispatch<React.SetStateAction<Record[] | undefined>>} setRecords - State setter for records.
 * @returns {Promise<void>}
 */
export const fetchRecords = async (setRecords: React.Dispatch<React.SetStateAction<Record[] | undefined>>) => {
    await axios.get("https://localhost:7014/api/view/records").then(response => {
        const parsedData = response.data;

        setRecords(parsedData);
    }).catch(() => alert("Could not fetch data"));
};


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