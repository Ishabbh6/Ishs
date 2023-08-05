const webdriver = require('selenium-webdriver');
const capabilities = {
 'platform' : 'WIN10',
 'browserName' : 'chrome',
 'version' : 'latest',
 'name': 'NodeJS Sample Test'
}
async function runTest () {
  let driver = new webdriver.Builder()
    .usingServer('https://93cde4ead2e8814dbcb96b4126306fb3:48dd46a3d9abdc6cfdc0901918ad55a6@hub.testingbot.com/wd/hub')
    .withCapabilities(capabilities)
    .build();
  await driver.get("https://www.google.com/ncr");
  const inputField = await driver.findElement(webdriver.By.name("q"));
  await inputField.sendKeys("TestingBot", webdriver.Key.ENTER);
  try {
    await driver.wait(webdriver.until.titleMatches(/TestingBot/i), 5000);
  } catch (e) {
    await inputField.submit();
  }
  try {
    await driver.wait(webdriver.until.titleMatches(/TestingBot/i), 5000);
    console.log(await driver.getTitle());
  } catch (e) {
    console.error(e);
  }
  await driver.quit();
}
runTest();
