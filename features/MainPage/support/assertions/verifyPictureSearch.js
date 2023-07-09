import mainPage from "../../pageobjects/main.page";

export default async (searchedPicture, falseCase) => {
    if (falseCase) {
        expect(await mainPage.searchedPicture.isExisting()).not.toEqual(
            true,
            { message: 'Picture with a ${searchedPicture} name has been found' }
        );
    } else {
        expect(await mainPage.searchedPicture.getAttribute('alt')).toEqual(
            searchedPicture,
            { message: 'Picture has not been found or the picture\'s name is not mathcing the search query' }
        );
    }
};