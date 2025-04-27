import React from 'react';
import OsCard from "./OsCard";

const OsList = ({systems}) => {
    return (
        <div className="flex-1">
            <div className="mb-4 flex justify-between items-center"><p
                className="text-neutral-600">Найдено <span
                className="font-medium">{systems.length}</span> операционных систем</p></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1" style={{opacity: "1"}}>
                {systems.map((system, index) => (<OsCard os={system} key={index} />))}
            </div>
        </div>
    );
};

export default OsList;