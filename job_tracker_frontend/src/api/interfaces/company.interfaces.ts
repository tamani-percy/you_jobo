export interface CompanyResponse {
    id: number,
    name: string,
    website: string,
    industry: string,
    location: string,
    description: string,
    createdAt: string,
    updatedAt: string
}

export interface CompanyRequest {
    id?: number,
    name: string,
    website: string,
    industry: string,
    location: string,
    description: string
}