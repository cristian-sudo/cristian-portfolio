import {
    useScroll,
    useTransform,
    motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import {TransformedTimelineEntry} from "@/app/types";
import {Vortex} from "@/app/components/ui/vortex";

interface TimelineProps {
    data: TransformedTimelineEntry[];
}

export const Timeline = ({ data }: TimelineProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref, data]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div
            className="w-full bg-neutral-950 font-sans md:px-10"
            ref={containerRef}
        >
            <Vortex
                backgroundColor="black"
                className="flex items-center flex-col justify-center px-2 md:px-10 py-4"
            >
            <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
                {data.length > 0 && (
                    <>
                        <h2 className="text-3xl md:text-4xl mb-4 text-white font-bold max-w-4xl">
                            {data[0].title || 'Default Title'}
                        </h2>
                        <p className="text-neutral-300 font-bold text-lg md:text-3xl max-w-lg">
                            {data[0].subtitle || 'Default Subtitle'}
                        </p>
                    </>
                )}
            </div>
            </Vortex>

            <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
                {data.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex justify-start pt-10 md:pt-40 md:gap-10"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <div className="sticky md:flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full mb-3 hidden">
                            <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black flex items-center justify-center">
                                <div className="h-4 w-4 rounded-full bg-neutral-800 border border-neutral-700 p-2" />
                            </div>
                            <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 ">
                                {item.year}
                            </h3>
                        </div>

                        <div className="relative pl-12 md:text-4xl text-lg pr-4 md:pl-4 w-full">
                            {item.content}
                        </div>
                    </motion.div>
                ))}
                <div
                    style={{
                        height: `${height}px`,
                    }}
                    className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};