package service

import (
	"github.com/mat/inventory-system/models"
	"github.com/mat/inventory-system/repository"
)

type ProductService interface {
	Create(userID int, req *models.CreateProductRequest) (*models.Product, error)
	GetAll(userID int) ([]*models.Product, error)
	GetByID(id, userID int) (*models.Product, error)
	Update(id, userID int, req *models.UpdateProductRequest) (*models.Product, error)
	Delete(id, userID int) error
}

type productService struct {
	productRepo repository.ProductRepository
}

func NewProductService(productRepo repository.ProductRepository) ProductService {
	return &productService{
		productRepo: productRepo,
	}
}

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

func (s *productService) GetAll(userID int) ([]*models.Product, error) {
	products, err := s.productRepo.GetAll(userID)
	if err != nil {
		return nil, err
	}

	return products, nil
}

func (s *productService) GetByID(id, userID int) (*models.Product, error) {
	product, err := s.productRepo.GetByID(id, userID)
	if err != nil {
		return nil, err
	}

	return product, nil
}

func (s *productService) Update(id, userID int, req *models.UpdateProductRequest) (*models.Product, error) {
	product, err := s.productRepo.GetByID(id, userID)
	if err != nil {
		return nil, err
	}

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

	if err := s.productRepo.Update(product); err != nil {
		return nil, err
	}

	return product, nil
}

func (s *productService) Delete(id, userID int) error {
	if err := s.productRepo.Delete(id, userID); err != nil {
		return err
	}

	return nil
}
