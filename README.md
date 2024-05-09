# equitable-technologies
## Internship take home assignment

# Running the code
This Frontend part is done in React and the Backend of the code is written in python (Flask).
## Download the Zip file of the code from the github.
## Frontend
1. Goto frontend folder through terminal and use command.
   ------------------------------------
   npm i
   ------------------------------------
2. After all the node modules are installed run the code.
   ------------------------------------
   npm start
   ------------------------------------

## Backend
1. Goto the backend folder which includes backend.py
2. Install all the packages from the requirement.txt file.
   ------------------------------------
   pip install -r requirements.txt
   ------------------------------------
3. Run the code.
   ------------------------------------
   python3 backend.py
   ------------------------------------

# Tasks Completed
1. Image Upload
2. Image Annotation
3. Data Management
4. User Interface
5. Search functionality
6. Resizing image
7. User Authentication
8. User authorization

# Approach
  1. In my approach i have used server storage as storage and mongoDb as databses.
  2. Firstly a person will register that will generate a permanent userID for login.
  3. The login handles error cases like incorrect password and not registered users.
  4. Once Logged in with the userID, there will be a jwt token generated which will be stored in the localstorage.
  5. This token will help in authorization of the users.
  6. At the home page there will be options to drag and drop the images and manually choose and upload the images.Also there      will be a preview the images selected.
  7. After selection a dropdown menu will appear that will contain 10 different classes for the images for annotation. After 
     a class is selected, user can upload the image by clicking on upload function which will upload the image copy in the        server with a reference of it in the mongoDb atlas imgData schema.
  8. The side bar includes all the images uploaded by a user and it also includes a search feature which uses regex to find       the images.
  9. On clicking, the images will open in the preview with the class that was uploaded by the user.
  10. All the uploaded images by a user will be protected as without security token no-one can access other persons data.

# Alternatives
## Storing of Images
  1. The images could have been stored in the mongoDb database using multer library or by encoding the image file into base-       64 encoding.
## Advance Image Processing
  1. Seam phasing algorithm can be used to resize the image.

# Registration page
  The page includes a form that has name, email and password that you need to login to the webpage.
  <img width="1440" alt="registrationpage" src="https://github.com/aakritkumar04/equitable-technologies/assets/99708171/c6ab1b93-f2ef-4207-838a-0fb899a7e207">

  Once registered you will get login id which will be your permanent user ID to login to the account.
  <img width="1440" alt="registrationsuccessful" src="https://github.com/aakritkumar04/equitable-technologies/assets/99708171/5d6b9a8d-e419-4010-bf30-9031c7d15743">

# Login Page
  The page includes a form consisting of ID and password section where you can login to you account.
  <img width="1440" alt="loginpage" src="https://github.com/aakritkumar04/equitable-technologies/assets/99708171/05b53feb-a3f6-45d5-9478-b7190bb6d998">
  <img width="1440" alt="loginthroughid" src="https://github.com/aakritkumar04/equitable-technologies/assets/99708171/b7c58126-3c1f-4729-8eda-f12007862435">
Also there are errors that are handled if the person is not registered and tried to login or if the password of the user is incorrect.
<img width="1440" alt="loginErrHandling1" src="https://github.com/aakritkumar04/equitable-technologies/assets/99708171/84b7fb83-2297-44ed-9836-6a8c7d440638">
<img width="1440" alt="loginerrhandling2" src="https://github.com/aakritkumar04/equitable-technologies/assets/99708171/beebf2ef-c95d-471e-8332-b75c8a15878e">

# Homepage
## Drag and Drop
  This is the page page of the app which includes features like drag and drop, choose file, upload and sidebar.
  <img width="1440" alt="homepage" src="https://github.com/aakritkumar04/equitable-technologies/assets/99708171/b0bd7708-574a-43b7-b2f6-a438744bc87f">
Some animations and effects are done like typing of text in the drag box and zoom-in zoom-out effect of buttoms, offcanvas sidebar, etc.
![draganddrop](https://github.com/aakritkumar04/equitable-technologies/assets/99708171/5d24584c-0706-46bb-a476-a59ac651f838)
<img width="1440" alt="draganddropsuccess" src="https://github.com/aakritkumar04/equitable-technologies/assets/99708171/ef9f6f21-98d6-4c3b-8a86-7ee8f88cdaf8">
User can select classes of the image from the homepage once you choose an image a dropdown option for the image will open which contains 10 classes as per CIFAR-10.
<img width="1440" alt="classselected" src="https://github.com/aakritkumar04/equitable-technologies/assets/99708171/e5483ee8-ea7a-4407-b88a-f5304ab9b0a7">

## Choose file 
  You can also choose the file manually using choose file button.
  <img width="1440" alt="choosefile" src="https://github.com/aakritkumar04/equitable-technologies/assets/99708171/556f23cf-4d3a-4867-9616-dd4d9160e772">
You can then select the class for the image in the dropdown menu once the image is loaded.
<img width="1440" alt="choosefileclassselected" src="https://github.com/aakritkumar04/equitable-technologies/assets/99708171/e1ee51ea-66a8-4430-a929-59d58db48e09">

## Upload 
  You can upload the image on the server with the referance on the mongoDb database.
  <img width="1440" alt="uploadsuccess" src="https://github.com/aakritkumar04/equitable-technologies/assets/99708171/c9130bbd-7e42-49e0-b103-04e63c1a85a9">
  
## MongoDb Atlas
  The data is all stored in mongoDb Atlas.
  <img width="1440" alt="mongodbschema2" src="https://github.com/aakritkumar04/equitable-technologies/assets/99708171/6462df71-ab5f-41f2-b24c-c769491c1d6a">
<img width="1440" alt="mongodbschema1" src="https://github.com/aakritkumar04/equitable-technologies/assets/99708171/e98170f1-c3a5-4a8e-8f20-d49de363911d">

## Server Database
  A copy of the image is stored in the server in an organised format of uploads/userID/class/image.
  <img width="1440" alt="filestoredbackendtree" src="https://github.com/aakritkumar04/equitable-technologies/assets/99708171/087d9d88-39e8-41a7-9001-d76509f1ee9d">

## Side Bar
  This includes all the images posted by a user ID.
  <img width="1440" alt="sidebarwithstoreimages" src="https://github.com/aakritkumar04/equitable-technologies/assets/99708171/11bed52f-8131-42c8-941a-259cea19c1df">

  It includes a search feature to search a user's images on the databse and load it.
  <img width="1440" alt="search1" src="https://github.com/aakritkumar04/equitable-technologies/assets/99708171/a1452cbe-8960-4890-8708-be02f15611ca">
  <img width="1440" alt="search2" src="https://github.com/aakritkumar04/equitable-technologies/assets/99708171/e886f909-589f-4ec4-8605-1633fc606263">
  



