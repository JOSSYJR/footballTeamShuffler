-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `status` ENUM('Active', 'Banned', 'Verified') NOT NULL DEFAULT 'Active',
    `userCreationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `OwnReferalCode` VARCHAR(191) NULL,
    `cashOutWallet` VARCHAR(191) NULL,
    `referalEarningAmountAvlInCrypto` DOUBLE NOT NULL DEFAULT 0,
    `referalEarningAmount` DOUBLE NOT NULL DEFAULT 0,
    `referalEarningAmountInCrypto` DOUBLE NOT NULL DEFAULT 0,
    `numberOfReferals` INTEGER NOT NULL DEFAULT 0,
    `referalStatus` ENUM('Requested', 'Approuved', 'Declined', 'Neutral') NOT NULL DEFAULT 'Neutral',
    `referalCode` VARCHAR(191) NULL,

    UNIQUE INDEX `user_OwnReferalCode_key`(`OwnReferalCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `offer` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NOT NULL,
    `basePrice` DOUBLE NOT NULL,
    `category` ENUM('Crypto', 'WebDevelopment', 'GraphicDesign', 'Other') NULL,
    `status` ENUM('Visible', 'Hidden', 'Disabled') NOT NULL DEFAULT 'Visible',
    `verified` BOOLEAN NULL DEFAULT false,
    `offerCreationDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `id` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `tGuserName` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` ENUM('Active', 'Banned', 'Verified') NOT NULL DEFAULT 'Active',
    `role` ENUM('Owner', 'Admin', 'Dev') NOT NULL DEFAULT 'Admin',
    `userCreationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `admin_userName_key`(`userName`),
    UNIQUE INDEX `admin_tGuserName_key`(`tGuserName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contract` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `amountInCrypto` DOUBLE NULL,
    `description` TEXT NOT NULL,
    `termsAndConditions` TEXT NOT NULL,
    `duration` INTEGER NOT NULL,
    `transactionId` VARCHAR(191) NULL,
    `groupId` VARCHAR(191) NULL,
    `payedIn` VARCHAR(191) NULL,
    `fullyPaid` BOOLEAN NULL,
    `sellerWallet` VARCHAR(191) NULL,
    `escrowWallet` VARCHAR(191) NULL,
    `encryptedPublicKey` VARCHAR(191) NULL,
    `payoutCurrency` VARCHAR(191) NULL,
    `sellerId` VARCHAR(191) NULL,
    `buyerId` VARCHAR(191) NULL,
    `status` ENUM('Created', 'Entered', 'Paid', 'Appeal', 'WithdrawalRequested', 'Canceled', 'ModificationRequested', 'Released', 'FeePaid', 'Approuved') NOT NULL,
    `adminId` VARCHAR(191) NULL,
    `contractDeliveryDate` DATETIME(3) NULL,
    `expectedContractDeliveryDate` DATETIME(3) NULL,
    `contractCreationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contractHistory` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `termsAndConditions` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL,
    `transactionId` VARCHAR(191) NULL,
    `payedIn` VARCHAR(191) NULL,
    `fullyPaid` BOOLEAN NULL,
    `sellerWallet` VARCHAR(191) NULL,
    `payoutCurrency` VARCHAR(191) NULL,
    `sellerId` VARCHAR(191) NULL,
    `buyerId` VARCHAR(191) NULL,
    `status` ENUM('Created', 'Entered', 'Paid', 'Appeal', 'WithdrawalRequested', 'Canceled', 'ModificationRequested', 'Released', 'FeePaid', 'Approuved') NOT NULL,
    `adminId` VARCHAR(191) NULL,
    `contractDeliveryDate` DATETIME(3) NULL,
    `expectedContractDeliveryDate` DATETIME(3) NULL,
    `contractCreationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `id` VARCHAR(191) NOT NULL,
    `ratedAs` ENUM('Buyer', 'Seller') NOT NULL,
    `rating` DECIMAL(65, 30) NOT NULL,
    `comment` TEXT NULL,
    `reviewerId` VARCHAR(191) NOT NULL,
    `reviewedId` VARCHAR(191) NOT NULL,
    `contractId` VARCHAR(191) NOT NULL,
    `creationDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `review_contractId_key`(`contractId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leaderboard` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `score` INTEGER NOT NULL,
    `totalMoneyEarned` DOUBLE NOT NULL,
    `totalServicesSold` INTEGER NOT NULL,
    `weeklyMoneyEarned` DOUBLE NOT NULL,
    `weeklyServicesSold` INTEGER NOT NULL,
    `creationDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `leaderboard_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dashboardStats` (
    `id` INTEGER NOT NULL,
    `dau` INTEGER NOT NULL,
    `mau` INTEGER NOT NULL,
    `userCount` INTEGER NOT NULL,
    `sellerCount` INTEGER NOT NULL,
    `buyerCount` INTEGER NOT NULL,
    `totalMoneyInEscrow` DOUBLE NOT NULL,
    `totalCompleteTransaction` DOUBLE NOT NULL,
    `completeJobCount` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `otcProduct` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `swapTokenOptions` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `price` DOUBLE NOT NULL,
    `lockedStock` DOUBLE NOT NULL DEFAULT 0,
    `boughtStock` DOUBLE NOT NULL DEFAULT 0,
    `stock` DOUBLE NULL,
    `escrowWallet` VARCHAR(191) NULL,
    `encryptedPublicKey` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `allowPartialFill` BOOLEAN NOT NULL DEFAULT false,
    `filled` BOOLEAN NOT NULL DEFAULT false,
    `paidInFull` BOOLEAN NOT NULL DEFAULT false,
    `visible` BOOLEAN NOT NULL DEFAULT false,
    `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `otcOrder` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `depositAmount` DOUBLE NOT NULL,
    `recevingAmount` DOUBLE NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED') NOT NULL DEFAULT 'PENDING',
    `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supportedTokens` (
    `id` VARCHAR(191) NOT NULL,
    `ticker` VARCHAR(191) NOT NULL,
    `symbol` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `contractAdress` VARCHAR(191) NULL,
    `creationDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `supportedTokens_ticker_key`(`ticker`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `offer` ADD CONSTRAINT `offer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contract` ADD CONSTRAINT `contract_sellerId_fkey` FOREIGN KEY (`sellerId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contract` ADD CONSTRAINT `contract_buyerId_fkey` FOREIGN KEY (`buyerId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contract` ADD CONSTRAINT `contract_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_reviewerId_fkey` FOREIGN KEY (`reviewerId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_reviewedId_fkey` FOREIGN KEY (`reviewedId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_contractId_fkey` FOREIGN KEY (`contractId`) REFERENCES `contract`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leaderboard` ADD CONSTRAINT `leaderboard_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `otcProduct` ADD CONSTRAINT `otcProduct_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `otcOrder` ADD CONSTRAINT `otcOrder_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `otcOrder` ADD CONSTRAINT `otcOrder_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `otcProduct`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
