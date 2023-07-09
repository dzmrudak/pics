import { When } from '@wdio/cucumber-framework';
import mainPage from '../pageobjects/main.page';
import enterPictureName from '../support/actions/enterPictureName';
import assertPictureGridIsDisplayed from '../support/assertions/assertPictureGridIsDisplayed';

When(/^The user enters "(.*)" into the search bar$/, async (keyword) => {
    await enterPictureName(keyword);
});

When(/^User clicks the Submit button$/, async () => {
    await mainPage.clickSubmitButton();
});

When(/^The picture grid is displayed$/, async () => {
    await assertPictureGridIsDisplayed();
});