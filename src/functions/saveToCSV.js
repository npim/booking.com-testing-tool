import { convertArrayToCSV } from "convert-array-to-csv";
import { appendFile } from "fs";

export const saveToCSV = (resultSet) => {
  const csvFromArrayOfArrays = convertArrayToCSV(resultSet, {
    separator: ",",
  });

  appendFile("src/testResults/output.csv", csvFromArrayOfArrays, (err) => {
    if (err) throw err;
    console.log("The data was appended to file!");
  });
};
