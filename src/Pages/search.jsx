import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/Search.css';
import { Link } from 'react-router-dom';
import './CSS/LoginSignup.css'

const Search = ({ setAccountVerified }) => {
    const [option, setOption] = useState('Search');
    const [query, setQuery] = useState('');
    const [bookData, setBookData] = useState([]);
    const [authorData, setAuthorData] = useState({});
    const [limit, setLimit] = useState(100);
    const [offset, setOffset] = useState(0);
    const [perPages, setPerPages] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const handleLogout = () => {
        setIsLoggedOut(true);
        // Add any additional logout logic here
    };

    const handleSearch = async () => {
        let url = `https://openlibrary.org/search.json?`;
        switch (option) {
            case 'Title':
                url += `title=${query}`;
                break;
            case 'Author':
                url += `author=${query}`;
                break;
            case 'Text':
                url += `text=${query}`;
                break;
            case 'Subject':
                url += `subject=${query}`;
                break;
            default:
                url += `q=${query}`;
        }
        url += `&limit=${limit}&offset=${offset}`;
        const response = await axios.get(url);
        console.log(response.data.docs);
        setBookData(response.data.docs);
        setCurrentPage(1); // Reset to first page after search
    };

    const fetchAuthorDetails = async (author) => {
        const authorUrl = `https://openlibrary.org/search/authors.json?q=${author}`;
        const authorResponse = await axios.get(authorUrl);
        return authorResponse.data.docs[0]; // Assuming you want the first result
    };

    useEffect(() => {
        const fetchAllAuthors = async () => {
            const authors = [...new Set(bookData.map(book => book.author_name && book.author_name[0]))].filter(Boolean);
            const authorDetails = await Promise.all(authors.map(author => fetchAuthorDetails(author)));
            const authorDataMap = authorDetails.reduce((acc, details) => {
                acc[details.name] = details;
                return acc;
            }, {});
            setAuthorData(authorDataMap);
        };

        if (option !== 'Author' && bookData.length > 0) {
            fetchAllAuthors();
        }
    }, [bookData, option]);
    
    const totalPages = Math.ceil(bookData.length / perPages);
    const startIndex = (currentPage - 1) * perPages;
    const endIndex = Math.min(startIndex + perPages, bookData.length);
    const currentBooks = bookData.slice(startIndex, endIndex);
    console.log('totalPages:' + totalPages);

    return (
        <div>
        {isLoggedOut ? (
            <div className="account-created">
                <p>Logout successful. <Link to="/">Click here</Link> to login again.</p>
            </div>
        ) : (
        <div>
            <div className='start'>
                <div className='Details'>
                    <div className='Option'>
                        <select onChange={(e) => setOption(e.target.value)}>
                            <option value="Search">All</option>
                            <option value="Title">Title</option>
                            <option value="Author">Author</option>
                            <option value="Text">Text</option>
                            <option value="Subject">Subject</option>
                        </select>
                    </div>
                    <div className='search'>
                        <input type="text" placeholder='Search' onChange={(e) => setQuery(e.target.value)} />
                    </div>
                    <div className='button'>
                        <button onClick={handleSearch}>Search</button>
                    </div>                
                </div>
                <div className='logout'>
                            <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div>
                <div className='diaplay_table'>
                    <table style={{ width: '100%', textAlign: 'center' }}>
                        <thead className='table_head'>
                            <tr>
                                <th>Title</th>
                                <th>Author Name</th>                                
                                <th>First Publish Year</th>
                                <th>Subject</th>
                                <th>Average Rating</th>
                                <th>Author Birth Date</th>
                                <th>Author Top Work</th>
                            </tr>
                        </thead>
                        <tbody className='table_body'>
                            {currentBooks.map((item, index) => {
                                const authorName = item.author_name && item.author_name[0];
                                const authorDetails = authorData[authorName] || {};

                                return (
                                    <tr key={index}>
                                        <td>{item.title}</td>
                                        <td>{authorName}</td>
                                        <td>{item.first_publish_year}</td>
                                        <td>{item.subject && item.subject[0]}</td>
                                        <td>{item.ratings_average}</td>
                                        <td>{authorDetails.birth_date}</td>
                                        <td>{authorDetails.top_work}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    
                </div>
                <div className="pagination">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                    <span>{`Page ${currentPage} of ${totalPages}`}</span>
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                    <select value={perPages} onChange={(e) => {
                        setPerPages(parseInt(e.target.value));
                        setCurrentPage(1); // Reset to first page when changing limit
                    }}>
                        <option value={10}>10 per page</option>
                        <option value={20}>20 per page</option>
                        <option value={50}>50 per page</option>
                        <option value={100}>100 per page</option>
                    </select>
                </div>
            </div>
        </div>
        )}
        </div>
    );
};

export default Search;
