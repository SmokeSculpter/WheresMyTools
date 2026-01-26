import axios from "axios"
import type { Tool, Employee, Data, EmployeeTools, Record } from "./interfaces"


export const fetchToolsAndEmployees = (setData: React.Dispatch<React.SetStateAction<Data | undefined>>) => {
        axios.get<Data>("https://localhost:7014/api/view/loadData").then(response => {
        const parsedData: Data = response.data;

        setData(parsedData);
    }).catch(err => console.log(err));
};