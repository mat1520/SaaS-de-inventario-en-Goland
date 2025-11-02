package service

import (
	"github.com/mat/inventory-system/models"
	"github.com/mat/inventory-system/repository"
)

// ProductService define la interfaz para la lógica de negocio de productos
type ProductService interface {
	Create(userID int, req *models.CreateProductRequest) (*models.Product, error)
	GetAll(userID int) ([]*models.Product, error)
	GetByID(id, userID int) (*models.Product, error)
	Update(id, userID int, req *models.UpdateProductRequest) (*models.Product, error)
	Delete(id, userID int) error
}

// productService implementa ProductService
type productService struct {
	productRepo repository.ProductRepository
}

// NewProductService crea una nueva instancia de ProductService
func NewProductService(productRepo repository.ProductRepository) ProductService {
	return &productService{
		productRepo: productRepo,
	}
}

// Create crea un nuevo producto
func (s *productService) Create(userID int, req *models.CreateProductRequest) (*models.Product, error) {
	product := &models.Product{
		Name:        req.Name,
		Description: req.Description,
		Price:       req.Price,
		Stock:       req.Stock,
		UserID:      userID,
	}

	if err := s.productRepo.Create(product); err != nil {
		return nil, err
	}

	return product, nil
}

// GetAll obtiene todos los productos de un usuario
func (s *productService) GetAll(userID int) ([]*models.Product, error) {
	products, err := s.productRepo.GetAll(userID)
	if err != nil {
		return nil, err
	}

	return products, nil
}

// GetByID obtiene un producto por su ID
func (s *productService) GetByID(id, userID int) (*models.Product, error) {
	product, err := s.productRepo.GetByID(id, userID)
	if err != nil {
		return nil, err
	}

	return product, nil
}

// Update actualiza un producto existente
func (s *productService) Update(id, userID int, req *models.UpdateProductRequest) (*models.Product, error) {
	// Obtener el producto actual
	product, err := s.productRepo.GetByID(id, userID)
	if err != nil {
		return nil, err
	}

	// Actualizar solo los campos proporcionados
	if req.Name != "" {
		product.Name = req.Name
	}
	if req.Description != "" {
		product.Description = req.Description
	}
	if req.Price > 0 {
		product.Price = req.Price
	}
	if req.Stock >= 0 {
		product.Stock = req.Stock
	}

	// Guardar cambios
	if err := s.productRepo.Update(product); err != nil {
		return nil, err
	}

	return product, nil
}

// Delete elimina un producto
func (s *productService) Delete(id, userID int) error {
	if err := s.productRepo.Delete(id, userID); err != nil {
		return err
	}

	return nil
}
