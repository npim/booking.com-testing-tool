import { testDriver } from "./functions/testDriver.js ";
import { saveToCSV } from "./functions/saveToCSV.js";

const main = async () => {
  const randomTestAmt = 1;
  const pregenTestAmt = 2;

  const resultSet = await testDriver(randomTestAmt, pregenTestAmt);
  saveToCSV(resultSet);
};

main();
