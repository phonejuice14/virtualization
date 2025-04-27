import React from 'react';

const Search = ({placeholder, label, value, onChange}) => {

    const search_svg =
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className="lucide lucide-search absolute left-3 top-3.5 text-neutral-400">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
        </svg>

    return (
        <div>
            <label htmlFor="search"
                   className="block text-sm font-medium text-neutral-700 mb-2">{label}</label>
            <div className="relative">
                <input type="text"
                       id="search"
                       placeholder={placeholder}
                       onChange={onChange}
                       className="w-full p-3 pl-10 rounded-lg border
                       border-neutral-300 focus:outline-none
                        focus:ring-2 focus:ring-primary-500 transition-shadow"
                       value={value}
                />
                {search_svg}
            </div>
        </div>
    );
};

export default Search;