import { testDriver } from "./functions/testDriver.js ";
import { saveToCSV } from "./functions/saveToCSV.js";

const main = async () => {
  const randomTestAmt = 4;
  const pregenTestAmt = 0;

  const resultSet = await testDriver(randomTestAmt, pregenTestAmt);
  saveToCSV(resultSet);
};

main();
