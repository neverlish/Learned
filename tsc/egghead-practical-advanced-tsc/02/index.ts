class AmountInput {
  private static MAX_ALLOWED = 99_999_999;

  amount: number = 0;

  showTooltip() {
    setTimeout(() => {

    }, 2_500);
  }

  formatMillion() {
    return this.amount / 1_000_000 + 'M';
  }
}
