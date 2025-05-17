import {useEffect, useRef, React} from 'react';
import Header from "../components/semantic/Header";
import EmulatorMenu from "../components/emulator/EmulatorMenu";
import {useParams} from "react-router-dom";
import {systems} from "../data/systems";

const Emulator = () => {
    const emulatorRef = useRef(null);
    const emulatorContainerRef = useRef(null);
    const {systemId} = useParams();

    const setScale = (x, y) => {
        if (emulatorRef.current) {
            emulatorRef.current.screen_set_scale(x, y);
        }
    };

    const createEmulator = (config) => {
        console.log(config.loadType, config.imageUrl);
        window.emulator = new window.V86({
            wasm_path: '/v86.wasm',
            screen_container: document.getElementById("screen_container"),
            bios: {url: '/bios/seabios.bin'},
            vga_bios: {url: '/bios/vgabios.bin'},
            boot_order: '0x123',
            memory_size: 128 * 1024 * 1024,
            vga_memory_size: 8 * 1024 * 1024,
            [config.loadType]: {url: config.imageUrl},
            autostart: true,
        });

        return window.emulator
    }

    useEffect(function initializeEmulator() {

        let config = systems.find((e) => e.id === +systemId)
        emulatorRef.current = createEmulator(config)

        const handlers = [
            'emulator-ready',
            'emulator-start',
            'screen-set-mode',
            'serial0-output-char',
            'init-done'
        ];

        handlers.forEach(event => {
            emulatorRef.current.add_listener(event, () => {
                for (let time = 0; time <= 1500; time += 200) {
                    setTimeout(setScale, time, config.defaultScaleX, config.defaultScaleY);
                }
            });
        });

        return () => {
            if (emulatorRef.current) {
                emulatorRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header/>
            <div className="flex items-center justify-center">
                <div className="flex flex-row pt-3 p-9">
                    <main>
                        <div id="screen_container" ref={emulatorContainerRef}
                             style={{backgroundColor: "black", display: "block"}}>
                            <div id="screen">Эмулятор создается</div>
                            <canvas id="vga"></canvas>
                        </div>
                    </main>
                    <EmulatorMenu emulatorRef={emulatorRef} emulatorContainerRef={emulatorContainerRef}
                                  emulatorConfig={systems.find((e) => e.id === +systemId)}/>
                </div>
            </div>
        </div>
    );
};

export default Emulator;