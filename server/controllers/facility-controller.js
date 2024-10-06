const Facility = require("../models/facility-model");

// *----------------------
//* facility Logic
// *----------------------
const facility = async (req, res) => {
    try {
        const response = await Facility.find();
        if(!response) {
            // handle the case where no document was found
            res.status(404).json({msg: 'Facility not found'});
            return;
        }
        res.status(200).json({ msg: response});
    } catch (error) {
        console.log(`facility error: ${error}`);
    }
};

module.exports = facility;