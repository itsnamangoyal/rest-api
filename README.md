# Rest Api

## Configuration
Before starting the application you need to configure two things.
### 1. MongoDB
By default the 'test' databse will be used to storing data on mongoCompass.
To change the uri, edit the *mongo.congig.js* file in root folder.
### 2. SendGrid
To change SendGrid API kEY, edit *sendGrid.config.js* file in root folder.


### To run this api on your machine, You need to:
## Install dependencies
run `npm install`
Then, either
## run  app in dev mode
run `npm run dev`
or
## run app in production mode
run `npm run start`

## By default the server should run on *http://localhost:5000/*

This REST APi has following routes:

1. POST /api/user/register
```
{
    email: (email to register with)
    password: (password for new account)
}
```
If email is not registered already then a 4-digit confirmation code will be sent to user's email-id, using which user need to confirm the registration. Without confirming registration user cannot log in.

2. POST /api/user/register-congirmation
```
{
  email: (email of user confirming registration)
  password: (password of user confirming registration)
  code: (the 4-digit confimation code sent to user's email)
}
```
if the code matches correctly then registration will be confirmed and now user can log in.

3. POST /api/user/login
```
{
  email: (email of registered user)
  password: (password of registered user)
}
```
If a user is found in a database then the session will be logged in with that user.
User needs to confirm-registration to be able to login.

4. POST /api/user/reset
```
{
  email: (email of user to update password)
}
```
If a user is found in database then a 4-digit confirmation code will be sent to user's email, after which user will have to use reset-confirmation method to update password.
This method can be used even if another user is logged in.

5. POST /api/user/reset-confirmation
```
{
  email: (user's registered email)
  password: (new password)
  code: (4-digit code sent to user's email)
}
```
If the code matches then user's password will be updated.

6. POST /api/media/upload
```
{
  video: (video file user wants to upload)
}
```
This method needs a user to be logged in beforehand and on success video file will be added to list of files of user.
This method returns link using which user can watch the video uploaded.

7. GET /api/media/
This method requires a user to be logged in before hand.
If a user is logged in then it returns list of names and link for video files uploaded by user.

8. GET /api/media/play
This method takes requires a user to be logged in beforehand.
query that need to be send with this method:
```
{
  filename: (name of the file to play)
}
```
The file requested needs to be uploaded by user itself or else the file wont be sent to user.