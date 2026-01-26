import axios from "axios"
import type { Data, EmployeeTools, Record } from "./interfaces"
import { RecordDTO } from "./interfaces";


export const fetchToolsAndEmployees = (setData: React.Dispatch<React.SetStateAction<Data | undefined>>) => {
    axios.get<Data>("https://localhost:7014/api/view/loadData").then(response => {
        const parsedData: Data = response.data;

        setData(parsedData);
    }).catch(err => console.error(err));
};

export const fetchEmployeeTools = (setEmployeeTools: React.Dispatch<React.SetStateAction<EmployeeTools[] | undefined>>) => {
    axios.get("https://localhost:7014/api/view/employeeTools").then(response => {
        const parsedData: EmployeeTools[] = response.data;

        setEmployeeTools(parsedData);
    }).catch(err => console.error(err));
};

export const fetchRecords = (setRecords: React.Dispatch<React.SetStateAction<Record[] | undefined>>) => {
    axios.get("https://localhost:7014/api/view/records").then(response => {
        const parsedData = response.data;

        setRecords(parsedData);
    }).catch(err => console.error(err));
};

export const checkToolOut = (toolId: number, employeeId: number) => {
    const record: RecordDTO = new RecordDTO(toolId, employeeId);

    axios.post(`https://localhost:7014/api/view/checkOut/${toolId}`, record).then(response => {
        if(response.status == 204){
            alert("Tool checked out!");
        }
    }).catch(err => console.error(err));
};

export const checkOut = (toolId: number) => {
    axios.put(`https://localhost:7014/api/view/checkIn/${toolId}`).then(response => {
        if(response.status == 204){
            alert("Tool checked in!");
        }
    }).catch();
}