-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-08-2018 a las 04:30:41
-- Versión del servidor: 10.1.31-MariaDB
-- Versión de PHP: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tarea4`
--
CREATE DATABASE IF NOT EXISTS `tarea4` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `tarea4`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulo`
--
-- Creación: 25-04-2018 a las 19:27:11
--

DROP TABLE IF EXISTS `articulo`;
CREATE TABLE `articulo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `fecha_ingreso` datetime NOT NULL,
  `calle_numero` varchar(150) NOT NULL,
  `nombre_contacto` varchar(200) NOT NULL,
  `email_contacto` varchar(100) NOT NULL,
  `fono_contacto` varchar(20) DEFAULT NULL,
  `comuna_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `articulo`:
--   `comuna_id`
--       `comuna` -> `id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario`
--
-- Creación: 25-04-2018 a las 19:27:11
--

DROP TABLE IF EXISTS `comentario`;
CREATE TABLE `comentario` (
  `id` int(11) NOT NULL,
  `comentario` varchar(500) NOT NULL,
  `nombre_comentarista` varchar(200) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `articulo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `comentario`:
--   `articulo_id`
--       `articulo` -> `id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario_fotografia`
--
-- Creación: 06-08-2018 a las 02:30:07
--

DROP TABLE IF EXISTS `comentario_fotografia`;
CREATE TABLE `comentario_fotografia` (
  `id` bigint(20) NOT NULL,
  `fecha` datetime NOT NULL,
  `comentario` varchar(512) COLLATE utf8_bin NOT NULL,
  `fotografia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- RELACIONES PARA LA TABLA `comentario_fotografia`:
--   `fotografia`
--       `fotografia` -> `id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comuna`
--
-- Creación: 25-04-2018 a las 19:27:11
--

DROP TABLE IF EXISTS `comuna`;
CREATE TABLE `comuna` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `region_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `comuna`:
--   `region_id`
--       `region` -> `id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotografia`
--
-- Creación: 25-04-2018 a las 19:27:11
--

DROP TABLE IF EXISTS `fotografia`;
CREATE TABLE `fotografia` (
  `id` int(11) NOT NULL,
  `ruta_archivo` varchar(300) NOT NULL,
  `nombre_archivo` varchar(300) NOT NULL,
  `articulo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `fotografia`:
--   `articulo_id`
--       `articulo` -> `id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `region`
--
-- Creación: 25-04-2018 a las 19:27:11
--

DROP TABLE IF EXISTS `region`;
CREATE TABLE `region` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- RELACIONES PARA LA TABLA `region`:
--

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulo`
--
ALTER TABLE `articulo`
  ADD PRIMARY KEY (`id`,`comuna_id`),
  ADD KEY `fk_articulo_comuna1_idx` (`comuna_id`);

--
-- Indices de la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_comentario_articulo1_idx` (`articulo_id`);

--
-- Indices de la tabla `comentario_fotografia`
--
ALTER TABLE `comentario_fotografia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fotografia` (`fotografia`);

--
-- Indices de la tabla `comuna`
--
ALTER TABLE `comuna`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_comuna_region_idx` (`region_id`);

--
-- Indices de la tabla `fotografia`
--
ALTER TABLE `fotografia`
  ADD PRIMARY KEY (`id`,`articulo_id`),
  ADD KEY `fk_fotografia_articulo1_idx` (`articulo_id`);

--
-- Indices de la tabla `region`
--
ALTER TABLE `region`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulo`
--
ALTER TABLE `articulo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `comentario`
--
ALTER TABLE `comentario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `comentario_fotografia`
--
ALTER TABLE `comentario_fotografia`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comuna`
--
ALTER TABLE `comuna`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130607;

--
-- AUTO_INCREMENT de la tabla `fotografia`
--
ALTER TABLE `fotografia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `region`
--
ALTER TABLE `region`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `articulo`
--
ALTER TABLE `articulo`
  ADD CONSTRAINT `fk_articulo_comuna1` FOREIGN KEY (`comuna_id`) REFERENCES `comuna` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD CONSTRAINT `fk_comentario_articulo1` FOREIGN KEY (`articulo_id`) REFERENCES `articulo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `comentario_fotografia`
--
ALTER TABLE `comentario_fotografia`
  ADD CONSTRAINT `comentario_fotografia_ibfk_1` FOREIGN KEY (`fotografia`) REFERENCES `fotografia` (`id`);

--
-- Filtros para la tabla `comuna`
--
ALTER TABLE `comuna`
  ADD CONSTRAINT `fk_comuna_region` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `fotografia`
--
ALTER TABLE `fotografia`
  ADD CONSTRAINT `fk_fotografia_articulo1` FOREIGN KEY (`articulo_id`) REFERENCES `articulo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;


--
-- Metadatos
--
USE `phpmyadmin`;

--
-- Metadatos para la tabla articulo
--

--
-- Volcado de datos para la tabla `pma__table_uiprefs`
--

INSERT INTO `pma__table_uiprefs` (`username`, `db_name`, `table_name`, `prefs`, `last_update`) VALUES
('root', 'tarea4', 'articulo', '{\"sorted_col\":\"`fecha_ingreso` DESC\"}', '2018-08-06 02:29:52');

--
-- Metadatos para la tabla comentario
--

--
-- Metadatos para la tabla comentario_fotografia
--

--
-- Metadatos para la tabla comuna
--

--
-- Volcado de datos para la tabla `pma__table_uiprefs`
--

INSERT INTO `pma__table_uiprefs` (`username`, `db_name`, `table_name`, `prefs`, `last_update`) VALUES
('root', 'tarea4', 'comuna', '{\"sorted_col\":\"`comuna`.`region_id` ASC\"}', '2018-08-06 02:29:52');

--
-- Metadatos para la tabla fotografia
--

--
-- Metadatos para la tabla region
--

--
-- Metadatos para la base de datos tarea4
--
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
