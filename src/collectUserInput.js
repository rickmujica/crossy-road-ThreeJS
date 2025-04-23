import { queueMove } from "./components/Player";

document.getElementById("forward")?.addEventListener("click", () => queueMove("forward"));
document.getElementById("backward")?.addEventListener("click", () => queueMove("backward"));
document.getElementById("left")?.addEventListener("click", () => queueMove("left"));
document.getElementById("right")?.addEventListener("click", () => queueMove("right"));

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