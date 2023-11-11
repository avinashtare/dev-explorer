const linkMap = [
    {
        url: "/",
        com: "home"
    },
    {
        url: "/about",
        com: "about"
    },
    {
        url: "/services",
        com: "services"
    }
]

class Goto extends HTMLElement {
    constructor() {
        super();

        // Use this.getAttribute('href') directly
        this.href = this.getAttribute('href') || null;

        // Handle errors without a try-catch block
        if (this.href) {
            this.style.textDecoration = 'underline';
            this.style.cursor = 'pointer';
        }

        this.style.color = 'blue';
        this.style.fontWeight = 'normal';

        this.addEventListener('click', () => {
            if (this.href) {
                let foundCom = linkMap.filter((e) => e.url == this.href)[0]
                if (foundCom) {
                    let data = { component: foundCom.com };

                    history.pushState(data, '', this.href);
                    stateChange(data)
                }
            }
        });
    }
}




// Define the custom element tag
customElements.define('go-to', Goto);

function stateChange(e) {
    let root = document.getElementById("root");

    Array.from(root.children).forEach(element => {
        element.classList.add("com")
        element.classList.remove("show")
        if (e.component == element.id) {
            element.classList.add("show")
        }
    });
}


// init 
function init() {
    let path = new URL(document.URL).pathname;
    let foundCom = linkMap.filter((e) => e.url == path)[0]
    if (foundCom) {
        let data = { component: foundCom.com };
        stateChange(data)
    }
}


window.addEventListener('popstate', () => {
    init()
});

window.addEventListener("DOMContentLoaded",()=>{
    init()
})