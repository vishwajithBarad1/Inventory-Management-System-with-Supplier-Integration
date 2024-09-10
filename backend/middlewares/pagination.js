const { client } = require("../db/connectRedis");

exports.pagination=(model)=>{
    return async (req,res,next)=>{
        await client.set("productUpadated","true");
        await client.set("supplierUpdated","true");
        await client.set("orderUpdated","true");
        const order = req.query.order
        const page = parseInt(req.query.page) || 1;
        const limit = (parseInt(req.query.limit) || 10)>20?20:parseInt(req.query.limit);

        const totalDocs =(model.modelName=="Order") ? await model.countDocuments({}).populate('product_id').exec() : await model.countDocuments({isDeleted:false}).exec();
        const totalPages = Math.ceil(totalDocs / limit);

        const startIndex = ((((page>totalPages)?totalPages:((page<1)?1:page)) - 1) * ((limit>totalDocs)?totalDocs:(limit<1)?20:limit))
        try{
            if(!order){
            
            const docs =(model.modelName==="Order")?await model.find().skip(startIndex).limit(((limit>totalDocs)?totalDocs:(limit<1)?20:limit)).populate("product_id").exec():await model.find({isDeleted:false}).skip(startIndex).limit(((limit>totalDocs)?totalDocs:(limit<1)?20:limit)).exec();
            req.paginatedResults = {
                success: true,
                message: "Products fetched successfully",
                data: docs,
                totalDocs,
                currentPage: ((page>totalPages)?totalPages:((page<1)?0:page)),
                totalPages: Math.ceil(totalDocs / limit),
            };
            }else{
                const docs = await model.find({isDeleted:false});
                req.paginatedResults = {
                    success: true,
                    message: "Products fetched successfully",
                    data: docs
                };
            }
            next();
        }catch(err){
            res.status(500).json({
                success: false,
                message: "Error retrieving products",
                error: err.message
            });
        };
    }
}