const functions = require("./function");

const initDatabase = () => console.log("Init database dummy...");
const closeDatabase = () => console.log("Close database dummy...");

// expectation list
// toBeLessThan, lessEqual,
// toBeNull match only null
// toBeUndefined match only undefined
// tobeDefined opposite
// toBeTruthy if true
// toBeFalsy if false

// not.toEqual()

// testing with snapshot -> untuk komponen yg sekali render kelar, gaada ngubah2
// testing with manual assertion -> untuk komponen yg bisa diubah2, soalnya snapshot bisa ngebingungin kalo update

// run function before/after each testing
// beforeEach(() => initDatabase());
// afterEach(() => closeDatabase());

// run function before/after only once
beforeAll(() => initDatabase());
afterAll(() => closeDatabase());

const nameCheck = () => console.log("checking name...");
// run nameCheck on some specific test
describe("check names it can be anything", () => {
    beforeEach(() => nameCheck());
    // do the testing
    test("should ", () => {
        //
    });
});

// testing here
test("add 2 + 2 equal to 4", () => {
    expect(functions.add(2, 2)).toBe(4);
});

// toEqual -> for objet or array
test("create new user", () => {
    expect(functions.newuser("asd", "fgh")).toEqual({
        firstName: "asd",
        lastName: "fgh",
    });
});

// working on async
// promise
test("user fetched name is Leanne Graham", () => {
    expect.assertions(1);
    return functions.fetchUser().then((data) => {
        expect(data.name).toEqual("Leanne Graham");
    });
});

// await
test("user fetched name is Leanne Graham", async () => {
    expect.assertions(1);
    let data = await functions.fetchUser();

    expect(data.name).toEqual("Leanne Graham");
});
