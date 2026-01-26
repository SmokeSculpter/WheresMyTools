export interface Tool {
    toolId: number,
    toolName: string,
    category: string,
    toolStatus: boolean,
    checkedOut?: string
}

export interface Employee {
    employeeId: number,
    fullName: string,
    position: string,
}

export interface ToolsAndEmployees{
    tools: Tool[],
    employees: Employee[]
}

export interface EmployeeTools{
    employeeId: number,
    name: string,
    position: string,
    tools: Tool[]
}

export interface Record {
    recordId: number,
    dateCheckedOut: string,
    dateCheckedIn: string | null,
    toolId: number,
    toolName: string,
    toolCategory: string,
    employeeId: number,
    employeeName: string,
    employeePosition: string
}

export class DataList {
    toolsAndEmployees: ToolsAndEmployees | undefined;
    employeeTools: EmployeeTools[] | undefined;
    records: Record[] | undefined

    constructor(toolsAndEmployees?: ToolsAndEmployees, employeeTools?: EmployeeTools[], records?: Record[]){
        this.toolsAndEmployees = toolsAndEmployees;
        this.employeeTools = employeeTools;
        this.records = records;
    }
}

export class RecordDTO {
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