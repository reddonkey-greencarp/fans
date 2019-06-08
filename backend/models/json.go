package models

import (
	"bytes"
	"database/sql/driver"
	"errors"
)

// JSON is the type that store json in mysql
type JSON []byte

// Value is the method of JSON to get json's value
func (j JSON) Value() (driver.Value, error) {
	if j.IsNull() {
		return nil, nil
	}
	return string(j), nil
}

// Scan is the method that implement sql interface
func (j *JSON) Scan(value interface{}) error {
	if value == nil {
		*j = nil
		return nil
	}
	s, ok := value.([]byte)
	if !ok {
		return errors.New("Invalid Scan Source")
	}
	*j = append((*j)[0:0], s...)
	return nil
}

// MarshalJSON is the method that implement JSON interface to read json
func (j JSON) MarshalJSON() ([]byte, error) {
	if j == nil {
		return []byte("null"), nil
	}
	return j, nil
}

// UnmarshalJSON is the method that implement JSON interface to write JSON
func (j *JSON) UnmarshalJSON(data []byte) error {
	if j == nil {
		return errors.New("null point exception")
	}
	*j = append((*j)[0:0], data...)
	return nil
}

// IsNull is the method that looks up whether json is empty
func (j JSON) IsNull() bool {
	return len(j) == 0 || string(j) == "null"
}

// Equals is the method that looks up whether two json equals to each other
func (j JSON) Equals(j1 JSON) bool {
	return bytes.Equal([]byte(j), []byte(j1))
}
