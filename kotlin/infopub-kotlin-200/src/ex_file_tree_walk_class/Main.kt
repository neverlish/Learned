package ex_file_tree_walk_class

import java.io.File

fun main(args: Array<String>) {
    val fileTree: FileTreeWalk = File("./").walk()
        .maxDepth(3)
        .onEnter { file ->
            println("새 디렉터리 방문: ${file.name}")
            true
        }

    for (file in fileTree)
        println(file.name)
}