
import { QueryParameters } from '../components/types/common';
import { CandidateParams, IProfileRole } from '..//components/types/profile';
import * as FetchUtils from '../utils/fetch';
import qs from 'query-string';
import { AttendanceStatus } from '../components/types/attendance';
import { formatDate } from '../utils/date-utils';
const backendUrl = process.env.REACT_APP_BACKEND_URL;


export const getEmployees = async (params: CandidateParams): Promise<any> => {
    const formattedate = formatDate(new Date(), "YYYY-MM-DD")
    console.log("Formatting date", formattedate, params)
    const response = await FetchUtils.get(`${backendUrl}/api/profiles/employees?today=${formattedate}&${buildQueryString(params)}`, { isWithToken: true });
    return response;
};


export async function updateEmployee({
    id,
    name,
    email,
    phone,
    department,
    position,
}: {
    id: string;
    name: string;
    email: string;
    phone: string;
    department: string;
    position: string;
}) {
    const body = {
        name,
        email,
        department,
        role: IProfileRole.employee,
        phone,
        position,
    };

    console.log("body and id", body, id)
    const response = await FetchUtils.put(
        `${backendUrl}/api/profiles/${id}`,
        body,
        { isWithToken: true }
    );


    return response;
}
export async function updateEmployeeTask({
    id,
    task
}: {
    id: string;
    task: string
}) {
    const formatteddate = formatDate(new Date(), "YYYY-MM-DD")
    const body = {
        task, today: formatteddate
    };
    console.log("body", body);  //
    const response = await FetchUtils.patch(
        `${backendUrl}/api/profiles/${id}/task`,
        { ...body },
        { isWithToken: true }
    );
    return response;
}
export async function updateEmployeeAttendanceStatus({
    id,
    status
}: {
    id: string;
    status: AttendanceStatus
}) {
    const formatteddate = formatDate(new Date(), "YYYY-MM-DD")
    const body = {
        status, today: formatteddate
    };
    const response = await FetchUtils.patch(
        `${backendUrl}/api/profiles/${id}/attendance`,
        { ...body },
        { isWithToken: true }
    );
    return response;
}




const buildQueryString = (params: CandidateParams) => {
    const queryParams: QueryParameters = {};
    queryParams["searchText"] = params.searchText;
    queryParams["sort"] = `${params.sortColumn}:${params.sortOrder} `;
    queryParams["pagination[pageSize]"] = params?.rowsPerPage?.toString();
    queryParams["pagination[page]"] = params?.page?.toString();

    queryParams["attendance_status"] = params.attendance_status === "ALL" ? "" : params.attendance_status
    // queryParams["filters[role][$eq]"] = params.role?.toString();
    //   queryParams["filters[batch_id][$eq]"] = params.batchId?.toString();
    queryParams["filters[position][$eq]"] = params.position === "ALL" ? "" : params.position?.toString()
    // queryParams["filters[status][$eq]"] =
    //     params.status === "ALL" ? "" : params.status?.toString()
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
