## Introduction 👋🏼
Welcome to **part one** of this series, where I'll be documenting the concepts I am currently learning as part of my journey to better understand the JavaScript Language.

In this part, I will be covering the following topics:
 1. Variable Declarations with Let and Const
 2. Blocks and Immediately Invoked Function Expressions
 3. Strings in ES6

## Variable Declarations with Let and Const 📦
In ES6, there are two new ways of declaring variables using the following keywords: '**let**' and '**const**'.

### Defining variables in ES6
```javascript
// Two methods of declaring variables
let counter = 0;
const name = 'Yusuf';

console.log(counter); // Output: 0
console.log(name); // Output: Yusuf
```

Effectively, the two statements above will do the same thing, such that two new variables, **counter** and **name**, are defined and set to some value.

### What's the difference between 'let' and 'const' then?
The major difference between 'let' and 'const' is:

- '**let**': used for values which may change throughout the lifecycle of your JavaScript application.
- '**const**': used when the entire contents of such variable will not be changed. For example, changing a const variable from an Array to a string. However, note that you can *alter* the contents such as adding to an array, the entire value just cannot be over-written. **

Thinking back to the example of the **counter** and **name** variables we defined above, we used **let** for the *counter* and **const** for the *name*. This makes sense, right?

- *counter*: this could be incremented or decremented in our program (changed), so it is appropriate to use **let** for this variable.
- *name*: in most cases, a person cannot change their name, so we would want this to be defined using **const**, so it cannot be changed.

