const video = document.getElementById("logoVideo");
let switched = false;
let frameRequest = null;
const triggerPoint = 0.02;

video.pause();

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const percent = scrollTop / maxScroll;

    if (percent > triggerPoint && !switched) {
        switched = true;
        playForward();
        const buttonContainer = document.getElementById('buttons');
        buttonContainer.style.marginTop = "-80px"; // Pas dit getal aan naar wens
        buttonContainer.style.transition = "margin-top 0.5s ease"; // Voor een vloeiende beweging
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

const faders = document.querySelectorAll('.fade-section');

const appearOptions = {
    threshold: 0.2
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});


const names = [
"Jari", "Twan", "Nolan", "Gizem", "Emille", "Nore", "Leni", "Lars", "Alex", "Emiel", "Emeric", "Karolina",
"Elise", "Yentle", "Mouna", "Nikah", "Ricki", "Warre", "Tess", "Siebe", "Roos", "Tille", "Jirge", "Quentin",
"Lowie", "Elena", "Marlieke", "Merel", "Oumaima", "Arthur", "Kobe", "Franciszek", "Levi", "Jasper", "Mathis",
"Siebe", "Basiel", "Sep", "Lowie", "Marte", "Balil", "Brent", "Preben", "Alperen", "Duncan", "Beau", "Amr", "Efe",
"Hamza", "Otman", "Lucas", "Niek", "Tygho", "Tibo", "Jelko", "Anouar", "Yana", "Tars", "Noa", "Siebe","Tycho", "Ismail",
"Ali", "Izer", "Stef", "Ylano", "Krieke", "Quinten", "Vic", "Noah", "Joran", "Rune", "Gauthier", "Dries", "Fille",
"Stef", "Jasper", "Liam", "Jasper", "Emiel", "Brecht", "Nathan", "Milan", "Lukas", "Henri", "Arne", "Brain", "wout",
"Lukas", "Tore", "Pjotr", "Rube", "Niels", "Arthur", "Thijmen", "Victor", "Rhune", "Axl", "Kasper", "Tibe", 
"Lennert", "Pedro", "Torben", "Maano", "Simon", "Mazen", "Jelle", "Dion", "Mathis", "Batuhan", "Benjamin", "Yano",
"Brent", "Sam", "Mylo", "Leandro", "Rafael", "Hanne", "Nona", "Miel", "Sabrine", "Paulien", "Naira", "Janne",
"Eva", "Lander", "Esat", "Anouk", "Sieb", "Kasper", "Stef", "Tuur", "Rune", "Stan", "Süeda", "Lotte", "Stan", "Noor", 
"Ella", "Dilsheer", "Fien", "Thijs", "Warre", "Anouk"
];

// Verdeel over 3 rijen
const row1 = names.slice(0, 47);
const row2 = names.slice(47, 94);
const row3 = names.slice(94);

function fillRow(row, elementId, duplicateId){
    const container = document.getElementById(elementId);
    const duplicate = document.getElementById(duplicateId);

    row.forEach(name => {
        const span = document.createElement("span");
        span.textContent = name;
        container.appendChild(span);
    });

    duplicate.innerHTML = container.innerHTML;
}

fillRow(row1, "row1", "row1-duplicate");
fillRow(row2, "row2", "row2-duplicate");
fillRow(row3, "row3", "row3-duplicate");




