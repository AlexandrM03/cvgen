/*
  Warnings:

  - You are about to drop the column `cv` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the `EmployeeLanguage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmployeeSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectEmployee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmployeeLanguage" DROP CONSTRAINT "EmployeeLanguage_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeLanguage" DROP CONSTRAINT "EmployeeLanguage_languageId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeSkill" DROP CONSTRAINT "EmployeeSkill_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeSkill" DROP CONSTRAINT "EmployeeSkill_skillId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectEmployee" DROP CONSTRAINT "ProjectEmployee_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectEmployee" DROP CONSTRAINT "ProjectEmployee_projectId_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "cv";

-- DropTable
DROP TABLE "EmployeeLanguage";

-- DropTable
DROP TABLE "EmployeeSkill";

-- DropTable
DROP TABLE "ProjectEmployee";

-- CreateTable
CREATE TABLE "Cv" (
    "id" TEXT NOT NULL,
    "url" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,

    CONSTRAINT "Cv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CvSkill" (
    "cvId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "CvSkill_pkey" PRIMARY KEY ("cvId","skillId")
);

-- CreateTable
CREATE TABLE "CvLanguage" (
    "cvId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "level" TEXT NOT NULL,

    CONSTRAINT "CvLanguage_pkey" PRIMARY KEY ("cvId","languageId")
);

-- CreateTable
CREATE TABLE "CvProject" (
    "projectId" TEXT NOT NULL,
    "cvId" TEXT NOT NULL,

    CONSTRAINT "CvProject_pkey" PRIMARY KEY ("projectId","cvId")
);

-- AddForeignKey
ALTER TABLE "Cv" ADD CONSTRAINT "Cv_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CvSkill" ADD CONSTRAINT "CvSkill_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "Cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CvSkill" ADD CONSTRAINT "CvSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CvLanguage" ADD CONSTRAINT "CvLanguage_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "Cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CvLanguage" ADD CONSTRAINT "CvLanguage_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CvProject" ADD CONSTRAINT "CvProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CvProject" ADD CONSTRAINT "CvProject_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "Cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
