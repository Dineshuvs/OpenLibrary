
#Admin Dashboard for Book Records

This project is an admin dashboard that lists book records in a tabular format, populated from an API call to the Open Library API. The dashboard supports pagination, sorting, and various other features.

##Features
- Fetches book records from the [Open Library API](https://openlibrary.org/developers/api).
- Displays columns: `ratings_average`, `author name`, `title`, `first_publish_year`, `subject`, `author_birth_date`, `author_top_work`.
- Pagination with configurable records per page (10, 20, 50, 100).
- Sorting in ascending/descending order on all columns.
- User authentication is used to log into the dashboard.

##Technologies Used
- **Frontend**: ReactJS, React Router, Axios
- **Backend**: Flask, Flask-CORS
- **Styling**: CSS
  
## Setup Instructions

### Prerequisites

- Node.js and npm installed.
- Python and pip installed.
- Git installed.
