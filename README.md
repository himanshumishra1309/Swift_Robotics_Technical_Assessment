# AI Economics News Monitoring Agent

An AI-powered news monitoring system that automatically fetches, filters, summarizes, and categorizes economics-related news using Google's Gemini AI. The project is designed as a modular MVP that demonstrates how Large Language Models can be integrated into an automated news intelligence pipeline.

---

## 📌 Project Overview

The goal of this project is to build an intelligent news monitoring agent capable of:

* Monitoring news related to a country's economy
* Filtering out irrelevant articles
* Generating concise AI-powered summaries
* Categorizing news into meaningful categories
* Assigning an importance score to each article
* Allowing users to dynamically manage monitored topics, sources, and competitors
* Presenting processed news through a simple dashboard

Instead of displaying every fetched article, the system performs semantic analysis using Gemini AI and stores only the relevant information.

---

## 🚀 Features

### News Collection

* Fetches economics-related news from GNews API
* Retrieves the latest articles based on configurable topics

### AI Processing

* Uses Gemini AI for semantic understanding
* Filters irrelevant articles
* Generates concise summaries
* Categorizes each article
* Assigns an importance score (1–5)
* Identifies related competitors (if applicable)

### Watchlist Management

Users can dynamically:

* Add topics
* Remove topics
* Add news sources
* Remove news sources
* Add competitors
* Remove competitors

without modifying the code.

### Dashboard

* Run the AI pipeline manually
* View processed articles
* View AI-generated summaries
* Importance indicator
* Source information
* Publication date
* Direct link to the original article

---

# 🏗 Architecture

The application follows a modular layered architecture.

```
Frontend
      │
      ▼
Express API
      │
      ▼
Pipeline Service
      │
      ├────────► Fetch News Service
      │               │
      │               ▼
      │          GNews API
      │
      ▼
Gemini AI Service
      │
      ▼
Article Processing
      │
      ▼
MongoDB
      │
      ▼
Frontend Dashboard
```

---

# 📂 Project Structure

```
server
│
├── config
│
├── controllers
│
├── models
│
├── routes
│
├── services
│
├── utils
│
├── app.js
└── index.js

client
│
├── api
├── components
├── pages
├── styles
└── App.jsx
```

---

# ⚙ Tech Stack

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Axios
* Gemini API
* GNews API

## Frontend

* React
* Vite
* CSS

---

# 🧠 AI Workflow

The complete pipeline works as follows:

1. User starts the pipeline.

2. Backend loads the current watchlist.

3. News is fetched from GNews.

4. Duplicate articles are removed.

5. Articles are sent to Gemini AI.

6. Gemini performs:

* Relevance filtering
* Categorization
* Importance scoring
* Summary generation
* Competitor identification

7. Relevant articles are stored in MongoDB.

8. Dashboard displays processed articles.

---

# 📊 Database Models

## Watchlist

Stores the monitoring configuration.

Fields

* country
* topics
* sources
* competitors

---

## Article

Stores processed articles.

Fields

* title
* description
* summary
* category
* importance
* source
* url
* relatedCompetitor
* publishedAt

---

# 🌐 REST API

## Watchlist

### Get Watchlist

```
GET /api/watchlist
```

### Add Topic

```
POST /api/watchlist/topic
```

Body

```json
{
  "value": "GDP"
}
```

### Delete Topic

```
DELETE /api/watchlist/topic/:value
```

---

### Add Source

```
POST /api/watchlist/source
```

### Delete Source

```
DELETE /api/watchlist/source/:value
```

---

### Add Competitor

```
POST /api/watchlist/competitor
```

### Delete Competitor

```
DELETE /api/watchlist/competitor/:value
```

---

## Articles

Retrieve processed articles.

```
GET /api/articles
```

---

## Pipeline

Run the complete AI workflow.

```
POST /api/pipeline/run
```

Returns

```json
{
    "fetched": 10,
    "kept": 7,
    "discarded": 3
}
```

---

# ⚙ Environment Variables

Backend

```
PORT=

MONGODB_URI=

GNEWS_API_KEY=

GEMINI_API_KEY=

DEFAULT_COUNTRY=
```

