const { default: axios } = require("axios");

const functions = {
    add: (num1, num2) => num1 + num2,
    newuser: (firstName, lastName) => {
        return {
            firstName: firstName,
            lastName: lastName,
        };
    },
    fetchUser: () =>
        axios
            .get("https://jsonplaceholder.typicode.com/users/1")
            .then((result) => result.data)
            .catch((err) => console.log(err)),
};

module.exports = functions;
