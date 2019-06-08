package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func simpleOK(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Success"})
	return
}

func okWithData(c *gin.Context, data interface{}) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Success",
		"data":    data,
	})
	return
}
