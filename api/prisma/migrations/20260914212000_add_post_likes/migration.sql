-- CreateTable
CREATE TABLE "PostLike" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PostLike_postId_idx" ON "PostLike"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "PostLike_postId_author_key" ON "PostLike"("postId", "author");

-- AddForeignKey
ALTER TABLE "PostLike"
ADD CONSTRAINT "PostLike_postId_fkey"
FOREIGN KEY ("postId") REFERENCES "Post"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
