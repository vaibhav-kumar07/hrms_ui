
import { AttendanceParams, AttendanceStatus } from '../components/types/attendance';
import * as FetchUtils from '../utils/fetch';
import qs from 'query-string';
import { QueryParameters } from '../components/types/common';
const backendUrl = process.env.REACT_APP_BACKEND_URL;



export const getAllAttenanceRecords = async (params: AttendanceParams): Promise<any> => {
    const response = await FetchUtils.get(`${backendUrl}/api/attendances?${buildQueryString(params)}`, { isWithToken: true });
    console.log("Fetching attendance", response)
    return response;
};


export async function updateAttendanceStatus({
    id,
    status
}: {
    id: string;
    status: AttendanceStatus
}) {
    const body = {
        status
    };
    const response = await FetchUtils.patch(
        `${backendUrl}/api/attendances/${id}/status`,
        { ...body },
        { isWithToken: true }
    );
    return response;
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


const buildQueryString = (params: AttendanceParams) => {
    const queryParams: QueryParameters = {};
    queryParams["searchText"] = params.searchText;
    // queryParams["sort"] = `${params.sortColumn}:${params.sortOrder} `;
    queryParams["pagination[pageSize]"] = params?.rowsPerPage?.toString();
    queryParams["pagination[page]"] = params?.page?.toString();
    // queryParams["filters[role][$eq]"] = params.role?.toString();
    //   queryParams["filters[batch_id][$eq]"] = params.batchId?.toString();
    // queryParams["filters[position][$eq]"] = params.position === "ALL" ? "" : params.position?.toString()
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
