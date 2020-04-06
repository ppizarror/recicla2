-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-08-2018 a las 23:30:10
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulo`
--

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
-- Volcado de datos para la tabla `articulo`
--

INSERT INTO `articulo` (`id`, `nombre`, `descripcion`, `fecha_ingreso`, `calle_numero`, `nombre_contacto`, `email_contacto`, `fono_contacto`, `comuna_id`) VALUES
(17, 'Impresora laser Canon XLS-130', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida mi sed lorem consectetur pretium. Fusce tristique dictum lacus vitae lobortis. Vivamus at malesuada lacus. Ut at lobortis eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam a risus fermentum, &quot;malesuada eros quis&quot;, sodales ex. Fusce sem orci, egestas sit amet posuere vitae, \'ultricies in metus\'. Donec vehicula dui faucibus mauris gravida, non congue nulla porta.', '2018-04-25 23:21:28', 'Riquelme 714', 'Andrés Molina', 'andres@gmail.com', '967583912', 20304),
(18, 'Palm TX 512MB memoria interna', 'Palm TX en buen estado, tiene instaladas varias aplicaciones de oficina para revisar PDF y esas cosas', '2018-04-25 23:28:23', 'Gerónimo de Alderete 2400', 'Pablo Pizarro', 'pablo@ppizarror.com', '993932215', 130214),
(19, 'Regalo varias lavadoras Samsung', 'Regalo lavadoras Samsung múltiples modelos, no usadas por cierre de Hotel en Coquimbo', '2018-04-25 23:32:11', 'Avda. Caupolicán 799', 'Lola Mento Helen Chufe', 'lolam@cia.com', '', 40304),
(20, 'Boening 747 en buen estado', 'Se dona un boening 747 que en las fotos parece distinto pero en verdad son el mismo avión, 100% legal', '2018-04-26 00:04:07', '18 de Septiembre', 'Matías Queroso', 'matias@faisbun.com', '981244567', 100403),
(21, 'Se regala hermoso jetpack', 'Se va este hermoso jetpack :) que me ayudó a pasar harto entre las ciudades jaaajja!!! Cualquier cosa al correo ;) o me mandan un mensaje de wzp (no contesto llamadas).', '2018-04-26 11:07:16', 'Avenida Colón #264', 'Elsabe Nada Della Bida', 'elsabenada@gmail.com', '938429837', 130204),
(24, 'Huawei P9 en perfecto estado, 64GB memoria interna', 'Regalo teléfono huawei en perfectas condiciones, 64 gb memoria interna, tiene unos pequeños detalles en la parte trasera pero nada muy grave, fácilmente reparable', '2018-04-26 22:12:05', 'Avenida Circunvalación 1716', 'Juanito Cala Mesa', 'juanito@fbi.com', '929384732', 70104),
(25, 'Huawei P20 Pro 128 Gb + Carcasa + Lamina', 'El Huawei P20 Pro es el primer smartphone de Huawei con cámara triple. Con tres lentes de 40 MP, 20 MP y 8 MP provistos por Leica, el Huawei P20 Pro apunta a dominar la fotografía en el campo de los smartphones. El resto de las características incluye una pantalla Full HD+ de 6.1 pulgadas, procesador octa-core, 6GB de RAM y 128GB de almacenamiento, y Android 8.0 Oreo. Dimensiones\r\nPeso: 180 gramos\r\nAlto: 155 mm.\r\nAncho: 73.9 mm.\r\nProfundidad: 7.8 mm.\r\nPantalla: 6.1 Caracteristicas Principales\r\nSistema Operativo: Android 8.1 (Oreo)\r\nAlmacenamiento Interno: 128 GB\r\nAlmacenamiento Externo: NO EXPANDIBLE\r\nProcesador: Hisilicon Kirin 970 / Octa-core (4x2.4 GHz Cortex-A73 &amp; 4x1.8 GHz Cortex-A53)\r\nBateria: 4000 MAH\r\nMemoria RAM: 6 GB\r\nCamara Principal: 40 MP TRIPLE\r\nCamara Secundaria: 24 MP Conectividad\r\nHSDPA 800 / 850 / 900 / 1700(AWS) / 1900 / 2100\r\nLTE band 1(2100), 2(1900), 3(1800), 4(1700/2100), 5(850), 6(900), 7(2600), 8(900), 9(1800), 12(700), 17(700), 18(800), 19(800), 20(800), 2', '2018-04-26 22:15:29', 'Yocasi Memo Ri', 'Toyque Memu Ero', 'toyqm@outlook.com', '', 100101),
(26, 'Una plei4 nuevita', '', '2018-04-26 22:31:48', 'Comomellamo sin número', 'No tengo nombre SAD REACC ONLY', 'sadreacts@only.com', '', 50206),
(27, 'Toalla de FC nuevecita', '', '2018-05-16 13:58:26', '21 de mayo', 'Pablo Andrés', 'pabloandres@gmail.com', '', 130215);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario`
--

