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
	db, err := database.InitDB("./inventory.db")
	if err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}
	defer db.Close()

	userRepo := repository.NewUserRepository(db)
	productRepo := repository.NewProductRepository(db)

	userService := service.NewUserService(userRepo)
	productService := service.NewProductService(productRepo)

	authHandler := handler.NewAuthHandler(userService)
	userHandler := handler.NewUserHandler(userService)
	productHandler := handler.NewProductHandler(productService)

	router := gin.Default()

	// Configurar CORS para permitir solicitudes desde el frontend
	router.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Rutas basicas de la autenticacion
	v1 := router.Group("/api/v1")
	auth := v1.Group("/auth")
	{
		auth.POST("/register", authHandler.Register)
		auth.POST("/login", authHandler.Login)
	}

	// Rutas protegida=s
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
