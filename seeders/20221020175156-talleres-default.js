'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Tallers', [{
      nombre: "Liderazgo Positivo y Transformación Personal",
      description: "Transformar su vida y aumentar tu riqueza y capital psicológico, con el fin de tener mayor éxito estudiantil, lograr una mayor influencia en su contexto y cambiar el entorno.",
      duracion: 5,
      orden: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ,{
      nombre: "Liderazgo Positivo y Transformacion Personal",
      description: "Reconocimiento de habilidades, destrezas, fortalezas. FODA. GATO",
      duracion: 5,
      orden: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nombre: "Mis emociones ",
      description: "¿Qué son las emociones? Emociones, biología de la salud. Importancia de las emociones. Identificación de emociones. Tipos de emociones. Inteligencia emocional.",
      duracion: 5,
      orden: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nombre: "Mis relaciones",
      description: "Desarrollo de empatía. (Competencias emocionales e interpersonales). Tipos de relaciones. Aspectos importantes en las relaciones. Límites personales. Mis relaciones interpersonales. Mapa de mis relaciones.",
      duracion: 5,
      orden: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nombre: "Mis áreas de oportunidad",
      description: "Metamomento. Expresión de emociones. Posiciones ante la comunicación de emociones. La inteligencia emocional y la comunicación asertiva. Regulación de emociones. Desarrollo de resolución de conflictos (El plano inteligente-emocional)",
      duracion: 5,
      orden: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nombre: "Mis metas",
      description: "Esferas/dimensiones de la persona. Equilibrio para lograr el bienestar. *PFP. Metodología SMART. Desarrollo de plan de acción y toma de decisiones.",
      duracion: 5,
      orden: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Tallers', null, {});
  }
};
