process.env.NODE_ENV = "test";
const Book = require('../models/book');
const db = require("../db"); const request = require("supertest");
const app = require("../app");

describe("Book Routes Test", function(){
  beforeEach(async function() {
    await db.query("DELETE FROM books");

    let book = await Book.create({
      "isbn": "0691161518",
      "amazon_url": "http://a.co/eobPtX2",
      "author": "Matthew Lane",
      "language": "english",
      "pages": 264,
      "publisher": "Princeton University Press",
      "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
      "year": 2017
    });
  });

  // GET / books
  // Responds with a list of all the books
  test("Gets all books", async function(){
    let b = await request(app)
              .get("/books");
    console.log(b.body);
    expect(b.statusCode).toBe(200);
    expect(b.body).toEqual({books: [{
      "isbn": "0691161518",
      "amazon_url": "http://a.co/eobPtX2",
      "author": "Matthew Lane",
      "language": "english",
      "pages": 264,
      "publisher": "Princeton University Press",
      "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
      "year": 2017
    }]});
  });

  // // GET / books / [isbn]
  // // Responds with a single book found by its isbn
  // test("Gets a book", async function () {
  //   let b = await Book.findOne("0691161518");
  //   expect(b).toEqual({
  //     "isbn": "0691161518",
  //     "amazon-url": "http://a.co/eobPtX2",
  //     "author": "Matthew Lane",
  //     "language": "english",
  //     "pages": 264,
  //     "publisher": "Princeton University Press",
  //     "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
  //     "year": 2017
  //   });
  // });

  // test("Returns 404 if book was not found", async function () {
  //   let b = await Book.findOne("00000");
  //   expect(b).toEqual({error: {
  //     message: `There is no book with an isbn 00000`,
  //     status: 404
  //   }});
  // });

  // // POST / books
  // // Creates a book and responds with the newly created book
  // test("Creates book if inputs are valid", function () {

  // });

  // test("Return 400 if inputs are invalid", function () {

  // });


  // // PUT / books / [isbn]
  // // Updates a book and responds with the updated book
  // test("Updates book if inputs are valid", function () {

  // });

  // test("Returns 400 if inputs are valid", function () {

  // });

  // test("Returns 404 if book was not found", function () {

  // });

  // // DELETE / books / [isbn]
  // // Deletes a book and responds with a message of “Book deleted”
  // test("Delete book given isbn", function () {

  // });

  // test("Returns 404 if book was not found", function () {

  // });

  afterAll(async function () {
    await db.end();
  });
});
