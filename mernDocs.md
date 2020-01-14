# MERN Stack documentation

Basically Justin is a genius and he created all this. 
asd
*The MERN stack is a JavaScript stack of technologies that makes the development process smoother.
MERN stack is four open source technologies: MongoDB, Express, React, and Node.js.*

### M - MongoDB
[MongoDB](https://www.mongodb.com) is a NoSQL (non-relational) document-oriented database.

So basically data in this database is stored in documents that are flexible. They are flexible because the content, size, and number of fields can change from one to the next. MongoDB is very scalable as well. Although there are scenarios where data in the same type document (e.g. Users) can change, likely in this project they will not.

MongoDB has collections (like tables in RDBMS) of documents (like rows in RDBMS) with individual fields (like columns in RDBMS).

*e.g. Users Collection*
```json
{
    "_id": {
        "$oid":"5e1b51cbc771ed49707ab7db"
    },
    "email": "justin@example.com",
    "password": "$2a$10$4CH8Psv5lqtbnMYLPYnQoux2kp8RYqv1ALusUnfWOB2gOMb2mGr86"
}
```

### E - Express
[Express](https://www.expressjs.org) is a back-end web application framework.

Express provides a higher level of abstraction for developers. Express will make developing the backend services and database interaction much easier. We won't have to create full fledged backend services because Express handles a lot of that for us.

Although we could build our application with just express (e.g. serve static html pages from Express), we will use React to handle the webpages for reasons that will be clear later (robust and smooth handling of data and DOM manipulation).
This is where we will create our API (Application Programming Interface) routes to perform our CRUD (Create, Read, Update, Delete) to our data in the MongoDB. *e.g. www.example.com/api/users/login*

### R - React
[React](https://www.reactjs.org) is a framework created and maintained by Facebook that is used for creating our view layer (webpages).

React is very powerful and very different than legacy front-end development.
- React is declarative, making it easy to create UI's (User Interface) interactive, predictable, and easier to debug.
- React is Component-Based: We will dissect our UI into smaller, more manageable parts called components. Each individual component handles its state. Then we combine all of these components to create rich UI's.

*e.g. React Functional Component*
```javascript
// src/components/LoginForm/LoginForm.js
import React from 'react';

import './LoginForm.css';

export default function LoginForm() {
    const [email, setEmail] = React.useState('');

    const emailChange = (e) => {
        setEmail(e.target.value);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label for="email" className="input-label">Email</label>
                <input type="email" className="input-field" onChange={emailChange}/>
            </form>
        </>
    )
}
```

*This is only an example.*
**Things to note about this example**

- React components have to be exported from the file to be imported in another file or you will get some type of error saying something wasn't exported.
- The line that has *[email, setEmail]* is using a feature called React Hooks if you want to read more.
- There is a difference between functional react components and class/stateful react components. I recommend to research the difference.

### N - Node.js
[Node.js](https://www.nodejs.org) is a JavaScript runtime built on Chrome's V8 JavaScript engine.

It is designed to build scalable applications, and can execute JavaScript code outside of the browser.
All of our coding will be done in JavaScript so all of what we do will be ran on top of Node.js. *Install the LTS version*

### The benefit

The benefits of using the MERN stack are extensive, but one of the most noticeable is the use of one programming language across the whole application (*JavaScript*). This will allow for highly effective development and less worry of how to interpolate between languages.

Article used for this overview is at this [blog](https://blog.hyperiondev.com/index.php/2018/09/10/everything-need-know-mern-stack/).

**I definitely encourage you to read some of the documentation on this stack and maybe watch videos for an overview.**
