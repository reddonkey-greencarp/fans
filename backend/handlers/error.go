package handlers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

const (
	//(Error 1048: Column 'name' cannot be null)
	errColumnNull uint16 = 1048

	// errBadFieldError is the error for querying unknown column
	// normally the column name is passed by go codes but sometimes
	// I slack off just use the data passed from client as column names
	// which will somehow cause this stupid error
	// e.g: (Error 1054: Unknown column 'usernam' in 'where clause')
	errBadFieldError uint16 = 1054

	// errDuplicatedEntry is the error for duplicated entry
	// this is only available for mysql and mostly due to bad request
	// thus return 400 for default, if any exception please issue me.
	// e.g: (Error 1062: Duplicate entry '123@foo.bar' for key 'uix_users_email')
	errDuplicatedEntry uint16 = 1062

	// errDataTruncated is the error that I don't know what does it mean
	// I meet it when I try to create a team with empty info user(not in db but in go struct)
	// see: https://github.com/colinaaa/UniqueHackDayDashboard-backend/issues/10
	// e.g: (Error 1265: Data truncated for column 'state' at row 1)
	errDataTruncated uint16 = 1265

	// errNoDefaultForField is the error for not null field have empty value
	// usually happens in test database that append useless test field
	// e.g: (Error 1364: Field 'test' doesn't have a default value)
	errNoDefaultForField uint16 = 1364
)

func dbWrong(c *gin.Context, err error, place, message string) {
	log.Println(place+":", err.Error())
	if message != "" {
		badRequest(c, message)
		return
	}
	if gorm.IsRecordNotFoundError(err) {
		c.JSON(http.StatusNotFound, gin.H{
			"message": message,
		})
		return
	}
	mysqlErr, ok := err.(*mysql.MySQLError)
	if !ok {
		serverWrong(c, err, "error handling")
		return
	}
	switch mysqlErr.Number {
	case errDuplicatedEntry:
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "duplicated entry",
			"error":   errMessage(err.Error(), place),
		})
		return
	case errNoDefaultForField:
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "db wrong",
			"error":   errMessage(err.Error(), place),
		})
		return
	case errBadFieldError:
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "unsupported column",
			"error":   errMessage(err.Error(), place),
		})
		return
	case errDataTruncated:
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "server wrong, please issue the error",
			"error":   errMessage(err.Error(), place),
		})
		return
	default:
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "server wrong, please issue the error",
			"error":   errMessage(err.Error(), place),
		})
		return
	}
}

func errMessage(content, place string) gin.H {
	return gin.H{"content": content, "place": place}
}

func ctxWrong(c *gin.Context, err error, place string) {
	log.Println(place, ": context wrong", err.Error())
	c.JSON(http.StatusInternalServerError, gin.H{
		"message": "server wrong, please issue the error",
		"error":   errMessage(err.Error(), place),
	})
	return
}

func badRequest(c *gin.Context, msg string) {
	c.JSON(http.StatusBadRequest, gin.H{
		"error": msg,
	})
	return
}

func serverWrong(c *gin.Context, err error, place string) {
	c.JSON(http.StatusInternalServerError, gin.H{
		"error": err.Error(),
		"place": place,
	})
	return
}

func bindWrong(c *gin.Context) {
	badRequest(c, "bindWrong")
	return
}
