package ex_char_sequence_split

fun main(args: Array<String>) {
    val hello: CharSequence = "안녕하세요.\n고맙습니다.\n반갑습니다."
    val time: CharSequence = "2018-01-22"

    println(hello.lines())
    for (line in hello.lineSequence())
        println(line)
    println(time.split('-'))
}