package models

import "time"

// Product representa la entidad de producto en el sistema
type Product struct {
	ID          int       `json:"id" db:"id"`
	Name        string    `json:"name" db:"name"`
	Description string    `json:"description" db:"description"`
	Price       float64   `json:"price" db:"price"`
	Stock       int       `json:"stock" db:"stock"`
	UserID      int       `json:"user_id" db:"user_id"` // Producto pertenece a un usuario
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
	UpdatedAt   time.Time `json:"updated_at" db:"updated_at"`
}

// CreateProductRequest representa los datos necesarios para crear un producto
type CreateProductRequest struct {
	Name        string  `json:"name" binding:"required,min=2"`
	Description string  `json:"description" binding:"required"`
	Price       float64 `json:"price" binding:"required,gt=0"`
	Stock       int     `json:"stock" binding:"required,gte=0"`
}

// UpdateProductRequest representa los datos actualizables de un producto
type UpdateProductRequest struct {
	Name        string  `json:"name" binding:"omitempty,min=2"`
	Description string  `json:"description" binding:"omitempty"`
	Price       float64 `json:"price" binding:"omitempty,gt=0"`
	Stock       int     `json:"stock" binding:"omitempty,gte=0"`
}
