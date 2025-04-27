import React from 'react';

const CheckBox = ({label, value, onChange, checked}) => {
    return (
        <label className="flex items-center cursor-pointer">
            <input checked={checked} value={value} onChange={onChange} type="checkbox" className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"/>
            <span className="ml-2 text-neutral-700">
                {label}
            </span>
        </label>
    );
};

export default CheckBox;