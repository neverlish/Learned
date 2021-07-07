package ex_role_of_heap

fun main(args: Array<String>) {
    val product: Product
    product = createProduct()
    printProductInfo(product)
    processProduct(product)
    printProductInfo(product)
}

fun createProduct(): Product {
    val apple = Product()
    apple.name = "Apple"
    apple.price = 1000
    return apple
}

fun processProduct(product: Product) {
    product.price += 500
}

fun printProductInfo(product: Product) {
    println("이름: ${product.name}")
    println("가격: ${product.price}")
}