import fs from "fs";
import papa from "papaparse";

const file = fs.createReadStream("src/testData/preGeneratedTestData.csv");

export const createPreGenInputs = () => {
  const testSet = [];
  papa.parse(file, {
    worker: true, // Don't bog down the main thread if its a big file
    complete: function (results, file) {
      for (let x = 0; x < results.data.length; x++) {
        let row = results.data[y];
        console.log(row);
        for (let y = 0; y < results.data.length; y++) {
          let col1 = row[y];
          for (let z = 0; z < results.data.length; z++) {
            let col2 = row[z];
            for (let p = 0; p < results.data.length; p++) {
              let col3 = row[p];
              testSet.push([col1, "2021-06-16", "2021-06-17", col2, col3]);
            }
          }
        }
      }
      console.log(testSet);
      return testSet;
    },
  });
};
