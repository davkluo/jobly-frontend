# Jobly Frontend
Job board clone allowing users to make an account, view job postings, and apply for jobs.

The accompanying backend can be found [here](https://github.com/davkluo/express-jobly).

[Live Demo Link](http://davids-jobly.surge.sh)

## Table of Contents

- [Motivation](#motivation)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Setup](#setup)
- [Running the App](#running-the-app)
- [Viewing the App](#viewing-the-app)
- [Future Improvements](#future-improvements)

## Motivation

- Create a full-stack, single-page application with authentication/authorization
- Mimic a job board site where users can view companies and jobs, as well as apply for jobs

## Tech Stack

Built with React and Bootstrap

## Screenshots

<img width="1431" alt="Screen Shot 2023-04-05 at 12 09 21 PM" src="https://user-images.githubusercontent.com/108588437/230181378-ae56a249-609d-45e5-8632-913f7520b320.png">

<img width="1435" alt="Screen Shot 2023-04-05 at 12 09 35 PM" src="https://user-images.githubusercontent.com/108588437/230181407-d5687fca-0922-41ac-9422-6bc1ee6c6bfa.png">

<img width="1432" alt="Screen Shot 2023-04-05 at 12 10 19 PM" src="https://user-images.githubusercontent.com/108588437/230181436-0a5dbbb1-8127-4681-9cae-3eda01f86329.png">

<img width="1430" alt="Screen Shot 2023-04-05 at 12 10 40 PM" src="https://user-images.githubusercontent.com/108588437/230181492-c4aede19-b310-4e34-b61d-512c087ca795.png">

<img width="1431" alt="Screen Shot 2023-04-05 at 12 11 03 PM" src="https://user-images.githubusercontent.com/108588437/230181567-74ffc79a-aff9-4696-a736-0fa6a14283c1.png">

<img width="1431" alt="Screen Shot 2023-04-05 at 12 11 13 PM" src="https://user-images.githubusercontent.com/108588437/230181682-f2d0342d-7b22-40ff-9fe0-d61c6097261d.png">

## Setup

### Clone the repo

```bash
git clone git@github.com:davkluo/jobly-frontend.git
cd jobly-frontend
```

### Install dependencies

You will need `node` and `npm` installed globally on your machine.

```bash
npm install
```

### Set environment variables

```bash
cp .env.example .env
# open .env and modify the environment variables
```

The default REACT_APP_BASE_URL is the live link to my deployed backend. If you are running the backend locally use "http://localhost:3001".

## Running the App

```bash
npm start
```

## Viewing the App

Visit `http://localhost:3000` to view the app

## Future Improvements
- Write tests
- Allow users to cancel applications
- Scrape data from real job postings
