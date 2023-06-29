/**
 * @swagger
 * components:
 *  schemas:
 *    Movie:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: Auto-generated ID of the movie
 *        title:
 *          type: string
 *          description: Movie title
 *        language:
 *          type: string
 *          enum: [English, Spanish, French, German, Italian, Korean, Chinese, Japanese]
 *          description: Valid movie language
 *        rating:
 *          type: string
 *          enum: [G, PG, PG-13, R, NC-17, NR]
 *          description: Valid movie rating
 *        duration:
 *          type: integer
 *          minimum: 1
 *          maximum: 999
 *          description: Movie duration in minutes (1-999)
 *        release_date:
 *          type: string
 *          description: Valid movie release date
 *        trailer:
 *          type: string
 *          description: Valid movie trailer url
 *        sinopsis:
 *          type: string
 *          description: Movie sinopsis
 *        director:
 *          type: string
 *          description: Movie director(s)
 *        casting:
 *          type: string
 *          description: Movie cast
 *        poster:
 *          type: string
 *          format: binary
 *          description: Movie poster file
 *        created_at:
 *          type: date
 *          description: Auto-generated creation date of the movie
 *        updated_at:
 *          type: date
 *          description: Auto-generated updating date of the movie
 *      required:
 *        - title
 *        - language
 *        - rating
 *        - duration
 *        - release_date
 *        - trailer
 *        - sinopsis
 *        - director
 *        - casting
 *      example:
 *        id: dce4e716-9b83-423c-a6a7-9040454f36df
 *        title: Movie Test
 *        language: English
 *        rating: G
 *        duration: 100
 *        release_date: 2023-09-12
 *        trailer: https://example.com
 *        sinopsis: Sinopsis test
 *        director: Director test
 *        casting: Cast test
 *        poster: {
 *          url: string,
 *          id: string
 *        }
 *        created_at: 2023-06-24T19:30:13.447Z
 *        updated_at: 2023-06-25T19:20:43.447Z
 *
 *    MovieToCreate:
 *      allOf:
 *        - $ref: '#/components/schemas/Movie'
 *        - type: object
 *          required:
 *            - poster
 *
 *    Poster:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *           description: Image URL set by the server
 *         id:
 *           type: string
 *           description: Image ID set by the server
 *       required:
 *        - url
 *        - id
 *       example:
 *        url: https://res.cloudinary.com/chrod90/image/upload/v1687635012/app-movies-posters-test/scd3glslxvhoiqh13a98.jpg
 *        id: app-movies-posters-test/scd3glslxvhoiqh13a98
 *
 *  parameters:
 *    movieId:
 *      in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: string
 *      description: ID of the movie to handle
 *    movieTitle:
 *      in: path
 *      name: title
 *      required: true
 *      schema:
 *        type: string
 *      description: Value to match the title of movies to be searched
 */

// ******************** Get all movies ********************
/**
 * @swagger
 * /movies:
 *  get:
 *    summary: Get all movies
 *    tags: [Movies]
 *    responses:
 *      200:
 *        description: List of movies
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Movie'
 *      204:
 *        description: Database empty
 *      500:
 *        description: Internal server error
 */

// ******************** Create a movie ********************
/**
 * @swagger
 * /movies:
 *  post:
 *    summary: Create a new movie
 *    tags: [Movies]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/MovieToCreate'
 *    responses:
 *      201:
 *        description: Movie created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movie'
 *      400:
 *        description: Bad request
 *      409:
 *        description: Existing movie with the provided title or trailer
 *      500:
 *        description: Internal server error
 */

// ******************** Update a movie ********************
/**
 * @swagger
 * /movies/{id}:
 *  put:
 *    summary: Update a movie by id
 *    tags: [Movies]
 *    parameters:
 *      - $ref: '#/components/parameters/movieId'
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/Movie'
 *    responses:
 *      200:
 *        description: Movie updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movie'
 *      204:
 *        description: No movie to update
 *      400:
 *        description: Bad request
 *      409:
 *        description: Existing movie with the provided title or trailer
 *      500:
 *        description: Internal server error
 */

// ******************** Delete a movie ********************
/**
 * @swagger
 * /movies/{id}:
 *  delete:
 *    summary: Delete a movie by id
 *    tags: [Movies]
 *    parameters:
 *      - $ref: '#/components/parameters/movieId'
 *    responses:
 *      200:
 *        description: Movie deleted successfully
 *      204:
 *        description: No movie to delete
 *      400:
 *        description: Bad request
 *      500:
 *        description: Internal server error
 */

// ******************** Get movie by id ********************
/**
 * @swagger
 * /movies/{id}:
 *  get:
 *    summary: Get a movie by id
 *    tags: [Movies]
 *    parameters:
 *      - $ref: '#/components/parameters/movieId'
 *    responses:
 *      200:
 *        description: Found movie
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movie'
 *      400:
 *        description: Bad request
 *      204:
 *        description: Movie doesn't exist
 *      500:
 *        description: Internal server error
 */

// ******************** Get movies by title ********************
/**
 * @swagger
 * /movies/search/{title}:
 *  get:
 *    summary: Get movies by title
 *    tags: [Movies]
 *    parameters:
 *      - $ref: '#/components/parameters/movieTitle'
 *    responses:
 *      200:
 *        description: List of found movies
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Movie'
 *      204:
 *        description: No movie found
 *      500:
 *        description: Internal server error
 */
