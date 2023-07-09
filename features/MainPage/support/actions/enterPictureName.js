import mainPage from "../../pageobjects/main.page";
import { Key } from 'webdriverio';

export default async (pictureName) => {
    await mainPage.enterPictureName(pictureName);
};