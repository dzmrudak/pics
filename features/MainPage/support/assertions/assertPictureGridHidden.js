import mainPage from "../../pageobjects/main.page";

export default async (falseCase) => {

    if (falseCase) {
        expect(
            await mainPage.pictureGrid.isDisplayed()).toEqual(
                true,
                { message: 'Picture grid is not displayed' }
            );
        expect(await mainPage.pictureGrid).toHaveElementClass('hidden', { message: 'Picture grid is hidden!' });

    } else {
        expect(
            await mainPage.pictureGrid.isDisplayed()).not.toEqual(
                true,
                { message: "Picture grid is diplayed" }
            );
        expect(await mainPage.pictureGrid).toHaveElementClass('hidden', { message: 'Not hidden!' });
    }
};