console.log("hello world");

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

// defualt config for locomotive and gsap
scroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});
ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();

// page load animation
gsap.from("#fanta", { x: 100, duration: 1 });
gsap.from(".page-1 .ornageBar", { rotate: 360 });
gsap.from(".page-1 .ornage", { y: 100, duration: 1, opacity: .1 });
gsap.from(".page-1 .leaf-1", { rotate: 35, opacity: 0 });
gsap.from(".page-1 .leaf-2", { rotate: -5, x: 100 });
gsap.from(".page-1 span", { opacity: 0, fontSize: "27vw" });

// scroll animation 
var tl_fanta = gsap.timeline({
    scrollTrigger: {
        trigger: ".page-2",
        start: '0% 90%',
        end: '50% 50%',
        scrub: true, // reverce animation 
        // markers: true, // show markers 
        scroller: "#main",// Specify the scroller,
    }
});

// fanta can animaton
tl_fanta.to("#fanta", { y: "170%", x: "-70%" }, "orange-1") // run ones time ""orange-1

// orange animaton
tl_fanta.to(".page-1 .ornage", { y: "265%", x: "-180%", }, "orange-1") // run ones time ""orange-1

// spining animation
tl_fanta.to(".page-1 .orangeBar", { rotate: -360 }, "orange-1")
// leaf-1
tl_fanta.to(".page-1 .leaf-1", { y: "205%", }, "orange-1") // run ones time ""orange-1
tl_fanta.to(".page-1 .leaf-2", { y: "205%", rotate: -165, x: "160%" }, "orange-1") // run ones time ""orange-1





// page 3 animation 
var tl_fanta_2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page-3",
        start: '0% 90%',
        end: '50% 50%',
        scrub: true, // reverce animation 
        // markers: true, // show markers 
        scroller: "#main",// Specify the scroller,
    }
});

// fanta can animaton
tl_fanta_2.to("#fanta", { y: "363%", x: "0%", width: "35%" }, "orange-2") // run ones time ""orange-2
tl_fanta_2.from(".page-3 .sprite-3", { rotate: -34, scale: "1.4" }, "orange-2") // run ones time ""orange-2
tl_fanta_2.from(".page-3 .pepsi-3", { rotate: 34, scale: "1.6" }, "orange-2") // run ones time ""orange-2
