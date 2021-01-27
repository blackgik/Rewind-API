# Rewind-API

**Create an src/files directory - multer will save files here, then fs dletes the files after it is uploaded to cloudinary

BASE_URL: https://rewind-test.herokuapp.com/

fields:

coverpics_url,
movie_url,
title,
description,
release_date

UPLOAD_ROUTE: https://rewind-test.herokuapp.com/upload

GET_ALL_MOVIES_ROUTE: https://rewind-test.herokuapp.com/

GET_ONE_MOVIE_ROUTE: https://rewind-test.herokuapp.com/:id
where id is ObjectID i.e _id

SEARCH_MOVIE: https://rewind-test.herokuapp.com/movie/search

where search query param is "title" and has a value of the title of the movie