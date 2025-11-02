package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mat/inventory-system/errors"
	"github.com/mat/inventory-system/models"
	"github.com/mat/inventory-system/service"
)

// UserHandler maneja las peticiones relacionadas con el perfil de usuario
type UserHandler struct {
	userService service.UserService
}

// NewUserHandler crea una nueva instancia de UserHandler
func NewUserHandler(userService service.UserService) *UserHandler {
	return &UserHandler{
		userService: userService,
	}
}

// GetProfile obtiene el perfil del usuario autenticado
// GET /api/v1/profile
func (h *UserHandler) GetProfile(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "unauthorized",
		})
		return
	}

	user, err := h.userService.GetProfile(userID.(int))
	if err != nil {
		statusCode := errors.GetHTTPStatus(err)
		c.JSON(statusCode, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, user)
}

// UpdateProfile actualiza el perfil del usuario autenticado
// PUT /api/v1/profile
func (h *UserHandler) UpdateProfile(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "unauthorized",
		})
		return
	}

	var req models.UpdateProfileRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid request data",
		})
		return
	}

	user, err := h.userService.UpdateProfile(userID.(int), &req)
	if err != nil {
		statusCode := errors.GetHTTPStatus(err)
		c.JSON(statusCode, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "profile updated successfully",
		"user":    user,
	})
}
