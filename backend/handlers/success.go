package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func simpleOK(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"type": "success"})
	return
}

func okWithData(c *gin.Context, data interface{}) {
	c.JSON(http.StatusOK, gin.H{
		"type": "success",
		"data": data,
	})
	return
}
