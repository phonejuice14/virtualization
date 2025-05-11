import {useEffect, useRef, React} from 'react';
import Header from "../components/semantic/Header";
import EmulatorMenu from "../components/emulator/EmulatorMenu";

const Emulator = () => {
    const emulatorRef = useRef(null);
    const emulatorContainerRef = useRef(null);


    useEffect(function initializeEmulator() {
        window.emulator = new window.V86({
            wasm_path: '/v86.wasm',
            screen_container: document.getElementById("screen_container"),
            bios: {url: '/bios/seabios.bin'},
            vga_bios: {url: '/bios/vgabios.bin'},
            boot_order: '0x123',
            memory_size: 512 * 1024 * 1024,
            vga_memory_size: 64 * 1024 * 1024,
            fda: {url: '/images/windows101.img'},
            autostart: true,
        });

        emulatorRef.current = window.emulator;

        emulatorRef.current.add_listener('emulator-ready', () => {
            emulatorRef.current.screen_set_scale(0.8, 0.8);
        });

        return () => {

        };
    }, []);


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header/>
            <div className="flex items-center justify-center">
                <div className="flex flex-row pt-3 p-9">
                    <main>
                        <div id="screen_container" ref={emulatorContainerRef}>
                            <div id="screen" style={{display: "none"}}>Эмулятор создается</div>
                            <canvas id="vga"></canvas>
                        </div>
                    </main>
                    <EmulatorMenu emulatorRef={emulatorRef} emulatorContainerRef={emulatorContainerRef}
                                  emulatorConfig={Object()}/>
                </div>
            </div>
        </div>
    );
};

export default Emulator;
