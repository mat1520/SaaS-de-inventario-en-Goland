package service

import (
	"log"
	"time"

	"github.com/mat1520/POO-PROJECT/models"
	"github.com/mat1520/POO-PROJECT/repository"
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

	// Background task: Simulate sending notification or analytics
	go func(p *models.Product) {
		// Simulate some processing time
		time.Sleep(100 * time.Millisecond)

		log.Printf("[BACKGROUND] New product created: %s (ID: %d)", p.Name, p.ID)

		if p.Stock < 10 {
			log.Printf("[BACKGROUND] ALERT: Low stock for new product %s! Current stock: %d", p.Name, p.Stock)
		}
	}(product)

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

	go func(p *models.Product) {
		log.Printf("[BACKGROUND] Product updated: %s (ID: %d). New Price: %.2f, New Stock: %d", p.Name, p.ID, p.Price, p.Stock)
		if p.Stock < 10 {
			log.Printf("[BACKGROUND] ALERT: Low stock after update for %s!", p.Name)
		}
	}(product)

	return product, nil
}

func (s *productService) Delete(id, userID int) error {
	if err := s.productRepo.Delete(id, userID); err != nil {
		return err
	}

	return nil
}
