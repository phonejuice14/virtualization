"use strict"
// Скрипт необходим для управления выходом из полноэкранного режима
// React блокирует ивент changefullscreen поэтому скрипт подключается отдельно


function isFullscreen() {
    return !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    );
}

function handleResize() {
    const container = document.getElementById("screen_container")
    const canvas = container.querySelector("canvas");
    const emulator = window.emulator;

    if (!canvas || !emulator) return;

    emulator.screen_set_scale(1, 1);
    canvas.style.width = `100%`;
    canvas.style.height = `100%`;
    canvas.style.margin = "auto";
}

function handleFullscreenChange() {
    if (!isFullscreen()) {
        let scaleY = parseFloat(document.getElementById("spin_y").value);
        let scaleX = parseFloat(document.getElementById("spin_x").value);
        window.emulator.screen_set_scale(scaleX, scaleY);
    } else {
        handleResize();
    }
}

document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);

console.log("Скрипт отслеживания полноэкранного режима активирован.");