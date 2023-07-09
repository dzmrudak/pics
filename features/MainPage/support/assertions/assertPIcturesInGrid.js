import mainPage from "../../pageobjects/main.page";

export default async (numberOfPics) => {
    expect(await mainPage.picturesInGrid).toHaveLength(numberOfPics);
};