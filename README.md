# IberbookEdu Frontend (Vue)
Frontend for IberbookEdu, using Vue, Buefy and Axios.
For the official backend click [here](https://github.com/pablouser1/IberbookEdu-backend)

# Installation
First of all, prepare the dependencies with
```
yarn install
```

## Modes
Before building IberbookEdu, there are two modes that the frontend can operate, you can choose between:

### With predifined URL
This doesn't allow the user to change the backend's url and uses the one you want to.

Create a file called .env.local and write the following text:
```
VUE_APP_SERVER = https://YOURSERVERHERE.com
```

### Let the user choose the server
No changes needed

## Build
### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

# Credits

* Vue.js (https://vuejs.org)
* Bulma (https://bulma.io)
* Buefy (https://buefy.org)
* Spinkit (https://tobiasahlin.com/spinkit)
