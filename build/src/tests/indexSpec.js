"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = __importDefault(require("../../utilities"));
describe("Testing multiplyFive function", function () {
    it("should multiply 5 by 5 to be 25", function () {
        expect((0, utilities_1.default)(5, 5)).toEqual(25);
    });
    it("should multiply -5 by 5 to be -25", function () {
        expect((0, utilities_1.default)(5, -5)).toEqual(-25);
    });
    it("should multiply -5 by 5 to be defined", function () {
        expect((0, utilities_1.default)(5, 5)).toBeDefined();
    });
});
