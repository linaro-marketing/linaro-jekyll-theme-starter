# linaro-jekyll-theme Static Jekyll Starter

linaro-jekyll-theme Static Jekyll Starter is a barebones [linaro-jekyll-theme](https://github.com/linaro-marketing/linaro-jekyll-theme) site

This static Jekyll site is using the [`linaro-jekyll-theme`](https://github.com/linaro-marketing/linaro-jekyll-theme).

## Contributing

To make it easier to contribute to the content, Linaro provides a couple of Docker containers for building and checking the site. All you need is Docker installed on your computer and enough RAM and disc space.

To build the site:

```bash
cd <git repository directory>
SKIP_JEKYLL_DOCTOR="true" ./build-site.sh
```

To build the site and then serve it so that you can check your contribution appears:

```bash
cd <git repository directory>
JEKYLL_ACTION="serve" SKIP_JEKYLL_DOCTOR="true" ./build-site.sh
```

To check that your contribution doesn't include any broken links:

```bash
cd <built web site directory>
../check-links.sh
```

The built web site directory will be `linaro-jekyll-theme.linaro.org`.

For more information, please see the [build container wiki](https://github.com/linaro-its/jekyll-build-container/wiki) and the [link checker wiki](https://github.com/linaro-its/jekyll-link-checker/wiki).

---

## URL Redirections

Redirection rules are defined in `_data/routingrules.json`. Please note that if the left hand side does **not** reference a file then it **must** end with `(/?|/index.html)$` otherwise the URL will not match.

## Multi-lingual support

The website now supports multiple languages, with English defined as the default.

### Add an additional language

To add a new language, edit `_config.yml` and change `languages: ["en", "ch"]` to add the language code as required.

### Add multi-lingual markdown

For each top-level folder, e.g. `_pages`, there should be a sub-directory with the matching language code, e.g. `ch`. Within that folder should be copies of the original English pages but translated to the appropriate language.

**IMPORTANT!** Pages **must** have `lang: xx` after the `---` opening line, where `xx` is the matching language code. Without this line, the translated page may be displayed instead of the default English page.

### Add multi-lingual HTML

Under `_data` there should be a sub-directory with the matching language code, e.g. `ch`. Within that folder should be - at a minimum - the file `translations.yml`. Each entry in that file should be translated to the appropriate language. This will then be used by HTML within the website.

If adding new HTML to the website, replace direct text with a handlebars tag like `{{site.data.translations.services.form2_email}}` where `services.form2_email` gets replaced with the appropriate tag combination from the translation file.
