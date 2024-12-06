
import * as FetchUtils from '../utils/fetch';
import { LeaveParams, LeaveStatus } from '../components/types/leave';
import { QueryParameters } from '../components/types/common';
import qs from 'query-string';
const backendUrl = "http://localhost:6001"



export const getLeaves = async (params: LeaveParams): Promise<any> => {
    const response = await FetchUtils.get(`${backendUrl}/api/leaves?${buildQueryString(params)}`, { isWithToken: true });
    console.log("Fetching attendance", response)
    return response;
};


export async function updateLeaveStatus({
    id,
    status
}: {
    id: string;
    status: LeaveStatus
}) {
    const body = {
        status
    };
    const response = await FetchUtils.patch(
        `${backendUrl}/api/leaves/${id}/status`,
        { ...body },
        { isWithToken: true }
    );
    return response;
}
export async function addNewLeave({
    name, date, reason,
    position
}: {
    name: string
    date: string
    position: string
    reason: string

}) {
    let body = {
        name,
        date,
        position,
        reason
    }

    const response = await FetchUtils.post(`${backendUrl}/api/Leaves`, { ...body }, {
        isWithToken: true
    })
    return response

}

export async function updateAttendanceTask({
    id,
    task
}: {
    id: string;
    task: string
}) {
    const body = {
        task
    };
    const response = await FetchUtils.patch(
        `${backendUrl}/api/attendances/${id}/task`,
        { ...body },
        { isWithToken: true }
    );
    return response;
}
const buildQueryString = (params: LeaveParams) => {
    const queryParams: QueryParameters = {};
    queryParams["searchText"] = params.searchText;
    queryParams["pagination[pageSize]"] = params?.rowsPerPage?.toString();
    queryParams["pagination[page]"] = params?.page?.toString();
    queryParams["filters[position][$eq]"] = params.position === "ALL" ? "" : params.position?.toString()
    queryParams["filters[status][$eq]"] =
        params.status === "ALL" ? "" : params.status?.toString()
    //   let deliveryDateEnd = params.deliveryDateEnd;
    //   if (!deliveryDateEnd) {
    //     deliveryDateEnd = params.deliveryDateStart;
    //   }
    //   if (params.deliveryDateStart) {
    //     queryParams["filters[updated_on][$between]"] =
    //       "dt" + params.deliveryDateStart + "," + deliveryDateEnd;
    //   }

    return qs.stringify(queryParams, {
        arrayFormat: "comma",
        skipNull: true,
        skipEmptyString: true,
        encode: false,
    });
};
