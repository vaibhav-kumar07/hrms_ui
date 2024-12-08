
import { AttendanceStatus } from '../components/types/attendance';
import * as FetchUtils from '../utils/fetch';
const backendUrl = process.env.REACT_APP_BACKEND_URL;






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


