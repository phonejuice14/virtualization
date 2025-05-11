import React from 'react';

const SpinBox = ({label, min, max, value, onChange, step = 1, id = null}) => {

    return (
        <div>
            <label htmlFor="year-min" className="block text-xs text-neutral-500 mb-1">
                {label}
            </label>
            <input type="number"
                   min={min}
                   id={id}
                   max={max}
                   step={step}
                   className="w-full p-2 rounded-lg border border-neutral-300
                   focus:outline-none focus:ring-2 focus:ring-primary-500"
                   value={value}
                   onChange={onChange}
            />
        </div>
    );
};

export default SpinBox;