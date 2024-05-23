export interface CvDto {
    id: string;
    name: string;
    url?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    specialization?: string;
    department?: string;
    employeeId: string;
    skills?: {
        skillId: string;
        level: number;
    }[];
    languages?: {
        languageId: string;
        level: number;
    }[];
    projects?: {
        projectId: string;
    }[];
}