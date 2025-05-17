import {React, useState, useEffect} from 'react';
import SpinBox from "../UI/input/SpinBox";
import CheckBox from "../UI/input/CheckBox";
import Search from "../UI/input/Search";
import Select from "../UI/input/Select";
import {categories} from "../../data/systems";

const Filter = ({onChange}) => {

    let initialValues = {
        searchQuery: "",
        yearFrom: 1965,
        yearTo: 2025,
        selectedCategories: [...categories],
        interfaceType: "ALL",

    }

    let filter, setFilter;

    [filter, setFilter] = useState(
        initialValues
    )

    useEffect(() => {
        onChange(filter);
    }, [filter]);


    function applyFilters(filter) {
        setFilter(filter);

    }

    function onCheckboxChange(e) {
        const targetCategory = e.target.value;
        const targetChecked = e.target.checked;

        setFilter(prevFilter => {
            const { selectedCategories } = prevFilter;
            let newSelectedCategories;

            if (targetChecked) {
                newSelectedCategories = selectedCategories.includes(targetCategory)
                    ? selectedCategories
                    : [...selectedCategories, targetCategory];
            } else {
                newSelectedCategories = selectedCategories.filter(
                    cat => cat !== targetCategory
                );
            }

            const newFilter = {
                ...prevFilter,
                selectedCategories: newSelectedCategories,
            };

            onChange(newFilter);

            return newFilter;
        });
    }

    return (
        <aside
            className="bg-white p-6 rounded-lg shadow-md md:shadow-none md:w-72 lg:w-80 hidden md:block"
            style={{ opacity: 1, transform: "none" }}
        >
            <div className="mb-6">
                <Search
                    value={filter.searchQuery}
                    label="Поиск"
                    placeholder="Введите запрос..."
                    onChange={(e) => applyFilters({...filter, searchQuery: e.target.value})}
                />
            </div>

            <div className="mb-6">
                <h3 className="text-sm font-medium text-neutral-700 mb-2">Годы выхода</h3>
                <div className="grid grid-cols-2 gap-3">
                    <SpinBox
                        label="От"
                        value={filter.yearFrom}
                        onChange={(e) => applyFilters({...filter, yearFrom: Number(e.target.value)})}
                        min={1900}
                        max={2030}
                    />
                    <SpinBox
                        label="До"
                        value={filter.yearTo}
                        onChange={(e) => applyFilters({...filter, yearTo: Number(e.target.value)})}
                        min={1900}
                        max={2030}
                    />
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-sm font-medium text-neutral-700 mb-2">Категории</h3>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <CheckBox
                            checked={filter.selectedCategories.includes(category)}
                            label={category}
                            key={category}
                            value={category}
                            onChange={onCheckboxChange}
                        />
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <Select
                    label="Тип интерфейса"
                    value={filter.interfaceType}
                    options={[
                        {value: "GUI", label: "Графический"},
                        {value: "CLI", label: "Командная строка"},
                        {value: "ALL", label: "Любой"}
                    ]}
                    onChange={(e) => applyFilters({...filter, interfaceType: e.target.value})}
                />
            </div>

            <button
                className="w-full bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition-colors font-medium"
                onClick={(e) => {applyFilters(initialValues)}}
            >
                Сбросить фильтры
            </button>
        </aside>
    );
};

export default Filter;