class Main {

    get url() {
        return '/';
    }

    get pageHeader() {
        return $('h1');
    }

    get formLabel() {
        return $('label');
    }

    get inputSearch() {
        return $('#search-input');
    }

    get btnSubmit() {
        return $('button[type="submit"]');
    }

    get pictureGrid() {
        return $('.picture-grid');
    }

    get singlePictureInGrid() {
        return $('.picture');
    }

    get picturesInGrid() {
        return $$('.picture-grid .picture');
    }

    get pictureContainer() {
        return $('.picture-container');
    }

    get errorMessage() {
        return $('.error-message');
    }

    get searchedPic() {
        return $('.searched-picture');
    }

    get searchedPicture() {
        return $('div[data-testid="picture-container"]').$('img');
    };

    async enterPictureName(pictureName) {
        await this.inputSearch.clearValue();
        await this.btnSubmit.waitForEnabled({ reverse: true });
        await this.inputSearch.waitForDisplayed();
        await this.inputSearch.click();
        if (pictureName === "\\u00A0") {
            await browser.keys(['\uE00A']);
        } else {
            await this.inputSearch.setValue(pictureName);
        }
    };

    async clickSubmitButton() {
        await this.btnSubmit.click();
    };

}

export default new Main();
