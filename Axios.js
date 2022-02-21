import axios from "axios";

let axiosPost = async function (url, data, callback) {
        let returnData = await axios({
            method: 'post',
            url: url,
            responseType: 'JSON',
            data: data,
            headers: {
                'content-type': 'application/JSON; charset=UTF-8;',
                'X-Requested-With': 'XMLHttpRequest',
            }
        }).then(function (response) {
            if (callback !== undefined && callback !== '') {
                let returnData = callback(response);

                if (returnData !== undefined) {
                    return returnData;
                }

                return response;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

export default {
    axiosPost
}