import { useEffect, useState } from "react";
import PageHeader from "../../../components/common/PageHeader";
import { IResponse } from "../../../components/types/common";
import { getLeaves } from "../../../services/leaveService";
import { formatDate } from "../../../utils/date-utils";
import { ILeave } from "../../../components/types/leave";
import LeaveItem from "./LeaveItem";
import LeavesFilters from "./ListFilter";
import Loader from "../../../components/common/Loader";

export default function LeaveList() {
    const [leaves, setLeaves] = useState<IResponse>();
    const formattedTodayDate = formatDate(new Date(), "YYYY-MM-DD");
    const [today, setToday] = useState(formattedTodayDate);

    // useEffect to handle fetching leaves
    useEffect(() => {
        const formattedate = formatDate(today, "YYYY-MM-DD");
        const fetchLeaves = async () => {
            const result = await getLeaves({ today: formattedate });
            setLeaves(result);
        };

        fetchLeaves();
    }, [today]);

    return (
        <div className="rounded-xl border h-full overflow-hidden">
            <PageHeader
                labelClass="md:text-base"
                label="Leave Calendar"
                className="bg-primary py-3.5 text-white px-4 md:px-8 md:py-4 flex items-center"
            />
            <LeavesFilters setSelectedDate={setToday} />
            {!leaves?.data ? (
                <Loader />
            ) : (
                <div className="bg-gray-100">
                    {leaves?.data.map((item: ILeave) => {
                        return <LeaveItem LeaveItem={item} key={item.name} />;
                    })}
                </div>
            )}
        </div>
    );
}
