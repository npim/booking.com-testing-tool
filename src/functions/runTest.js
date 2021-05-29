import { Builder, By, until } from "selenium-webdriver";
import "chromedriver";

export const runTest = async (
  destinationInput,
  checkIn,
  checkOut,
  noOfAdults,
  noOfChildren
) => {
  // Create chrome driver object
  const driver = await new Builder().forBrowser("chrome").build();
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

    console.log("Test-1 Result: Passed! The page is loaded successfully");
  } catch (e) {
    console.log("Test-1 Result: Failed! The page is not loaded successfully");
  }

  //2.1 TEST-2 ENTERING TEST CASE
  //2.1.1 Enter the destination name
  await driver.findElement(By.name("ss")).sendKeys(destinationInput);

  //2.1.2 Enter the checkin and checkout dates
  await driver.findElement(datesInputBox).click(); //Click dates box
  await driver
    .findElement(By.css("td.bui-calendar__date[data-date='" + checkIn + "']"))
    .click(); //checkin
  await driver
    .findElement(By.css("td.bui-calendar__date[data-date='" + checkOut + "']"))
    .click(); //checkout

  //2.1.3 Enter the guest details (automated case?)
  await driver.findElement(guestDetailsBox).click(); //Click the guest details box

  //2.1.3.1 No of Adults
  const defaultAdults = 2;

  if (noOfAdults < defaultAdults) {
    await driver
      .findElement(By.css("button[aria-label='Decrease number of Adults']"))
      .click();
  } else if (noOfAdults > defaultAdults) {
    let i;
    for (i = 0; i < noOfAdults - 2; i++) {
      await driver
        .findElement(By.css("button[aria-label='Increase number of Adults']"))
        .click();
    }
  }

  //2.1.3.2 No of Children
  const defaultChildren = 0;

  if (noOfChildren > defaultChildren) {
    let i;
    for (i = 0; i < noOfChildren; i++) {
      await driver
        .findElement(By.css("button[aria-label='Increase number of Children']"))
        .click();
    }
  }

  //2.1.3.3 No of Rooms
  //Left as one room because Booking.com will advise the number of rooms automatically depending on the guest numbers
  //await driver.findElement(By.css("button[aria-label='Increase number of Rooms']")).click();//automated click for + rooms
  //await driver.findElement(By.css("button[aria-label='Decrease number of Rooms']")).click();//automated click for - rooms

  //2.1.4 Click Search button
  await driver.findElement(searchButton).click();

  //2.2 TEST-2 RESULT CHECKING (TEST ORACLE, maybe test more)
  try {
    /*Check the title of the page*/
    await driver.wait(until.titleContains(destinationInput), 5000);
    /*Check whether the search box is displayed*/
    await driver.wait(
      until.elementLocated(
        By.css(
          "form#frm.sb-searchbox.sb-face-lift.sb-searchbox--painted.-small.js--sb-searchbox"
        )
      )
    );
    /*Check whether the no of adults match with the inputted no of adults*/
    await driver.wait(
      until.elementLocated(
        By.css("option[value='" + noOfAdults + "'][selected='selected']")
      )
    );
    /*Check whether the no of children match with the inputted no of children*/
    await driver.wait(
      until.elementLocated(
        By.css("option[value='" + noOfChildren + "'][selected='selected']")
      )
    );
    /*Check whether the filter box is displayed*/
    await driver.wait(
      until.elementLocated(By.css("div.filterbox_options_content"))
    );
    /*Check whether the hotel list is displayed*/
    await driver.wait(
      until.elementLocated(By.css("div#hotellist_inner.wider_image"))
    );

    console.log(
      "Test-2 Result: Passed! Successfully load hotels in " + destinationInput
    );
  } catch (e) {
    console.log(
      "Test-2 Result: Failed! Failed to load hotels in " + destinationInput
    );
  }

  // Close window with current focus
  await driver.close();
};
