const video = document.getElementById("logoVideo");
let switched = false;
let frameRequest = null;
const triggerPoint = 0.2; 

video.pause();

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const percent = scrollTop / maxScroll;

    if (percent > triggerPoint && !switched) {
        switched = true;
        playForward();
    }

    if (percent <= triggerPoint && switched) {
        switched = false;
        playReverse();
    }
});

function playForward() {
    cancelAnimationFrame(frameRequest); // Stop reverse loop
    video.playbackRate = 1;
    video.play();
}

function playReverse() {
    video.pause(); // Stop vooruit afspelen
    
    function step() {
        // We trekken tijd af per frame (ca. 0.016s voor 60fps)
        if (video.currentTime > 0.01) {
            video.currentTime -= 0.02; // Snelheid van terugspoelen
            frameRequest = requestAnimationFrame(step);
        } else {
            video.currentTime = 0;
            cancelAnimationFrame(frameRequest);
        }
    }
    
    frameRequest = requestAnimationFrame(step);
}