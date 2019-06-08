package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/reddonkey-greencarp/fans/backend/models"
)

// AddSchedule is the handler for adding schedule
func AddSchedule(c *gin.Context) {
	schedule := new(models.Schedule)
	if err := c.ShouldBindJSON(schedule); err != nil {
		bindWrong(c)
		return
	}
	if err := db.Save(schedule).Error; err != nil {
		dbWrong(c, err, "add schedule", "")
		return
	}
	simpleOK(c)
	return
}

// Schedule is the handler for getting the schedules
func Schedule(c *gin.Context) {
	schedules := new([]models.Schedule)
	if err := db.
		Model(&models.Schedule{}).
		Preload("Event").
		Preload("Concert").
		Preload("Fundraising").
		Preload("Purchasing").
		Find(schedules).Error; err != nil {
		dbWrong(c, err, "get schedule", "")
		return
	}
	okWithData(c, schedules)
	return
}
