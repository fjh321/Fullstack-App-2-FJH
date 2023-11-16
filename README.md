## Fullstack App 2

<img width="730" alt="image" src="https://github.com/fjh321/Fullstack-App-2-FJH/assets/64885403/35f7836a-27e0-41fb-80c3-a1101bfd2750">

For this project I wanted to create a food journal that would keep track of the servings people ate in a given day. I wanted to build something that a user could implement as a way of checking if they ate more than they had planned for a given meal (i.e. more than two servings although my code could be changed to a lower or higher threshold). 

## What I did to build this app:
I used HTML, CSS, JavaScript, Node.js, Express, and MongoDB to code this project.

I established two inputs: one for the name of a food item and one for the quantity of servings a user ate for that item. Those two values, when submitted, would then appear in the DOM as a brand new li element. The quantity value would still appear as an updateable input while the food's name would appear as a static span element. If the quantity was updated to another number value, then the user could simply click the update/save button to update and save that value to the database. Moreover, the quantity, when updated or incremented to more than 2, would cause the li to then also appear in a second list denoting foods that were eaten more than twice; this was done via another PUT request.

## Lessons Learned :
* I learned how to implement an objects Id from my Mongo database and use that as an identifier representing its corresponding li element in the DOM.
* I also became more familiar with EJS implemenation and how to comment out EJS code since EJS involves JS templating with HTML and the languages are commented out in different manners.

## Installation

1. Clone repo
2. run `npm install`

## Usage

1. run `node server.js`
2. Navigate to `localhost:9090`

## Credit

Modified from Scotch.io's auth tutorial
