const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

async function geocodeLocation(location, country) {
    const response = await geocodingClient
        .forwardGeocode({
            query: `${location}, ${country}`,
            limit: 1,
        })
        .send();
    const feature = response.body.features[0];
    return feature ? feature.geometry : null;
}

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    if (!listing.geometry?.coordinates?.length) {
        listing.geometry = {
            type: "Point",
            coordinates: [73.8786, 18.5246], // Pune fallback
        };
    }

    return res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
    if (!req.file) {
        req.flash("error", "Please upload an image");
        return res.redirect("/listings/new");
    }

    const { location, country } = req.body.listing;
    const geometry = await geocodeLocation(location, country);
    if (!geometry) {
        req.flash("error", "Location not found. Try a more specific place name.");
        return res.redirect("/listings/new");
    }

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url: req.file.path, filename: req.file.filename };
    newListing.geometry = geometry;

    await newListing.save();
    req.flash("success", "New Listing Created!");
    return res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url.replace("/upload", "/upload/h_300,w_250");
    return res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { new: true }
    );

    const { location, country } = req.body.listing;
    const geometry = await geocodeLocation(location, country);
    if (geometry) listing.geometry = geometry;

    if (typeof req.file !== "undefined") {
        listing.image = { url: req.file.path, filename: req.file.filename };
    }

    await listing.save();
    req.flash("success", "Listing Updated!");
    return res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");
    return res.redirect("/listings");
};