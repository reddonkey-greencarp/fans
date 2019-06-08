package models

// Question is the table of question
type Question struct {
	ID         uint   `gorm:"primary_key" json:"id"`
	Content    string `gorm:"text" json:"content" binding:"required"`
	Selections JSON   `gorm:"type:json" json:"selections" binding:"required"`
}
