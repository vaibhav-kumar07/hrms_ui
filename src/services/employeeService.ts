
import { QueryParameters } from '@/components/types/common';
import { CandidateParams, IProfileRole, IProfileStatus } from '..//components/types/profile';
import * as FetchUtils from '../utils/fetch';
import qs from 'query-string';
const backendUrl = "http://localhost:6001"



export const getEmployees = async (params: CandidateParams): Promise<any> => {
    const response = await FetchUtils.get(`${backendUrl}/api/profiles/employees?${buildQueryString(params)}`, { isWithToken: true });
    console.log("Fetching candidate", response)
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

const buildQueryString = (params: CandidateParams) => {
    const queryParams: QueryParameters = {};
    queryParams["searchText"] = params.searchText;
    queryParams["sort"] = `${params.sortColumn}:${params.sortOrder} `;
    queryParams["pagination[pageSize]"] = params?.rowsPerPage?.toString();
    queryParams["pagination[page]"] = params?.page?.toString();
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
