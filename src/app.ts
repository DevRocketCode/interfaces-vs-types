// ************* INTRODUCTION *************

// we can define a success interface to define the shape of a success message object
interface Success {
  success: true;
  message: string;
}

// and then we can use it
const successMessage: Success = {
  success: true,
  message: 'This is a success message'
}

// or we can create a success Type, instead of an interface
type Success2 = {
  success: true;
  message: string;
}

// and we can use it
const successMessage2: Success2 = {
  success: true,
  message: 'This is a success message'
}

// So... if we can use both, what's the difference between an interface and a type? Let's look at a few of them!

// ************* TYPES - UNION *************
// let's say we also create a failure interface
interface Failure {
  success: false;
  error: string;
}

// we can use a union type to build a type that can be either a Success or Failure. 
type Result = Success | Failure;

// But we cannot use unions with interfaces.
interface ResultInterface = Success | Failure;

// we use the `Result` type to define the first param of `handleResult`, so it expects either a `Success` or `Failure` type, with either a `message` or `error` property
function handleResult(result: Result) {
  if (result.success) {
    console.log(result.message);
  } else {
    // trying to log `result.message` here will cause a compiler error
    console.log(result.error);
  }
}

// ************* INTERFACES - MERGING *************

// if we define just the name property on the Person interface
interface Person {
  name: string;
}

// we can later merge it with another Person interface to include another property
// without this, the compiler will complain about the `age` property in joel below
interface Person {
  age: number;
}

const joel: Person = {
  name: 'Joel',
  age: 30
}

// but we cannot merge types. If we define a type Coworker
type Coworker = {
  name: string;
};

// we cannot merge it with another type Coworker
type Coworker = {
  age: number;
};

// ************* TYPES - INTERSECTION *************
// intersection types (similar to merging two interfaces or extending a type with an interface)
type A = {
  name: string;
};

type B = {
  age: number;
};

type C = A & B;

const person: C = {
  name: 'John',
  age: 30,
};

// ************* TYPES - EXTENDING *************
// As we have merged A and B above to get C, we can also extend Employee with Person to get the same result
// we have an Employee type, with an `id` and `salary` property
type Employee = {
  id: number;
  salary: number;
} & Person;

// when we use Employee type, it adds the `id` and `salary` properties, along with the `name` and `age` properties from the `Person` interface
const alex: Employee = {
  name: 'Alex',
  age: 45,
  id: 1,
  salary: 100000
}

// ************* TYPES - PRIMITIVES *************
// we can define a type that can only be a specific primitive type
type Name = string;

// we can use it to define a variable
const customerName: Name = 'John';

// but we cannot use interfaces to define a primitive type
interface Name2 = string;

// ************* TYPES - TUPLES *************
// tuple types allow us to define an array with a fixed number of elements
type Colleague = [string, number];

const john: Colleague = ['John', 30];

// this will throw an error: Type 'string' is not assignable to type 'number'.
const john2: Colleague = ['John', '30'];

// but we cannot use interfaces to define a tuple type
interface Colleague2 = [string, number];
