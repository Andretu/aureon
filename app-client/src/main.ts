import {initHome} from "./pages/Home/Home.ts";

function router() {
    const hash = globalThis.location.hash.replace('#','');  // invece di window.location.hash

    if(hash === 'home' || hash === '') {
        initHome();
    }
    // altre pagine
    // else if(hash === 'about') { initAbout(); }
}

// ascolta cambi di hash
globalThis.addEventListener('hashchange', router);

// avvio iniziale
router();
