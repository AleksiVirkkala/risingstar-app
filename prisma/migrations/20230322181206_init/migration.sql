-- CreateTable
CREATE TABLE "VisitLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "browser" TEXT,
    "version" TEXT,
    "mobile" BOOLEAN,
    "os" TEXT
);
