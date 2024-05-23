export interface EmployeeCvDto {
    firstName: string;
    lastName: string;
    email: string;
    specialization: string;
    department: string;
    skills: {
        name: string;
        level: number;
    }[];
    languages: {
        name: string;
        level: string;
    }[];
    projects: {
        name: string;
        startDate: Date;
        endDate: Date;
        teamSize: number;
        description: string;
        responsibilities: string;
    }[];
}