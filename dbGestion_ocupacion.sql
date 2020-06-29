-- MySQL Script generated by MySQL Workbench
-- Mon Jun 29 11:33:40 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db_gestion_ocupacion
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `db_gestion_ocupacion` ;

-- -----------------------------------------------------
-- Schema db_gestion_ocupacion
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_gestion_ocupacion` DEFAULT CHARACTER SET utf8 ;
USE `db_gestion_ocupacion` ;

-- -----------------------------------------------------
-- Table `db_gestion_ocupacion`.`client`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_gestion_ocupacion`.`client` ;

CREATE TABLE IF NOT EXISTS `db_gestion_ocupacion`.`client` (
  `cli_id` INT(11) NOT NULL AUTO_INCREMENT,
  `cli_name` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NOT NULL,
  PRIMARY KEY (`cli_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_gestion_ocupacion`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_gestion_ocupacion`.`user` ;

CREATE TABLE IF NOT EXISTS `db_gestion_ocupacion`.`user` (
  `usr_id` INT(11) NOT NULL AUTO_INCREMENT,
  `usr_name` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL DEFAULT NULL,
  `usr_email` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL DEFAULT NULL,
  `usr_id_trello` INT(11) NULL DEFAULT NULL,
  `usr_id_clockify` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`usr_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_gestion_ocupacion`.`request`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_gestion_ocupacion`.`request` ;

CREATE TABLE IF NOT EXISTS `db_gestion_ocupacion`.`request` (
  `req_id` INT(11) NOT NULL AUTO_INCREMENT,
  `board_id` VARCHAR(45) NULL DEFAULT NULL,
  `project_id` VARCHAR(45) NULL DEFAULT NULL,
  `task_id` VARCHAR(45) NULL DEFAULT NULL,
  `req_ms_project` TEXT NULL DEFAULT NULL,
  `cli_id` INT(11) NOT NULL,
  `coa_id` INT(11) NULL DEFAULT NULL,
  `req_title` VARCHAR(200) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL DEFAULT NULL,
  `req_description` VARCHAR(1024) NULL DEFAULT NULL,
  `req_responsable` VARCHAR(45) NULL DEFAULT NULL,
  `req_order_priority` INT(11) NULL DEFAULT NULL,
  `req_date` DATE NULL DEFAULT NULL,
  `req_init_date` DATE NULL DEFAULT '9999-12-31',
  `req_final_date` DATE NULL DEFAULT '9999-12-31',
  `req_real_final_date` DATE NULL DEFAULT NULL,
  `sta_id` INT(11) NULL DEFAULT NULL,
  `req_advance_ptge` FLOAT NULL DEFAULT NULL,
  `req_deviations_ptge` FLOAT NULL DEFAULT NULL,
  `req_client_completed_deliverables` VARCHAR(1024) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL DEFAULT NULL,
  `req_client_pending_activities` VARCHAR(1024) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL DEFAULT NULL,
  `req_client_comments` VARCHAR(1024) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL DEFAULT NULL,
  `req_intelix_completed_deliverables` VARCHAR(1024) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL DEFAULT NULL,
  `req_intelix_pending_activities` VARCHAR(1024) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL DEFAULT NULL,
  `req_intelix_comments` VARCHAR(1024) NULL DEFAULT NULL,
  `req_last_update_date` DATE NULL DEFAULT NULL,
  `rty_id` INT(11) NULL DEFAULT NULL,
  `tea_id` INT(11) NULL DEFAULT NULL,
  `req_comitee` INT(11) NULL DEFAULT NULL,
  `req_comitee_points_discuss` VARCHAR(1024) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL DEFAULT NULL,
  `req_day_desv` INT(11) NULL DEFAULT NULL,
  `req_cargar` VARCHAR(45) CHARACTER SET 'utf8' NULL DEFAULT 'true',
  PRIMARY KEY (`req_id`),
  INDEX `cli_id_idx` (`cli_id` ASC) ,
  INDEX `coa_id` (`coa_id` ASC) ,
  INDEX `rty_id` (`rty_id` ASC) ,
  INDEX `tea_id` (`tea_id` ASC) ,
  CONSTRAINT `client_id`
    FOREIGN KEY (`cli_id`)
    REFERENCES `db_gestion_ocupacion`.`client` (`cli_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_gestion_ocupacion`.`booking`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_gestion_ocupacion`.`booking` ;

CREATE TABLE IF NOT EXISTS `db_gestion_ocupacion`.`booking` (
  `boo_id` INT(11) NOT NULL AUTO_INCREMENT,
  `cli_id` INT(11) NOT NULL,
  `req_id` INT(11) NOT NULL,
  `usr_id` INT(11) NOT NULL,
  `boo_duration` INT(20) NOT NULL,
  `boo_start_date` DATE NOT NULL,
  `boo_end_date` DATE NOT NULL,
  `boo_percentage` FLOAT NOT NULL,
  PRIMARY KEY (`boo_id`),
  INDEX `cli_id` (`cli_id` ASC) ,
  INDEX `usr_id` (`usr_id` ASC) ,
  INDEX `req_id` (`req_id` ASC) ,
  CONSTRAINT `cli_id`
    FOREIGN KEY (`cli_id`)
    REFERENCES `db_gestion_ocupacion`.`client` (`cli_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `usr_id`
    FOREIGN KEY (`usr_id`)
    REFERENCES `db_gestion_ocupacion`.`user` (`usr_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `req_id`
    FOREIGN KEY (`req_id`)
    REFERENCES `db_gestion_ocupacion`.`request` (`req_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `db_gestion_ocupacion`.`database_reg`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_gestion_ocupacion`.`database_reg` ;

CREATE TABLE IF NOT EXISTS `db_gestion_ocupacion`.`database_reg` (
  `reg_id` INT(11) NOT NULL AUTO_INCREMENT,
  `reg_update_time` DATETIME NOT NULL,
  PRIMARY KEY (`reg_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;