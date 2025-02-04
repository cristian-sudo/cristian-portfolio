
import React from 'react';
import { highlightText } from '../utils/textUtils';

type LocalNavigationProps = {
    routeName: string;
};

const LocalNavigation: React.FC<LocalNavigationProps> = ({ routeName }) => {
    return (
        <div className="py-16 my-6">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-lg font-bold mb-2">{highlightText('*-->* ' + routeName)}</h2>
            </div>
        </div>
    );
};

export default LocalNavigation;