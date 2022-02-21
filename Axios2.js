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
        })

    return callback(returnData);
}

export default {
    axiosPost2 : axiosPost
}