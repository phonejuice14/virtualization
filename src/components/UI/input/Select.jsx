import React, {useState} from 'react';

const Select = ({options, label, onChange, value, selected}) => {
    return (
        <div>
            <label htmlFor="gui-filter"
                   className="block text-sm font-medium text-neutral-700 mb-2">{label}</label>
            <select id="gui-filter" onChange={onChange} value={value}
                    className="w-full p-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500">
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;