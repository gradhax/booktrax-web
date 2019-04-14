# BookTrax Web
## Overview
BookTrax is a web application that enhances the reading experience by adding context-aware audio/visual multimedia in addition to transforming text into an audiobook. Utilizing AI services from Amazon and Google based on deep learning models, text selected for reading is analyzed for sentiment and entity extraction that is used to play appropriate background soundtracks and display a relevant GIF via the Giphy API. As the narrator reads the text, users can also follow along on the screen via text highlighting.

BookTrax was originally developed by the GradHax team for the HackSC Spring 2019 Hackathon held in Los Angeles from April 12th - April 14th.
## BookTrax Web Repo
The booktrax-web repo stores the code for the React-based client application. BookTrax Web interacts with the corresponding server application BookTrax Streamer via web sockets to keep an open communication channel for the mp3s generated from the AWS Polly service for text-to-speech. As data is provided to the client app, speech and music tracks are played and visuals such as sentence highlighting and relevant GIFs can be seen.
