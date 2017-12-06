// 07 Capture this with an Arrow Function

const outerThis = this;

const func = () => {
	console.log(this === outerThis);
}

func(); // true
func.call(null); // true
func.apply(undefined); // true
func.bind({})(); // true

// new func(); // TypeError: func is not a constructor

///////

const counter = {
	count: 0,
	incrementPeriodically() {
		setInterval(function() {
			console.log(++this.count);
		}, 1000);
	},
	incrementPeriodically2() {
		setInterval(() => {
			console.log(++this.count);
		}, 1000);
	}
};

// counter.incrementPeriodically(); // NaN
counter.incrementPeriodically2(); // 1 2 3 ....