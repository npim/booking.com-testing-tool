import { testDriver } from "./functions/testDriver.js ";
import { saveToCSV } from "./functions/saveToCSV.js";

const main = async () => {
  const resultSet = await testDriver(1);
  saveToCSV(resultSet);
};

main();
