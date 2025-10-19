# Dynamic Profile API

A RESTful API endpoint that returns profile information along with dynamic cat facts fetched from an external API.

## Features

- GET `/me` endpoint with profile information
- Dynamic cat facts from [Cat Facts API](https://catfact.ninja/)
- Real-time UTC timestamp in ISO 8601 format
- Error handling and fallback mechanisms
- Rate limiting and security headers
- Comprehensive testing

## Tech Stack

- **Backend**: Node.js/Express
- **HTTP Client**: Axios
- **Security**: Helmet, CORS, Rate Limiting
- **Testing**: Jest, Supertest
- **Environment Management**: dotenv

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd dynamic-profile-api