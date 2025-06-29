const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { required } = require("joi");

const listingSchema  = new Schema({
    title : {
        type : String,
        required : true,
    },
    description: String,
    image: {
      url: {
       type : String,
      },
      filename: String, 
    },
    price : Number,
    location : String,
    country : String,
    reviews : [
      {
       type : Schema.Types.ObjectId,
       ref : "Review"
      }
    ],
    owner :{
      type : Schema.Types.ObjectId,
      ref : "User",
    },
     geometry: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
});
  
listingSchema.pre("findOneAndDelete", async function (next) {
  const listing = await this.model.findOne(this.getQuery());
  if (listing) {
      await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
  next();
}); 

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;