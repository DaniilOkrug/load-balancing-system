const axios = require("axios");

(async () => {
    while (true) {
        const response = await axios({
            url: 'http://194.87.82.50:80/',
            method: "get",
        })

        console.log(response);
    }
})()