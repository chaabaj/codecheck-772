# Specs Change

### 1. Use HTTP status code for categorize error instead of store an HTTP status code in the response

  In the current spec we store the error code of a request in a field code in the response(sometimes not like in checking authentication). In new spec it will use the status code of the response to indicate the response status. It's make more easier to know the status of the response (http://www.restapitutorial.com/httpstatuscodes.html) instead having to check to status code in response

### 2. Change the use of authentication token
  
    Actually in Database we don't have any field to store the token. Token is actually stored in a global storage and can't be used if we run multiple instance of the server. 
    
    Solution :
    
    Add in user table a token, an expiration time and and a refresh token. 
    Setting the duration of a token to 1h.
    
    Also for the API that need an authentication. It must be pass in HTTP header field Authorization.
    If the user try more than 3 times a password we can use the new google recaptcha.
    API(https://www.google.com/recaptcha/intro/index.html)
    
### 3. Define API error format to detail an error

    Actually the API don't have coherent error format. It's very dependant of the request that the client made and cannot be used for translation.
    
    Solution : 
    
    Define an API error format for describing the error in the API.
    Use number to describe an error like :
    
    ```javascript
      const ErrorCodes {
        INVALID : 1,
        NOT_FOUND 2,
        FORBIDDEN_RESOURCE : 3
      }
    ```
    
    ```javascript
    {
      type : 'ValidationError',
      errors : [
        {
          field : 'offset',
          code : ErrorCodes.INVALID
        },
        {
          field : 'from',
          code : ErrorCodes.INVALID
        }
      ]
    }
    ```
    So we don't need to send a message, we can add more accurate error code to describe the error. The client have the responsability to convert error code number to a sentence in the locale of the user

### 4. Make different route for reserve and unreserve

  Actually it will be better if the API have two different route for reserve and unreserve.

### 5. Add a salt for hashing the password

  Actually password are hashed with SHA-1 hash function without salt. If an attacker succeed to have an access to the database he can use a rainbow table to find the passwords. Using bcrypt even if a attacker succeed to have a access to the database he can't use a rainbow table to find the passwords. The drawback is the bcrypt function consume a lot of computing power to generate a encrypted password that we can store in the database. 


