import React from 'react';
import {motion} from 'framer-motion';
import {Link} from "react-router-dom";

const OsCard = ({os}) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.3}}
            whileHover={{
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
            <Link to={`/os/${os.id}`}>
                <div className="h-48 overflow-hidden">
                    <img
                        src={os.pictureUrl}
                        alt="Windows 11"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
                <div className="p-5">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold text-neutral-800">{os.name}</h3>
                        <span className="bg-blue-200/45 text-blue-800 text-sm font-medium py-1 px-2 rounded">
                        {os.year}
                    </span>
                    </div>
                    <div className={`flex items-center gap-2 mb-3`}>
          <span className="bg-neutral-100 text-neutral-700 text-xs font-medium py-1 px-2 rounded">
            {os.category}
          </span>

                        <span className={`text-xs font-medium py-1 px-2 rounded  
          ${os.interfaceType === 'GUI'
                            ? "text-green-800 bg-green-100" :
                            "text-orange-800 bg-orange-100"}`}>

              {os.interfaceType}
          </span>
                    </div>
                    <p className="text-neutral-600 text-sm line-clamp-3">
                        {os.description}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};

export default OsCard;