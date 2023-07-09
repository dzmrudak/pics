import { test, expect } from '@playwright/test';
import MainPage from '../models/Main.page';

const myTest = test.extend({
    mainPage: async ({ page }, use) => {
        const mainPage = new MainPage(page);
        await mainPage.navigate();
        await use(mainPage);
    },
});

myTest('Should be able to search a picture', async ({ mainPage }) => {
    const picName = '1.png';
    const attrText = 'alt';

    await mainPage.enterPictureName(picName);
    await mainPage.clickSubmitButton();
    expect(await mainPage.getSearchedPictureAttrText(attrText)).toBe(picName);
});

myTest('Should be able to get the header name', async ({ mainPage }) => {
    expect(await mainPage.getPageHeader()).toBe('Random Pictures Grid');
});

myTest('Should contain 9 pictures in the picture grid', async ({ mainPage }) => {
    expect(await mainPage.getArrayOfPicturesFromGrid()).toBe(9);
});

myTest('Should show an error message if the picture is not found', async ({ mainPage }) => {
    const picName = 'cat';
    await mainPage.enterPictureName(picName);
    await mainPage.clickSubmitButton();
    expect(await mainPage.getErrorMessageText()).toBe('Error: Not Found');
});

myTest('Should block the submit button if there are no symbols in the search field', async ({ mainPage }) => {
    const emptyValue = '';
    await mainPage.enterPictureName(emptyValue);
    expect(await mainPage.getSbmtButtonDisabled()).toBe(true);
});

myTest('Should block the submit button if there is a single space in the search field', async ({ mainPage }) => {
    const emptyValue = ' ';
    await mainPage.enterPictureName(emptyValue);
    expect(await mainPage.getSbmtButtonDisabled()).toBe(true);
});