# Simple CRUD panel using microservice architecture

## [Install NodeJS](https://nodejs.org/en/download/)

## [Install Docker](https://docs.docker.com/desktop/)

---

## Development

### 1. Clone the repository

```sh
git clone https://github.com/MehmetCemGencer/Microservice-Panel.git
```

### 2. Install dependencies

```sh
sh ./install-deps.sh
```

### 3. Start containers

```sh
docker compose up -d
```

---

## Production

### 1. Clone the repository

```sh
git clone https://github.com/MehmetCemGencer/Microservice-Panel.git
```

### 2. Create secret files

```sh
sh ./create-secret-files.sh
```

### 3. Fill secret files according to your variables

### 4. Build and run containers

```sh
docker compose -f docker-compose-prod.yml up -d --build
```
