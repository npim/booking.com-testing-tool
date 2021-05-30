import { runTest } from "./runTest.js";
import TestGenerator from "../testData/TestGenerator.js";
import { testData } from "../testData/preGeneratedTestData.js";

const testGen = new TestGenerator();

export const testDriver = async (numTests) => {
  var resultSet = [];

  // Generate random datasets
  const randomTestData = await testGen.generateTestDataset(numTests);

  // Test both data sets
  Promise.all([
    resultSet.push(...(await runTestBatch(testData))),
    resultSet.push(...(await runTestBatch(randomTestData))),
  ]);

  return resultSet;
};

const runTestBatch = async (testData) => {
  const resultSet = [];
  await (async function loop() {
    for (let i = 0; i < testData.length; i++) {
      let res = await runTest(...testData[i]);
      resultSet.push(res);
    }
  })();
  return resultSet;
};
