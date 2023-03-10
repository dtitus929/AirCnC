'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: "2023-05-19",
        endDate: "2023-05-22"
      },
      {
        spotId: 1,
        userId: 4,
        startDate: "2023-04-05",
        endDate: "2023-04-12"
      },
      {
        spotId: 1,
        userId: 2,
        startDate: "2023-02-22",
        endDate: "2023-02-30"
      },
      {
        spotId: 2,
        userId: 1,
        startDate: "2023-07-01",
        endDate: "2023-07-07"
      },
      {
        spotId: 2,
        userId: 2,
        startDate: "2023-06-15",
        endDate: "2023-06-25"
      },
      {
        spotId: 3,
        userId: 2,
        startDate: "2023-09-22",
        endDate: "2023-09-29"
      },
      {
        spotId: 4,
        userId: 2,
        startDate: "2023-11-01",
        endDate: "2023-11-05"
      },
      {
        spotId: 5,
        userId: 1,
        startDate: "2023-08-05",
        endDate: "2023-08-10"
      },
      {
        spotId: 5,
        userId: 2,
        startDate: "2023-09-05",
        endDate: "2023-09-15"
      },
      {
        spotId: 5,
        userId: 3,
        startDate: "2023-10-07",
        endDate: "2023-10-17"
      },
      {
        spotId: 5,
        userId: 4,
        startDate: "2023-11-17",
        endDate: "2023-11-27"
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
