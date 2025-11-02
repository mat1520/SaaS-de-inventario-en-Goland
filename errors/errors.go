package errors

import (
	"errors"
	"net/http"
)

// Errores personalizados del sistema
var (
	ErrNotFound           = errors.New("resource not found")
	ErrInvalidCredentials = errors.New("invalid credentials")
	ErrDuplicateEmail     = errors.New("email already exists")
	ErrUnauthorized       = errors.New("unauthorized")
	ErrInvalidToken       = errors.New("invalid or expired token")
	ErrInvalidInput       = errors.New("invalid input data")
	ErrInternalServer     = errors.New("internal server error")
	ErrForbidden          = errors.New("forbidden")
)

// AppError representa un error de aplicación con código HTTP
type AppError struct {
	Err        error
	Message    string
	StatusCode int
}

// Error implementa la interfaz error
func (e *AppError) Error() string {
	if e.Message != "" {
		return e.Message
	}
	return e.Err.Error()
}

// NewAppError crea un nuevo AppError
func NewAppError(err error, message string, statusCode int) *AppError {
	return &AppError{
		Err:        err,
		Message:    message,
		StatusCode: statusCode,
	}
}

// GetHTTPStatus convierte un error en un código HTTP apropiado
func GetHTTPStatus(err error) int {
	switch {
	case errors.Is(err, ErrNotFound):
		return http.StatusNotFound
	case errors.Is(err, ErrInvalidCredentials):
		return http.StatusUnauthorized
	case errors.Is(err, ErrDuplicateEmail):
		return http.StatusConflict
	case errors.Is(err, ErrUnauthorized), errors.Is(err, ErrInvalidToken):
		return http.StatusUnauthorized
	case errors.Is(err, ErrInvalidInput):
		return http.StatusBadRequest
	case errors.Is(err, ErrForbidden):
		return http.StatusForbidden
	default:
		return http.StatusInternalServerError
	}
}
