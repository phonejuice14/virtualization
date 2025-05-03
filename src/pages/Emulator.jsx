import {useEffect, useRef, React} from 'react';

const Emulator = () => {
    const emulatorRef = useRef(null);

    useEffect(function initializeEmulator() {
        window.emulator = new window.V86({
            wasm_path: '/v86.wasm',
            screen_container: document.getElementById("screen_container"),
            bios: {url: 'https://cdn.jsdelivr.net/gh/copy/v86@latest/bios/seabios.bin'},
            vga_bios: {url: 'https://cdn.jsdelivr.net/gh/copy/v86@latest/bios/vgabios.bin'},
            boot_order: '0x123',
            memory_size: 512 * 1024 * 1024,
            vga_memory_size: 64 * 1024 * 1024,
            fda: {url: '/images/windows101.img'},
            autostart: true,
        });

        emulatorRef.current = window.emulator;

        return () => {
            if (emulatorRef.current) {
                emulatorRef.current.destroy();
                emulatorRef.current = null;
                delete window.emulator;
            }
        };
    }, []);

    const handleStop = () => {
        if (emulatorRef.current) {
            emulatorRef.current.stop();
        }
    };

    return (
        <>
            <div id="screen_container">
                <div id="screen">Initializing Emulator…</div>
                <canvas></canvas>
            </div>
            <button className="w-16 bg-blue-500" onClick={console.log("clicked")}>Стоп</button>
        </>
    );
};

export default Emulator;