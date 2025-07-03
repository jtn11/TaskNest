import Link from "next/link";

export default function Page() {


    return (
        <div className="max-w-full flex ">
         <div className="max-w-full py-20 mt-40 px-4 flex flex-col justify-center items-start">
            <div className="mb-8">
                <h1 className="text-6xl font-bold text-primary mb-4">
                    Boost your productivity.
                </h1>
                <h2 className="text-4xl font-bold text-primary">
                    Start managing tasks smarter.
                </h2>
            </div>

            <div className="flex justify-center gap-4">
                <Link href="/register">
                <button 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Register
                </button>
                </Link>

                <Link href="/login">
                <button className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition">
                    Login
                </button>
                </Link>
            </div>
        </div>
        </div>
    );
}
