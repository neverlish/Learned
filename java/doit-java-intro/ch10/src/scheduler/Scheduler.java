// Scheduler 인터페이스 정의하기

package scheduler;

public interface Scheduler {
	public void getNextCall();
	public void sendCallToAgent();
}
