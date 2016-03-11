# Routes #

####Login View
`GET /api/auth`

(come back to this route once we know how we are logging in)

* **Use**: To login, find or create user, uses FB OAuth
* **Request**:
* **Response**:

####Video View
`POST /api/quilt`

* **Use**: To send quilt info. Including quilt title, theme, selected friends, and init video.
* **Request**: Pass quilt data =>`{title: '', theme: '', selFriends: '', video: ''}`
* **Response**: Responds with "Succesfully created quilt" on success and "Failed to create quilt" on failure

####Quilts View
`GET api/quilt`

* **Use**: To get all the quilts with their title, theme, status
* **Request**: Simple get request to api
* **Response**: On success, responds with quilt object =>`{title: '', theme: '', status: ''}`

####Individual Quilt Video View
`GET api/quilt/:id`

* **Use**: To get an individual quilt video
* **Request**: Simple get request to api
* **Response**: Responds with quilt video

####Post Quilt Video View
`POST api/quilt/:id`
  send video and concat to quilt

* **Use**: To send a video to the server for concatenation
* **Request**: Post request to the server with the video
* **Response**: Responds with quilt video

####Select Friends For Quilt View
`GET /api/friends/:id`

* **Use**: To get the friends of the identified user
* **Request**: Get request made to server with the user_id
* **Response**: On succes, responds with friends array

###On Hold:
-----------------------------
* Find Friends View
* get /api/users
* post /api/friends/:id

