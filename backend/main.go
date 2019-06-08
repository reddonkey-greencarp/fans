package main

import (
	"github.com/gin-gonic/gin"
	"github.com/reddonkey-greencarp/fans/backend/handlers"
)

func main() {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, "pong")
	})
	r.POST("/schedule", handlers.AddSchedule)
	r.GET("/schedule", handlers.Schedule)
	r.POST("/offline", handlers.AddOffline)
	r.GET("/offline", handlers.Offline)
	r.POST("/question", handlers.AddQuestion)
	r.GET("/question", handlers.Question)
	r.Run(":8000")
}
