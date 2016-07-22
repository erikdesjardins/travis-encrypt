# [travis-encrypt](https://erikdesjardins.github.io/travis-encrypt)
Encrypt strings for Travis CI public repos.

They can then be used in your `.travis.yml`, e.g.

```yml
deploy:
  provider: npm
  api_key:
    secure: <encrypted key>
```
