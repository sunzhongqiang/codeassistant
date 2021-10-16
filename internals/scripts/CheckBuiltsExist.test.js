const rewire = require("rewire")
const CheckBuiltsExist = rewire("./CheckBuiltsExist")
const CheckBuildsExist = CheckBuiltsExist.__get__("CheckBuildsExist")
// @ponicode
describe("CheckBuildsExist", () => {
    test("0", () => {
        let callFunction = () => {
            CheckBuildsExist()
        }
    
        expect(callFunction).not.toThrow()
    })
})
