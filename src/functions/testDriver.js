import { runTest } from "./runTest.js";
import TestGenerator from "../testData/TestGenerator.js";
import { createPreGenInputs } from "../testData/createPreGenInputs.js";

const testGen = new TestGenerator();

export const testDriver = async (numTests) => {
  var resultSet = [];

  // Run preconfigured data tests
  //createPreGenInputs();

  // Run random generation tests
  for (var i = 0; i < numTests; i++) {
    resultSet.push(
      new Promise((resolve) => {
        resolve(runTest(...testGen.generateTestDataset()));
      })
    );
  }
  return await Promise.all(resultSet);
};
