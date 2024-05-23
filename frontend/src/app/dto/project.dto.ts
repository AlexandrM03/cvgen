export interface ProjectDto {
    id?: string;
    name: string;
    startDate: string;
    endDate: string;
    teamSize: number;
    isArchived: boolean;
    description: string;
    responsibilities: string;
}