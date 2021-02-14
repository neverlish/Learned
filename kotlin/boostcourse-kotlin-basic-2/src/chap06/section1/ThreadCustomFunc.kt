package chap06.section1

// 람다식 추가 함수를 만들어 실행
public fun thread(start: Boolean = true, isDeamon: Boolean = false,
                    contextClassLoader: ClassLoader? = null, name: String? = null,
                    priority: Int = -1, block: () -> Unit): Thread {
    val thread = object: Thread() {
        public override fun run() {
            block()
        }
    }

    if (isDeamon) // 백그라운드 실행 여부
        thread.isDaemon = true
    if (priority > 0) // 우선순위(1: 낮음 ~ 5: 보통 ~ 10: 높음)
        thread.priority = priority
    if (name != null)
        thread.name = name
    if (contextClassLoader != null)
        thread.contextClassLoader = contextClassLoader
    if (start)
        thread.start()

    return thread
}