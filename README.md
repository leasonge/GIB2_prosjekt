# react-django-example

Example repo for students in TBA4245

---

**Acknowledgements:** This page was made with the template of Nikita Kozlov  
Demo for this article - https://dev.to/kozlovzxc/django-templates-with-react-4hko

## Installation

Order of installation can be any.

### Django

You will need [pipenv](https://pipenv.pypa.io/en/latest/).

```shell
pipenv install
```

### React

You will need [yarn](https://yarnpkg.com/).

```shell
cd assets
yarn
```

## Usage

You need to build React first, so Django can serve built files.

### React

First terminal tab:

```shell
cd assets
yarn parcel watch src/index.tsx
```

### Django

Second terminal tab:

```shell
pipenv run python manage.py runserver
```

### Fikse bugs

Når noe kræsjer ved store oppdateringer:

```shell
python manage.py collectstatic
```

Hvis du ikke får kjørt frontenden:

```shell
rm -rf .parcel-cache
```

### Pakker

React routing gammel versjon:

```shell
npm install react-router@4 react-router-dom@4
```

React routing ny versjon:

```shell
npm install react-router-dom
```
