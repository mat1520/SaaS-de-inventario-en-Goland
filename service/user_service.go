package service

import (
	"github.com/mat/inventory-system/auth"
	"github.com/mat/inventory-system/errors"
	"github.com/mat/inventory-system/models"
	"github.com/mat/inventory-system/repository"
)

type UserService interface {
	Register(req *models.RegisterRequest) (*models.User, error)
	Login(req *models.LoginRequest) (*models.LoginResponse, error)
	GetProfile(userID int) (*models.User, error)
	UpdateProfile(userID int, req *models.UpdateProfileRequest) (*models.User, error)
}

type userService struct {
	userRepo repository.UserRepository
}

func NewUserService(userRepo repository.UserRepository) UserService {
	return &userService{
		userRepo: userRepo,
	}
}

func (s *userService) Register(req *models.RegisterRequest) (*models.User, error) {
	existingUser, err := s.userRepo.GetByEmail(req.Email)
	if err == nil && existingUser != nil {
		return nil, errors.ErrDuplicateEmail
	}

	hashedPassword, err := auth.HashPassword(req.Password)
	if err != nil {
		return nil, err
	}

	// Crear el usuario
	user := &models.User{
		Name:     req.Name,
		Email:    req.Email,
		Password: hashedPassword,
	}

	if err := s.userRepo.Create(user); err != nil {
		return nil, err
	}

	user.Password = ""
	return user, nil
}

func (s *userService) Login(req *models.LoginRequest) (*models.LoginResponse, error) {
	user, err := s.userRepo.GetByEmail(req.Email)
	if err != nil {
		return nil, errors.ErrInvalidCredentials
	}

	if !auth.CheckPassword(user.Password, req.Password) {
		return nil, errors.ErrInvalidCredentials
	}

	token, err := auth.GenerateToken(user.ID, user.Email)
	if err != nil {
		return nil, err
	}

	// No devolver la contraseña
	user.Password = ""

	return &models.LoginResponse{
		Token: token,
		User:  user,
	}, nil
}

func (s *userService) GetProfile(userID int) (*models.User, error) {
	user, err := s.userRepo.GetByID(userID)
	if err != nil {
		return nil, err
	}

	user.Password = ""
	return user, nil
}

func (s *userService) UpdateProfile(userID int, req *models.UpdateProfileRequest) (*models.User, error) {
	user, err := s.userRepo.GetByID(userID)
	if err != nil {
		return nil, err
	}

	// Actualizar solo los campos proporcionados
	if req.Name != "" {
		user.Name = req.Name
	}
	if req.Email != "" {
		user.Email = req.Email
	}

	// Guardar cambios
	if err := s.userRepo.Update(user); err != nil {
		return nil, err
	}

	// No devolver la contraseña
	user.Password = ""
	return user, nil
}
