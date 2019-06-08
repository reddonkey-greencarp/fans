package handlers

import (
	"fmt"
	"sync"

	// register mysql driver
	_ "github.com/jinzhu/gorm/dialects/mysql"

	"github.com/jinzhu/gorm"
	"github.com/reddonkey-greencarp/fans/backend/models"
	"github.com/reddonkey-greencarp/fans/backend/utils"
)

var (
	db   *gorm.DB
	conf = utils.Config
)

func init() {
	sql := fmt.Sprintf(
		`%s:%s@tcp(%s)/%s?charset=utf8&parseTime=True&loc=Local`,
		conf.DB.Username,
		conf.DB.Password,
		conf.DB.URL,
		conf.DB.Name,
	)
	var err error
	db, err = gorm.Open("mysql", sql)
	if err != nil {
		panic(err)
	}
	wg := new(sync.WaitGroup)
	for _, t := range models.Tables {
		wg.Add(1)
		go func(table models.Table) {
			if err := db.AutoMigrate(table).Error; err != nil {
				panic(err.Error())
			}
			wg.Done()
		}(t)
	}
	wg.Wait()
}
