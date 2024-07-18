"use client";

import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';
import { Suspense, useState } from "react";

export default function Photos({ urls, length }: { urls: string[], length: number }) {
    const [selectedId, setSelectedId] = useState<string>("");
    console.log(selectedId)
    return (

        <motion.div className={`my-10 w-full grid grid-cols-2 ${length === 2 && 4 ? "lg:grid-cols-2" : "lg:grid-cols-3"} gap-y-6 gap-x-6`}>

            {urls.map((g: string, idx: number) => (
                <motion.div
                    key={idx}
                    className="relative w-full h-[16rem]"
                    onClick={() => setSelectedId(String(idx))}
                    initial={{ scale: 1 }}
                    animate={{ scale: selectedId === String(idx) ? 1.1 : 1 }} // Increase scale on selected card
                    transition={{ duration: 0.3 }}
                >
                    <Image src={g} alt={g} className="object-contain w-full h-full rounded-lg" fill={true} />

                </motion.div>
            ))}

            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {urls.map((u: string, idx: number) => (
                            String(idx) === selectedId && (
                                <motion.div
                                    className="bg-white rounded-lg p-4 shadow-md max-w-lg mx-auto"
                                    key={idx}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                >
                                    <motion.div className="relative ">
                                        <Image src={u} alt={u} className="object-contain w-full h-full rounded-lg" width={1500} height={200} loading="eager" />
                                        <motion.button
                                            className="absolute top-24 right-3 py-1 px-2 text-center text-white bg-red-500 rounded-full"
                                            onClick={() => setSelectedId("")}
                                        >
                                            Zavřít
                                        </motion.button>

                                    </motion.div>
                                </motion.div>
                            )
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

