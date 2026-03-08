import type { Props } from "./types";


export default function Card({ title, value }: Props) {

    return (

        <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-gray-500 text-sm">
                {title}
            </p>
            <p className="text-3xl font-semibold mt-2">
                {value}
            </p>
        </div>
    )
}