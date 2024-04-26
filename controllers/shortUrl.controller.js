const printLogger = require("../middlewares/winstonLogger");
const shortUrlModel = require("../models/shortUrl");
const { uniqueID } = require("../utils/utils");

module.exports = {
  madeShortURL: async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        // console.log(res);
        // printLogger("error",res,"400 Url Not Found")
        return res.status(400).json({
          status: "error",
          message: "Url Not Found",
          data: [],
        });
      }
      //   console.log(url);
      const uniqueId = uniqueID();
      console.log("http://" + req.headers.host);

      const ShortUrl = new shortUrlModel({
        uniqueId: uniqueId,
        url: url,
      });
      const saveURL = await ShortUrl.save();
      if (!saveURL) {
        // printLogger("error",{res,msg:"400 Cannot Short This url"})

        return res.status(400).json({
          status: "error",
          message: "Cannot Short This url",
        });
      }
      res.status(200).json({
        status: "success",
        message: "ShortUrl Maded",
        data: process.env.SHORTLINK + uniqueId,
      });
      // printLogger("info",{res,msg:"200 ShortUrl Maded"})
      
    } catch (error) {
      console.log(error);
      // printLogger('error',{res,msg:error.message})
      return res.status(500).json({
        status: "error",
        message: "INTERNAL SERVER ERROR",
        data: [],
      });
    }
  },
  redirectURL: async (req, res) => {
    try {
      //   console.log(req.params.id);
      const id = req.params.id;
      const getLink = await shortUrlModel.findOne({ uniqueId: id });
      if (!getLink) {
        return res.status(404).json({
          status: "error",
          message: "Cannot get a Link",
          data: [],
        });
      }
      //   getLink.clicks.push( Date.now());
      //   await getLink.save();
      const date = new Date();
      const addClick = await shortUrlModel.findOneAndUpdate(
        { uniqueId: id },
        { $push: { clicks: date } }
      );
      res.redirect(getLink.url);
      // res.status(200).json({
      //     status:'success',
      //     message:"Url Is Redirected",
      //     data:[{id:req.params.id  }]
      // })
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "error",
        message: "INTERNAL SERVER ERROR",
        data: [],
      });
    }
  },
  getAnalytics: async (req, res) => {
    try {
      const analyticsData = await shortUrlModel.aggregate([
        {
          $match: {},
        },
        {
          $addFields: {
            TotalClicks: {
              $size: "$clicks",
            },
          },
        },
        {
          $project: {
            uniqueId: 1,
            _id: 0,
            TotalClicks: 1,
            url:1,
            clicks:1
          },
        },
      ]);
      res.status(200).json({
        status: "success",
        message: "Data Of All Links",
        data: analyticsData,
      });
      //   console.log(analyticsData);
    } catch (error) {
      console.log(error);
      console.log(error.message);
      return res.status(500).json({
        status: "error",
        message: "INTERNAL SERVER ERROR",
        data: [],
      });
    }
  },
};
