import axios from "axios"
import type { Tool, Employee, Data, EmployeeTools, Record } from "./interfaces"


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