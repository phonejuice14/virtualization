import React from 'react';
import OsCard from "./components/os/OsCard";
import Aside from "./components/semantic/Filter";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Emulator from "./pages/Emulator";

function App() {

    // useEffect(function initializeEmulator(){
    //     window.emulator = new window.V86({
    //         wasm_path: '/v86.wasm',
    //         screen_container: document.getElementById("screen_container"),
    //         bios: { url: 'https://cdn.jsdelivr.net/gh/copy/v86@latest/bios/seabios.bin' },
    //         vga_bios: { url: 'https://cdn.jsdelivr.net/gh/copy/v86@latest/bios/vgabios.bin' },
    //         boot_order: '0x123',
    //         memory_size: 512 * 1024 * 1024,
    //         vga_memory_size: 64 * 1024 * 1024,
    //         fda: { url: '/images/windows101.img' },
    //         autostart:  true,
    //     });
    // }, []);
    //
    // return (
    //     <div id="screen_container" style={{ height: "100%" }}>
    //         <div id="screen" style={{overflow: 'hidden'}}>Initializing Emulator…</div>
    //         <canvas style={{display: 'none'}}></canvas>
    //     </div>
    // );
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/os/:id/" element={<Emulator />} />
            </Routes>
        </Router>
    )
}

export default App;