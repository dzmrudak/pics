const BasePage = require('./Base.page');
class MainPage extends BasePage {

    constructor(page) {
        super(page);

        // selectors
        this.pageHeader = 'h1';
        this.formLabel = 'label';
        this.inputSearch = '#search-input';
        this.btnSubmit = 'button[type="submit"]';
        this.pictureGrid = '.picture-grid';
        this.singlePictureInGrid = '.picture';
        this.picturesInGrid = '.picture-grid .picture';
        this.pictureContainer = '.picture-container';
        this.errorMessage = '.error-message';
        this.searchedPicture = '.searched-picture';
    }

    async navigate() {
        await super.navigate('');
    }

    async getPageHeader() {
        let header = await this.page.$(this.pageHeader);
        return await header.innerText();
    }

    async getInput() {
        let input = await this.page.$(this.inputSearch);
        return await input;
    }

    async getSearchedPictureAttrText(attribute) {
        let picAttrText = await this.page.$(this.searchedPicture);
        return await picAttrText.getAttribute(attribute);
    }

    async getPictureGrid() {
        setTimeout(async () => {
            let pictureGrid = await this.page.$(this.pictureGrid);
        }, 1000);
        return await pictureGrid;
    }

    async getArrayOfPicturesFromGrid() {
        let picArray = await this.page.$$(this.singlePictureInGrid);
        return picArray.length;
    }

    async getErrorMessageText() {
        let errorMessage = await this.page.$(this.errorMessage);
        return errorMessage.innerText();
    }

    async getSbmtButtonDisabled() {
        let btn = await this.page.$(this.btnSubmit);
        return btn.isDisabled();
    }

    async enterPictureName(pictureName) {
        await this.page.fill(this.inputSearch, '');
        await this.page.click(this.inputSearch);
        await this.page.fill(this.inputSearch, pictureName);

    };

    async clickSubmitButton() {
        await this.page.click(this.btnSubmit);
    };
}

module.exports = MainPage;
