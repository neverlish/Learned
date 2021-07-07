package ex_init_blocks

class Size(width: Int, height: Int) {
    val width = width
    val height: Int

    init {
        this.height = height
    }

    val area: Int

    init {
        area = width * height
    }
}