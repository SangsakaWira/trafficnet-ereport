package main

import "fmt"

func main(){
	var angka = 0
	namabelakang := "Yesssss"
	fmt.Println("Yes {%s}",namabelakang)
	fmt.Println(angka)
	for i := 0; i < 10; i++ {
		angka += i
		fmt.Println(angka)
	}
}
