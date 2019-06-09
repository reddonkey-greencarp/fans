package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/reddonkey-greencarp/fans/backend/models"
)

// AddOffline is the handler for adding an offline
func AddOffline(c *gin.Context) {
	val := new(models.Offline)
	if err := c.ShouldBindJSON(val); err != nil {
		bindWrong(c)
		return
	}
	if err := db.Save(val).Error; err != nil {
		dbWrong(c, err, "set offline", "")
		return
	}
	simpleOK(c)
	return
}

// Offline is the handler for getting all offline
func Offline(c *gin.Context) {
	res := new([]models.Offline)
	if err := db.
		Model(&models.Offline{}).
		Find(res).Error; err != nil {
		dbWrong(c, err, "get offline", "")
		return
	}
	okWithData(c, res)
	return
}
