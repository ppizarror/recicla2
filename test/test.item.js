/**
 ITEM-TEST
 Items de la aplicación.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

var test_items = [
    new Item({
        comuna: 'Taltal',
        desc: 'Hermosa multifuncional Canon, imprime hasta 5000 hojas por cada tóner de tinta',
        name: 'Impresora laser Canon XLS-130',
        photos: ['test/images/23588694.jpg', 'test/images/34769404.jpg', 'test/images/73742077.jpg'],
        region: 'Antofagasta',
        userContact: 'Andrés Molina',
        userEmail: 'andres@gmail.com',
        userPhone: '967583912',
        userStreet: 'San Gregorio #21',
        comments: [
            new Comment({
                comment: 'Hola',
                user: 'Elvia Ratón Calvo'
            }),
            new Comment({
                comment: 'Jajajaja que comentario más inutil',
                user: 'Jorge Nitales'
            })
        ],
        date: getRandomDateElement(),
        id: 0
    }),
    new Item({
        comuna: 'La Florida',
        desc: 'Palm TX en buen estado, tiene instaladas varias aplicaciones de oficina para revisar PDF y esas cosas',
        name: 'Palm TX 512MB memoria interna',
        photos: ['test/images/10670456.jpg', 'test/images/84358620.jpg', 'test/images/88135568.jpg'],
        region: 'Metropolitana',
        userContact: 'Pablo Pizarro',
        userEmail: 'pablo.pizarro@ing.uchile.cl',
        userPhone: '993932215',
        userStreet: 'Avenida Vicuña Mackenna, p16, Los Álamos Norte',
        comments: [],
        date: getRandomDateElement(),
        id: 1
    }),
    new Item({
        comuna: 'Toltén',
        desc: 'Regalo teléfono huawei en perfectas condiciones, 64 gb memoria interna, tiene unos pequeños detalles en la parte trasera pero nada muy grave, fácilmente reparable',
        name: 'Huawei P9 en perfecto estado, 64GB memoria interna',
        photos: ['test/images/08871714.jpg', 'test/images/09453862.jpg', 'test/images/23867949.jpg'],
        region: 'Región de la Araucanía',
        userContact: 'Juan Antonio Ríos Mauleu',
        userEmail: 'juanito@fbi.com',
        userPhone: '91234567',
        userStreet: 'Calle sin número, #200',
        comments: [
            new Comment({
                comment: 'Hola, me interesa mucho tu teléfono, te envié un correo :)',
                user: 'Marcia Ana'
            }),
            new Comment({
                comment: 'Tiene doble sim????',
                user: 'Igor Dito'
            }),
            new Comment({
                comment: 'It\'s fake news',
                user: 'Donald Trunp'
            })
        ],
        date: getRandomDateElement(),
        id: 2
    }),
    new Item({
        comuna: 'Los Vilos',
        desc: 'Regalo lavadoras Samsung múltiples modelos, no usadas por cierre de Hotel en Coquimbo',
        name: 'Regalo varias lavadoras Samsung',
        photos: ['test/images/12292805.jpg', 'test/images/24727087.jpg', 'test/images/38575485.jpg', 'test/images/66393257.jpg', 'test/images/96151571.jpg'],
        region: 'Coquimbo',
        userContact: 'Lola Mento Helen Chufe',
        userEmail: 'lolam@cia.com',
        userPhone: '91244537',
        userStreet: 'Alguna calle de Coquimbo, n°20',
        comments: [
            new Comment({
                comment: 'Oye tienen wifi?',
                user: 'Josebas'
            })
        ],
        date: getRandomDateElement(),
        id: 3
    }),
    new Item({
        comuna: 'Dalcahue',
        desc: 'Se dona un boening 747 que en las fotos parece distinto pero en verdad son el mismo avión, 100% legal',
        name: 'Boening 747 en buen estado',
        photos: ['test/images/28626012.jpg', 'test/images/39562477.jpg', 'test/images/66766831.jpg'],
        region: 'Región de los Lagos',
        userContact: 'Matías Queroso',
        userEmail: 'matias@faisbun.com',
        userPhone: '91244567',
        userStreet: 'Ya no sé qué inventar, #2',
        comments: [],
        date: getRandomDateElement(),
        id: 4
    })
];