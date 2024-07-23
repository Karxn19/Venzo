const Bike = require('./../model/Bike');

// Get all bikes
exports.getAllBikes = async (req, res) => {
    try {

        // handling queries FILTERING
        const queryObj = { ...req.query };
        const excludedFields = ['page','sort','limit','fields'];
        excludedFields.forEach(el=>delete queryObj[el]);

        // ADVANCED FILTERING
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        const parsedQuery = JSON.parse(queryStr);


        // BUILDING QUERY
        let query = Bike.find(parsedQuery);

        // SORTING
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }
        

        // FIELD LIMITING
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        }else{
            query = query.select('-__v');
        }

        // PAGINATION
        const page = req.query.page*1||1;
        const limit = req.query.limit*1||3;
        const skip = (page-1)*limit
        query = query.skip(skip).limit(limit);

        if(req.query.page){
            const numBikes = await Bike.countDocuments();
            if(skip>=numBikes) throw new Error('Page doesnt exist');
        }




        // EXECUTE QUERY
        const bikes = await query;
        res.json({
            status: 'success',
            size: bikes.length,
            bike: bikes
        });
    } catch (err) {
        console.error('Error getting bikes:', err);
        res.status(500).json(err);
    }
};

// Get bike by ID
exports.getBikeById = async (req, res) => {
    const bikeId = req.params.id;
    try {
        const bike = await Bike.findById(bikeId);
        if (!bike) {
            return res.status(404).json({ error: 'Bike not found' });
        }
        res.json(bike);
    } catch (err) {
        console.error('Error getting bike by id:', err);
        res.status(500).json({ error: 'Failed to fetch bike' });
    }
};



// Create a new bike
exports.createBike = async (req, res) => {
    try {
        const bike = await Bike.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                bike: bike
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};


// Update bike image URL
exports.changeImage = async (req, res) => {
    try {
        const bikeId = req.params.id;
        const result = await Bike.findByIdAndUpdate(bikeId, req.body.imageURL ,{
            new:true,
            runValidators:true
        });

        res.status(200).json({
            status: 'success',
            message: 'Image URL updated successfully',
            updated_image: result.imageURL
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Delete a bike
exports.deleteBike = async (req, res) => {
    const bikeId = req.params.id;
    try {
        const bikeDel = await Bike.findByIdAndDelete(bikeId);
        if (!bikeDel) {
            return res.status(404).json({
                status: 'failed',
                message: 'Bike not found'
            });
        }
        res.status(204).json({
            status: 'success',
            data: {
                bike: bikeDel
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        });
    }
};


exports.getBikeStats = async (req, res) => {
    try {
        const stats = await Bike.aggregate([
            {
                $match: { maxspeed_kmph: { $gte: 4.5 } }
            },
            {
                $group: {
                    _id: null, 
                    avgMaxSpeed: { $avg: '$maxspeed_kmph' },
                    avgCost: { $avg: '$cost_inr' }
                }
            },
            {
                $sort: { avgCost: 1 } 
            }
        ]);

        res.json({
            status: 'success',
            stats
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        });
    }
};




