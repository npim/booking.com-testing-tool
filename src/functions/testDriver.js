import { runTest } from "./runTest.js";
import TestGenerator from "../testData/TestGenerator.js";
import { testData } from "../testData/preGeneratedTestData.js";

const testGen = new TestGenerator();

export const testDriver = async (randomNumTests, pregenNumTests) => {
  // Create headers for resultSet
  var resultSet = [
    [
      "Dest Name",
      "Dest Found",
      "Check In",
      "Check Out",
      "Adults",
      "Children",
      "Page Loaded",
      "Load Msg",
      "Input Success",
      "Input Msg",
    ],
  ];

  // Select x amount from pregen dataset
  const pregenTestData = testData.slice(0, pregenNumTests);

  // Generate x random datasets
  const randomTestData = await testGen.generateTestDataset(randomNumTests);

  // Test both data sets
  Promise.all([
    resultSet.push(...(await runTestBatch(pregenTestData))),
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
