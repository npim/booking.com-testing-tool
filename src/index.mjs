import { testDriver } from "./functions/testDriver.js ";

const main = async () => {
  console.log("hello");
  const resultSet = await testDriver(2);

  console.log(resultSet);
};

main();
