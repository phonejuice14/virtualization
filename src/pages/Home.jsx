import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight, Monitor, Cpu, Code, Layers} from 'lucide-react';
import Header from '../components/semantic/Header';
import { motion } from 'framer-motion';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <Header/>

            <main className="flex-grow flex flex-col">
                <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 md:py-32">
                    <div className="container mx-auto px-4">
                        <motion.div
                            className="max-w-3xl mx-auto text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                Исследуй Эволюцию Операционных Систем
                            </h1>
                            <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
                                Откройте для себя историю, возможности и инновации операционных систем, начиная с
                                начала.
                            </p>
                            <Link
                                to="/catalog"
                                className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
                            >
                                <span>Исследовать каталог</span>
                                <ArrowRight size={20}/>
                            </Link>
                        </motion.div>
                    </div>
                </section>

                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
                            Ваш полный ресурс для эмуляции
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
                                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-4">
                                    <Monitor size={28}/>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-neutral-800">
                                    Обширный каталог
                                </h3>
                                <p className="text-neutral-600">
                                    Исследуйте нашу обширную коллекцию операционных систем из разных эпох и категорий.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
                                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-4">
                                    <Cpu size={28}/>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-neutral-800">
                                    Информация
                                </h3>
                                <p className="text-neutral-600">
                                    Получайте детальную информацию о каждой ОС, включая, особенности и технические
                                    характеристики.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
                                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-4">
                                    <Code size={28}/>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-neutral-800">
                                    Фильтрация
                                </h3>
                                <p className="text-neutral-600">
                                    Фильтруйте операционные системы по году, категории, типу интерфейса и другим
                                    параметрам.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
                                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-4">
                                    <Layers size={28}/>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-neutral-800">
                                    Исторический контекст
                                </h3>
                                <p className="text-neutral-600">
                                    Изучите развитие и эволюцию операционных систем в разные технологические эпохи.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-neutral-100 py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neutral-800">
                                Готовы к погружению?
                            </h2>
                            <p className="text-neutral-600 mb-8">
                                В нашем обширном каталоге представлены операционные системы всех эпох: от ранних
                                интерфейсов командной строки до графических систем недалекого прошлого.
                            </p>
                            <Link
                                to="/catalog"
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                <span>Перейти в каталог</span>
                                <ArrowRight size={20}/>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;