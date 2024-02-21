interface CrmFile {
    id: number;
    filename: string;
    status: number;
}

export interface CrmModel {
    id: number,
    customerName: string,
    phoneNumber: string,
    title: string,
    description: string,
    status: number,
    startDate: string,
    endDate: string,
    crmFile: CrmFile[]
}