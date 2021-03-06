import React, { Component } from "react";
import API from "../utils/API";
import Jumbotron from "../components/Jumbotron";
import { Container, Row, Col } from "../components/Grid";
import SearchForm from "../components/SearchForm";
import SearchBooks from "../components/SearchBooks"


class Search extends Component {
    //create state
    state = {
        search: "",
        books: [],
        error: "",
        message: ""
    };

    //function to take value of what enter in the search bar
    handleInputChange = event => {
        this.setState({ search: event.target.value })
    }

    //function to control the submit button of the search form 
    handleFormSubmit = event => {
        event.preventDefault();
        // once it clicks it connects to the google book api with the search value
        API.getGoogleSearchBooks(this.state.search)
            .then(res => {
                if (res.data.items === "error") {
                    throw new Error(res.data.items);
                }
                else {
                    // store response in a array
                    let results = res.data.items
                    //map through the array 
                    results = results.map(result => {
                        //store each book information in a new object 
                        result = {
                            key: result.id,
                            id: result.id,
                            title: result.volumeInfo.title,
                            author: result.volumeInfo.authors,
                            description: result.volumeInfo.description,
                            image: result.volumeInfo.imageLinks.thumbnail,
                            link: result.volumeInfo.infoLink
                        }
                        return result;
                    })
                    // reset the sate of the empty books array to the new arrays of objects with properties geting back from the response
                    this.setState({ books: results, error: "" })
                }
            })
            .catch(err => this.setState({ error: err.items }));
    }

    handleSavedButton = event => {
        // console.log(event)
        event.preventDefault();
        console.log(this.state.books)
        let savedBook = this.state.books.filter(book => book.id === event.target.id)
        console.log({ savedBook })
        const newBook = {
            title: savedBook[0].title,
            author: savedBook[0].author ? savedBook[0].author[0] : "",
            synopsis: savedBook[0].description,
            date: savedBook[0].date,
            image: savedBook[0].image,
            link: savedBook[0].link
        }
        console.log(newBook);
        API.saveBook(newBook)
            // .then(this.setState({ message: alert("Your book is saved") }))
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="12">
                        <Jumbotron>
                            <h1 className="text-black">Find Your Good Reads with GoogleBook App</h1>
                        </Jumbotron>
                    </Col>
                </Row>

                <Row>
                    <Col size="12">
                        <SearchForm
                            handleFormSubmit={this.handleFormSubmit}
                            handleInputChange={this.handleInputChange}
                        />
                    </Col>
                </Row>

                <br></br>
                <Row>
                    <Col size="12">
                        <SearchBooks books={this.state.books} handleSavedButton={this.handleSavedButton} />
                    </Col>
                </Row>
            </Container>
        );
    }


};

export default Search;