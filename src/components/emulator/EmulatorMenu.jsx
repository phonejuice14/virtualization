import React, {useEffect, useState} from 'react';
import { Expand, RefreshCcw } from 'lucide-react';
import SpinBox from "../UI/input/SpinBox";
import CheckBox from "../UI/input/CheckBox";
import Select from "../UI/input/Select";
import IconButton from "../UI/button/IconButton";


const EmulatorMenu = ({ emulatorRef, emulatorContainerRef, emulatorConfig }) => {
    const defaultScaleX = emulatorConfig?.defaultScaleX || 0.8;
    const defaultScaleY = emulatorConfig?.defaultScaleY || 0.8;

    const [hideMouseOnHover, setHideMouseOnHover] = useState(false);
    const [scaleX, setScaleX] = useState(defaultScaleX);
    const [scaleY, setScaleY] = useState(defaultScaleY);
    const [mouseIsEnabled, setMouseIsEnabled] = useState(true);
    const [fullScreenEnabled, setFullScreenEnabled] = useState(false);

    function handleResize() {
        const container = emulatorContainerRef.current;
        const canvas = container.querySelector("canvas");
        const emulator = emulatorRef.current;

        if (!canvas || !emulator) return;

        const containerRatio = container.clientWidth / container.clientHeight;
        const canvasRatio = canvas.width / canvas.height;

        let scale;
        if (containerRatio > canvasRatio) {
            scale = container.clientHeight / canvas.height;
        } else {
            scale = container.clientWidth / canvas.width;
        }

        if (fullScreenEnabled) {
            setFullScreenEnabled(false);
            emulator.screen_set_scale(scaleX, scaleY);
        } else {
            setFullScreenEnabled(true);
        }
        emulator.screen_set_scale(1, 1);
        canvas.style.width = `${canvas.width * scale}px`;
        canvas.style.height = `${canvas.height * scale}px`;
        canvas.style.margin = "auto";
    }


    useEffect(() => {
        const container = emulatorContainerRef.current;
        if (!container || !emulatorRef.current) return;

        container.addEventListener('click', onEmulatorClick);

        window.addEventListener("resize", handleResize);

        emulatorRef.current.add_listener("screen-set-size", handleResize);

        if (hideMouseOnHover) {
            container.classList.add('hide-cursor');
        } else {
            container.classList.remove('hide-cursor');
        }

        emulatorRef.current.screen_set_scale(scaleX, scaleY);
        return () => {
            container.removeEventListener('click', onEmulatorClick);
        };
    }, [mouseIsEnabled, hideMouseOnHover, scaleX, scaleY]);


    const onEmulatorClick = () => {
        let emulator = emulatorRef.current;

        if (emulator.is_running() && emulator.speaker_adapter?.audio_context.state === "suspended") {
            emulator.speaker_adapter.audio_context.resume();
        }

        if (mouseIsEnabled && !(hideMouseOnHover)) {
            emulator.lock_mouse();
        }
    }

    const setEmulatorScale = (x, y) => {
        emulatorRef.current?.screen_set_scale?.(x, y);
    }

    return (
        <aside className="bg-white p-6 rounded-lg shadow-md md:shadow-none md:w-72 lg:w-80 hidden md:block">
            <div className="mb-6">
                <h3 className="text-sm font-medium text-neutral-700 mb-2">Масштаб отрисовки</h3>
                <div className="grid grid-cols-2 gap-3">
                    <SpinBox
                        label="По вертикали"
                        id={"spin_y"}
                        min={0.4}
                        max={3}
                        value={scaleY}
                        step={0.25}
                        onChange={(e) => {
                            const newScaleY = parseFloat(e.target.value);
                            setScaleY(newScaleY);
                            setEmulatorScale(scaleX, newScaleY);
                        }}
                    />
                    <SpinBox
                        label="По горизонтали"
                        id={"spin_x"}
                        min={0.4}
                        max={3}
                        value={scaleX}
                        step={0.25}
                        onChange={(e) => {
                            const newScaleX = parseFloat(e.target.value);
                            setScaleX(newScaleX);
                            setEmulatorScale(newScaleX, scaleY);
                        }}
                    />
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-sm font-medium text-neutral-700 mb-2">Категории</h3>
                <div className="space-y-2">
                    {["windows", "linux", "dos"].map((category) => (
                        <CheckBox
                            label={category}
                            key={category}
                            value={category}
                        />
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <Select
                    label="Тип управления курсора"
                    options={[
                        { value: "perClick", label: "Скрывать при клике" },
                        { value: "perHover", label: "Скрывать при наведении" },
                    ]}
                    onChange={(e) => {
                        setHideMouseOnHover(e.target.value === "perHover");
                        console.log(e.target.value === "perHover")
                        console.log(e.target.value);
                    }}
                />
            </div>
            <IconButton
                onClick={() => emulatorRef.current?.screen_go_fullscreen?.()}
                icon={<Expand color="white" />}
                text="На полный экран"
            />
            <IconButton
                onClick={() => emulatorRef.current?.restart?.()}
                icon={<RefreshCcw color="white" />}
                text="Перезапуск"
                className="bg-red-400 hover:bg-red-500 mt-2"
            />
        </aside>
    );
};

export default EmulatorMenu;