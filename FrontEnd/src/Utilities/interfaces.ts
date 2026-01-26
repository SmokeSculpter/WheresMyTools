export interface Tool {
    toolId: number,
    toolName: string,
    category: string,
    toolStatus: boolean,
}

export interface Employee {
    employeeId: number,
    fullName: string,
    position: string,
}

export interface Data{
    tools: Tool[],
    employee: Employee[]
}

export interface EmployeeTools{
    employeeId: number,
    name: string,
    position: string,
    tools: Tool[]
}

export interface Record{
    recordId: number,
    dateCheckedOut: string,
    dataeCheckedIn: string | null,
    toolId: number,
    toolName: string,
    toolCategory: string,
    employeeId: number,
    employeeName: string,
    employeePosition: string
}

export class RecordDTO{
    dateCheckedOut: string;
    dateCheckedIn: null;
    toolId: number;
    employeeId: number;

    constructor(toolId: number, employeeId: number){
        this.dateCheckedOut = new Date().toISOString().split('T')[0];
        this.dateCheckedIn = null;
        this.toolId = toolId;
        this.employeeId = employeeId;
    }
}