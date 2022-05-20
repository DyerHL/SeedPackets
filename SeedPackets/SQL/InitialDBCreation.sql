﻿CREATE TABLE FrostDate (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
	Name VARCHAR(200) NOT NULL,
	AverageFrostDate DATETIME NOT NULL,
);

CREATE TABLE [User] (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
	Uid VARCHAR(55) NOT NULL UNIQUE,
	Name VARCHAR(55) NOT NULL,
	City VARCHAR(55) NOT NULL,
	FrostDateId INTEGER NOT NULL,
	CONSTRAINT FK_User_FrostDate FOREIGN KEY (FrostDateId) REFERENCES FrostDate(Id) ON DELETE CASCADE,
);

CREATE TABLE SeedPackets (
	Id Integer NOT NULL PRIMARY KEY IDENTITY,
	Name VARCHAR(55) NOT NULL, 
	ImgUrl VARCHAR(200) NOT NULL,
	WeeksBeforeFrost INTEGER NOT NULL, 
	HarvestDays INTEGER NOT NULL,
	PlantingDate DATETIME, 
	GermReq VARCHAR(200) NOT NULL,
	Spacing VARCHAR(200) NOT NULL,
	Height VARCHAR(200) NOT NULL,
	Notes VARCHAR(200) NOT NULL,
	UserUid VARCHAR(55) NOT NULL,
	CONSTRAINT FK_SeedPackets_UserUid FOREIGN KEY (UserUid) REFERENCES [User](Uid) ON DELETE CASCADE,
);
