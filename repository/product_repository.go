package repository

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/mat/inventory-system/errors"
	"github.com/mat/inventory-system/models"
)

type ProductRepository interface {
	Create(product *models.Product) error
	GetAll(userID int) ([]*models.Product, error)
	GetByID(id, userID int) (*models.Product, error)
	Update(product *models.Product) error
	Delete(id, userID int) error
}

type productRepository struct {
	db *sql.DB
}

func NewProductRepository(db *sql.DB) ProductRepository {
	return &productRepository{db: db}
}

func (r *productRepository) Create(product *models.Product) error {
	query := `
		INSERT INTO products (name, description, price, stock, user_id, created_at, updated_at)
		VALUES (?, ?, ?, ?, ?, ?, ?)
	`

	now := time.Now()
	result, err := r.db.Exec(query,
		product.Name,
		product.Description,
		product.Price,
		product.Stock,
		product.UserID,
		now,
		now,
	)
	if err != nil {
		return fmt.Errorf("error creating product: %w", err)
	}

	id, err := result.LastInsertId()
	if err != nil {
		return fmt.Errorf("error getting last insert id: %w", err)
	}

	product.ID = int(id)
	product.CreatedAt = now
	product.UpdatedAt = now
	return nil
}

func (r *productRepository) GetAll(userID int) ([]*models.Product, error) {
	query := `
		SELECT id, name, description, price, stock, user_id, created_at, updated_at
		FROM products
		WHERE user_id = ?
		ORDER BY created_at DESC
	`

	rows, err := r.db.Query(query, userID)
	if err != nil {
		return nil, fmt.Errorf("error getting products: %w", err)
	}
	defer rows.Close()

	products := []*models.Product{}
	for rows.Next() {
		product := &models.Product{}
		err := rows.Scan(
			&product.ID,
			&product.Name,
			&product.Description,
			&product.Price,
			&product.Stock,
			&product.UserID,
			&product.CreatedAt,
			&product.UpdatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("error scanning product: %w", err)
		}
		products = append(products, product)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating products: %w", err)
	}

	return products, nil
}

func (r *productRepository) GetByID(id, userID int) (*models.Product, error) {
	query := `
		SELECT id, name, description, price, stock, user_id, created_at, updated_at
		FROM products
		WHERE id = ? AND user_id = ?
	`

	product := &models.Product{}
	err := r.db.QueryRow(query, id, userID).Scan(
		&product.ID,
		&product.Name,
		&product.Description,
		&product.Price,
		&product.Stock,
		&product.UserID,
		&product.CreatedAt,
		&product.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, errors.ErrNotFound
	}
	if err != nil {
		return nil, fmt.Errorf("error getting product by id: %w", err)
	}

	return product, nil
}

func (r *productRepository) Update(product *models.Product) error {
	query := `
		UPDATE products
		SET name = ?, description = ?, price = ?, stock = ?, updated_at = ?
		WHERE id = ? AND user_id = ?
	`

	now := time.Now()
	result, err := r.db.Exec(query,
		product.Name,
		product.Description,
		product.Price,
		product.Stock,
		now,
		product.ID,
		product.UserID,
	)
	if err != nil {
		return fmt.Errorf("error updating product: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("error getting rows affected: %w", err)
	}

	if rowsAffected == 0 {
		return errors.ErrNotFound
	}

	product.UpdatedAt = now
	return nil
}

func (r *productRepository) Delete(id, userID int) error {
	query := `DELETE FROM products WHERE id = ? AND user_id = ?`

	result, err := r.db.Exec(query, id, userID)
	if err != nil {
		return fmt.Errorf("error deleting product: %w", err)
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
