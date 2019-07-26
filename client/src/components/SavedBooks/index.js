import React from "react";
import "./style.css"
import {Row, Col} from "../Grid"

const SavedBooks = props => {
    return (props.savedBooks.length === 0) ? (
        <div className="card">
            <div className="card-body player">
                <div className="article">
                    <h3>Your Saved Books</h3>
                </div>
            </div>
        </div>
    ):(
        <div className="card">
            <div className="card-body player">
                <div className="article">
                    <h3>Your Saved Books</h3>
                    {props.savedBooks.map(savedBook => {
                        return (
                            <li className="saved-list list-group-item" key={savedBook._id}>
                                <Row className="SearchBooks" id={savedBook.title + "Card"} >
                                    {/* col-3 show image of the book */}
                                    <Col size="2" className="bookImage">
                                        <img src={savedBook.image} alt={savedBook.title} />
                                    </Col>
                                    <Col size="1" className="emptyCol"/>
                                    {/* col-9 show information of the book */}
                                    <Col size="9" className="bookInfo">
                                        <Row>
                                            <h2 className="bookTitle">{savedBook.title}</h2>
                                        </Row>
                                        <Row>
                                            <h3 className="bookAuthor">{savedBook.author}</h3>
                                        </Row>
                                        <Row>
                                            <p className="bookDescription">{savedBook.description}</p>
                                        </Row>
                                    </Col>
                                </Row>
                                <br></br>
                                <Row className="buttonDiv ">
                                    <button className="deleteBook btn btn-danger" id={savedBook._id} onClick={() => props.handleDeleteButton(savedBook._id)}>
                                        Delete Book
                                    </button>
                                    <a href={savedBook.link} className="viewBook btn btn-success" target="_blank">View Book</a>
                                </Row>
                            </li>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
export default SavedBooks