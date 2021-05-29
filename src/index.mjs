import { testDriver } from "./functions/testDriver.js ";
import { convertArrayToCSV } from 'convert-array-to-csv';
// const converter = require('convert-array-to-csv');
import { appendFile } from 'fs';

const main = async () => {
  const resultSet = await testDriver(1);

  console.log(resultSet);
  // const header = ['destinationInput', 'checkIn', 'checkOut',
  //   'noOfAdults', 'noOfChildren', 'loadTest', 'loadTestErrorMessage', 'inputTest', 'inputTestErrorMessage'];
  const csvFromArrayOfArrays = convertArrayToCSV(resultSet, {

    separator: ','
  });
  console.log(csvFromArrayOfArrays);

  appendFile('src/testResults/output.csv', csvFromArrayOfArrays, (err) => {
    if (err) throw err;
    console.log('The data was appended to file!');
  });


};

main();
