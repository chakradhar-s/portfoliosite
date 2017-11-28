import "./imports";

((doc) => {
    let navItems = doc.getElementsByClassName("nav-items");
    let handleEvent = function (event) {
        switch (event.type) {
            case 'click':
                let el = event.currentTarget;
                event.preventDefault();
                event.stopPropagation();
                while ((el = el.parentElement) && !el.classList.contains("navbar-collapse"));
                let sl = $(el).siblings(".navbar-header").children(".navbar-toggle").get(0);
                if (sl && getComputedStyle(sl).display != "none") {
                    $(el).collapse('hide');                    
                }
                document.getElementsByClassName("nav-title")[0].innerText = event.currentTarget.innerText;
                //get content  
                if (event.currentTarget.dataset.target && /^#/.test(event.currentTarget.dataset.target)) {
                    let collapseElements = document.getElementsByClassName("col-container");
                    for (let nh = 0; nh < collapseElements.length; nh++) {
                        if (!collapseElements[nh].classList.contains("hide")) {
                            collapseElements[nh].classList.add("hide");
                        }
                    }
                    let showElement = document.getElementById(event.currentTarget.dataset.target.substring(1));
                    if (showElement) {
                        showElement.classList.remove("hide");
                        document.title = event.currentTarget.innerText + " - Chakradhar Singanamalla";
                    }
                }
                break;
        }
    };
    for (let i = 0; i < navItems.length; i++) {
        navItems[i].addEventListener("click", handleEvent);
    }
})(document);

