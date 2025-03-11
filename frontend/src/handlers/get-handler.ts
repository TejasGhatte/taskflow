import apiClient from "../config/axios";

const getHandler = async (URL: string) => {
    const headers = {
    'Content-Type': 'application/json',
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = {
        status: 0,
        data: '',
        statusCode: 500
    }

    await apiClient
        .get(URL, { headers })
        .then(res => {
            response.status = 1;
            response.data = res.data;
            response.statusCode = res.status;
        })
        .catch(err => {
            if (err.name == 'CanceledError') response.status = -1;
            else response.status = 0;
            response.data = err.response?.data || '';
            response.statusCode = 500;
        });
    return response
}

export default getHandler