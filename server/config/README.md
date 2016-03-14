# Routes #

####Login View
`GET /api/auth`

(come back to this route once we know how we are logging in)

* **Use**: To login, find or create user, uses FB OAuth
* **Request**: Request must include username in query string or api will respond with 400
* **Response**: Responds with user object
  * On success, responds with 200 and
  `{"id": 3, "username": "tasio"}`
  * On failure, responds with 500 and "Failed request"

####Video View
`POST /api/quilt`

* **Use**: To send quilt info. Including quilt title, theme, selected friends, and init video.
* **Request**: Accepts urlencoded form data with these props

  ```
  {
      "id": int,
      "filename": string,
      "status": int,
      "createdAt": Date,
      "updatedAt": Date,
      "UserQuilt": {
        "status": int,
        "createdAt": Date,
        "updatedAt": Date,
        "quiltId": int,
        "userId": int
      }
  }
  ```
* **Response**: Responds with quilt object
  * On failure, responds with 500 and "Failed submission"
  * On success, responds with 200 and

  ```
  {
      "status": 0,
      "quiltId": 33,
      "userId": 3,
      "createdAt": "2016-03-14T07:18:26.016Z",
      "updatedAt": "2016-03-14T07:18:26.016Z"
  }
  ```

####Quilts View
`GET api/quilt`

* **Use**: To get all the quilts with their title, theme, status
* **Request**: Request must include username in query string or api will respond with 400
* **Response**: Responds with array of UserQuilt objects
  * On failure, responds with 500 and "Failed request"
  * On success, responds with 200 and

  ```
  [ {
      "id": int,
      "filename": string,
      "status": int,
      "createdAt": Date,
      "updatedAt": Date,
      "UserQuilt": {
        "status": int,
        "createdAt": Date,
        "updatedAt": Date,
        "quiltId": int,
        "userId": int
      }
  } ]
  ```

####Individual Quilt Video View
`GET api/quilt/:id`

* **Use**: To get an individual quilt video by id
* **Request**: Get request passing in the id as a parameter
* **Response**: Responds with an individual quilt object
  * On failure, responds with 500 and "Failed request"
  * On success, responds with 200 and

  ```
  {
      "id": 2,
      "filename": "quilt2",
      "status": 0,
      "createdAt": "2016-03-14T04:30:09.475Z",
      "updatedAt": "2016-03-14T04:30:09.475Z"
  }
  ```

####Post Quilt Video View
`POST api/quilt/:id`

* **Use**: To send a video to the server for concatenation
* **Request**: Post request with the video and quilt id
* **Response**: Responds with quilt video
  * On failure, responds with 500 and "Failed request"
  * On success, responds with 200 and "Received video submission"


###On Hold:
-----------------------------
* Find Friends View
* get /api/users
* post /api/friends/:id

####Select Friends For Quilt View
`GET /api/friends/:id`

* **Use**: To get the friends of the identified user
* **Request**: Get request made to server with the user_id
* **Response**: On succes, responds with friends array

