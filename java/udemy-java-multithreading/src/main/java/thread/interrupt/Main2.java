package thread.interrupt;

import java.math.BigInteger;

public class Main2 {
    static void main() throws InterruptedException {
        Thread thread = new Thread(new LongComuptationTask(new BigInteger("2"), new BigInteger("10")));

        thread.setDaemon(true);
        thread.start();
        Thread.sleep(1000);
        thread.interrupt();
    }

    private static class LongComuptationTask implements Runnable {
        private BigInteger base;
        private BigInteger power;

        public LongComuptationTask(BigInteger base, BigInteger power) {
            this.base = base;
            this.power = power;
        }

        @Override
        public void run() {
            System.out.println(base + "^" + power + "=" + pow(base, power));
        }

        private BigInteger pow(BigInteger base, BigInteger power) {
            BigInteger result = BigInteger.ONE;

            for (BigInteger i = BigInteger.ZERO; i.compareTo(power) != 0; i.add(BigInteger.ONE)) {
                if (Thread.currentThread().isInterrupted()) {
                    System.out.println("Prematurely interrupted computation");
                    return BigInteger.ZERO;
                }
                result = result.multiply(base);
            }

            return result;
        }
    }
}
