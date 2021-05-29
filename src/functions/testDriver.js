import { runTest } from "./runTest.js";
import TestGenerator from "../testData/TestGenerator.js";
import { createPreGenInputs } from "../testData/createPreGenInputs.js";
import { testData } from "../testData/PreGeneratedTestData.js";

const testGen = new TestGenerator();

export const testDriver = async (numTests) => {
  var resultSet = [];

  // Run preconfigured data tests

  for (var i = 0; i < testData.length; i++) {
    resultSet.push(
      new Promise((resolve) => {
        resolve(runTest(...testData[i]));
      })
    );
  }

  // Run random generation tests
  // for (var i = 0; i < numTests; i++) {
  //   resultSet.push(
  //     new Promise((resolve) => {
  //       resolve(runTest(...testGen.generateTestDataset()));
  //     })
  //   );
  // }
  return await Promise.all(resultSet);
};
