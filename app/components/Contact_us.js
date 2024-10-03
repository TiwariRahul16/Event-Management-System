"use client";

import { useFormState } from "react-dom";
import { submitForm } from '../components/actions';

export default function Contact_us() {
    const [result, formAction] = useFormState(submitForm, null);

    return (
        <div className="sm:w-[50%] w-full px-2 sm:px-0 mx-auto bg-slate-100 p-8 rounded-lg shadow-md">
            <form action={formAction} className="space-y-6">
                <input type="hidden" name="access_key" value="9af10ab4-d197-44d6-b4aa-1c91ff24b964" />

                <div>
                    <label htmlFor="name" className="block text-sm sm:text-xl font-medium text-gray-700">Name</label>
                    <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm sm:text-xl font-medium text-gray-700">Email</label>
                    <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm sm:text-xl font-medium text-gray-700">Message</label>
                    <textarea name="message" id="message" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                </div>

                <div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-xl font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit Form</button>
                </div>
            </form>
            <span className="block mt-4 text-sm sm:text-xl text-gray-600">{result?.message}</span>
        </div>
    );
}
