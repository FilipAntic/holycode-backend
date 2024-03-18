"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var places_controllers_1 = __importDefault(require("./controllers/places.controllers"));
var app = (0, express_1.default)();
var placesController = new places_controllers_1.default();
app.get('/:id', placesController.getPlace);
app.listen(3100, function () {
    console.log('Server is running on port 3000');
});
