// calculateUpgradeMileages 구현부

function calculateUpgradeMileages(tripMileages, memberMultiplier) {
  var upgradeMileage = [], 
      i = 0;

  for (i = 0; i < tripMileages.length; i++) {
    /* jshint loopfunc: true */
    var calcRewardsMiles = function(mileage) { // jshint 선언 문장이 없다면 : Functions declared within loops referencing an outer scoped variable may lead to confusing semantics. (W083)
      return mileage * memberMultiplier;
    };
    /* jshint loopfunc: false */
    upgradeMileage[i] = calcRewardsMiles(tripMileages[i]);
  }

  return upgradeMileage;
}
