import { runTest } from "./runTest.js";
import TestGenerator from "../testData/TestGenerator.js";

const testGen = new TestGenerator();

export const testDriver = (numTests) => {
  // Run random generated test cases
  for (let i = 0; i < numTests; i++) {
    runTest(...testGen.generateTestDataset());
  }
};
