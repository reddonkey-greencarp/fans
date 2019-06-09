package models

// Table is the interface of a table
type Table interface{}

// Tables is the existing tables
var Tables = []Table{
	&Schedule{},
	&Purcharsing{},
	&Fundraising{},
	&Concert{},
	&Event{},
	&Offline{},
	&Question{},
}
