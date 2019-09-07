"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    text: String,
    title: String,
});
exports.Post = mongoose_1.model('post', PostSchema);
