package utils

import (
	"github.com/jinzhu/configor"
)

// Config is the main config struct to the whole backend
var Config = struct {
	AppName string `default:"fans"`
	Mode    string `default:"development"`

	DB struct {
		Username string `default:"root"`
		Password string `required:"true" env:"HACKDAY_DB_PASSWD"`
		URL      string `default:"127.0.0.1" env:"HACKDAY_DB_URL"`
		Name     string `required:"true" env:"HACKDAY_DB_NAME"`
	}

	FileRoot string

	Port string `default:"8000"`

	Host struct {
		BackEnd  string `default:"localhost"`
		FrontEnd string `default:"localhost"`
	} `required:"true"`
}{}

func init() {
	configor.Load(&Config, "./config/config.yaml")
}
