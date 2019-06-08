package models

import (
	"github.com/jinzhu/gorm"
)

// Schedule is the struct of a schedule
type Schedule struct {
	gorm.Model   `json:"-"`
	Notification string      `json:"notification" binding:"required"`
	Event        Event       `json:"event" binding:"omitempty"`
	Concert      Concert     `json:"concert" binding:"omitempty"`
	Fundraising  Fundraising `json:"fundraising" binding:"omitempty"`
	Purcharsing  Purcharsing `json:"purcharsing" binding:"omitempty"`
}

// Concert is the event for concert
type Concert struct {
	BaseEvent
}

// Fundraising is the event for fund
type Fundraising struct {
	BaseEvent
}

// Purcharsing is the event for purcharsings
type Purcharsing struct {
	BaseEvent
}

// Event is the event
type Event struct {
	BaseEvent
}

// BaseEvent is the struct of a event with start and end
type BaseEvent struct {
	ScheduleID uint  `json:"-"`
	Start      int64 `json:"start"`
	End        int64 `json:"end"`
}
