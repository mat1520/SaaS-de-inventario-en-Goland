package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/mat1520/POO-PROJECT/database"
	"github.com/mat1520/POO-PROJECT/handler"
	"github.com/mat1520/POO-PROJECT/middleware"
	"github.com/mat1520/POO-PROJECT/repository"
	"github.com/mat1520/POO-PROJECT/service"
)

func main() {
	// Inicializar la base de datos
	db, err := database.InitDB("./inventory.db")
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}
	defer db.Close()

	// Capa de Repositorio (Data Access)
	userRepo := repository.NewUserRepository(db)
	productRepo := repository.NewProductRepository(db)

	// Capa de Servicio (Business Logic)
	userService := service.NewUserService(userRepo)
	productService := service.NewProductService(productRepo)

	// Capa de Handler (Presentation/API)
	authHandler := handler.NewAuthHandler(userService)
	userHandler := handler.NewUserHandler(userService)
	productHandler := handler.NewProductHandler(productService)

	// Configurar Gin
	router := gin.Default()

	// Rutas públicas (sin autenticación)
	v1 := router.Group("/api/v1")
	{
		v1.POST("/register", authHandler.Register)
		v1.POST("/login", authHandler.Login)
	}

	// Rutas protegidas (requieren autenticación JWT)
	protected := v1.Group("")
	protected.Use(middleware.AuthMiddleware())
	{
		// Perfil de usuario
		protected.GET("/profile", userHandler.GetProfile)
		protected.PUT("/profile", userHandler.UpdateProfile)

		// CRUD de productos
		protected.POST("/products", productHandler.Create)
		protected.GET("/products", productHandler.GetAll)
		protected.GET("/products/:id", productHandler.GetByID)
		protected.PUT("/products/:id", productHandler.Update)
		protected.DELETE("/products/:id", productHandler.Delete)
	}

	// Iniciar el servidor
	log.Println("Starting server on :8080...")
	if err := router.Run(":8080"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
