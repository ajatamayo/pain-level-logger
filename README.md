# What's a URL Shortener?

URL shortening is a technique to convert a long URL (site or page address) to a shorter version. This shorter version of the URL is usually cleaner and easier to share or remember. When someone accesses the shortened address, the browser redirects to the original (large) url address. It is also called URL redirection or URL redirect.

For example, the large version of this url:
http://en.wikipedia.org/wiki/URL_shortening

Can be shortened with bit.do service to this small address, that redirects to the previous longer address:
http://bit.do/urlwiki

# How does it work?

Essentially, your database has 3 fields: `primaryKey`, `shortCode` and `targetURL`.

Normally the `shortCode` is simply the `primaryKey` (which is an int) converted to another base. For this instance, we're using base58. So that's `123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ`. This is just the characters `1-9`, `a-z`, and `A-Z`, giving us a total of 58 characters, hence the 58 in base58. We are excluding `0`, `l`, and `O` to avoid confusion when sharing the URL over the phone or copying it manually.

This makes it easy to look up the `targetURL` in the database, since you can just decode it to base 10 and find the `primaryKey`.

You will also have short URLs since the number of URLs you can have is `58^n` where `n` is the number of characters in the shortened URL. So for example, with 4 letters, you can have a possible of `11,316,496` different URLs.

# How to use this code?

To start the development server:

  ```
  # from the project root
  $ yarn dev
  ```

To start the webclient:

  ```
  $ cd webclient
  $ yarn start
  ```

# Pre-deployment

Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

  ```
  # add the heroku git url as a remote called 'staging'
  $ git remote add staging https://git.heroku.com/aqwire-url-shortener-staging.git

  # add the heroku git url as a remote called 'production'
  $ git remote add production https://git.heroku.com/aqwire-url-shortener.git
  ```

# Deploying

Build static files for deployment

  ```
  $ cd webclient
  $ yarn build
  ```

Commit the changes.

  ```
  # deploy the develop branch to staging server
  # Heroku only accepts the master branch, hence we specify develop:master
  $ git push staging develop:master

  # or for the production server
  $ git push production develop:master
  ```
