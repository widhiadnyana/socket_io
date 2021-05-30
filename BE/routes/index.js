const express = require("express");
const router = express.Router();

const getTypes = (req, res, next) => {
    // console.log(pool);
    const { id } = req.params;
    console.log(id);
    try {
        let returnData = [];
        if (id == "1") {
            returnData = [
                {
                    id: 1,
                    name: "supra Fit",
                },
                {
                    id: 2,
                    name: "fortuner anjay",
                },
            ];
        } else if (id == "2") {
            returnData = [
                {
                    id: 1,
                    name: "test",
                },
                {
                    id: 2,
                    name: "test anjay",
                },
            ];
        }
        res.status(200).json(returnData);
    } catch (error) {
        console.log(error);
        res.status(400).json("ERROR");
    }
};
router.route("/:id").get(getTypes);

const postData = (req, res, next) => {
    // const { brand, type } = req.body;
    // console.log(brand, type);
    console.log(req.body);
    res.status(200).json({ id: "monyet" });
};

router.route("/").post(postData);

// router.route("/").get((req, res) => {
//     // res.send({ response: "I am alive" }).status(200);
//     res.status(200).json("test");
// });

module.exports = router;