CREATE TABLE `comentario` (
  `id` int(11) NOT NULL,
  `comentario` varchar(500) NOT NULL,
  `nombre_comentarista` varchar(200) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `articulo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `comentario`
--

INSERT INTO `comentario` (`id`, `comentario`, `nombre_comentarista`, `fecha`, `articulo_id`) VALUES
(3, 'Hola! Llamame  5699559595', 'Artur Ito', '2018-04-26 09:14:09', 20),
(4, 'Hola, quería saber si acepta bencina de 93', 'El papu', '2018-04-26 09:17:09', 20),
(5, 'Can it melt beams? 11/09', 'George Bush', '2018-04-26 09:17:57', 20),
(6, 'Hola, cuanto cuesta????? :\'(', 'El weta', '2018-04-26 09:35:02', 20),
(7, 'Hola, soy manco capac y quiero usar tu avión para llegar a Macchu Picchu, llamame 993932215', 'El manco', '2018-04-26 09:35:30', 20),
(8, 'Hola, te dejo mi contacto pablo@ppizarror.com', 'El Igor Dito', '2018-04-26 09:36:09', 20),
(9, 'Buenas fotos ;)', 'Un usuario', '2018-04-26 10:12:47', 19),
(10, 'Que gran dispositivo &lt;3', 'Holaaaa', '2018-04-26 10:17:27', 18),
(11, 'Oye trae el stylus :)?', 'Pablo', '2018-04-26 10:25:13', 18),
(12, 'This Is a Legitimate Call for Help', 'VAPE 420', '2018-04-26 22:41:36', 20),
(13, 'GUAU :) LOVE SO MUCH', 'DOGEEE', '2018-04-26 22:44:26', 20),
(14, 'Men los roids a cuanto están?', 'Exequiel Collao Soto', '2018-04-26 23:05:13', 20),
(15, 'hgjhkhjkjh :)', 'bin laden', '2018-05-12 14:28:35', 24),
(16, 'hola, está nueva?', 'pablo', '2018-05-16 09:56:28', 26),
(17, 'y saca fotos?', 'exequiel', '2018-05-16 09:58:39', 25),
(18, 'asdksañdlaksd :(\n', 'pablo', '2018-05-16 19:02:17', 27),
(19, 'caritas tristes y felices :)', 'probando las', '2018-05-16 19:02:31', 27);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario_fotografia`
--

CREATE TABLE `comentario_fotografia` (
  `id` bigint(20) NOT NULL,
  `fecha` datetime NOT NULL,
  `comentario` varchar(512) COLLATE utf8_bin NOT NULL,
  `fotografia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `comentario_fotografia`
--

INSERT INTO `comentario_fotografia` (`id`, `fecha`, `comentario`, `fotografia`) VALUES
(4, '2018-08-09 00:00:00', 'hola', 30),
(6, '2018-08-09 00:00:00', 'Me interesa este producto, ¿sigue disponible?', 30),
(7, '2018-08-09 00:00:00', 'java.util.Date today = new java.util.Date();', 30),
(8, '2018-08-09 00:00:00', 'hola', 30),
(9, '2018-08-09 00:00:00', 'java.util.Date today = ¿new java.util.Date()?;', 30),
(10, '2018-08-09 00:00:00', '¿¿¿aaa', 30),
(11, '2018-08-09 16:48:36', 'PROBANDO', 30),
(12, '2018-08-09 16:51:02', 'este comentario debería ser tercero', 26),
(13, '2018-08-09 16:51:09', 'este comentario es segundo', 26),
(14, '2018-08-09 16:51:17', 'este comentario es primero', 26),
(15, '2018-08-09 16:55:31', 'Me interesa, ¿donde lo puedo obtener?', 7),
(16, '2018-08-09 17:12:17', 'Probando los emoticonos :)', 27),
(17, '2018-08-09 17:20:05', 'Holiii :)', 26),
(18, '2018-08-09 17:21:40', 'Holii :)', 26),
(19, '2018-08-09 17:24:42', 'Hola', 31);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comuna`
--

CREATE TABLE `comuna` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `region_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `comuna`
--

INSERT INTO `comuna` (`id`, `nombre`, `region_id`) VALUES
(10101, 'Gral. Lagos', 15),
(10102, 'Putre', 15),
(10201, 'Arica', 15),
(10202, 'Camarones', 15),
(10301, 'Camiña', 1),
(10302, 'Huara', 1),
(10303, 'Pozo Almonte', 1),
(10304, 'Iquique', 1),
(10305, 'Pica', 1),
(10306, 'Colchane', 1),
(10307, 'Alto Hospicio', 1),
(20101, 'Tocopilla', 2),
(20102, 'Maria Elena', 2),
(20201, 'Ollague', 2),
(20202, 'Calama', 2),
(20203, 'San Pedro Atacama', 2),
(20301, 'Sierra Gorda', 2),
(20302, 'Mejillones', 2),
(20303, 'Antofagasta', 2),
(20304, 'Taltal', 2),
(30101, 'Diego de Almagro', 3),
(30102, 'Chañaral', 3),
(30201, 'Caldera', 3),
(30202, 'Copiapo', 3),
(30203, 'Tierra Amarilla', 3),
(30301, 'Huasco', 3),
(30302, 'Freirina', 3),
(30303, 'Vallenar', 3),
(30304, 'Alto del Carmen', 3),
(40101, 'La Higuera', 4),
(40102, 'La Serena', 4),
(40103, 'Vicuña', 4),
(40104, 'Paihuano', 4),
(40105, 'Coquimbo', 4),
(40106, 'Andacollo', 4),
(40201, 'Rio Hurtado', 4),
(40202, 'Ovalle', 4),
(40203, 'Monte Patria', 4),
(40204, 'Punitaqui', 4),
(40205, 'Combarbala', 4),
(40301, 'Mincha', 4),
(40302, 'Illapel', 4),
(40303, 'Salamanca', 4),
(40304, 'Los Vilos', 4),
(50101, 'Petorca', 5),
(50102, 'Cabildo', 5),
(50103, 'Papudo', 5),
(50104, 'La Ligua', 5),
(50105, 'Zapallar', 5),
(50201, 'Putaendo', 5),
(50202, 'Santa Maria', 5),
(50203, 'San Felipe', 5),
(50204, 'Pencahue', 5),
(50205, 'Catemu', 5),
(50206, 'Llay Llay', 5),
(50301, 'Nogales', 5),
(50302, 'La Calera', 5),
(50303, 'Hijuelas', 5),
(50304, 'La Cruz', 5),
(50305, 'Quillota', 5),
(50306, 'Olmue', 5),
(50307, 'Limache', 5),
(50401, 'Los Andes', 5),
(50402, 'Rinconada', 5),
(50403, 'Calle Larga', 5),
(50404, 'San Esteban', 5),
(50501, 'Puchuncavi', 5),
(50502, 'Quintero', 5),
(50503, 'Viña del Mar', 5),
(50504, 'Villa Alemana', 5),
(50505, 'Quilpue', 5),
(50506, 'Valparaiso', 5),
(50507, 'Juan Fernandez', 5),
(50508, 'Casablanca', 5),
(50509, 'Concon', 5),
(50601, 'Isla de Pascua', 5),
(50701, 'Algarrobo', 5),
(50702, 'El Quisco', 5),
(50703, 'El Tabo', 5),
(50704, 'Cartagena', 5),
(50705, 'San Antonio', 5),
(50706, 'Santo Domingo', 5),
(60101, 'Mostazal', 6),
(60102, 'Codegua', 6),
(60103, 'Graneros', 6),
(60104, 'Machali', 6),
(60105, 'Rancagua', 6),
(60106, 'Olivar', 6),
(60107, 'Doñihue', 6),
(60108, 'Requinoa', 6),
(60109, 'Coinco', 6),
(60110, 'Coltauco', 6),
(60111, 'Quinta Tilcoco', 6),
(60112, 'Las Cabras', 6),
(60113, 'Rengo', 6),
(60114, 'Peumo', 6),
(60115, 'Pichidegua', 6),
(60116, 'Malloa', 6),
(60117, 'San Vicente', 6),
(60201, 'Navidad', 6),
(60202, 'La Estrella', 6),
(60203, 'Marchigue', 6),
(60204, 'Pichilemu', 6),
(60205, 'Litueche', 6),
(60206, 'Paredones', 6),
(60301, 'San Fernando', 6),
(60302, 'Peralillo', 6),
(60303, 'Placilla', 6),
(60304, 'Chimbarongo', 6),
(60305, 'Palmilla', 6),
(60306, 'Nancagua', 6),
(60307, 'Santa Cruz', 6),
(60308, 'Pumanque', 6),
(60309, 'Chepica', 6),
(60310, 'Lolol', 6),
(70101, 'Teno', 7),
(70102, 'Romeral', 7),
(70103, 'Rauco', 7),
(70104, 'Curico', 7),
(70105, 'Sagrada Familia', 7),
(70106, 'Hualañe', 7),
(70107, 'Vichuquen', 7),
(70108, 'Molina', 7),
(70109, 'Licanten', 7),
(70201, 'Rio Claro', 7),
(70202, 'Curepto', 7),
(70203, 'Pelarco', 7),
(70204, 'Talca', 7),
(70205, 'Pencahue', 7),
(70206, 'San Clemente', 7),
(70207, 'Constitucion', 7),
(70208, 'Maule', 7),
(70209, 'Empedrado', 7),
(70210, 'San Rafael', 7),
(70301, 'San Javier', 7),
(70302, 'Colbun', 7),
(70303, 'Villa Alegre', 7),
(70304, 'Yerbas Buenas', 7),
(70305, 'Linares', 7),
(70306, 'Longavi', 7),
(70307, 'Retiro', 7),
(70308, 'Parral', 7),
(70401, 'Chanco', 7),
(70402, 'Pelluhue', 7),
(70403, 'Cauquenes', 7),
(80101, 'Cobquecura', 8),
(80102, 'Ñiquen', 8),
(80103, 'San Fabian', 8),
(80104, 'San Carlos', 8),
(80105, 'Quirihue', 8),
(80106, 'Ninhue', 8),
(80107, 'Trehuaco', 8),
(80108, 'San Nicolas', 8),
(80109, 'Coihueco', 8),
(80110, 'Chillan', 8),
(80111, 'Portezuelo', 8),
(80112, 'Pinto', 8),
(80113, 'Coelemu', 8),
(80114, 'Bulnes', 8),
(80115, 'San Ignacio', 8),
(80116, 'Ranquil', 8),
(80117, 'Quillon', 8),
(80118, 'El Carmen', 8),
(80119, 'Pemuco', 8),
(80120, 'Yungay', 8),
(80121, 'Chillan Viejo', 8),
(80201, 'Tome', 8),
(80202, 'Florida', 8),
(80203, 'Penco', 8),
(80204, 'Talcahuano', 8),
(80205, 'Concepcion', 8),
(80206, 'Hualqui', 8),
(80207, 'Coronel', 8),
(80208, 'Lota', 8),
(80209, 'Santa Juana', 8),
(80210, 'Chiguayante', 8),
(80211, 'San Pedro de la Paz', 8),
(80212, 'Hualpen', 8),
(80301, 'Cabrero', 8),
(80302, 'Yumbel', 8),
(80303, 'Tucapel', 8),
(80304, 'Antuco', 8),
(80305, 'San Rosendo', 8),
(80306, 'Laja', 8),
(80307, 'Quilleco', 8),
(80308, 'Los Angeles', 8),
(80309, 'Nacimiento', 8),
(80310, 'Negrete', 8),
(80311, 'Santa Barbara', 8),
(80312, 'Quilaco', 8),
(80313, 'Mulchen', 8),
(80314, 'Alto Bio Bio', 8),
(80401, 'Arauco', 8),
(80402, 'Curanilahue', 8),
(80403, 'Los Alamos', 8),
(80404, 'Lebu', 8),
(80405, 'Cañete', 8),
(80406, 'Contulmo', 8),
(80407, 'Tirua', 8),
(90101, 'Renaico', 9),
(90102, 'Angol', 9),
(90103, 'Collipulli', 9),
(90104, 'Los Sauces', 9),
(90105, 'Puren', 9),
(90106, 'Ercilla', 9),
(90107, 'Lumaco', 9),
(90108, 'Victoria', 9),
(90109, 'Traiguen', 9),
(90110, 'Curacautin', 9),
(90111, 'Lonquimay', 9),
(90201, 'Perquenco', 9),
(90202, 'Galvarino', 9),
(90203, 'Lautaro', 9),
(90204, 'Vilcun', 9),
(90205, 'Temuco', 9),
(90206, 'Carahue', 9),
(90207, 'Melipeuco', 9),
(90208, 'Nueva Imperial', 9),
(90209, 'Puerto Saavedra', 9),
(90210, 'Cunco', 9),
(90211, 'Freire', 9),
(90212, 'Pitrufquen', 9),
(90213, 'Teodoro Schmidt', 9),
(90214, 'Gorbea', 9),
(90215, 'Pucon', 9),
(90216, 'Villarrica', 9),
(90217, 'Tolten', 9),
(90218, 'Curarrehue', 9),
(90219, 'Loncoche', 9),
(90220, 'Padre Las Casas', 9),
(90221, 'Cholchol', 9),
(100101, 'Lanco', 14),
(100102, 'Mariquina', 14),
(100103, 'Panguipulli', 14),
(100104, 'Mafil', 14),
(100105, 'Valdivia', 14),
(100106, 'Los Lagos', 14),
(100107, 'Corral', 14),
(100108, 'Paillaco', 14),
(100109, 'Futrono', 14),
(100110, 'Lago Ranco', 14),
(100111, 'La Union', 14),
(100112, 'Rio Bueno', 14),
(100201, 'San Pablo', 10),
(100202, 'San Juan', 10),
(100203, 'Osorno', 10),
(100204, 'Puyehue', 10),
(100205, 'Rio Negro', 10),
(100206, 'Purranque', 10),
(100207, 'Puerto Octay', 10),
(100301, 'Frutillar', 10),
(100302, 'Fresia', 10),
(100303, 'Llanquihue', 10),
(100304, 'Puerto Varas', 10),
(100305, 'Los Muermos', 10),
(100306, 'Puerto Montt', 10),
(100307, 'Maullin', 10),
(100308, 'Calbuco', 10),
(100309, 'Cochamo', 10),
(100401, 'Ancud', 10),
(100402, 'Quemchi', 10),
(100403, 'Dalcahue', 10),
(100404, 'Curaco de Velez', 10),
(100405, 'Castro', 10),
(100406, 'Chonchi', 10),
(100407, 'Queilen', 10),
(100408, 'Quellon', 10),
(100409, 'Quinchao', 10),
(100410, 'Puqueldon', 10),
(100501, 'Chaiten', 10),
(100502, 'Futaleufu', 10),
(100503, 'Palena', 10),
(100504, 'Hualaihue', 10),
(110101, 'Guaitecas', 11),
(110102, 'Cisnes', 11),
(110103, 'Aysen', 11),
(110201, 'Coyhaique', 11),
(110202, 'Lago Verde', 11),
(110301, 'Rio Iba?ez', 11),
(110302, 'Chile Chico', 11),
(110401, 'Cochrane', 11),
(110402, 'Tortel', 11),
(110403, 'O\'Higins', 11),
(120101, 'Torres del Paine', 12),
(120102, 'Puerto Natales', 12),
(120201, 'Laguna Blanca', 12),
(120202, 'San Gregorio', 12),
(120203, 'Rio Verde', 12),
(120204, 'Punta Arenas', 12),
(120301, 'Porvenir', 12),
(120302, 'Primavera', 12),
(120303, 'Timaukel', 12),
(120401, 'Antartica', 12),
(130101, 'Tiltil', 13),
(130102, 'Colina', 13),
(130103, 'Lampa', 13),
(130201, 'Conchali', 13),
(130202, 'Quilicura', 13),
(130203, 'Renca', 13),
(130204, 'Las Condes', 13),
(130205, 'Pudahuel', 13),
(130206, 'Quinta Normal', 13),
(130207, 'Providencia', 13),
(130208, 'Santiago', 13),
(130209, 'La Reina', 13),
(130210, 'Ñuñoa', 13),
(130211, 'San Miguel', 13),
(130212, 'Maipu', 13),
(130213, 'La Cisterna', 13),
(130214, 'La Florida', 13),
(130215, 'La Granja', 13),
(130216, 'Independencia', 13),
(130217, 'Huechuraba', 13),
(130218, 'Recoleta', 13),
(130219, 'Vitacura', 13),
(130220, 'Lo Barrenechea', 13),
(130221, 'Macul', 13),
(130222, 'Peñalolen', 13),
(130223, 'San Joaquin', 13),
(130224, 'La Pintana', 13),
(130225, 'San Ramon', 13),
(130226, 'El Bosque', 13),
(130227, 'Pedro Aguirre Cerda', 13),
(130228, 'Lo Espejo', 13),
(130229, 'Estacion Central', 13),
(130230, 'Cerrillos', 13),
(130231, 'Lo Prado', 13),
(130232, 'Cerro Navia', 13),
(130301, 'San Jose de Maipo', 13),
(130302, 'Puente Alto', 13),
(130303, 'Pirque', 13),
(130401, 'San Bernardo', 13),
(130402, 'Calera de Tango', 13),
(130403, 'Buin', 13),
(130404, 'Paine', 13),
(130501, 'Peñaflor', 13),
(130502, 'Talagante', 13),
(130503, 'El Monte', 13),
(130504, 'Isla de Maipo', 13),
(130601, 'Curacavi', 13),
(130602, 'Maria Pinto', 13),
(130603, 'Melipilla', 13),
(130604, 'San Pedro', 13),
(130605, 'Alhue', 13),
(130606, 'Padre Hurtado', 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fotografia`
--

CREATE TABLE `fotografia` (
  `id` int(11) NOT NULL,
  `ruta_archivo` varchar(300) NOT NULL,
  `nombre_archivo` varchar(300) NOT NULL,
  `articulo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `fotografia`
--

INSERT INTO `fotografia` (`id`, `ruta_archivo`, `nombre_archivo`, `articulo_id`) VALUES
(7, '20620572215ae137a8d7f31.jpg', '34769404.jpg', 17),
(8, '11834683105ae137a8d9145.jpg', '23588694.jpg', 17),
(9, '9017586075ae137a8da2ff.jpg', '73742077.jpg', 17),
(10, '19473076215ae139473e3d4.jpg', '10670456.jpg', 18),
(11, '14727798765ae139473f3f6.jpg', '88135568.jpg', 18),
(12, '6661277485ae1394740adc.jpg', '84358620.jpg', 18),
(13, '8506992205ae13a2b76346.jpg', '12292805.jpg', 19),
(14, '3169405545ae13a2b776b7.jpg', '38575485.jpg', 19),
(15, '8428027885ae13a2b7896d.jpg', '38575485.jpg', 19),
(16, '5423286355ae13a2b79c61.jpg', '96151571.jpg', 19),
(17, '10460028655ae13a2b7b127.jpg', '66393257.jpg', 19),
(18, '20600342425ae141a7a6224.jpg', '28626012.jpg', 20),
(19, '19407212195ae141a7a7741.jpg', '39562477.jpg', 20),
(20, '9145477935ae141a7a8bfc.jpg', '66766831.jpg', 20),
(21, '11365678105ae1dd14c5cd5.jpg', '8df81435b6c0b5964c98a283cc5830e6d69320d812a5d9de77f5d88bc154691a.jpg', 21),
(22, '4483143985ae1dd14c7780.jpg', 'descargar.jpg', 21),
(23, '9440229845ae1dd14c8bb8.jpg', 'maxresdefault.jpg', 21),
(26, '10558797115ae278e5ce6ff.jpg', '08871714.jpg', 24),
(27, '2729637015ae278e5cfdfe.jpg', '09453862.jpg', 24),
(28, '16101375945ae278e5d0ea9.jpg', '23867949.jpg', 24),
(30, '11618377305ae27d8500ed0.PNG', 'asd.PNG', 26),
(31, '14307640285afc7142571f5.jpg', '16229422_204863113320695_5988558409316696064_n.jpg', 27),
(32, '6713729475afc714258802.jpg', 'descargar.jpg', 27),
(33, '1750621045afc71425a17a.jpg', 'JRFC.jpg', 27);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `region`
--

CREATE TABLE `region` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `region`
--

INSERT INTO `region` (`id`, `nombre`) VALUES
(1, 'Región de Tarapaca'),
(2, 'Región de Antofagasta'),
(3, 'Región de Atacama'),
(4, 'Región de Coquimbo '),
(5, 'Región de Valparaíso'),
(6, 'Región del Libertador Bernardo Ohiggins'),
(7, 'Región del Maule'),
(8, 'Región del Bío-Bío'),
(9, 'Región de la Araucanía'),
(10, 'Región de los Lagos'),
(11, 'Región Aisén del General Carlos Ibáñez del Campo'),
(12, 'Región de Magallanes y la Antártica Chilena'),
(13, 'Región Metropolitana de Santiago '),
(14, 'Región de los Rios'),
(15, 'Región Arica y Parinacota');

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
