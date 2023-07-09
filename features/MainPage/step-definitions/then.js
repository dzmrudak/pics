import { Then } from '@wdio/cucumber-framework';
import assertSearch from '../support/assertions/verifyPictureSearch';
import assertErrorMessage from '../support/assertions/assertErrorMessage';
import assertPIcturesInGrid from '../support/assertions/assertPIcturesInGrid';
import assertPictureGridHidden from '../support/assertions/assertPictureGridHidden';
import assertSubmitButtonIsDisabled from '../support/assertions/assertSubmitButtonIsDisabled';

Then(/^The searchable picture "(.*)" is( not)* displayed on the screen$/, async (searchedPicture, falseCase) => {
    await assertSearch(searchedPicture, falseCase);
});

Then(/^Error message "(Error: Not Found)" is shown$/, async (errorMessage) => {
    await assertErrorMessage(errorMessage);
});

Then(/^There are (\d+) pictures in the picture grid$/, async (numberOfPics) => {
    await assertPIcturesInGrid(numberOfPics);
});

Then(/^The picture grid is( not)* hidden$/, async (falseCase) => {
    await assertPictureGridHidden(falseCase);
});

Then(/^The submit button cannot be clicked$/, async () => {
    await assertSubmitButtonIsDisabled();
});