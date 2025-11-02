package repository

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/mat/inventory-system/errors"
	"github.com/mat/inventory-system/models"
)

type UserRepository interface {
	Create(user *models.User) error
	GetByID(id int) (*models.User, error)
	GetByEmail(email string) (*models.User, error)
	Update(user *models.User) error
	Delete(id int) error
}

type userRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) UserRepository {
	return &userRepository{db: db}
}

func (r *userRepository) Create(user *models.User) error {
	query := `
		INSERT INTO users (name, email, password, created_at, updated_at)
		VALUES (?, ?, ?, ?, ?)
	`

	now := time.Now()
	result, err := r.db.Exec(query, user.Name, user.Email, user.Password, now, now)
	if err != nil {
		// Verificar si es un error de email duplicado
		if err.Error() == "UNIQUE constraint failed: users.email" {
			return errors.ErrDuplicateEmail
		}
		return fmt.Errorf("error creating user: %w", err)
	}

	id, err := result.LastInsertId()
	if err != nil {
		return fmt.Errorf("error getting last insert id: %w", err)
	}

	user.ID = int(id)
	user.CreatedAt = now
	user.UpdatedAt = now
	return nil
}

func (r *userRepository) GetByID(id int) (*models.User, error) {
	query := `
		SELECT id, name, email, password, created_at, updated_at
		FROM users
		WHERE id = ?
	`

	user := &models.User{}
	err := r.db.QueryRow(query, id).Scan(
		&user.ID,
		&user.Name,
		&user.Email,
		&user.Password,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, errors.ErrNotFound
	}
	if err != nil {
		return nil, fmt.Errorf("error getting user by id: %w", err)
	}

	return user, nil
}

func (r *userRepository) GetByEmail(email string) (*models.User, error) {
	query := `
		SELECT id, name, email, password, created_at, updated_at
		FROM users
		WHERE email = ?
	`

	user := &models.User{}
	err := r.db.QueryRow(query, email).Scan(
		&user.ID,
		&user.Name,
		&user.Email,
		&user.Password,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, errors.ErrNotFound
	}
	if err != nil {
		return nil, fmt.Errorf("error getting user by email: %w", err)
	}

	return user, nil
}

func (r *userRepository) Update(user *models.User) error {
	query := `
		UPDATE users
		SET name = ?, email = ?, updated_at = ?
		WHERE id = ?
	`

	now := time.Now()
	result, err := r.db.Exec(query, user.Name, user.Email, now, user.ID)
	if err != nil {
		if err.Error() == "UNIQUE constraint failed: users.email" {
			return errors.ErrDuplicateEmail
		}
		return fmt.Errorf("error updating user: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("error getting rows affected: %w", err)
	}

	if rowsAffected == 0 {
		return errors.ErrNotFound
	}

	user.UpdatedAt = now
	return nil
}

func (r *userRepository) Delete(id int) error {
	query := `DELETE FROM users WHERE id = ?`

	result, err := r.db.Exec(query, id)
	if err != nil {
		return fmt.Errorf("error deleting user: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("error getting rows affected: %w", err)
	}

	if rowsAffected == 0 {
		return errors.ErrNotFound
	}

	return nil
}
