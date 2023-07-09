import mainPage from "../../pageobjects/main.page";

export default page => {
    switch (page) {
        case "Main":
            browser.url(mainPage.url);
            break;
        default:
            console.log('Invalid Page ${page}')
    }
};