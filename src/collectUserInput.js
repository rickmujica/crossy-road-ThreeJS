import { queueMove } from "./components/Player";

document.getElementById("forward")?.addEventListener("click", (event) => {
    event.preventDefault();
    queueMove("forward");
});
document.getElementById("backward")?.addEventListener("click", (event) => {
    event.preventDefault();
    queueMove("backward");
});
document.getElementById("left")?.addEventListener("click", (event) => {
    event.preventDefault();
    queueMove("left");
});
document.getElementById("right")?.addEventListener("click", (event) => {
    event.preventDefault();
    queueMove("right");
});

window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        event.preventDefault(); // Prevent default scrolling behavior
        queueMove("forward");
    }
    if (event.key === "ArrowDown") {
        event.preventDefault(); // Prevent default scrolling behavior
        queueMove("backward");
    }
    if (event.key === "ArrowLeft") {
        event.preventDefault(); // Prevent default scrolling behavior
        queueMove("left");
    }
    if (event.key === "ArrowRight") {
        event.preventDefault(); // Prevent default scrolling behavior
        queueMove("right");
    }
});