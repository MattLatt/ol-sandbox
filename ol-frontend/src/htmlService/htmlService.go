package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"time"

	"github.com/gbrlsnchs/jwt/v2"
	"github.com/gorilla/securecookie"
)

type service struct {
	ID      string
	Domain  string
	Version string
}

const (
	SERVICE_ID     = "testService"
	SERVICE_DOMAIN = "www.monsite.fr"
	SERVICE_VER    = "0.0.1"
)

//************************************************************//
//!
//************************************************************//
func serveIndex(w http.ResponseWriter, r *http.Request) {
	htmlServiceVar := service{SERVICE_ID, SERVICE_DOMAIN, SERVICE_VER}

	t, err := template.ParseFiles("../htmlTemplate/index.htm")
	if err != nil {
		log.Print("template parsing error:", err)
	}
	err = t.Execute(w, htmlServiceVar)
	if err != nil {
		log.Print("template execute error:", err)
	}

}

//************************************************************//
//!
//************************************************************//
func serveMap(w http.ResponseWriter, r *http.Request) {

	token := getSecureCookie(r, "jwtoken")

	if checkToken(token) == nil {
		w.Write([]byte("token Validated"))
	} else {
		w.Write([]byte("token refused"))
	}

}

//************************************************************//
//!
//************************************************************//
func getToken(w http.ResponseWriter, r *http.Request) {

	now := time.Now()
	hs256 := jwt.NewHS256("q$FoijOAsfèSF#qSf!sd4G86?")

	jot := &jwt.JWT{
		Issuer:         "AtCt",
		Subject:        "btlcm",
		Audience:       "anybody",
		ExpirationTime: now.Add(4 * time.Hour).Unix(),
		NotBefore:      now.Add(30 * time.Minute).Unix(),
		IssuedAt:       now.Unix(),
		ID:             "foobar",
	}

	jot.SetAlgorithm(hs256)
	jot.SetKeyID("kid")
	payload, err := jwt.Marshal(jot)
	if err != nil {
		// handle error
	}
	token, err := hs256.Sign(payload)
	if err != nil {
		// handle error
	}
	log.Printf("token = %s", token)

	ckExp := now.Add(4 * time.Hour)
	setSecureCookie(w, r, "jwtoken", string(token), ckExp)

	w.Write([]byte(fmt.Sprintf("<!DOCTYPE html><html><head><title>Titre</title></head><body><p><a href='http://127.0.0.1:9999/map'></p><p>Token= %s</p></body></html> ", token)))
}

//************************************************************//
//!
//************************************************************//
func setSecureCookie(w http.ResponseWriter, r *http.Request, name string, value string, expire time.Time) {

	var hashKey = []byte("k;Lj7sdTds*/$poBuisqfdni")
	var blockKey = []byte("p2dc,az8ed_èt_yhdJ251Pf48K96/*/")
	var s = securecookie.New(hashKey, blockKey)

	encoded, err := s.Encode(name, value)
	if err == nil {
		jwtCookie := &http.Cookie{Name: name, Value: encoded, Expires: expire, Path: "/map"}
		http.SetCookie(w, jwtCookie)
	}
}

//************************************************************//
//!
//************************************************************//
func getSecureCookie(r *http.Request, name string) string {

	//make a singleton with a rolling hashKey & blockKey
	var hashKey = []byte("k;Lj7sdTds*/$poBuisqfdni")
	var blockKey = []byte("p2dc,az8ed_èt_yhdJ251Pf48K96/*/")
	var s = securecookie.New(hashKey, blockKey)

	if cookie, err := r.Cookie("jwtoken"); err == nil {
		var value string
		if s.Decode(name, cookie.Value, &value) == nil {
			return value
		}
	}
	return ""
}

//************************************************************//
//!
//************************************************************//
func checkToken(token string) error {
	now := time.Now()
	hs256 := jwt.NewHS256("q$FoijOAsfèSF#qSf!sd4G86?")

	// First, extract the payload and signature.
	// This enables unmarshaling the JWT first and
	// verifying it later or vice versa.
	payload, sig, err := jwt.Parse(token)
	if err != nil {
		return err
	}
	if err = hs256.Verify(payload, sig); err != nil {
		return err
	}
	var jot jwt.JWT
	if err = jwt.Unmarshal(payload, &jot); err != nil {
		return err
	}

	// Validate fields.
	iatValidator := jwt.IssuedAtValidator(now)
	expValidator := jwt.ExpirationTimeValidator(now)
	audValidator := jwt.AudienceValidator("anybody")
	if err = jot.Validate(iatValidator, expValidator, audValidator); err != nil {
		switch err {
		case jwt.ErrIatValidation:
			return err
		case jwt.ErrExpValidation:
			return err
		case jwt.ErrAudValidation:
			return err
		}
	}
	return nil
}

//************************************************************//
//!
//************************************************************//
func main() {
	http.HandleFunc("/", serveIndex)
	http.HandleFunc("/auth", getToken)
	http.HandleFunc("/map", serveMap)
	http.ListenAndServe(":9999", nil)
}
