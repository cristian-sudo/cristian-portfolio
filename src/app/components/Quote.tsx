import React from 'react';

const QuoteBox: React.FC = () => {
    return (
        <div className="text-white p-6 max-w-lg mx-auto mt-10">
            <div className="text-lg font-mono border relative p-6">
                <div className="absolute top-[-9px] font-bold left-6 text-5xl bg-black w-8 h-3 flex justify-center">
                    &ldquo;
                </div>
                <span>
          With great power comes great electricity bill
        </span>
                <div className="absolute bottom-[-9px] font-bold right-6 text-5xl bg-black w-8 h-3 flex justify-center">
                    &rdquo;
                </div>
            </div>
            <div className="text-right">
        <span className="inline-block border p-4">
          &mdash; Dr. Who
        </span>
            </div>
        </div>
    );
};

export default QuoteBox;