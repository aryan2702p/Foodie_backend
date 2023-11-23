const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, min: [1, 'wrong min price'], max: [10000, 'wrong max price'] },
    discountPercentage: { type: Number, min: [1, 'wrong min discount'], max: [99, 'wrong max discount'] },
    rating: { type: Number, min: [0, 'wrong min rating'], max: [5, 'wrong max price'], default: 0 },
    stock: { type: Number, min: [0, 'wrong min stock'], default: 0 },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    deleted: { type: Boolean, default: false },
    expiry: {type: Date, required :true, default: Date.now },
    
    sale: { type: Number, default:0},

})

{/*
This code appears to be defining a virtual property for a Mongoose schema in a Node.js application. Let's break it down step by step:

Mongoose Schema Definition:

It seems like you have a Mongoose schema called productSchema defined somewhere in your code.
Virtual Property Creation:

const virtual = productSchema.virtual('id');: This line creates a virtual property named 'id' on the productSchema.
Virtual properties are not stored in the database but can be used to define additional properties
or computed properties based on the data in the document.

Virtual Property Getter Function:

virtual.get(function () { return this._id; }): This line defines a getter function for the virtual property 'id'. When you access the 'id' property on a document created using productSchema, this function will be executed to determine its value. In this case, it simply returns the _id field of the document.

Setting toJSON Options:

productSchema.set('toJSON', { virtuals: true, versionKey: false, transform: function (doc, ret) { delete ret._id } }): 
This line sets options for how the document should be serialized to JSON. These options affect what gets included in the JSON 
representation of the document.

virtuals: true: This option includes virtual properties in the JSON representation of the document.
Since you created a virtual property called 'id' earlier, it will be included when you convert a document to JSON.

versionKey: false: This option specifies that the version key (typically '__v') should not be included in the JSON output.
 The version key is used by Mongoose for handling document versioning.
transform: function (doc, ret) { delete ret._id }: This option defines a function that will be applied to the JSON 
representation of the document before it's returned. In this case, it removes the '_id' field from the JSON output,
 which is a common practice when returning JSON representations of documents to clients.

In summary, this code creates a virtual property 'id' for a Mongoose schema called productSchema. 
When you convert a document based on this schema to JSON, it will include the 'id' property, and the '_id' field will be removed
 from the JSON representation.*/}

const virtual = productSchema.virtual('id');
virtual.get(function () {
    return this._id;
})
productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})




exports.Product = mongoose.model('Product', productSchema)