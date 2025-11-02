package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mat/inventory-system/errors"
	"github.com/mat/inventory-system/models"
	"github.com/mat/inventory-system/service"
)

// AuthHandler maneja las peticiones de autenticación
type AuthHandler struct {
	userService service.UserService
}

// NewAuthHandler crea una nueva instancia de AuthHandler
func NewAuthHandler(userService service.UserService) *AuthHandler {
	return &AuthHandler{
		userService: userService,
	}
}

// Register maneja el registro de nuevos usuarios
// POST /api/v1/register
func (h *AuthHandler) Register(c *gin.Context) {
	var req models.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid request data",
		})
		return
	}

	user, err := h.userService.Register(&req)
	if err != nil {
		statusCode := errors.GetHTTPStatus(err)
		c.JSON(statusCode, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "user registered successfully",
		"user":    user,
	})
}

// Login maneja el login de usuarios
// POST /api/v1/login
func (h *AuthHandler) Login(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid request data",
		})
		return
	}

	response, err := h.userService.Login(&req)
	if err != nil {
		statusCode := errors.GetHTTPStatus(err)
		c.JSON(statusCode, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, response)
}
