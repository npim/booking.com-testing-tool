import { testDriver } from "./functions/testDriver.js ";

const main = async () => {
  const resultSet = await testDriver(2);

  console.log(resultSet);
};

main();
