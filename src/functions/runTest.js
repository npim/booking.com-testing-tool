import { Builder, By, until } from "selenium-webdriver";
import "chromedriver";

export const runTest = async (
  destinationInput,
  checkIn,
  checkOut,
  noOfAdults,
  noOfChildren
) => {
  // Create output object
  let output = {
    destinationInput,
    destinationOutput: "",
    checkIn,
    checkOut,
    noOfAdults,
    noOfChildren,
    loadTestSuccess: false,
    loadTestMessage: "n/a",
    inputTestSuccess: false,
    inputTestMessage: "n/a",
  };

  // Create chrome driver object
  const driver = await new Builder().forBrowser("chrome").build();

  // Test page loads correct components and inputs return correct results
  await loadPageTest(driver, output);
  await inputPageTest(driver, output);

  // Return outcome for this page search
  return new Promise((resolve) => {
    resolve([Object.values(output)]);
  });
};

const loadPageTest = async (driver, output) => {
  // Find input areas
  const destinationInputBox = By.name("ss");
  const datesInputBox = By.className("xp__dates-inner");
  const guestDetailsBox = By.className("xp__input");
  const searchButton = By.className("sb-searchbox__button");

  //1.1 TEST-1 LOADING THE HOME PAGE
  await driver.get("https://www.booking.com");

  //1.2 TEST-1 RESULT CHECKING (TEST ORACLE)
  try {
    /*Check the title*/
    await driver.wait(
      until.titleIs(
        "Booking.com | Official site | The best hotels & accommodations"
      ),
      5000
    );
    /*Check whether the Destination input box is located*/
    await driver.wait(until.elementLocated(destinationInputBox));
    /*Check whether the Checkin and Checkout dates input box is located*/
    await driver.wait(until.elementLocated(datesInputBox));
    /*Check whether the Guest details input box is located*/
    await driver.wait(until.elementLocated(guestDetailsBox));
    /*Check whether the Search button is located*/
    await driver.wait(until.elementLocated(searchButton));

    // Success
    output.loadTestSuccess = true;

    return new Promise((resolve) => {
      resolve(output);
    });
  } catch (e) {
    await driver.close();
    // Failed: remove new lines from error message
    let error = e.message.replace(/\n/g, " ");
    output.loadTestSuccess = false;
    output.loadTestMessage = error;

    return new Promise((resolve) => {
      resolve(output);
    });
  }
};

const inputPageTest = async (driver, output) => {
  const { destinationInput, checkIn, checkOut, noOfAdults, noOfChildren } =
    output;

  const datesInputBox = By.className("xp__dates-inner");
  const guestDetailsBox = By.className("xp__input");
  const searchButton = By.className("sb-searchbox__button");

  //2.1 TEST-2 ENTERING TEST CASE
  //2.1.1 Enter the destination name
  try {
    await driver.findElement(By.name("ss")).sendKeys(destinationInput);

    //2.1.2 Enter the checkin and checkout dates
    await driver.findElement(datesInputBox).click(); //Click dates box
    await driver
      .findElement(By.css("td.bui-calendar__date[data-date='" + checkIn + "']"))
      .click(); //checkin
    await driver
      .findElement(
        By.css("td.bui-calendar__date[data-date='" + checkOut + "']")
      )
      .click(); //checkout

    //2.1.3 Enter the guest details
    await driver.findElement(guestDetailsBox).click(); //Click the guest details box

    //2.1.3.1 No of Adults
    const defaultAdults = 2;

    if (noOfAdults < defaultAdults) {
      await driver
        .findElement(By.css("button[aria-label='Decrease number of Adults']"))
        .click();
    } else if (noOfAdults > defaultAdults) {
      for (let i = 0; i < noOfAdults - 2; i++) {
        await driver
          .findElement(By.css("button[aria-label='Increase number of Adults']"))
          .click();
      }
    }

    //2.1.3.2 No of Children
    const defaultChildren = 0;

    if (noOfChildren > defaultChildren) {
      for (let i = 0; i < noOfChildren; i++) {
        await driver
          .findElement(
            By.css("button[aria-label='Increase number of Children']")
          )
          .click();
      }
    }

    //2.1.4 Click Search button
    await driver.findElement(searchButton).click();

    //2.2 TEST-2 RESULT CHECKING (TEST ORACLE)

    /* Check whether searchBox value matches searched destination */
    await driver.wait(until.elementLocated(By.id("ss")), 3000);
    let destFound = await driver.findElement(By.id("ss")).getAttribute("value");
    output.destinationOutput = destFound;

    /*Check the title of the page*/
    await driver.wait(until.titleContains(destinationInput), 3000);

    /*Check whether the search box is displayed*/
    await driver.wait(until.elementLocated(By.id("frm")), 3000);

    /*Check whether the no of adults match with the inputted no of adults*/
    await driver.wait(
      until.elementLocated(
        By.css("option[value='" + noOfAdults + "'][selected='selected']")
      ),
      3000
    );
    /*Check whether the no of children match with the inputted no of children*/
    await driver.wait(
      until.elementLocated(
        By.css("option[value='" + noOfChildren + "'][selected='selected']")
      )
    );
    /*Check whether the filter box is displayed*/
    await driver.wait(
      until.elementLocated(By.css("div.filterbox_options_content")),
      3000
    );
    /*Check whether the hotel list is displayed*/
    await driver.wait(
      until.elementLocated(By.css("div#hotellist_inner.wider_image")),
      3000
    );

    // Success
    output.inputTestSuccess = true;

    await driver.close();
    return new Promise((resolve) => {
      resolve(output);
    });
  } catch (e) {
    // Failed: remove new lines from error message
    output.inputTestSuccess = false;
    let error = e.message.replace(/\n/g, " ");
    output.inputTestMessage = error;

    await driver.close();
    return new Promise((resolve) => {
      resolve(output);
    });
  }
};

// Headless testing
// const options = new chrome.Options();
// options.addArguments(
//   options.headless().windowSize({ width: 1920, height: 1080 })
// );
// options.addArguments("--window-size=1920,1080");
// options.addArguments("--no-sandbox");
// options.addArguments("--allow-insecure-localhost");
// options.addArguments("excludeSwitches", ["enable-logging"]);
// options.addArguments("excludeSwitches", ["enable-logging"]);
