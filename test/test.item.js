/**
 ITEM-TEST
 Items de la aplicación.

 @author Pablo Pizarro R. @ppizarror.com
 @license Copyright 2018, no copiar o distribuír sin permiso directo del autor.
 */

var test_items = [
    new Item({
        comuna: 'Taltal',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida mi sed lorem consectetur pretium. Fusce tristique dictum lacus vitae lobortis. Vivamus at malesuada lacus. Ut at lobortis eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam a risus fermentum, malesuada eros quis, sodales ex. Fusce sem orci, egestas sit amet posuere vitae, ultricies in metus. Donec vehicula dui faucibus mauris gravida, non congue nulla porta.',
        name: 'Impresora laser Canon XLS-130',
        photos: ['test/images/23588694.jpg', 'test/images/34769404.jpg', 'test/images/73742077.jpg'],
        region: 'Antofagasta',
        userContact: 'Andrés Molina',
        userEmail: 'andres@gmail.com',
        userPhone: '967583912',
        userStreet: 'Riquelme 714',
        comments: [
            new ItemComment({
                comment: 'Hola',
                date: getRandomDateElement(),
                user: 'Elvia Ratón Calvo'
            }),
            new ItemComment({
                comment: 'Vivamus et neque sed justo maximus cursus. Phasellus mi nisl, tincidunt id placerat et, pharetra in lectus. Phasellus a porta justo. Fusce nec rhoncus nulla. Mauris malesuada nisl sem, quis tempus leo blandit et. In tempus efficitur volutpat. Donec luctus maximus tincidunt. Aliquam sollicitudin consectetur lectus sed bibendum. Sed sed arcu lorem. Phasellus vestibulum condimentum suscipit. Sed scelerisque massa sit amet mollis elementum. Mauris vitae risus ut ante tristique faucibus. Donec finibus lacus at tincidunt convallis. Aliquam pulvinar nulla id augue faucibus, id gravida arcu consectetur.',
                date: getRandomDateElement(),
                user: 'El Lorem Ipsum'
            }),
            new ItemComment({
                comment: 'Jajajaja que comentario más inutil',
                date: getRandomDateElement(),
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
        userStreet: 'Gerónimo de Alderete 2400',
        comments: [],
        date: getRandomDateElement(),
        id: 1
    }),
    new Item({
        photos: ['test/images/08871714.jpg', 'test/images/09453862.jpg', 'test/images/23867949.jpg'],
        comments: [
            new ItemComment({
                comment: 'Hola, me interesa mucho tu teléfono, te envié un correo :)',
                date: getRandomDateElement(),
                user: 'Marcia Ana'
            }),
            new ItemComment({
                comment: 'Tiene doble sim????',
                date: getRandomDateElement(),
                user: 'Igor Dito'
            }),
            new ItemComment({
                comment: 'It\'s fake news',
                date: getRandomDateElement(),
                user: 'Donald Trunp'
            }),
            new ItemComment({
                comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida mi sed lorem consectetur pretium. Fusce tristique dictum lacus vitae lobortis. Vivamus at malesuada lacus. Ut at lobortis eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam a risus fermentum, malesuada eros quis, sodales ex. Fusce sem orci, egestas sit amet posuere vitae, ultricies in metus. Donec vehicula dui faucibus mauris gravida, non congue nulla porta.',
                date: getRandomDateElement(),
                user: 'Lorem ipsum lover'
            }),
            new ItemComment({
                comment: '420 blaze it',
                date: getRandomDateElement(),
                user: 'Fake user'
            })
        ],
        date: getRandomDateElement()
    }),
    new Item({
        comuna: 'Los Vilos',
        desc: 'Regalo lavadoras Samsung múltiples modelos, no usadas por cierre de Hotel en Coquimbo',
        name: 'Regalo varias lavadoras Samsung',
        photos: ['test/images/12292805.jpg', 'test/images/24727087.jpg', 'test/images/38575485.jpg', 'test/images/66393257.jpg', 'test/images/96151571.jpg'],
        region: 'Coquimbo',
        userContact: 'Lola Mento Helen Chufe',
        userEmail: 'lolam@cia.com',
        userPhone: '981264567',
        userStreet: 'Avda. Caupolicán 799',
        comments: [
            new ItemComment({
                comment: 'Oye tienen wifi?',
                date: getRandomDateElement(),
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
        userPhone: '981244567',
        userStreet: '18 de Septiembre',
        comments: [],
        date: getRandomDateElement(),
        id: 4
    })
];