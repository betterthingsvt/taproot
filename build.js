// build.js handles the process of importing data from /configuration into the page when loaded
// Import Config File
fetch('config.json')
    .then((response) => response.json())
    .then((json) => {
        // Set the page title
        document.title = json.title;

        // Set metadata
        document.querySelector('meta[name="description"]').setAttribute("content", json.description);
        document.querySelector('link[rel="icon"]').setAttribute("href", "media/" + json.image);

        // Set inline content (profile picture, profile name, description)
        document.getElementById("profilePicture").src           = "media/" + json.image;
        document.getElementById("background").src               = "media/" + json.image;
        document.getElementById("profileName").innerHTML        = json.title;
        document.getElementById("profileDescription").innerHTML = json.description;

        // Convert all items in the style object to CSS variables
        var style = json.style;
        var styleKeys = Object.keys(style);
        for (var i = 0; i < styleKeys.length; i++) {
            document.documentElement.style.setProperty("--" + styleKeys[i], style[styleKeys[i]]);
        }

        // For each item in the socials object, create a social link, where the image is the social icon from /branding
        var socials = json.social;
        var socialKeys = Object.keys(socials);
        for (var i = 0; i < socialKeys.length; i++) {

            if (socials[socialKeys[i]] !== "" && socials[socialKeys[i]] !== null) {
                console.log(socials[socialKeys[i]]);
                var social = document.createElement("a");
                social.setAttribute("class", "socialLink");
                social.setAttribute("href", socials[socialKeys[i]]);
                social.setAttribute("target", "_blank");

                var socialImage = document.createElement("img");
                socialImage.setAttribute("class", "socialImage");
                socialImage.setAttribute("src", "branding/" + socialKeys[i] + ".png");

                social.appendChild(socialImage);
                document.getElementById("socialLinks").appendChild(social);
            }
        }

        links(json.links);
    });

function links(jsonLinks) {
    // We're building elements that look like this: <a class="linkOut" href="#"><div class="link"><img class="linkImage" src="media/avatar.png"><div class="linkText">Test Link 123</div></div></a>
    // and placing them inside of linkList
    var linkList = document.getElementById("linkList");

    for (var i = 0; i < jsonLinks.length; i++) {
        var link = document.createElement("a");
        link.setAttribute("class", "linkOut");
        link.setAttribute("href", jsonLinks[i].url);

        var linkElement = document.createElement("div");
        linkElement.setAttribute("class", "link");

        var linkImage = document.createElement("img");
        linkImage.setAttribute("class", "linkImage");
        linkImage.setAttribute("src", "media/" + jsonLinks[i].image);

        var linkText = document.createElement("div");
        linkText.setAttribute("class", "linkText");
        linkText.innerHTML = jsonLinks[i].title;

        if (jsonLinks[i].image !== "") {
            linkElement.appendChild(linkImage);
        }
        linkElement.appendChild(linkText);
        link.appendChild(linkElement);
        linkList.appendChild(link);
    }
};


function checkImage(image) {
    if (image.includes("http")) {
        return image;
    } else {
        return "media/" + image;
    }
}