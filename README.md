# Mega Sena Results

Send latest results to Mega Sena contest via email using [Github Actions](https://github.com/features/actions)

## Requirements

* [Node 12.x.x](https://nodejs.org/en/);
* [yarn](https://yarnpkg.com/);

## Installation

Clone repo

```bash
git clone git@github.com:tcelestino/mega-sena-results.git
```

Install the packages

```bash
yarn install
```

Rename .env.example to .env

### Environments variables

| Variable | Description | Value       |
|----------|-------------|-------------|
| **EMAIL_SERVICE** | Service email | gmail |
| **EMAIL_HOST** | Configure SMTP host | smtp.gmail.com |
| **EMAIL_PORT** | Set port to host | 465 |
| **EMAIL_USER** | Email | your_email@gmail.com |
| **EMAIL_PASS** | Password email | -- |
| **PAGE_URL** | Page to scrapping email | https://g1.globo.com/loterias/megasena.ghtml |

_*EMAIL_PASS - if you use Gmail as email service, you need to create a password click in the [link]()_

## How to use

### Local

After did the configuration, run

```bash
npm run start
```

### On Github Actions

Create Secrets with environments variables. Actually the action will run at 6am on thursday and sunday. You can change this schedule in [.github/workflow/runner.yml].

```yml
name: Main pipeline
on:
  schedule:
    - cron: '50 23 * * 3,6' # at 6am on thursday and sunday
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## TODO

See [issues](https://github.com/tcelestino/mega-sena-results/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc)

## Credits

[@tcelestino](https://github.com/tcelestino)

## License

TODO: Write license
