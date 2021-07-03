# Exploring Firebase Cloud

### *Firebase Functions*  
In order to manage your Firebase Cloud Functions you should:
1) Install `firebase-tools`  
```
npm install -g firebase-tools
```

2) Login via firebase cli  
```
firebase login
```

3) After that, make necessary modifications to your functions  
    - `firebase serve` runs local development
4) Deploy your cloud functions  
    - _Note: Your subscription plan should be `Blaze - Pay as you go`_
    - _Note: Don't forget  to install dependencies under `functions/` directory  
      `cd functions/ && npm install`_
```
firebase deploy --only functions
```

----

### *Firebase Hosting*  

`/src` directory includes a basic React.js App

#### Build React app
1) Get Firebase API credentials from your Firebase Project  
   _(__SDK setup and configuration__: Config)_


2) Set your `.env` environment file with credentials.  
   _Sample can be found within `.env.example` file_
   

3) Build production ready React app
```
npm run build
```
_This will create `build/` directory which will be used to upload `Firebase Hosting`_


#### Upload to Firebase Hosting
```
firebase deploy --only hosting
```
