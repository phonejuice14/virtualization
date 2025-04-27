import React from 'react';
import {Link} from 'react-router-dom'

const Header = () => {
    const computer_svg =
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className="lucide lucide-monitor ">
            <rect width="20" height="14" x="2" y="3" rx="2"></rect>
            <line x1="8" x2="16" y1="21" y2="21"></line>
            <line x1="12" x2="12" y1="17" y2="21"></line>
        </svg>


    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center"><a
                className="flex items-center gap-2 text-blue-600 font-bold text-xl transition-colors hover:text-primary-700"
                href="/public">
                {computer_svg}
                <span>GlobalOS</span></a>
                <nav>
                    <ul className="flex gap-6">
                        <li>
                            <Link to="/"
                                  className="text-neutral-600 hover:text-primary-600 transition-colors font-medium">
                                Главная
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/catalog"
                                className="text-neutral-600 hover:text-primary-600 transition-colors font-medium">
                                Каталог
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;