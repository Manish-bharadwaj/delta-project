const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const myExpressError = require("../utils/myExpressError.js");
const{ reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor,} = require("../middleware.js")


const reviewController = require("../controllers/review.js")

//Post Review route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview)
  );
  
  //Delete Post Route
  router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview)
  );


  module.exports = router;