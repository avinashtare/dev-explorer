let btn = document.querySelector(".btn-show")
let video = document.querySelector("video")

document.addEventListener("DOMContentLoaded", () => {
    video.addEventListener("loadeddata",()=>{
        video.play()
    })

    btn.addEventListener("click", () => {
        video.play()
        video.classList.contains("colordvideo") ? video.classList.remove("colordvideo") : video.classList.add("colordvideo");
    })
})