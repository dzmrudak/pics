*** Settings ***
Documentation       Robot Framework tests for the Random Pictures Grid App

Library             SeleniumLibrary

Test Setup          Open main page of the app
Test Teardown       Closing Browser


*** Variables ***
${BROWSER}          chrome
${URL}              http://localhost:8080
${Picture Name}     1.png
${Alt Attribute}    alt    
${Error Message}    Error: Not Found


*** Test Cases ***
Should be able to get the header name
    ${pageHeader}=    Get Page Header
    Should Be Equal    ${pageHeader}    Random Pictures Grid

Should contain 9 pictures in the picture grid
    ${arrayOfPictures}=    Get Array Of Pictures From Grid
    Length Should Be    ${arrayOfPictures}    9

Should show an error message if the picture is not found
    Enter Picture Name    cat
    Click Submit Button
    ${errorMessageText}=    Get Error Message Text
    Should Be Equal    ${errorMessageText}    ${Error Message}

Should block the submit button if there are no symbols in the search field
    Enter Picture Name    ${EMPTY}
    ${sbmtButtonDisabled}=    Get Sbmt Button Disabled
    Should Be True    ${sbmtButtonDisabled}

Should block the submit button if there is a single space in the search field
    Enter Picture Name    ${SPACE}
    ${sbmtButtonDisabled}=    Get Sbmt Button Disabled
    Should Be True    ${sbmtButtonDisabled}

Should be able to search a picture
    Enter Picture Name    ${Picture Name}
    Click Submit Button
    Get Searched Picture
    ${searchedPictureAttrText}=    Get Searched Picture Attr Text    ${Alt Attribute}
    Should Be Equal    ${searchedPictureAttrText}    ${Picture Name}


*** Keywords ***
Open main page of the app
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

Closing Browser
    Close Browser

Get Page Header
    ${pageHeader}=    Get Text    css:h1
    RETURN    ${pageHeader}

Enter Picture Name
    [Arguments]    ${pictureName}
    Input Text    id:search-input    ${pictureName}

Click Submit Button
    Click Button    css:button[type="submit"]

Get Searched Picture
    ${searchedPicture}=    Get WebElement    css:.searched-picture
    RETURN    ${searchedPicture}

Get Searched Picture Attr Text
    [Arguments]    ${attribute}
    ${searchedPictureAttrText}=    Get Element Attribute    css:.searched-picture    ${attribute}
    RETURN    ${searchedPictureAttrText}

Get Array Of Pictures From Grid
    ${pictures}=    Get WebElements    css:.picture-grid img
    RETURN    ${pictures}

Get Error Message Text
    ${errorMessageText}=    Get Text    css:.error-message
    RETURN    ${errorMessageText}

Get Sbmt Button Disabled
    ${disabled}=    Get Element Attribute    css:button[type="submit"]    disabled
    IF    '${disabled}'=='true'    RETURN    True
    RETURN    False
