
import { QueryParameters } from '@/components/types/common';
import { CandidateParams, IProfileRole, IProfileStatus } from '../components/types/profile';
import * as FetchUtils from '../utils/fetch';
import qs from "query-string";
const backendUrl = process.env.REACT_APP_BACKEND_URL;



export const getCandidates = async (params: CandidateParams): Promise<any> => {
    const response = await FetchUtils.get(`${backendUrl}/api/profiles/candidates?${buildQueryString(params)}`, { isWithToken: true });
    console.log("Fetching candidate", response)
    return response;
};


export async function addNewCandidate({
    name, email, phone, department, experience,
    position
}: {
    name: string
    email: string
    phone: string
    department: string
    experience: number;
    position: string

}) {
    let body = {
        name, email, department, role: IProfileRole.candidate, status: IProfileStatus.New, experience: experience.toString(), phone,
        position
    }
    console.log("body", body)
    const response = await FetchUtils.post(`${backendUrl}/api/profiles`, { ...body }, {
        isWithToken: true
    })
    return response

}


export async function updateCandidateStatus({
    id, status
}: {
    id: string, status: IProfileStatus

}) {
    let body = {
        status
    }

    const response = await FetchUtils.patch(`${backendUrl}/api/profiles/${id}/status`, { ...body }, {
        isWithToken: true
    })
    return response

}




const buildQueryString = (params: CandidateParams) => {
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
