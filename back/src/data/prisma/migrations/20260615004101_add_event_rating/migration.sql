/*
  Warnings:

  - You are about to drop the `avaliacoes_evento` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `avaliacoes_evento` DROP FOREIGN KEY `avaliacoes_evento_evento_id_fkey`;

-- DropForeignKey
ALTER TABLE `avaliacoes_evento` DROP FOREIGN KEY `avaliacoes_evento_usuario_id_fkey`;

-- DropTable
DROP TABLE `avaliacoes_evento`;

-- CreateTable
CREATE TABLE `avaliacoes_eventos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `evento_id` INTEGER NOT NULL,
    `usuario_id` INTEGER NOT NULL,
    `nota` INTEGER NOT NULL,
    `comentario` TEXT NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `avaliacoes_evento_id_fkey`(`evento_id`),
    INDEX `avaliacoes_usuario_id_fkey`(`usuario_id`),
    UNIQUE INDEX `avaliacoes_eventos_evento_id_usuario_id_key`(`evento_id`, `usuario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `avaliacoes_eventos` ADD CONSTRAINT `avaliacoes_eventos_evento_id_fkey` FOREIGN KEY (`evento_id`) REFERENCES `eventos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `avaliacoes_eventos` ADD CONSTRAINT `avaliacoes_eventos_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
