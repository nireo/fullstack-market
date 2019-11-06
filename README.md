## Fullstack market
This is a fullstack e-commerce app built with React.js and Express.js.

### About the project
The project is supposed to be a site, which contains main store postings, only posted by the admin. Other than that there is a community tab, where anyone can post different items they want to sell. Users can sign-up with their own credentials, or use OAuth with Google supported.

#### Backend
Different types of services are divided into components. Components include a controller, model and routes. Socket related items are found in the `/socket` folder, as the name suggests. The tests are included in the `/tests` folder. The server itself starts from the `index.js` file, but the routes and middleware are defined in the `app.js` file.


#### Frontend
Im using redux for state management, to easily transfer states around multiple files. Some of the styles are from bootstrap, but at this moment, there is more of my own styling. Component folder is divided into public and private components. Meaning private can be accessed only when logged in, but public components can accessed by both. Components that belong to both, are placed in neither.