-- AlterTable
ALTER TABLE "Cv" ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "specialization" DROP NOT NULL,
ALTER COLUMN "department" DROP NOT NULL;
