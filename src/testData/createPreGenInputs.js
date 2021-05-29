import fs from "fs";
import papa from "papaparse";

const file = fs.createReadStream("src/testData/preGeneratedTestData.csv");

export const createPreGenInputs = async () => {
  const testSet = ["nothing"];
  papa.parse(file, {
    worker: true, // Don't bog down the main thread if its a big file
    complete: (results) => {
      for (let y = 0; y < results.data.length; y++) {
        let col1 = results.data[y][0];
        for (let z = 0; z < results.data.length; z++) {
          let col2 = results.data[z][1];
          for (let p = 0; p < results.data.length; p++) {
            let col3 = results.data[p][2];

            testSet.push([col1, "2021-06-16", "2021-06-17", col2, col3]);
          }
        }
      }
      console.log(testSet);
      return testSet;
    },
  });
};
