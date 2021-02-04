define({ "api": [
  {
    "type": "post",
    "url": "category/new",
    "title": "Create",
    "description": "<p>Creates a new category</p>",
    "name": "Create_Category",
    "group": "Category",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example: the title field is required",
          "content": "{\n    \"title\": \"category title\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentations/routes/category.js",
    "groupTitle": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token value.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The success of the responce usually is true</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>This contains the resource (an object or array of objects) and/or other required particulars</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200/201 OK\n{\n   \"success\": true,\n   \"message\": {...} or [{}, {}, ...],\n \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The success of this responce is usually false</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>This is the info about the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 xxx\n{\n  \"success\": false,\n  \"message\": \"info about the error if any\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "category/delete/categoryId",
    "title": "Delete",
    "description": "<p>Deletes a Category</p>",
    "name": "Delete_Category",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>the category's id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentations/routes/category.js",
    "groupTitle": "Category",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The success of the responce usually is true</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>This contains the resource (an object or array of objects) and/or other required particulars</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200/201 OK\n{\n   \"success\": true,\n   \"message\": {...} or [{}, {}, ...],\n \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The success of this responce is usually false</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>This is the info about the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 xxx\n{\n  \"success\": false,\n  \"message\": \"info about the error if any\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "category/all",
    "title": "Category List",
    "description": "<p>Retrieves all the categories</p>",
    "name": "List_Categories",
    "group": "Category",
    "version": "0.0.0",
    "filename": "documentations/routes/category.js",
    "groupTitle": "Category",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The success of the responce usually is true</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>This contains the resource (an object or array of objects) and/or other required particulars</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200/201 OK\n{\n   \"success\": true,\n   \"message\": {...} or [{}, {}, ...],\n \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The success of this responce is usually false</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>This is the info about the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 xxx\n{\n  \"success\": false,\n  \"message\": \"info about the error if any\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "category/edit/categoryId",
    "title": "Update",
    "description": "<p>Update a category title</p>",
    "name": "Update_Category",
    "group": "Category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>the category's id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example: the title field is required",
          "content": "{\n   \"title\": \"category title\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentations/routes/category.js",
    "groupTitle": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token value.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The success of the responce usually is true</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>This contains the resource (an object or array of objects) and/or other required particulars</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200/201 OK\n{\n   \"success\": true,\n   \"message\": {...} or [{}, {}, ...],\n \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The success of this responce is usually false</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>This is the info about the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 xxx\n{\n  \"success\": false,\n  \"message\": \"info about the error if any\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "movies/movie-count",
    "title": "Count",
    "description": "<p>Get total number of movies</p>",
    "name": "CountMovies",
    "group": "Movies",
    "version": "0.0.0",
    "filename": "documentations/routes/movies.js",
    "groupTitle": "Movies",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The success of the responce usually is true</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>This contains the resource (an object or array of objects) and/or other required particulars</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200/201 OK\n{\n   \"success\": true,\n   \"message\": {...} or [{}, {}, ...],\n \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The success of this responce is usually false</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>This is the info about the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 xxx\n{\n  \"success\": false,\n  \"message\": \"info about the error if any\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "movies/categoryId/upload",
    "title": "Create",
    "description": "<p>Creates a new movie</p>",
    "name": "Create_Movie",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>the category's id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example: all fields are required",
          "content": "{\n    coverpics_url: req.files[0].path,\n    movie_url: req.files[1].path,\n    title: req.body.title,\n    description: req.body.description,\n    release_date: req.body.release_date,\n    cast: req.body.cast,\n    category: req.params.id\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentations/routes/movies.js",
    "groupTitle": "Movies",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token value.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The success of the responce usually is true</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>This contains the resource (an object or array of objects) and/or other required particulars</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200/201 OK\n{\n   \"success\": true,\n   \"message\": {...} or [{}, {}, ...],\n \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The success of this responce is usually false</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>This is the info about the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 xxx\n{\n  \"success\": false,\n  \"message\": \"info about the error if any\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "movies/delete/movieId",
    "title": "Delete",
    "description": "<p>Deletes a Movie</p>",
    "name": "Delete_Movie",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "movieId",
            "description": "<p>the movie's id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentations/routes/movies.js",
    "groupTitle": "Movies",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The success of the responce usually is true</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>This contains the resource (an object or array of objects) and/or other required particulars</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200/201 OK\n{\n   \"success\": true,\n   \"message\": {...} or [{}, {}, ...],\n \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The success of this responce is usually false</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>This is the info about the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 xxx\n{\n  \"success\": false,\n  \"message\": \"info about the error if any\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "movies/categoryId/all",
    "title": "Movies List by Category",
    "description": "<p>Retrieves all movies in a category</p>",
    "name": "List_Movies",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>is the category's id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentations/routes/movies.js",
    "groupTitle": "Movies",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The success of the responce usually is true</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>This contains the resource (an object or array of objects) and/or other required particulars</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200/201 OK\n{\n   \"success\": true,\n   \"message\": {...} or [{}, {}, ...],\n \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The success of this responce is usually false</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>This is the info about the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 xxx\n{\n  \"success\": false,\n  \"message\": \"info about the error if any\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "movies",
    "title": "Movies List",
    "description": "<p>Retrieves all movies in the database</p>",
    "name": "List_Movies",
    "group": "Movies",
    "version": "0.0.0",
    "filename": "documentations/routes/movies.js",
    "groupTitle": "Movies",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The success of the responce usually is true</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>This contains the resource (an object or array of objects) and/or other required particulars</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200/201 OK\n{\n   \"success\": true,\n   \"message\": {...} or [{}, {}, ...],\n \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The success of this responce is usually false</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>This is the info about the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 xxx\n{\n  \"success\": false,\n  \"message\": \"info about the error if any\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "movies/search/movie?q=title",
    "title": "Search",
    "description": "<p>Search for a movie</p>",
    "name": "Search_Movie",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>is the movie title</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentations/routes/movies.js",
    "groupTitle": "Movies",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The success of the responce usually is true</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>This contains the resource (an object or array of objects) and/or other required particulars</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200/201 OK\n{\n   \"success\": true,\n   \"message\": {...} or [{}, {}, ...],\n \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The success of this responce is usually false</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>This is the info about the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 xxx\n{\n  \"success\": false,\n  \"message\": \"info about the error if any\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "movies/movieId/movie",
    "title": "Single Movie",
    "description": "<p>Retrieves data for a single movie</p>",
    "name": "Single_Movie",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "movieId",
            "description": "<p>is the movie's id</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentations/routes/movies.js",
    "groupTitle": "Movies",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The success of the responce usually is true</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>This contains the resource (an object or array of objects) and/or other required particulars</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200/201 OK\n{\n   \"success\": true,\n   \"message\": {...} or [{}, {}, ...],\n \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The success of this responce is usually false</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>This is the info about the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 xxx\n{\n  \"success\": false,\n  \"message\": \"info about the error if any\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "movies/edit/movieId",
    "title": "Update",
    "description": "<p>Update a movie</p>",
    "name": "Update_Movie",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "movieId",
            "description": "<p>the movie's id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example: allfields are required",
          "content": "{\n    coverpics_url: req.files[0].path,\n    movie_url: req.files[1].path,\n    title: req.body.title,\n    description: req.body.description,\n    release_date: req.body.release_date,\n    cast: req.body.cast,\n    category: req.params.id\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentations/routes/movies.js",
    "groupTitle": "Movies",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token value.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The success of the responce usually is true</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "message",
            "description": "<p>This contains the resource (an object or array of objects) and/or other required particulars</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 200/201 OK\n{\n   \"success\": true,\n   \"message\": {...} or [{}, {}, ...],\n \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>The success of this responce is usually false</p>"
          },
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>This is the info about the request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 xxx\n{\n  \"success\": false,\n  \"message\": \"info about the error if any\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });
