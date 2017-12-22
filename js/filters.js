'use strict';
window.filters = (function () {
  var LOW_LEVEL = 10000;
  var HIGH_LEVEL = 50000;

  var priceCategories = {
    'low': function (price) {
      return price < LOW_LEVEL;
    },
    'middle': function (price) {
      return price > LOW_LEVEL && price < HIGH_LEVEL;
    },
    'high': function (price) {
      return price >= HIGH_LEVEL;
    }
  };

  var filterValue = function (array, value, type) {
    return array.filter(function (it) {
      return it.offer[type].toString() === value;
    });
  };

  var filterFeatures = function (array, feature) {
    return array.filter(function (it) {
      return it.offer.features.indexOf(feature) !== -1;
    });
  };

  var filterPrice = function (array, value) {
    return array.filter(function (it) {
      return priceCategories[value](it.offer.price);
    });
  };

  var filterOffers = function (array) {
    var selectedFeaturesElements = document.querySelectorAll('.map__filter-set input[type="checkbox"]:checked');
    var mapFilterElements = Array.from(document.querySelectorAll('.map__filter'));
    var selectedFilters = mapFilterElements.filter(function (filter) {
      return filter.value !== 'any';
    });

    var newArray = array.slice();

    selectedFilters.forEach(function (item) {
      var type = item.name.split('-')[1];
      newArray = (type === 'price') ? filterPrice(newArray, item.value) : filterValue(newArray, item.value, type);
    });

    selectedFeaturesElements.forEach(function (item) {
      newArray = filterFeatures(newArray, item.value);
    });

    return newArray;
  };

  return {
    offers: filterOffers
  };
})();
