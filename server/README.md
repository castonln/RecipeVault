# API Endpoints

## Login
Endpoint: POST {APIPath}/authentication/login

### Description
Logs the user in to the application.

### Input
```json
{
  "username": "string",
  "password": "string"
}
```

### Use Cases
* Success Case
  * Status Code: 200 OK
  * Returns: User id
* Invalid Credentials
  * Status Code: 401 Unauthorized
  * Returns: Error message

## Sign Up
Endpoint: POST {APIPath}/authentication/signup

### Description
Signs a new user up for the application. Signs a user into the application.

### Input
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

### Use Cases
* Success Case
  * Status Code: 200 OK
  * Returns: User id
* User Already Exists (duplicate email or password)
  * Status Code: 422 Unprocessable Entity
  * Returns: Error message


## Get All Recipes
Endpoint: GET {APIPath}/recipes
Query Parameters: userId: "string"

### Description
Returns all of the existing recipes for the given user.

### Input
No Input.

### Use Cases
* Success Case
  * Status Code: 200 OK
  * Returns: List of recipes.
* No existing user with that id
  * Status Code: 422 Unprocessable Entity
  * Returns: Error message

## Get Recipe (With all recipe data)
Endpoint: GET {APIPath}/recipes/{recipeId}
Query Parameters: userId: "string"

### Description
Returns a complex recipe object that has all associated data. This includes data stored
in other tables such as a list of the instructions or a list of the recipe ingredients.

### Input
No Input.

### Use Cases
* Success Case
  * Status Code: 200 OK
  * Returns: Complex recipe object.
* No existing user with that id
  * Status Code: 422 Unprocessable Entity
  * Returns: Error message
* No existing recipe with that id
  * Status Code: 422 Unprocessable Entity
  * Returns: Error message

## Create Recipe
Endpoint: POST {APIPath}/recipes
Query Parameters: userId: "string"

### Description
Creates a new recipe. This just works with the data that would be stored in the recipe table.

### Input
```json
{
  "name": "string",
  "description": "string",
  "servings": "decimal",
  "servingSize": "decimal",
  "prepTime": "decimal",
  "cookTime": "decimal",
  "createdBy": "Guid" // This will be the user id
}
```

### Use Cases
* Success Case
  * Status Code: 201 Created
  * Returns: Created object.
* Issues with body
  * Status Code: 422 Unprocessable Entity
  * Returns: Error message
* Invalid createdBy (userId)
  * Status Code: 422 Unprocessable Entity
  * Returns: Error message
* No existing user with that id
  * Status Code: 422 Unprocessable Entity
  * Returns: Error message

## Modify Recipe
Endpoint: PUT {APIPath}/recipes
Query Parameters: userId: "string"

### Description
Modifies a recipe. This just works with the data that would be stored in the recipe table.

### Input
```json
{
  "id": "Guid", // This will be the recipe id
  "name": "string",
  "description": "string",
  "servings": "decimal",
  "servingSize": "decimal",
  "prepTime": "decimal",
  "cookTime": "decimal",
  "createdBy": "Guid" // This will be the user id
}
```

### Use Cases
* Success Case
  * Status Code: 200 Ok
  * Returns: Modified object.
* Issues with body
  * Status Code: 422 Unprocessable Entity
  * Returns: Error message
* Invalid createdBy (userId)
  * Status Code: 422 Unprocessable Entity
  * Returns: Error message
* Invalid id (recipeId)
  * Status Code: 422 Unprocessable Entity
  * Returns: Error message
* No existing user with that id
  * Status Code: 422 Unprocessable Entity
  * Returns: Error message

## Delete Recipe
Endpoint: DELETE {APIPath}/recipes/{recipeId}
Query Parameters: userId: "string"

### Description
Deletes a recipe. NOTE: This will scale to the associated instructions and recipe ingredients.

### Input
No Input.

### Use Cases
* Success Case
  * Status Code: 200 Ok
  * Returns: Deleted object.
* Invalid recipe id (recipeId)
  * Status Code: 422 Unprocessable Entity
  * Returns: Error message
* No existing user with that id
  * Status Code: 422 Unprocessable Entity
  * Returns: Error message

## Interact with recipe instructions
Endpoint: PATCH {APIPath}/recipes/{recipeId}/instructions
Query Parameters: userId: "string"

### Description
Interacts with a recipe's instructions. This takes a list of actions to perform on the instructions for the given recipe. It performs the operations in the order: Create, Update, Delete.

### Input
```json
[
  {
    "action": "string ('create', 'update', delete')",
    "instructionNumber": "int",
    "recipeId": "Guid", // This is the id of the recipe the instruction is part of
    "description": "string",
    "id": "Guid" // Need to include id of instruction if update or delete
  }
]
```

### Use Cases
* Success Case
  * Status Code: 200 Ok
  * Returns: List of modified instructions.
* Issues with body
  * Status Code: 422 Unprocessable Entity
  * Returns: Error message
* Invalid recipe id
  * Status Code: 422 Unprocessable Entity
  * Returns: Error message
* Update or Delete operation selected and id missing or invalid
  * Status Code: 422 Unprocessable Entity
  * Returns: Error message
* No existing user with that id
  * Status Code: 422 Unprocessable Entity
  * Returns: Error message

## Interact with recipe ingredients
Endpoint: PATCH {APIPath}/recipes/{recipeId}/ingredients
Query Parameters: userId: "string"

### Description
Interacts with a recipe's ingredients. This takes a list of actions to perform on the ingredients for the given recipe. It performs the operations in the order: Create, Update, Delete.

### Input
```json
[
  {
    "action": "string ('create', 'update', delete')",
    "ingredientId": "Guid", // This is the id of the ingredient
    "recipeId": "Guid", // This is the id of the recipe the recipe ingredient is part of
    "quantity": "int",
    "unit": "string",
    "id": "Guid" // Need to include id of instruction if update or delete
  }
]
```

### Use Cases
* Success Case
  * Status Code: 200 Ok
  * Returns: List of modified recipe ingredients.
* Issues with body
  * Status Code: 422 Unprocessable Entity
  * Returns: Error message
* Invalid recipe id
  * Status Code: 422 Unprocessable Entity
  * Returns: Error message
* Invalid ingredient id
  * Status Code: 422 Unprocessable Entity
  * Returns: Error message
* Update or Delete operation selected and id missing or invalid
  * Status Code: 422 Unprocessable Entity
  * Returns: Error message
* No existing user with that id
  * Status Code: 422 Unprocessable Entity
  * Returns: Error message