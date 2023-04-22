import React from "react";
import { useRouter } from "next/router";
import truncateWithDot from "@/utils/truncateWithDot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import capitalizeFirst from "@/utils/capitalizeFirst";
import stringToGradient from "@/utils/stringToGradient";

const tripPace = [
    { type: "Chill", color: "#80cda7" },
    { type: "Balanced", color: "#a9d1f3" },
    { type: "Travel", color: "#FFA07A" },
];

export default function SavedPlanCard({
    planParams,
}: {
    planParams: {
        name: string;
        day_plan: Array<Array<unknown>>;
        trip_params: IFormData;
    };
}) {
    const { name, day_plan, trip_params } = planParams;
    const router = useRouter();
    const [tagList, setTagList] = React.useState<Array<string>>([]);
    React.useEffect(() => {
        console.log(trip_params);
        setTagList(trip_params.tags.split(","));
    }, [trip_params.tags]);
    return (
        <>
            <button
                onClick={() => {
                    const stringified = JSON.stringify(planParams);
                    router.push(`/map/${stringified}`);
                }}
            >
                <div className="group w-72 max-w-sm overflow-hidden shadow-md hover:shadow-xl bg-white duration-500 rounded-xl">
                    <div
                        style={{
                            background: stringToGradient(
                                JSON.stringify(trip_params)
                            ),
                        }}
                        className="flex w-full h-36 aspect-auto group-hover:-translate-y-1 group-hover:scale-105 transition duration-700"
                    >
                        <FontAwesomeIcon
                            icon={faMapLocationDot}
                            className="w-24 h-24 aspect-auto m-auto invert drop-shadow-lg fill-white"
                        />
                    </div>
                    <div className="px-6 py-2 pb-0">
                        <div className="flex gap-2 mb-1 justify-between">
                            <div className="text-left font-bold whitespace-nowrap text-md mb-1 text-slate-700">
                                {truncateWithDot(name, 12)}
                            </div>
                            <div className="text-left text-neutral-600 text-xs my-auto">
                                {new Date(
                                    trip_params.start_date
                                ).toLocaleDateString()}{" "}
                                -{" "}
                                {new Date(
                                    trip_params.end_date
                                ).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="text-left text-neutral-600 text-sm">
                            Price Level: {trip_params.budget} / 4
                        </div>
                        <div className="text-left text-neutral-600 text-sm">
                            Travel Method:{" "}
                            {capitalizeFirst(trip_params.travel_method)}
                        </div>
                        <div
                            style={{
                                //color: tripPace[trip_params.trip_pace].color,
                                borderColor:
                                    tripPace[trip_params.trip_pace].color,
                            }}
                            className="flex text-neutral-700 rounded-full px-3 text-sm border-[1px] mx-auto my-2"
                        >
                            <div className="m-auto">
                                {tripPace[trip_params.trip_pace].type}
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div
                            className="flex px-6 pt-2 overflow-x-scroll"
                            key="tag-row"
                        >
                            {tagList.map((tag: string, index: number) => (
                                <span
                                    className="bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold 
                                    text-gray-700 mr-2 mb-2 hover:opacity-80 whitespace-nowrap"
                                    key={tag}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </button>
        </>
    );
}
