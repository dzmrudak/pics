import mainPage from "../../pageobjects/main.page";

export default async () => {
    expect(
        await mainPage.btnSubmit.isEnabled()).toEqual(
            false,
            { message: 'Submit button is not disabled' }
        );
};