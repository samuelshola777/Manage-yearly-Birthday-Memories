-- AlterTable
ALTER TABLE "app_users" ADD COLUMN     "role" TEXT DEFAULT 'user';

-- CreateTable
CREATE TABLE "celebrate_friends" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "celebranteId" TEXT NOT NULL,
    "contactMethod" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "mediaId" TEXT,

    CONSTRAINT "celebrate_friends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_messages" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT,

    CONSTRAINT "media_messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "celebrate_friends" ADD CONSTRAINT "celebrate_friends_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "app_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "celebrate_friends" ADD CONSTRAINT "celebrate_friends_celebranteId_fkey" FOREIGN KEY ("celebranteId") REFERENCES "app_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "celebrate_friends" ADD CONSTRAINT "celebrate_friends_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media_messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
