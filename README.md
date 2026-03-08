ans-no1

They are all used to declare variables, but they behave differently.
var
its  a old way
it  scoped fungtion
It can be redeclared and updated.
ex:var name = "Mubasshir";
var name = "Kamalee";

let

Introduced in ES6.
It is block scoped (works inside { }).
It can be updated but cannot be redeclared.
ex:let age = 17;
age = 18

const
Also introduced in ES6.
Block scoped.
Cannot be updated or redeclared.

ex:const country = "Bangladesh";



ans  no  2:
The spread operator is used to copy elements from an array or object.
ex:const numbers = [1,2,3];
const newNumbers = [...numbers,4,5];

const user = {name:"Mubasshir", age:17};

const newUser = {...user, country:"Bangladesh"};




ans no 3:
All three are used with arrays.

map=
it  create  a  new array
transforms each element
ex:const numbers = [1,2,3];

const doubled = numbers.map(num => num * 2);

filter=
Creates a new array

Returns elements that match a condition

ex:const numbers = [1,2,3,4];

const even = numbers.filter(num => num % 2 === 0);

foreach=
Just loops through an array

Does not return a new array
ex:const numbers = [1,2,3];

numbers.forEach(num => {
  console.log(num);
});


ans no  4:

Arrow functions are a shorter way to write functions in JavaScript
normal funtion 
js   ex:function add(a,b){
 return a+b;
}

buuut   arrow funtion  
ex:const add = (a,b) => a + b;

ans  no 5 :

tamplate  literals  allow  to  use  sting  with  var easyly  only  using``
ex:const name = "Mubasshir";
const age = 17;

console.log(`My name is ${name} and I am ${age} years old`);

and outputwill  be
==My name is Mubasshir and I am 17 years old