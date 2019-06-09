package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/reddonkey-greencarp/fans/backend/models"
)

// AddQuestion is the handler for add question
func AddQuestion(c *gin.Context) {
	val := new([]*models.Question)
	if err := c.ShouldBindJSON(val); err != nil {
		bindWrong(c)
		return
	}
	print(string((*val)[0].Selections))
	tx := db.Begin()
	for _, q := range *val {
		if err := db.Create(q).Error; err != nil {
			dbWrong(c, err, "add question", "")
			tx.Rollback()
			return
		}
	}
	tx.Commit()
	simpleOK(c)
	return
}

// Question is the handler for getting all questions
func Question(c *gin.Context) {
	res := new([]models.Question)
	if err := db.
		Model(&models.Question{}).
		Find(res).
		Error; err != nil {
		dbWrong(c, err, "get question", "")
		return
	}
	okWithData(c, res)
	return
}
