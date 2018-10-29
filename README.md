# [georgegillams.co.uk](https://www.georgegillams.co.uk/)

This is the code for my personal website. The project uses React with Server-side rendering (SSR), uses redux to fetch data, and has a Node API which talks to a Redis database.

I have paid particular attention to [a11y](https://a11yproject.com) when building the components used in this website.

I use this site to experiment with things, share stuff I've figured out, and allow people to reach-out to me. So if you're interested in anything I do, [get in touch](https://www.georgegillams.co.uk/contact)!

## Running
To run this, ensure that `node v8.11.4` is installed, and then run `npm i && npm run dev`

Note that a postinstall script is used to transpile some dependencies. It will therefore take longer on first run.

`npm run dev` will set all necessary environment variables needed to run the application.

The front-end app is server-side rendered with React and interacts with the API via Redux middleware.

## API
TODO Complete section

## Hosting on Heroku
To host this on Heroku, you will need to add the [Heroku-redis Add-on](https://devcenter.heroku.com/articles/heroku-redis) and ensure the following environment variables are created:

| Env var             | Reason                                 | Value                                                |
| ------------------- | -------------------------------------- | -----------------------------------------------------|
| GSUITE_APP_PASSWORD | To send emails from your Gmail account | The password generated to access yout G-Suite account|
| GSUITE_EMAIL        | To send emails from your Gmail account | Your G-Suite email address                           |
| NODE_ENV            | Makes the magic happen                 | `production`                                         |
| NODE_PATH           | Makes the magic happen                 | `./src`                                              |
| REDIS_URL           | To access the redis database           | \<Created by the Add-on\>                            |
| SECRET_API_KEY      | Used to make admin API requests        | Anything secret and impossible to guess              |

## Contributing
Contributions are welcome. Please fork and submit a PR if you want to add or change a feature.
