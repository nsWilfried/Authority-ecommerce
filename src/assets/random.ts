export module MonModule {
    let data
if(localStorage.getItem('cart') != null ){
     data = localStorage.getItem('cart')
    console.log(data)
}
else {
    console.log("il y'a une erreur")
}


}