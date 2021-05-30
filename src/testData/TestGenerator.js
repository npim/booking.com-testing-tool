import faker from "faker";

export default class TestGenerator {
  async generateTestDataset(numTests) {
    const randomTestData = [];

    await (async function loop() {
      const testGen = new TestGenerator();
      for (let i = 0; i < numTests; i++) {
        let newDates = testGen.generateDates();
        randomTestData.push([
          testGen.generateDestinationName(),
          newDates.checkinDateInput,
          newDates.checkoutDateInput,
          testGen.generateNoOfAdults() + "",
          testGen.generateNoOfChildren() + "",
        ]);
      }
    })();
    return randomTestData;
  }

  generateDestinationName() {
    const destination = faker.address.cityName(); //Generate city name randomly
    let chance = Math.random();
    if (chance > 0.5) {
      return this.alterDestinationName(destination); // Sometimes Garble destination name
    }
    return destination;
  }

  changeDateFormat(date) {
    const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
      date
    );
    const month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(
      date
    );
    const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
    const newFormat = `${year}-${month}-${day}`;
    return newFormat;
  }

  generateDates() {
    /*CHECKIN DATE*/
    const today = new Date();
    const checkin = new Date(today);
    checkin.setDate(checkin.getDate() + 1); //set checkin date to tommorrow (feel free to change)
    const checkinDateInput = this.changeDateFormat(checkin);

    /*CHECKOUT DATE*/
    const stayDuration = Math.floor(Math.random() * 10 + 1); //stay duration from 1 day to 10 days (feel free to change)
    const checkout = new Date(checkin);
    checkout.setDate(checkout.getDate() + stayDuration);
    const checkoutDateInput = this.changeDateFormat(checkout);

    return {
      checkinDateInput,
      checkoutDateInput,
    };
  }

  generateNoOfAdults() {
    return Math.floor(Math.random() * 10 + 1); //random number from 1-10
  }

  generateNoOfChildren() {
    return Math.floor(Math.random() * 10); //random number from 0-10
  }

  alterDestinationName(destination) {
    const randomSymbols = [
      "?",
      "<",
      ">",
      "[",
      "!",
      "@",
      "$",
      "%",
      "^",
      "{",
      "~",
      "`",
      "-",
      "*",
    ];
    const lengthOfRandomSymbols = randomSymbols.length;
    const alteredDestination = this.chunk(destination).join(
      randomSymbols[this.generateIndex(lengthOfRandomSymbols)] +
        randomSymbols[this.generateIndex(lengthOfRandomSymbols)]
    );
    return alteredDestination;
  }

  chunk(destination) {
    var n = 2;
    var ret = [];
    var i;
    var len;

    for (i = 0, len = destination.length; i < len; i += 2) {
      ret.push(destination.substr(i, n));
    }
    return ret;
  }

  generateIndex(arrLength) {
    return Math.floor(Math.random() * (arrLength - 1));
  }
}
