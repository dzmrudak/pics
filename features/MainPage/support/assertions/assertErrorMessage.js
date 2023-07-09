import mainPage from "../../pageobjects/main.page";

export default async (errorMessage) => {
    expect(await mainPage.errorMessage.getText()).toEqual(errorMessage);
};