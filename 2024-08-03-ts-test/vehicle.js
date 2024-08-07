var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Vehicle = /** @class */ (function () {
    function Vehicle(wheels, engine) {
        this.wheels = wheels;
        this.engine = engine;
    }
    Vehicle.prototype.move = function () {
        console.log("The vehicle is moving!");
    };
    return Vehicle;
}());
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car(brand, wheels, engine) {
        var _this = _super.call(this, wheels, engine) || this; // Call the parent class's constructor
        _this.brand = brand;
        return _this;
    }
    Car.prototype.honk = function () {
        console.log("Honk! Honk!");
    };
    Car.prototype.brandName = function () {
        console.log("This car is a ".concat(this.brand));
    };
    return Car;
}(Vehicle));
var myCar = new Car("Toyota", 4, "Gasoline");
myCar.move(); // Output: "The vehicle is moving!" (inherited from Vehicle)
myCar.honk(); // Output: "Honk! Honk!" (specific to Car)
myCar.brandName();