In fact, if we attempted to change the value of a variable defined using **const**, we will be greeted with a lovely error:
```javascript
const name = 'Yusuf';
// Attempting to re-assign the value of name throws an error
name = 'new name!';
console.log(name);
```
![Displaying the console error which appears when trying to change the value of a const variable](https://i.imgur.com/SyLLKgO.png)
This feature enables developers to define and save variables with one value, knowing that they won't be able to change it, intentionally or unintentionally, without JavaScript kicking up a fuss about it. Neat stuff I think.

### Variable Declarations: Function Scoped vs. Block Scoped 🔍
With the introduction of **let** and **const**, the way that the JavaScript Engine accesses these variables is different to how it is normally done when declaring variables with the **var** keyword in ES5.

We can describe *let* and *const* variables to be **block scoped**, and variables defined using *var* as **function scoped**. A scope can be thought of as the 'space' in which a particular value is accessible. 

- **Block Scope**: Variables defined in this scope are only available within the block that it is defined in
- **Function Scope**: Variables defined in this scope are available throughout the function which it is defined in, even within other inner scopes

Below is a simple example of these two types of scopes, with an explanation afterwards:

```javascript
// ES5: 'var'
function testingScopesOne()
{
	var num =  1;
	
	// Creating a new Block Scope
	{
		var num =  2;
		
		// Output: 2
		console.log(num);
	}
	
// Output: 2
console.log(num);
}

// ES6: 'let'
function testingScopesTwo()
{
	let num =  1;
	// Creating a new Block Scope
	
	{
		let num =  2;
		
		// Output: 2
		console.log(num);
	}
	
	// Output: 1
	console.log(num);
}

testingScopesOne();
testingScopesTwo();
```
#### Code Explanation 👀
Above I have defined and executed two functions, **testingScopesOne** and **testingScopesTwo**.
I'll try to break down what I did in each function, the outcome, and how this links to the concepts of **Function Scope** and **Block Scope**:

 - In each function, I defined a variable called **num**, assigning it the value **1**. The difference between them is that I use **var** in **testingScopesOne** and **let** in **testingScopesTwo**
 - After the variable definition and assignment, I create a **new block** using curly braces { ... }
 - Within the **newly created block scope**, I create a variable with the same name, **num**, and assign a new value of **2**:
	 - **testingScopesOne**: I used **var** and output the value within the current block scope.
	 - **testingScopesTwo**: I used **let** and also output the value here.
	 
Both output a value of **2**, which is expected. Once we escape this block scope, however, we get a different outcome in the output statements:

 - Upon leaving the block scope, I once again output the value of '**num**' in **testingScopesOne** and **testingScopesTwo**.
 - **testingScopesOne** output is **2**, whereas **testingScopesTwo** outcome is ***still 1***,  which is the initial value we assigned to it in the beginning.

#### Why is this happening? 😮
The testingScopesOne function is demonstrating the concept of **Function Scoping**.

*Explanation:* We defined a variable num using **var**, assigned it one value, then reassigned it another value within another scope of the function. This newly assigned value, 2, **overrode the initial value** of **1**, showing that the scope of variables defined using **var** are **Function Scoped**.

The testingScopesTwo function, on the other hand, is demonstrating the concept of **Block Scoping**.

*Explanation:* We defined the variable num using **let**, and then within another scope of the function, we assigned a **different value** (2) to num. Instead, what happened here is, this new value did not save as it did in testingScopesOne, so when we output the value at the end of the function outside of this scope, the value remained at **1**. 

This is because, when we declared the variable num again within the block scope, it created a **completely new variable**, even though the name matched the initial variable we declared (num). This therefore demonstrates the concept of **Block Scoping**, where any variable defintion using let is only bound to the current block scope it is defined in.

## Blocks and Immediately Invoked Function Expressions 🏃🏽
A block is any code which is encased within a set of curly braces:
```javascript
{
	// Some code
}
```
Blocks are commonly used in control structures such as if, for, else, etc. but is not limited to be used in these.

In ES6, we can use the concept of blocks to simplify the way we write Immediately Invoked Function Expressions (IIFEs).

### Recap: What is an IIFE?
An IIFE is a function which is **executed straight away** (🏃🏽) upon definition - the JavaScript Engine recognises this as a function which needs to be executed right away.

The important thing about an IIFE is the ability to **encapsulate** all of the data that is used and defined within it. This means that access to anything from inside of an IIFE is not possible, unless such data is publicly defined. The reason for this is because, upon execution of an IIFE, a new **scope** is created, which is separate to the **main parent scope**.

### IIFEs: ES5 vs. ES6
In ES5, we had to do the following to create an IIFE:

- Declare an anonymous function
- Wrap this function within parentheses
- Add a pair of parentheses outside thse parentheses

A lot of work, right? Not to mention how messy the structure ends up looking.
Luckily, all we need to do in ES6 is write our code within a lone pair of parentheses...*and that's it*.

```javascript
// ES5 IIFE
(function() {
    // Code
})();

// ES6 IIFE
{ 
    // Code
}
```
### ES6 IIFE: Example
Below is a simple example where we define an IIFE and declare a variable, myName, within it.
Accessing this variable within the IIFE works fine, whilst trying to access it from outside of the IIFE causes an error.
``` javascript
{
	const myName = 'Yusuf';
	console.log(myName); // Output: Yusuf
}
console.log(myName); // Error: myName is not defined
```

## Strings in ES6 🧵
The way we manipulate and interact with strings is considerably better in ES6.
There is one feature in particular, which is probably one of my most favourite things about ES6. And that is...**string literals**.

### String Literals
Remember when you'd want to print out a string with some variables, such as a person's name? You would've had to do the following to achieve this:
```javascript
// ES5 Strings
console.log('Hello' + name + ', welcome to this application!');
```
With string literals, the awkwardness of adding the + operator between variables and starting / ending the string between each variable is now gone🥳! The above console log can be achieved by doing the following:
```javascript
// ES6 String Literals
console.log(`Hello ${name}, welcome to this application!`);
```
Notable differences:

- Use **backticks** instead of normal quotes
- Enter any variables using the following syntax: **${ ... }**, where ... represents the variable you want to display

You can also enter other simple snippets of JavaScript code within the ${ ... } structure, such as a call to a function. This function may **return some value** that you want to be displayed, in which case, you can just enter it directly into the string.

```javascript
function returnName()
{
	return 'Yusuf';
}

console.log(`Hello ${returnName()}, welcome to this application!`);
// Output: Hello Yusuf, welcome to this application!
```

### ES6 String Methods
Aside from string literals, ES6 also comes with a few new functions that can be used on strings. Below is a simple demonstration of each:
```javascript
// Method Name: startsWith
console.log('coffee'.startsWith('cof'));
// Output: true

// Method Name: endsWith
console.log('coffee'.endsWith('ee'));
// Output: true

// Method Name: includes
console.log('coffee'.includes('offe'));
// Output: true

// Method Name: repeat
console.log('hey '.repeat(4));
// Output: hey hey hey hey
```

## Conclusion
In **part one** of this series, I've covered the following ES6 JavaScript concepts:

 - Using let and const to define variables, and comparing this to using var
 - Briefly touched on scopes, although more could be said on this as an entire article!
 - Covered Immediately Invoked Function Expressions and how we can achieve this using blocks
 - ES6 String manipulation and some new methods associated with them

***Note:*** I am in no way, shape or form, an expert when it comes to JavaScript. My idea and motive behind these posts are to help myself better understand these concepts as I learn them, whilst trying to give something back to the community.
If there is anything fundamentally wrong with the information I've shared, please let me know. We're all still learning, and we can certainly do that together! 😊

Find me on [Instagram](https://www.instagram.com/yusufcodes) and [Twitter](https://www.twitter.com/yusufcodes), where I post about the tech that I'm currently working with, and document my journey as a Computer Science student🙂.