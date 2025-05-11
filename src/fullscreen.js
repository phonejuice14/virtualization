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

function handleFullscreenChange() {
    if (isFullscreen()) {

    } else {

    }
}

document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);

console.log("Скрипт отслеживания полноэкранного режима активирован.");function isFullscreen() {
    return !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    );
}

function handleFullscreenChange() {
    if (!isFullscreen()) {
        let scaleY = parseFloat(document.getElementById("spin_y").value);
        let scaleX = parseFloat(document.getElementById("spin_x").value);
        window.emulator.screen_set_scale(scaleX, scaleY);
    }
}

document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);

console.log("Скрипт отслеживания полноэкранного режима активирован.");