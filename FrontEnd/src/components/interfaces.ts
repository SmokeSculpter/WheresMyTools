export interface Tool {
    toolId: number,
    toolName: string,
    category: string,
    toolStatus: boolean,
    records: any
}

export interface Employee {
    employeeId: number,
    firstName: string,
    lastName: string,
    position: string,
    records: any
}

export interface Data{
    tools: Tool[],
    employee: Employee[]
}