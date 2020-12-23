# _Cap Chat_

_20 December 2020_

#### _Simple encrypted messaging app with End to End encryption of you message data_

#### By _**Brycen Bartolome**_

## Description

_My Capstone project for Epicodus School, this messaging app is for anyone who wants to keep their private conversations private. You message will be encypted, sent to another User, and then decrypted for them to see. No unencrypted messages sitting in a mass storage database._

## Check it Out

[CypherChat V.1](https://capstone-chat-3c5ec.web.app/)

- Sign in with Google or Email
- Add me as a friend on the top right [brycenbartolome@gmail.com](brycenbartolome@gmail.com)
- Currently you can only add friends whom are users

## Setup/Installation Requirements

1. Before you begin the project setup a firebase account and start a project.

2. Add a .env file to the root directory.

3. Copy the values from your firebase project config into the .env file, see .env.example in root directory for context.

4. On firebase console add firestore database.

5. On firebase console enable email/password authentication

Clone project to desktop.

```bash
git clone https://github.com/BrycenGit/capChat.git
```

Move to project directory.

```bash
cd capChat
```

Open project.

```bash
code .
```

For Install

```bash
npm install
```

For Project

```bash
npm start
```

## MVP's

> - Build app That has Users
> - Users can add friends
> - Users can message friends
> - Messages are encrypted and decrypted client side
> - Deploy so people can use

## Stretch Goals

> - Build app in React Native

## User Stories

- User can Create account with email and password
- User can Sign in with email and password
- User can send friend requests using friends email
- User can select friend to view history
- User can send messages to and receive from friends
- User can sign out

## Work Log && Test Projects

- [Test Project Chat](https://github.com/BrycenGit/Capstone-Chat)
- [Test Project React Native](https://github.com/BrycenGit/imgShareExpo)

## Known Bugs

_Sizing on Phone is off_

## Technologies Used

- React
- JavaScript

### License

Copyright (c) 2020 **_Brycen Bartolome_**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
