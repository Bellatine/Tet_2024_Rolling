/* ... */

const debugEl = document.getElementById('debug'),
    icon_width = 79,
    icon_height = 79,
    num_icons = 10,
    time_per_icon = 100,
    indexes = [0, 0, 0];


const roll = (reel, offset = 0, fixedDelta) => {
    const delta = (offset + 2) * num_icons + num_icons - fixedDelta + 1;

    return new Promise((resolve, reject) => {

        const style = getComputedStyle(reel),
            backgroundPositionY = parseFloat(style["background-position-y"]),
            targetBackgroundPositionY = backgroundPositionY + delta * icon_height,
            normTargetBackgroundPositionY = targetBackgroundPositionY % (num_icons * icon_height);

        setTimeout(() => {
            reel.style.transition = `background-position-y ${(8 + 1 * delta) * time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
            reel.style.backgroundPositionY = `${backgroundPositionY + delta * icon_height}px`;
        }, offset * 150);

        setTimeout(() => {
            reel.style.transition = `none`;
            reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
            resolve(delta % num_icons);
        }, (8 + 1 * delta) * time_per_icon + offset * 150);

    });
};

function rollAll() {
    const fixedDeltas = [4, 5, 9, 3, 3, 3]; 

    const reelsList = document.querySelectorAll('.slots > .reel_bg > .reel');

    Promise
        .all([...reelsList].map((reel, i) => roll(reel, i, fixedDeltas[i])))
        .then((deltas) => {
            deltas.forEach((delta, i) => indexes[i] = (indexes[i] + delta) % num_icons);

            document.querySelector(".slots").classList.add(winCls);
            setTimeout(() => document.querySelector(".slots").classList.remove("win2"), 2000)

        });
};

function resetReels() {
    const reelsList = document.querySelectorAll('.slots > .reel_bg > .reel');

    reelsList.forEach((reel) => {
        reel.style.transition = 'none';
        reel.style.backgroundPositionY = '0';
    });
}

setTimeout(rollAll, 1000);