---

# 🔑 API Keys & Database Configuration

Before running the application, you'll need to configure MongoDB Atlas, GNews API, and Google Gemini API.

---

## 1. MongoDB Atlas

This project uses MongoDB Atlas as its database.

### Create an Atlas Cluster

1. Visit https://www.mongodb.com/atlas
2. Create a free account or sign in.
3. Create a new project.
4. Create a free **M0 Cluster**.
5. Create a database user by navigating to **Database Access**.
6. Configure **Network Access** and allow your current IP address (or `0.0.0.0/0` for development only).
7. Click **Connect** → **Drivers**.
8. Copy the MongoDB connection string.

Example:

```text
mongodb+srv://<username>:<password>@cluster.mongodb.net/economics-news?retryWrites=true&w=majority
```

Replace:

* `<username>` with your Atlas username
* `<password>` with your Atlas password

Finally, paste the connection string into your `.env` file.

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/economics-news?retryWrites=true&w=majority
```

---

## 2. Google Gemini API

The project uses Gemini for AI-powered article analysis.

### Generate an API Key

1. Visit https://aistudio.google.com/app/apikey
2. Sign in with your Google account.
3. Click **Create API Key**.
4. Copy the generated API key.

Add it to your `.env` file.

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

The application currently uses the **gemini-2.5-flash** model.

---

## 3. GNews API

News articles are fetched using the GNews API.

### Generate an API Key

1. Visit https://gnews.io/
2. Create a free account.
3. Navigate to your Dashboard.
4. Copy your API key.

Add it to your `.env` file.

```env
GNEWS_API_KEY=YOUR_GNEWS_API_KEY
```

---

## 4. Configure Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
PORT=8000

MONGODB_URI=YOUR_MONGODB_ATLAS_URI

GEMINI_API_KEY=YOUR_GEMINI_API_KEY

GNEWS_API_KEY=YOUR_GNEWS_API_KEY

DEFAULT_COUNTRY=in
```

---

## 5. Start the Application

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

The backend will run on:

```text
http://localhost:8000
```

The frontend will run on:

```text
http://localhost:5173
```

---

# 💡 Design Decisions

The project intentionally follows a service-oriented architecture.

Each service has a single responsibility:

* FetchNewsService handles external news retrieval.
* GeminiService performs AI reasoning.
* PipelineService orchestrates the complete workflow.

This separation improves maintainability and makes it easy to replace individual components.

For example, switching from GNews to another provider only requires changes in the news service.

---

# 🚧 Current Limitations

This project is an MVP built to demonstrate the complete AI workflow.

Current limitations include:

* Uses only one news provider (GNews)
* Duplicate detection is URL-based instead of semantic
* Pipeline execution is manual
* No authentication or user management
* No scheduling
* No caching layer
* No notification system

---

# 🔮 Future Improvements

Given additional development time, the following enhancements would be implemented:

## Multiple News Sources

Aggregate data from:

* Reuters RSS
* Google News RSS
* NewsData.io
* Government publications

to improve coverage and reliability.

---

## Semantic Deduplication

Use embeddings to detect duplicate stories even when headlines differ.

---

## Automated Scheduling

Replace manual execution with cron jobs or BullMQ workers.

---

## Notification System

Support

* Email alerts
* Slack
* Microsoft Teams
* Webhooks

for high-priority updates.

---

## Vector Database

Store embeddings in a vector database to enable:

* Semantic search
* Trend analysis
* Historical question answering
* Retrieval-Augmented Generation (RAG)

---

## User Feedback

Allow users to rate article relevance.

Collected feedback can later improve prompts and ranking.

---

## Production Improvements

* Redis caching
* Rate limiting
* Retry mechanisms
* Health checks
* Monitoring
* Logging
* Docker deployment
* CI/CD pipeline

---

# 🎯 Timeframe

This project was intentionally developed as a Minimum Viable Product (MVP) within a limited time frame. The focus was on demonstrating the complete AI-driven workflow—from news collection and semantic analysis to storage and visualization—while keeping the architecture modular and extensible for future enhancements.

---

# 📜 License

This project is intended for educational and demonstration purposes.
