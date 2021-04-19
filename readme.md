# Clients Management System

A full-stack CRUD application for managing client memberships built with **React 17** (Redux Toolkit) and **Laravel Lumen 8**.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React | 17.x |
| State | Redux Toolkit | 1.5.x |
| Routing | React Router | 5.x |
| UI | Bootstrap 4 + Semantic UI React | |
| Backend | Laravel Lumen | 8.x |
| Database | MySQL | 5.7 |
| Container | Docker + docker-compose | |

## Features

- Client CRUD (create, read, update, delete)
- Lookup/search by first name, last name, or phone number
- Membership expiry tracking (30-day warning)
- Form validation (frontend + backend)
- Redux Toolkit async thunks for API calls
- Dockerised development environment

## Quick Start

### With Docker

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

### Without Docker

**Backend:**
```bash
cd backend
cp .env.example .env
# Configure DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD in .env
composer install
php artisan migrate
php artisan db:seed
php artisan serve
```

**Frontend:**
```bash
cd frontend
cp .env.example .env
npm install
npm start
```

Then open http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/clients` | List all clients |
| POST | `/api/clients` | Create a client |
| POST | `/api/clients/lookup` | Search clients |
| GET | `/api/clients/details/{id}` | Get client by ID |
| PUT | `/api/clients/edit/{id}` | Update client |
| DELETE | `/api/clients/delete/{id}` | Delete client |
| GET | `/api/clients/expire` | Clients expiring within 30 days |

## Database

Table: `clients`

| Column | Type |
|--------|------|
| id | int (auto) |
| first_name | string |
| last_name | string |
| phone_number | string (nullable) |
| membership_type | string (nullable) |
| membership_expiry_date | date (nullable) |
| address | string |
| mailing_address | string (nullable) |
| created_at / updated_at | timestamps |

Seed data: `php artisan db:seed`
  
