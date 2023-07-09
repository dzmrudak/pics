import mainPage from "../../pageobjects/main.page";

export default async () => {
    expect(await mainPage.pictureGrid).toBeDisplayed();
};