# Interlyst AI – AI-Powered Interview Preparation & Resume Tailoring Platform

Interlyst AI is a full-stack AI-powered interview preparation platform that helps users generate personalized interview reports from job descriptions and resume PDFs. The platform analyzes the candidate profile, extracts resume content, generates interview preparation insights, identifies skill gaps, creates preparation roadmaps, and produces ATS-friendly tailored resume PDFs.

## Features

- User registration and login with secure cookie-based authentication
- Protected home page access for authenticated users
- Resume PDF upload with file validation
- Job description input for role-specific preparation
- AI-generated personalized interview reports
- Match score generation based on resume and job description
- Technical and behavioral interview questions
- Skill gap analysis with severity levels
- Day-wise preparation roadmap
- Recent interview plan listing
- Detailed interview report viewing
- ATS-friendly tailored resume PDF generation
- Logout with token blacklisting

## Tech Stack

### Frontend
- React.js
- Vite
- Sass
- React Router
- Axios
- Context API
- Custom Hooks

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt.js
- cookie-parser
- CORS
- Multer
- pdf-parse
- Google GenAI SDK
- Zod schema validation
- Puppeteer

## Project Highlights

- Built 4 frontend routes using React Router.
- Implemented 8 RESTful APIs, including 4 authentication APIs and 4 interview APIs.
- Integrated 2 AI workflows for interview report generation and tailored resume PDF generation.
- Used JWT-based cookie authentication with token blacklisting.
- Used Multer and pdf-parse to process resume PDFs.
- Used Zod schema validation to structure AI-generated responses.
- Used Puppeteer to convert AI-generated resume HTML into PDF format.


## Live Demo

- 