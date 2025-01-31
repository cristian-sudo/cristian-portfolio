const HeroBanner: React.FC = () => {
    return (
        <div className="text-white py-16 my-6">
            <div className="container mx-auto flex flex-col md:flex-row items-center px-6 md:px-12">
                {/* Left Side: Text Content */}
                <div className="md:w-1/2 text-center md:text-left flex gap-3 flex-col">
                    <h1 className="text-4xl mb-4">
                        Elevate Your Online Presence
                    </h1>
                    <p className="text-lg text-gray-300 mb-6">
                        Build stunning websites with modern tools and bring your vision to life.
                    </p>
                    <a
                        href="#"
                        className="text-white font-semibold py-3 px-6 transition w-fit border border-accent"
                    >
                        Get Started
                    </a>
                </div>

                {/* Right Side: Image */}
                <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center flex-col">
                    <img
                        src="/hero-image.png"
                        alt="Hero Image"
                        className="w-full max-w-sm rounded-lg shadow-lg"
                    />
                    <span className='my-3 border w-fit p-1 flex flex-row items-center gap-3' >
                        <span className="w-5 h-5 bg-purple-600 inline-block"></span>
                        <p>Currently working on Portfolio</p>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
