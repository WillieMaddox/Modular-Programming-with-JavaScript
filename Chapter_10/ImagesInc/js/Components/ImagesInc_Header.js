define(['MainCore'], function(ImagesInc_Core) {

    var callback = function(sandBox) {
        return {
            init: function () {
                try {
                    sandBox.updateElement("headerContainer", ImagesInc_GlobalData.getHeaderHTMLTxt());
                    sandBox.contextObj = this;
                    this.registerForEvents();
                    sandBox.logMessage(1, 'Header component has been initialized...', 'blue');
                } catch (e) {
                    sandBox.logMessage(3, 'Header component has NOT been initialized correctly --> ' + e.message);
                }
            },
            destroy: function (removeComponent) {
                this.unregisterFromEvents();
                sandBox.unregisterAllCustomEvents();
                if (removeComponent) {
                    sandBox.removeComponentFromDom("headerContainer");
                }
                sandBox.logMessage(1, 'Header component has been destroyed...', "blue");
            },
            registerForEvents: function () {
                sandBox.addEventHandlerToElement("Home", "click", this.handleHomeClick);
                sandBox.addEventHandlerToElement("siteLogo", "click", this.handleHomeClick);
                sandBox.addEventHandlerToElement("Favorites", "click", this.handleFavouritesClick);
            },
            unregisterFromEvents: function () {
                sandBox.removeEventHandlerFromElem("Home", "click", this.handleHomeClick);
                sandBox.removeEventHandlerFromElem("siteLogo", "click", this.handleHomeClick);
                sandBox.removeEventHandlerFromElem("Favorites", "click", this.handleFavouritesClick);
            },
            handleHomeClick: function (e) {
                sandBox.loadPage("index.html");
                e.preventDefault();
                e.stopPropagation();
                sandBox.addToHistory({
                    url: "index.html"
                });
            },
            handleFavouritesClick: function (e) {
                e.preventDefault();
                e.stopPropagation();
                var favouritedImagesArray = sandBox.getValueAsArrayFromCookie(ImagesInc_GlobalData.getFavCookieName());
                if (!favouritedImagesArray) {
                    alert('No favourites have been selected!');
                    return;
                }
                sandBox.publishCustomEvent({
                    type: 'favourites-Clicked',
                    data: "favourites"
                });
                sandBox.addToHistory({
                    url: 'favourites' //update url in the browser
                });
            }
        };
    };
    ImagesInc_Core.registerComponent("headerContainer", "header", callback)
});