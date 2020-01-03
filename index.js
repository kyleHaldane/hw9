var inquirer = require("inquirer");
const axios = require("axios");
const generate = require("./generateHTML.js");
const electron = require("electron");
var fs = require('fs');

inquirer.prompt([{
    type: "input",
    message: "What is your github username?",
    name: "username"
},
{
    type: "list",
    message: "What is your favorite color?",
    name: "color",
    choices: ["red", "green", "blue", "pink"]
}
])
    .then(async function (response) {
        var queryUrl = `https://api.github.com/users/kyleHaldane`;

        await axios.get(queryUrl)

            .then(function({ user }){
                
                var data = {
                    color: response.color,
                    avatar_url: user.avatar_url,
                    name: user.login,
                    company: user.company,
                    location: user.location,
                    blog: user.blog,
                    bio: user.bio,
                    public_repos: user.public_repos,
                    followers: user.followers,
                    stars: "",
                    following: user.following
                }

                console.log(data.location);
                console.log(user.location);
                var page = generate(data)
                console.log(page);
                
                var fs = require('fs'),
                    convertFactory = require('electron-html-to');

                var conversion = convertFactory({
                    converterPath: convertFactory.converters.PDF
                });

                conversion({html: page}, function (err, result) {
                    if (err) {
                        return console.error(err);
                    }

                    console.log(result.numberOfPages);
                    console.log(result.logs);
                    result.stream.pipe(fs.createWriteStream('resume.pdf'));
                    conversion.kill(); 
                });
            })
    })