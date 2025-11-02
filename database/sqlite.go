package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

func InitDB(filepath string) (*sql.DB, error) {
	db, err := sql.Open("sqlite3", filepath)
	if err != nil {
		return nil, fmt.Errorf("error opening database: %w", err)
	}

	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("error connecting to database: %w", err)
	}

	if err := createTables(db); err != nil {
		return nil, fmt.Errorf("error creating tables: %w", err)
	}

	log.Println("Database initialized successfully")
	return db, nil
}

func createTables(db *sql.DB) error {
	usersTable := `
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		email TEXT UNIQUE NOT NULL,
		password TEXT NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);`

	productsTable := `
	CREATE TABLE IF NOT EXISTS products (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		description TEXT NOT NULL,
		price REAL NOT NULL CHECK(price > 0),
		stock INTEGER NOT NULL CHECK(stock >= 0),
		user_id INTEGER NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
	);`

	indexEmail := `CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);`
	indexUserID := `CREATE INDEX IF NOT EXISTS idx_products_user_id ON products(user_id);`

	queries := []string{usersTable, productsTable, indexEmail, indexUserID}
	for _, query := range queries {
		if _, err := db.Exec(query); err != nil {
			return fmt.Errorf("error executing query: %w", err)
		}
	}

	log.Println("Tables created successfully")
	return nil
}
