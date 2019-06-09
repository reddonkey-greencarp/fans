package models

import "github.com/jinzhu/gorm"

// Offline is the table for offline encouraging
type Offline struct {
	gorm.Model  `json:"-"`
	Description string `json:"description" binding:"omitempty"`
	Image       string `gorm:"type:text" json:"image" binding:"omitempty"`
}
