const axios = require("axios");
const fetch = require("node-fetch")

fetch(`https://api.github.com/users/kyleHaldane`)
    .then(function(result){
        console.log(JSON.stringify(result));
    })