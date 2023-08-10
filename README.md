# Habisuru
Habit-suru (する) A to-do list application written in Django and React.js.

![habisuru](https://github.com/c-cuna/habisuru/assets/122253189/4b8ebe35-91ef-4a07-92e6-c6842c6a92a4)

## Features to be added
* Daily tasks
* ToDo per day
* Calendar
* User Authentication

## Quick Start
### Deploying for development
In root directory, run Django server
```
$ python3 manage.py run server 0.0.0.0:8000
```
Under pacage.json file add proxy line with the django server port of your choosing
```
{
  ...
  "proxy": "http://localhost:8000",
  ...
}
```
on a separate terminal, start react.js page for development
```
$ cd /frontend
$ npm run start
```

## License
[MIT](https://github.com/c-cuna/habisuru/blob/main/LICENSE) (c) 2023 c-cuna
