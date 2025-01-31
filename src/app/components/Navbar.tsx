import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className="mx-auto py-9">
            <div className="container mx-auto flex justify-between">
                <div className="text-lg font-bold">
                    <Link href="/">$cristian_plop</Link>
                </div>
                <div className="space-x-6">
                    <Link href="/" className="text-white"># home</Link>
                    <Link href="/projects" className="text-white"># works</Link>
                    <Link href="/contact" className="text-white"># about-me</Link>
                    <Link href="/contact" className="text-white"># contacts</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;