const campuses = [
    {id: 1, name: 'Monterrey'},
    {id: 2, name: 'Guadalajara'},
    {id: 3, name: 'Laguna'},
]
     
const talleres = [
    {
        id: 1,
        orden: 1,
        nombre: "Mis emociones",
        descripcion: "Taller mis emociones",
        duracion: 5,
    },
    {
        id: 2,
        orden: 2,
        nombre: "Mis relaciones",
        descripcion: "Taller mis relaciones",
        duracion: 7,
    },
    {
        id: 3,
        orden: 3,
        nombre: "Mis metas",
        descripcion: "Taller mis metas",
        duracion: 3,
    },
]


const alumnos = [
    {
        id: 1,
        matricula: 'A0124394949',
        firstName: 'Juan',
        lastName: 'Perez',
        email: 'A0124394949@tec.mx',
        edad: new Date(1980, 1, 1),
        campus: campuses[0],
        taller: talleres[0]
    },
    {
        id: 2,
        matricula: 'A0124397978',
        firstName: 'Ximena',
        lastName: 'Pereira',
        email: 'A0124397978@tec.mx',
        edad: new Date(1990, 5, 28),
        campus: campuses[0],
        taller: talleres[0]
    },
    {
        id: 3,
        matricula: 'A01243975482',
        firstName: 'Ramiro',
        lastName: 'Suarez',
        email: 'A01243975482@tec.mx',
        edad: new Date(1987, 12, 5),
        campus: campuses[1],
        taller: talleres[0]
    },
    {
        id: 4,
        matricula: 'A0124394949',
        firstName: 'Maximiliano',
        lastName: 'Culcay',
        email: 'A0124394949@tec.mx',
        edad: new Date(1990, 5, 18),
        campus: campuses[1],
        taller: talleres[2]
    },
    {
        id: 5,
        matricula: 'A0124581121',
        firstName: 'Alan',
        lastName: 'de Jesus',
        email: 'A0124581121@tec.mx',
        edad: new Date(1979, 3, 3),
        campus: campuses[2],
        taller: talleres[1]
    },
    {
        id: 6,
        matricula: 'A0124394239',
        firstName: 'Danny',
        lastName: 'Wu',
        email: 'A0124394239@tec.mx',
        edad: new Date(1986,1, 20),
        campus: campuses[2],
        taller: talleres[1]
    },
    {
        id: 7,
        matricula: 'A012439440',
        firstName: 'Azul',
        lastName: 'Escamilla',
        email: 'A012439440@tec.mx',
        edad: new Date(1980, 1, 1),
        campus: campuses[2],
        taller: talleres[0]
    },
]

const coords = [

    {
        id: 1,
        firstName: "Adriana",
        lastName: 'Cantu',
        email: 'adriana.cantu@tec.mx',
        campus: campuses[1],
    },
    {
        id: 2,
        firstName: 'Ramiro',
        lastName: 'Lopez',
        email: 'ramiro.lopez@tec.mx',
        campus: campuses[2],
    },
    {
        id: 3,
        firstName: 'Andres',
        lastName: 'Fernandez',
        email: 'andres.fernandez@tec.mx',
        campus: campuses[3],
    }
]

module.exports.alumnos = alumnos;
module.exports.campuses = campuses;
module.exports.talleres = talleres;
module.exports.coords = coords