BACKUP_COMUNA_DROPDOWN_Q1CHL

(function () {
  "use strict";

  var CITY_Q = "City";
  var COMUNA_Q = "Comuna";
  var TOTAL_COMUNAS = 47;

  /*
    QuestionPro treats the first real answer option as index 1.
  */
  var FIRST_QP_OPTION_INDEX = 1;

  /*
    Used only to preserve selections during navigation.
    These do not change the QuestionPro or Homescan IDs.
  */
  var STORAGE_CITY = "QP_" + CITY_Q + "_selectedValue";
  var STORAGE_COMUNA = "QP_" + COMUNA_Q + "_selectedValue";

  function qpIndex(i) {
    return i + FIRST_QP_OPTION_INDEX - 1;
  }

  function range(from, to) {
    var out = [];

    for (var i = from; i <= to; i++) {
      out.push(i);
    }

    return out;
  }

  /*
    City selectedIndex:
    0 = -- Select --
    1 = Antofagasta
    2-6 = Gran Concepción
    7-40 = Gran Santiago
    41-42 = La Serena / Coquimbo
    43-44 = Temuco / Padre las Casas
    45-47 = Valparaíso / Viña / Con Cón
  */
  var GROUPS = [
    { cityFrom: 1,  cityTo: 1,  comunaOptions: range(1, 1) },
    { cityFrom: 2,  cityTo: 6,  comunaOptions: range(2, 6) },
    { cityFrom: 7,  cityTo: 40, comunaOptions: range(7, 40) },
    { cityFrom: 41, cityTo: 42, comunaOptions: range(41, 42) },
    { cityFrom: 43, cityTo: 44, comunaOptions: range(43, 44) },
    { cityFrom: 45, cityTo: 47, comunaOptions: range(45, 47) }
  ];

  function getQuestionSelect(questionCode) {
    return $("." + questionCode)
      .filter(".survey-question-wrapper")
      .first()
      .find("select")
      .first();
  }

  function hideAllComunas() {
    for (var i = 1; i <= TOTAL_COMUNAS; i++) {
      $survey.hideOption(COMUNA_Q, qpIndex(i));
    }
  }

  function showComunas(optionIndexes) {
    $.each(optionIndexes, function (_, i) {
      $survey.showOption(COMUNA_Q, qpIndex(i));
    });
  }

  function getAllowedComunas(cityIndex) {
    for (var i = 0; i < GROUPS.length; i++) {
      if (
        cityIndex >= GROUPS[i].cityFrom &&
        cityIndex <= GROUPS[i].cityTo
      ) {
        return GROUPS[i].comunaOptions;
      }
    }

    return [];
  }

  function refreshComunaDropdown(selectedValue) {
    var $comuna = getQuestionSelect(COMUNA_Q);

    if (!$comuna.length) {
      return;
    }

    if (selectedValue !== undefined) {
      $comuna.val(selectedValue);
    }

    try {
      if ($.fn.selectpicker) {
        $comuna.selectpicker("refresh");

        if (selectedValue !== undefined) {
          $comuna.selectpicker("val", selectedValue);
        }
      }
    } catch (e) {}
  }

  function resetComunaDropdown() {
    var $comuna = getQuestionSelect(COMUNA_Q);

    sessionStorage.removeItem(STORAGE_COMUNA);

    if ($comuna.length) {
      $comuna.val("-1");
      refreshComunaDropdown("-1");
    }
  }

  function restoreComunaDropdown(savedValue, allowedComunas) {
    if (!savedValue || savedValue === "-1") {
      refreshComunaDropdown("-1");
      return;
    }

    /*
      Wait until QuestionPro completes hideOption/showOption processing.
    */
    setTimeout(function () {
      var $comuna = getQuestionSelect(COMUNA_Q);

      if (!$comuna.length) {
        return;
      }

      var $savedOption = $comuna
        .find("option")
        .filter(function () {
          return String($(this).val()) === String(savedValue);
        })
        .first();

      if (!$savedOption.length) {
        return;
      }

      /*
        Confirm that the saved option belongs to the current allowed
        Comuna group before restoring it.
      */
      var savedOptionIndex = $savedOption.get(0).index;

      if ($.inArray(savedOptionIndex, allowedComunas) === -1) {
        sessionStorage.removeItem(STORAGE_COMUNA);
        refreshComunaDropdown("-1");
        return;
      }

      $comuna.val(savedValue);
      refreshComunaDropdown(savedValue);
    }, 150);
  }

  function applyComunaFilter(resetComuna) {
    var $city = getQuestionSelect(CITY_Q);
    var $comuna = getQuestionSelect(COMUNA_Q);

    if (
      !$city.length ||
      !$comuna.length ||
      typeof $survey === "undefined"
    ) {
      return false;
    }

    var cityIndex = $city.prop("selectedIndex");
    var allowedComunas = getAllowedComunas(cityIndex);

    /*
      Capture the current QuestionPro-generated Comuna ID before
      hideOption() can clear the dropdown.
    */
    var currentComunaValue = $comuna.val();
    var storedComunaValue = sessionStorage.getItem(STORAGE_COMUNA);

    /*
      Prefer the server-populated value. If QuestionPro has already
      cleared it during Back navigation, use the session-stored value.
    */
    var valueToRestore =
      currentComunaValue && currentComunaValue !== "-1"
        ? currentComunaValue
        : storedComunaValue;

    hideAllComunas();

    if (allowedComunas.length) {
      showComunas(allowedComunas);
    }

    if (resetComuna === true) {
      resetComunaDropdown();
    } else {
      restoreComunaDropdown(valueToRestore, allowedComunas);
    }

    return true;
  }

  function bindDependency() {
    var $city = getQuestionSelect(CITY_Q);
    var $comuna = getQuestionSelect(COMUNA_Q);

    if (!$city.length || !$comuna.length) {
      return false;
    }

    if ($city.data("comunaDependencyBound")) {
      return true;
    }

    $city.data("comunaDependencyBound", true);

    /*
      Store the initial City value so QuestionPro initialization events
      are not mistaken for respondent changes.
    */
    var initialCityValue = String($city.val() || "-1");
    sessionStorage.setItem(STORAGE_CITY, initialCityValue);

    /*
      Save each real Comuna selection using its QuestionPro-generated ID.
    */
    $comuna.on("change.comunaPersistence", function () {
      var selectedValue = String($(this).val() || "-1");

      if (selectedValue !== "-1") {
        sessionStorage.setItem(STORAGE_COMUNA, selectedValue);
      }
    });

    /*
      Reset Comuna only if the City's actual answer value changed.
      Programmatic events with the same City value do not reset it.
    */
    $city.on("change.comunaDependency", function () {
      var newCityValue = String($(this).val() || "-1");
      var previousCityValue =
        sessionStorage.getItem(STORAGE_CITY) || "-1";

      if (newCityValue !== previousCityValue) {
        sessionStorage.setItem(STORAGE_CITY, newCityValue);
        applyComunaFilter(true);
      }
    });

    /*
      Initial page entry or Back navigation:
      filter options and restore the saved Comuna.
    */
    applyComunaFilter(false);

    return true;
  }

  function waitForReady(triesLeft) {
    if (bindDependency()) {
      return;
    }

    if (triesLeft > 0) {
      setTimeout(function () {
        waitForReady(triesLeft - 1);
      }, 300);
    }
  }

  $(function () {
    waitForReady(20);
  });

})();