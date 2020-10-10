# Mega Sena Results

Send the latest [Mega Sena](http://loterias.caixa.gov.br/wps/portal/loterias/landing/megasena/) results contest via email with web scraping and [Github Actions](https://github.com/features/actions)

## Requirements

* [Node 12.x.x](https://nodejs.org/en/);
* [yarn](https://yarnpkg.com/);

## Packages

* [nodemailer](https://nodemailer.com/)
* [Puppeteer](https://github.com/puppeteer/puppeteer)
* [dotenv](https://github.com/motdotla/dotenv)

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
| **PAGE_URL** | Page to scraping results | https://g1.globo.com/loterias/megasena.ghtml |

_*EMAIL_PASS - if you use Gmail as email service and if you are using 2FA you would have to create an “Application Specific” password for Nodemailer to work. [Click here](https://security.google.com/settings/security/apppasswords)

## How to use

### Local

After did the configuration, run

```bash
yarn start
```

### On Github Actions

Create [Secrets](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets) with environments variables.

Actually the action will run at 6am on thursday and sunday. You can change this schedule in [.github/workflow/runner.yml](.github/workflow/runner.yml).

```yml
name: Main pipeline
on:
  schedule:
    - cron: '00 09 * * 4,0' # at 6am on thursday and sunday
    ...
```

Is wrong? No!! Github Actions does not enable to timezone settings. This schedule is based on UTC (-3h). Read more [here](https://docs.github.com/en/free-pro-team@latest/actions/reference/events-that-trigger-workflows#schedule)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature` or `git checkout -b issue-{number}`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature` or `git push origin issue-{number}`
5. Submit a pull request

## TODO

See [issues](https://github.com/tcelestino/mega-sena-results/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) or the [kanban](https://github.com/tcelestino/mega-sena-results/projects/1)

## Credits

[@tcelestino](https://github.com/tcelestino)

## License

[MIT](LICENSE)
