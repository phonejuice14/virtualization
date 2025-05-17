import React, {useCallback, useEffect, useState, useRef} from 'react';
import {Expand, RefreshCcw, ArrowDownFromLine, ArrowUpFromLine} from 'lucide-react';
import SpinBox from "../UI/input/SpinBox";
import CheckBox from "../UI/input/CheckBox";
import Select from "../UI/input/Select";
import IconButton from "../UI/button/IconButton";


export function useDownload() {
    const download = useCallback((fileOrBlob, fileName) => {
        const url = window.URL.createObjectURL(fileOrBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }, []);

    return download;
}

const EmulatorMenu = ({emulatorRef, emulatorContainerRef, emulatorConfig}) => {
        const defaultScaleX = emulatorConfig.defaultScaleX;
        const defaultScaleY = emulatorConfig.defaultScaleY;

        const [hideMouseOnHover, setHideMouseOnHover] = useState(false);
        const [scaleX, setScaleX] = useState(defaultScaleX);
        const [scaleY, setScaleY] = useState(defaultScaleY);
        const [mouseIsEnabled, setMouseIsEnabled] = useState(true);
        const [soundIsEnabled, setSoundIsEnabled] = useState(true);
        const download = useDownload();

        const hiddenStateInputRef = useRef(null);


        useEffect(() => {
            const container = emulatorContainerRef.current;
            if (!container || !emulatorRef.current) return;

            container.addEventListener('click', onEmulatorClick);

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

        const dumpFile = (ab, name) => {
            if (!Array.isArray(ab)) {
                ab = [ab];
            }

            let blob = new Blob(ab);
            download(blob, name);


        }

        const setEmulatorScale = (x, y) => {
            emulatorRef.current?.screen_set_scale?.(x, y);
        }

        const dumpState = async (e) => {
            const result = await emulatorRef.current.save_state();
            dumpFile(result, "state.bin");
            e.target.blur();
        }

        const onClickLoadState = async (e) => {
            let input = hiddenStateInputRef.current;
            input.click();
            e.target.blur();
        }

        const loadState = async (e) => {
            const file = e.target.files[0];
            if (!file || !emulatorRef.current) return;

            const wasRunning = emulatorRef.current.is_running();

            try {
                if (wasRunning) {
                    await emulatorRef.current.stop();
                }

                const stateData = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target.result);
                    reader.onerror = reject;
                    reader.readAsArrayBuffer(file);
                });

                await emulatorRef.current.restore_state(stateData);


                if (wasRunning) {
                    emulatorRef.current.run();
                }

                alert("Состояние успешно загружено")
            } catch (err) {
                alert(`Ошибка сохранения состояния:\n${err}\n\nКонфигурация должна быть такой же`);
            } finally {
                e.target.value = "";
            }
        };


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
                                e.target.blur()
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
                                e.target.blur()
                            }}
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-sm font-medium text-neutral-700 mb-2">Устройства</h3>
                    <div className="space-y-2">
                        <CheckBox
                            label="Мышь"
                            value="mouse"
                            checked={mouseIsEnabled}
                            onChange={(e) => {
                                setMouseIsEnabled(e.target.checked);
                                emulatorRef.current.mouse_set_status(!mouseIsEnabled);
                                e.target.blur();
                            }}
                        />
                        <CheckBox
                            label="Звук"
                            value="keyboard"
                            checked={soundIsEnabled}
                            onChange={(e) => {
                                setSoundIsEnabled(e.target.checked);
                                emulatorRef.current.speaker_adapter.mixer.set_volume(Number(soundIsEnabled), undefined);
                                e.target.blur()
                            }}
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <Select
                        label="Тип управления курсора"
                        options={[
                            {value: "perClick", label: "Скрывать при клике"},
                            {value: "perHover", label: "Скрывать при наведении"},
                        ]}
                        onChange={(e) => {
                            setHideMouseOnHover(e.target.value === "perHover");
                            e.target.blur()
                        }}
                    />
                </div>
                <h3 className="text-sm font-medium text-neutral-700 mb-2">Состояние</h3>
                <div className="flex flex-column pb-2 justify-center">


                    <IconButton
                        onClick={onClickLoadState}
                        icon={<ArrowUpFromLine width="20px" color="white"/>}
                        text="Загрузить"
                        left="0.75"
                        className="bg-emerald-500 hover:bg-emerald-700 text-sm mr-2 h-10"
                    />
                    <IconButton
                        onClick={dumpState}
                        icon={<ArrowDownFromLine width="20px" color="white"/>}
                        text="Скачать"
                        left="0.75"
                        className="bg-emerald-500 hover:bg-emerald-700 text-sm h-10"
                    />
                </div>
                <IconButton
                    onClick={() => {
                        emulatorRef.current?.screen_go_fullscreen?.();
                        e.target.blur()
                    }}
                    icon={<Expand color="white"/>}
                    text="На полный экран"
                />
                <IconButton
                    onClick={() => {
                        emulatorRef.current?.restart?.();
                        e.target.blur()
                    }}
                    icon={<RefreshCcw color="white"/>}
                    text="Перезапуск"
                    className="bg-red-400 hover:bg-red-500 mt-2"
                />
                <input type="file" ref={hiddenStateInputRef}  onChange={loadState} className="hidden"/>
            </aside>
        );
    }
;

export default EmulatorMenu;

