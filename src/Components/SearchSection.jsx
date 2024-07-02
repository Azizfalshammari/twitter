import React from "react";

function SearchSection() {
    return (
        <div className="flex flex-col border-s border-gray-700 p-4 w-[30%] max-sm:hidden">
            <input
                type="search"
                className="bg-gray-600 border-x border-y border-gray-700 rounded-full p-2 m-2"
                placeholder="Search"
            />
            <div className="border rounded-3xl border-gray-500 justify-start p-4 mt-4">
                <div className="text-2xl-bold font-bold">Subscribe to Premium</div>
                <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <button className="rounded-3xl font-bold text-white btn self-end btn-primary mt-4">Subscribe</button>
            </div>
        </div>
    );
}

export default SearchSection;
