package ex_file_io

import java.io.*

fun main(args: Array<String>) {
    val file = File("./hello.txt")

    if (!file.exists())
        file.createNewFile()

    val outputStream: OutputStream = file.outputStream()
    outputStream.write(35)

    val osw: OutputStreamWriter = outputStream.writer()
    osw.write("파일 입출력")
    osw.close()

    val inputStream: InputStream = file.inputStream()
    println(inputStream.read())

    val isr: InputStreamReader = inputStream.reader()
    println(isr.readText())
    isr.close()
}