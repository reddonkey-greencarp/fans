package main

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/reddonkey-greencarp/fans/backend/handlers"
)

func main() {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, "pong")
	})
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "DELETE", "PUT", "PATCH"},
		AllowHeaders:     []string{"Origin", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	r.POST("/schedule", handlers.AddSchedule)
	r.GET("/schedule", handlers.Schedule)
	r.POST("/offline", handlers.AddOffline)
	r.GET("/offline", handlers.Offline)
	r.POST("/question", handlers.AddQuestion)
	r.GET("/question", handlers.Question)
	r.Run(":8000")
}
