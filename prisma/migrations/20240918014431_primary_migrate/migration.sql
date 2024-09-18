-- CreateTable
CREATE TABLE `tab_user` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `dt_birth` DATETIME(3) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tab_user_email_key`(`email`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tab_team` (
    `id_team` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `id_user` INTEGER NOT NULL,

    PRIMARY KEY (`id_team`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tab_collaborator` (
    `id_collaborator` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `cargo` VARCHAR(191) NOT NULL,
    `id_team` INTEGER NOT NULL,
    `url_image` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_collaborator`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tab_team` ADD CONSTRAINT `tab_team_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tab_user`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tab_collaborator` ADD CONSTRAINT `tab_collaborator_id_team_fkey` FOREIGN KEY (`id_team`) REFERENCES `tab_team`(`id_team`) ON DELETE RESTRICT ON UPDATE CASCADE;
