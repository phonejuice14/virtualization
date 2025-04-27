import {React, useState} from 'react';
import Header from "../components/semantic/Header";
import Footer from "../components/semantic/Footer";
import OsList from "../components/os/OsList";
import Filter from "../components/semantic/Filter";
import {systems as initialSystems} from "../data/systems";

const Catalog = () => {
    let systems;
    let setSystems;
    [systems, setSystems] = useState(initialSystems);

    function changeFilters(filters) {
        function filterCallback(element) {
            if (filters.searchQuery) {
                return !!element.name.toLowerCase().includes(filters.searchQuery.toLowerCase());

            }

            if (filters.yearFrom > element.year) {
                return false
            }

            if (filters.yearTo < element.year) {
                return false
            }

            if (filters.interfaceType !== element.interfaceType && filters.interfaceType !== "ALL") {
                return false
            }

            if (!filters.selectedCategories.includes(element.category)) {
                return false
            }

            return true
        }

        setSystems(initialSystems.filter(filterCallback));
    }

    return (
        <div className="min-h-screen bg-neutral-100 flex flex-col">
            <Header/>
            <main className="flex-grow container mx-auto px-4 py-8"><h1
                className="text-3xl font-bold text-neutral-800 mb-8">Каталог Операционных Систем</h1>
                <div className="flex flex-col md:flex-row gap-8">
                    <Filter onChange={changeFilters}/>
                    <OsList systems={systems}/>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default Catalog;