class Vehicle {  // Parent class (also called base or superclass)
    wheels: number;
    engine: string;
  
    constructor(wheels: number, engine: string) {
      this.wheels = wheels;
      this.engine = engine;
    }
  
    move(): void {
      console.log("The vehicle is moving!");
    }
  }
  
  class Car extends Vehicle { // Child class (also called derived or subclass)
    brand: string;
  
    constructor(brand: string, wheels: number, engine: string) {
      super(wheels, engine);  // Call the parent class's constructor
      this.brand = brand;
    }
  
    honk(): void {
      console.log("Honk! Honk!");
    }
    brandName(): void {
      console.log(`This car is a ${this.brand}`);
    }
  }
  
  const myCar = new Car("Toyota", 4, "Gasoline");
  myCar.move(); // Output: "The vehicle is moving!" (inherited from Vehicle)
  myCar.honk(); // Output: "Honk! Honk!" (specific to Car)
  myCar.brandName(); 